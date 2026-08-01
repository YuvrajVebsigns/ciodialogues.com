'use client';

import { useEffect, useState } from 'react';
import { Settings, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieConsentBanner({ onAccept, onDecline }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSavePreferences = () => {
    if (analyticsEnabled) {
      onAccept();
    } else {
      onDecline();
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className={`cookie-consent-banner ${isVisible ? 'cookie-consent-banner--visible' : ''}`}
    >
      <div className="cookie-consent-card">
        <div className="cookie-consent-header">
          <div className="cookie-consent-title-group">
            <span className="cookie-consent-label">Cookie Consent</span>

            <h3 id="cookie-title" className="cookie-consent-title">
              Let&apos;s Talk Cookies 🍪
            </h3>
          </div>

          <button
            type="button"
            onClick={onDecline}
            aria-label="Close cookie consent banner"
            className="cookie-consent-close"
          >
            <X className="cookie-consent-close-icon" />
          </button>
        </div>

        <div id="cookie-desc" className="cookie-consent-body">
          <p>
            We use cookies to enhance your browsing experience, personalize your content, and
            understand site performance.
          </p>

          <p>
            Click <strong>Accept all</strong> to agree to cookies that help us deliver better
            content and a smoother browsing experience.
          </p>

          <p>
            View our{' '}
            <a href="/privacy-policy" className="cookie-consent-link">
              Cookie Policy
            </a>{' '}
            to update or disable preferences anytime.
          </p>
        </div>

        {showPreferences && (
          <div className="cookie-consent-preferences">
            <p className="cookie-consent-preferences-label">Cookie Preferences</p>

            <div className="cookie-consent-preference-list">
              <div className="cookie-consent-preference-item">
                <div>
                  <p className="cookie-consent-preference-title">Essential Cookies</p>
                  <p className="cookie-consent-preference-text">
                    Required for the website to function properly.
                  </p>
                </div>

                <span className="cookie-consent-badge">Always Active</span>
              </div>

              <div className="cookie-consent-preference-item">
                <div>
                  <p className="cookie-consent-preference-title">
                    Analytics &amp; Performance Cookies
                  </p>
                  <p className="cookie-consent-preference-text">
                    Help us understand visitor usage and optimize site performance.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="cookie-consent-checkbox"
                />
              </div>
            </div>
          </div>
        )}

        <div className="cookie-consent-actions">
          {showPreferences ? (
            <>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="cookie-consent-button cookie-consent-button--ghost"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSavePreferences}
                className="cookie-consent-button cookie-consent-button--dark"
              >
                Save Preferences
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onAccept}
                id="btn-accept-all-cookies"
                className="cookie-consent-button cookie-consent-button--primary"
              >
                Accept all
              </button>

              <button
                type="button"
                onClick={onDecline}
                id="btn-essential-only-cookies"
                className="cookie-consent-button cookie-consent-button--secondary"
              >
                Essential only
              </button>

              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                id="btn-customize-cookies"
                className="cookie-consent-button cookie-consent-button--secondary"
              >
                <Settings className="cookie-consent-settings-icon" />
                Customize
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
