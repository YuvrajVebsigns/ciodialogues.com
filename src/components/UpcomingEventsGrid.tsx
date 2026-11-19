'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

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
  if (item.slug) return String(item.slug);
  if (item.id) return String(item.id);

  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract image URL from strings or backend image objects.
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

// Get event image from backend response.
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

    if (imageUrl) return imageUrl;
  }

  const serviceImage = getWebsiteEventImage(item);

  if (serviceImage && serviceImage !== FALLBACK_WEBSITE_EVENT_IMAGE) {
    return serviceImage;
  }

  return FALLBACK_WEBSITE_EVENT_IMAGE;
}

export default function UpcomingEventsGrid() {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const data = await fetchWebsiteEvents();

        const listedEvents = Array.isArray(data) ? data : [];
        const displayedEvents = await Promise.all(
          listedEvents.slice(0, 3).map(async (event) => {
            const location = await resolveWebsiteEventLocation(event);
            return location ? { ...event, location } : event;
          }),
        );

        if (isMounted) {
          setEvents([...displayedEvents, ...listedEvents.slice(3)]);
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

  if (isLoading) {
    return (
      <section className="upcoming-events upcoming-events--loading">
        <div className="upcoming-events__container">
          <div className="upcoming-events__header">
            <div className="upcoming-events__loading-heading">
              <div className="upcoming-events__skeleton upcoming-events__skeleton--badge" />
              <div className="upcoming-events__skeleton upcoming-events__skeleton--title" />
            </div>

            <div className="upcoming-events__skeleton upcoming-events__skeleton--button" />
          </div>

          <div className="upcoming-events__grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="upcoming-events__skeleton-card" aria-hidden="true" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) return null;

  const displayEvents = events.slice(0, 3);

  return (
    <section className="upcoming-events">
      <div className="upcoming-events__container">
        <div className="upcoming-events__header">
          <div className="upcoming-events__heading">
            <span className="upcoming-events__badge">Custom Engagements</span>

            <h2 className="upcoming-events__title">
              Work <span className="upcoming-events__title-highlight">Highlights &amp; Events</span>
            </h2>
          </div>

          <Link href="/events" className="upcoming-events__view-all">
            <span>See All Events</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="upcoming-events__grid">
          {displayEvents.map((item) => {
            const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');

            const slug = createEventSlug(item, title);
            const imageSrc = getEventImage(item);

            const category = String(item.type ?? item.category ?? 'Conference');

            const date = formatDate(item.startDate ?? item.startsAt);

            // Dynamic location from backend.
            const location = getWebsiteEventLocation(item) ?? 'Location to be announced';

            const description = String(
              item.excerpt ??
                item.description ??
                'Join our exclusive networking and insights dialogue designed for enterprise executive decision-makers.',
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
                      <span>Join Session</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
