'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import {
  FALLBACK_WEBSITE_EVENT_IMAGE,
  fetchWebsiteEvents,
  getWebsiteEventLocation,
  getWebsiteEventImage,
  resolveWebsiteEventLocation,
  type WebsiteEvent,
} from '@/services/events.service';

function formatDate(date?: string): string {
  if (!date) return 'Upcoming';

  try {
    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? new Date(`${date}T00:00:00`)
      : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return 'Upcoming';

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Upcoming';
  }
}

function createEventSlug(item: WebsiteEvent, title: string): string {
  if (typeof item.slug === 'string' && item.slug.trim()) {
    return item.slug.trim();
  }

  if (typeof item.id === 'string' && item.id.trim()) {
    return item.id.trim();
  }

  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract image URL from backend image strings or objects.
function extractImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (value && typeof value === 'object') {
    const image = value as Record<string, unknown>;

    const possibleKeys = [
      'url',
      'src',
      'path',
      'imageUrl',
      'image',
      'secure_url',
      'original',
      'originalUrl',
    ];

    for (const key of possibleKeys) {
      const result = extractImageUrl(image[key]);

      if (result) return result;
    }
  }

  return '';
}

// Get image from different possible backend fields.
function getEventImage(item: WebsiteEvent): string {
  const event = item as Record<string, unknown>;

  const imageFields = [
    'image',
    'imageUrl',
    'eventImage',
    'eventImageUrl',
    'banner',
    'bannerImage',
    'bannerUrl',
    'coverImage',
    'thumbnail',
    'thumbnailUrl',
    'featuredImage',
    'featured_image',
    'poster',
    'media',
  ];

  for (const field of imageFields) {
    const imageUrl = extractImageUrl(event[field]);

    if (imageUrl) {
      // console.log(`Event image found (${field}):`, imageUrl);
      return imageUrl;
    }
  }

  const serviceImage = getWebsiteEventImage(item);

  if (serviceImage && serviceImage !== FALLBACK_WEBSITE_EVENT_IMAGE) {
    return serviceImage;
  }

  // console.warn('No backend image found for event:', item);

  return FALLBACK_WEBSITE_EVENT_IMAGE;
}

export default function EventsPage() {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const heroMediaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const data = await fetchWebsiteEvents();

        // console.log('Events API Response:', data);

        const listedEvents = Array.isArray(data) ? data : [];
        const eventsWithLocations = await Promise.all(
          listedEvents.map(async (event) => {
            const location = await resolveWebsiteEventLocation(event);
            return location ? { ...event, location } : event;
          }),
        );

        if (isMounted) {
          setEvents(eventsWithLocations);
        }
      } catch (error) {
        // console.error('Failed to load events:', error);

        if (isMounted) {
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <img src="/assets/blogs/blog-1.webp" alt="Events" className="blog-hero-image" />
        </div>

        <div className="blog-hero-overlay" />

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Event Calendar</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="#8e0101"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>{' '}
              Home
            </Link>

            <span>&gt;</span>

            <p>Events</p>
          </div>
        </div>
      </section>

      <section className="upcoming-events events-page-section">
        <div className="upcoming-events__container">
          {isLoading ? (
            <div className="upcoming-events__grid">
              {[1, 2, 3].map((item) => (
                <div key={item} className="upcoming-events__skeleton-card" aria-hidden="true" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="events-empty">No events available at the moment.</div>
          ) : (
            <div className="upcoming-events__grid">
              {events.map((item) => {
                const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');

                const slug = createEventSlug(item, title);
                const imageSrc = getEventImage(item);

                const category = String(item.type ?? item.category ?? 'Event');

                const date = formatDate(item.startDate ?? item.startsAt);

                const location = getWebsiteEventLocation(item) ?? 'Location to be announced';

                const description = String(
                  item.excerpt ??
                    item.description ??
                    'Explore this exclusive event designed for technology leaders and decision-makers.',
                );

                const totalRegistrations =
                  typeof item.totalRegistrations === 'number' ? item.totalRegistrations : 0;

                const eventHref = `/events/${slug}`;

                return (
                  <article key={item.id || slug} className="upcoming-events__card">
                    <Link
                      href={eventHref}
                      className="upcoming-events__media"
                      aria-label={`View ${title}`}
                    >
                      <img
                        src={imageSrc}
                        alt={title}
                        className="upcoming-events__image"
                        loading="lazy"
                        onError={(event) => {
                          const img = event.currentTarget;

                          // console.error('Event image failed to load:', img.src);

                          if (!img.dataset.fallback && img.src !== FALLBACK_WEBSITE_EVENT_IMAGE) {
                            img.dataset.fallback = 'true';
                            img.src = FALLBACK_WEBSITE_EVENT_IMAGE;
                          }
                        }}
                      />

                      <span className="upcoming-events__category">{category}</span>
                    </Link>

                    <div className="upcoming-events__content">
                      <div className="upcoming-events__content-top">
                        <div className="upcoming-events__meta">
                          <span className="upcoming-events__meta-item">
                            <Calendar size={13} />
                            {date}
                          </span>

                          {totalRegistrations > 0 && (
                            <span className="upcoming-events__meta-item">
                              <Users size={13} />
                              {totalRegistrations} Registered
                            </span>
                          )}
                        </div>

                        <h3 className="upcoming-events__card-title">
                          <Link href={eventHref}>{title}</Link>
                        </h3>

                        <p className="upcoming-events__description">{description}</p>
                      </div>

                      <div className="upcoming-events__footer">
                        <span className="upcoming-events__location">
                          <MapPin size={13} />
                          <span>{location}</span>
                        </span>

                        <Link href={eventHref} className="upcoming-events__join-link">
                          <span>View Event</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
