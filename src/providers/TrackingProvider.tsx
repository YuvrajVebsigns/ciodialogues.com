'use client';

import React, { createContext, useContext, useEffect, useState, Suspense, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ensureWebsiteAuth } from '@/lib/website-auth';
import { CoreMediaTracker } from '@/services/tracker.service';
import CookieConsentBanner from '@/components/CookieConsentBanner';

const TrackingContext = createContext<CoreMediaTracker | null>(null);

export const useTracking = () => useContext(TrackingContext);

interface TrackingProviderProps {
  children: ReactNode;
}

const COOKIE_CONSENT_KEY = 'core_media_cookie_consent';

const getStoredConsent = (): 'accepted' | 'declined' | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  return stored === 'accepted' || stored === 'declined' ? stored : null;
};

const setStoredConsent = (status: 'accepted' | 'declined') => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COOKIE_CONSENT_KEY, status);
};

// Sub-component to listen to route transitions without de-opting Layout to CSR-only pre-rendering.
function RouteChangeListener({ tracker }: { tracker: CoreMediaTracker }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrlRef = React.useRef('');

  useEffect(() => {
    if (tracker.getConsentStatus() !== 'accepted') return;

    const fullUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    if (lastTrackedUrlRef.current === fullUrl) return;

    tracker.trackPageview(fullUrl, document.title);
    lastTrackedUrlRef.current = fullUrl;
  }, [pathname, searchParams, tracker]);

  return null;
}

export default function TrackingProvider({ children }: TrackingProviderProps) {
  const [tracker, setTracker] = useState<CoreMediaTracker | null>(null);
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);

  // Initialize consent and tracking authentication dynamically
  useEffect(() => {
    setConsent(getStoredConsent());

    async function initTracker() {
      try {
        const auth = await ensureWebsiteAuth();
        if (auth?.token) {
          const backendUrl =
            process.env.NEXT_PUBLIC_API_URL || 'https://backend.uatcoremedia.vebsigns.com';
          const trackerInstance = new CoreMediaTracker({
            backendUrl,
            token: auth.token,
          });
          setTracker(trackerInstance);
          const storedConsent = getStoredConsent();
          if (storedConsent === 'accepted') {
            if (trackerInstance.getConsentStatus() !== 'accepted') {
              trackerInstance.setConsent('accepted', false);
            }
            setConsent('accepted');
          } else if (storedConsent === 'declined') {
            trackerInstance.setConsent('declined', false);
            setConsent('declined');
          } else {
            setConsent(trackerInstance.getConsentStatus() as 'accepted' | 'declined' | null);
          }
        }
      } catch {
        // Fail silently
      }
    }
    initTracker();
  }, []);

  // Set up global click tracking for critical client interactions
  useEffect(() => {
    if (!tracker || consent !== 'accepted') return;

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickableElement = target.closest('button, a') as HTMLElement | null;
      if (!clickableElement) return;

      // Classify the interaction section to capture contact form actions, newsletter signups, or sponsor clicks
      const isContactForm = clickableElement.closest('form, [id*="contact"], [class*="contact"]');
      const isNewsletter = clickableElement.closest(
        '[id*="newsletter"], [class*="newsletter"], [id*="subscribe"], [class*="subscribe"]',
      );
      const isSponsor = clickableElement.closest(
        '[id*="sponsor"], [class*="sponsor"], [id*="brand"], [class*="brand"]',
      );

      if (isContactForm || isNewsletter || isSponsor) {
        const elementId =
          clickableElement.id || clickableElement.getAttribute('name') || 'unnamed-element';
        const elementText =
          clickableElement.textContent?.trim() || clickableElement.getAttribute('aria-label') || '';
        const classNames = clickableElement.className || '';

        let sectionType = 'other';
        if (isContactForm) sectionType = 'contact_form';
        else if (isNewsletter) sectionType = 'newsletter';
        else if (isSponsor) sectionType = 'sponsor';

        tracker.trackInteraction(elementId, elementText, {
          classNames,
          section: sectionType,
        });
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, [tracker, consent]);

  const handleAcceptConsent = () => {
    setStoredConsent('accepted');
    if (tracker) {
      tracker.setConsent('accepted', false);
    }
    setConsent('accepted');
  };

  const handleDeclineConsent = () => {
    setStoredConsent('declined');
    if (tracker) {
      tracker.setConsent('declined', false);
    }
    setConsent('declined');
  };

  return (
    <TrackingContext.Provider value={tracker}>
      {children}
      {consent === null && (
        <CookieConsentBanner onAccept={handleAcceptConsent} onDecline={handleDeclineConsent} />
      )}
      {tracker && consent === 'accepted' && (
        <Suspense fallback={null}>
          <RouteChangeListener tracker={tracker} />
        </Suspense>
      )}
    </TrackingContext.Provider>
  );
}
