// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import { fetchWebsiteEvents, type WebsiteEvent } from '@/services/events.service';

// function getEventImage(item: WebsiteEvent): string {
//   return String(item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp');
// }

// function formatDate(date?: string): string {
//   if (!date) return 'Upcoming';

//   try {
//     const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
//       ? new Date(`${date}T00:00:00`)
//       : new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return 'Upcoming';
//     }

//     return parsedDate.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   } catch {
//     return 'Upcoming';
//   }
// }

// function createEventSlug(item: WebsiteEvent, title: string): string {
//   if (typeof item.slug === 'string' && item.slug.trim()) {
//     return item.slug.trim();
//   }

//   if (typeof item.id === 'string' && item.id.trim()) {
//     return item.id.trim();
//   }

//   return title
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// }

// export default function EventsPage() {
//   const [events, setEvents] = useState<WebsiteEvent[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadEvents() {
//       try {
//         const data = await fetchWebsiteEvents();

//         if (isMounted) {
//           setEvents(Array.isArray(data) ? data : []);
//         }
//       } catch (error) {
//         console.error('Unable to fetch website events:', error);

//         if (isMounted) {
//           setEvents([]);
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     void loadEvents();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const heroMediaRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const heroContentRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   return (
//     <>
//       <section className="blog-hero">
//         <div className="blog-hero-media" ref={heroMediaRef}>
//           <Image
//             src="/assets/blogs/blog-1.webp"
//             alt="Events"
//             fill
//             priority
//             className="blog-hero-image"
//             sizes="100vw"
//           />
//         </div>

//         <div className="blog-hero-overlay" />

//         <div className="blog-hero-content" ref={heroContentRef}>
//           <h1>Event Calendar</h1>

//           <div className="blog-breadcrumb">
//             <Link href="/" className="blog-breadcrumb-home">
//               🏦 Home
//             </Link>

//             <span>&gt;</span>

//             <p>Events</p>
//           </div>
//         </div>
//       </section>

//       <section className="upcoming-events events-page-section">
//         <div className="upcoming-events__container">
//           {/* <div className="upcoming-events__header">
//             <div className="upcoming-events__heading">
//               <span className="upcoming-events__badge">
//                 Custom Engagements
//               </span>

//               <h2 className="upcoming-events__title">
//                 Explore Our{' '}
//                 <span className="upcoming-events__title-highlight">
//                   Events &amp; Experiences
//                 </span>
//               </h2>
//             </div>
//           </div> */}

//           {isLoading ? (
//             <div className="upcoming-events__grid">
//               {[1, 2, 3].map((item) => (
//                 <div key={item} className="upcoming-events__skeleton-card" aria-hidden="true" />
//               ))}
//             </div>
//           ) : events.length === 0 ? (
//             <div className="events-empty">No events available at the moment.</div>
//           ) : (
//             <div className="upcoming-events__grid">
//               {events.map((item) => {
//                 const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');

//                 const slug = createEventSlug(item, title);
//                 const imageSrc = getEventImage(item);

//                 const category = String(item.type ?? item.category ?? 'Event');

//                 const date = formatDate(item.startDate ?? item.startsAt);

//                 const location = String(
//                   item.location ?? item.venue ?? item.city ?? 'Location to be announced',
//                 );

//                 const description = String(
//                   item.excerpt ??
//                     item.description ??
//                     'Explore this exclusive event designed for technology leaders and decision-makers.',
//                 );

//                 const totalRegistrations =
//                   typeof item.totalRegistrations === 'number' ? item.totalRegistrations : 0;

//                 const eventHref = `/events/${slug}`;

//                 return (
//                   <article key={item.id || slug} className="upcoming-events__card">
//                     <Link
//                       href={eventHref}
//                       className="upcoming-events__media"
//                       aria-label={`View ${title}`}
//                     >
//                       <Image
//                         src={imageSrc}
//                         alt={title}
//                         fill
//                         className="upcoming-events__image"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                         unoptimized
//                       />

//                       <span className="upcoming-events__category">{category}</span>
//                     </Link>

//                     <div className="upcoming-events__content">
//                       <div className="upcoming-events__content-top">
//                         <div className="upcoming-events__meta">
//                           <span className="upcoming-events__meta-item">
//                             <Calendar size={13} />
//                             {date}
//                           </span>

//                           {totalRegistrations > 0 && (
//                             <span className="upcoming-events__meta-item">
//                               <Users size={13} />
//                               {totalRegistrations} Registered
//                             </span>
//                           )}
//                         </div>

//                         <h3 className="upcoming-events__card-title">
//                           <Link href={eventHref}>{title}</Link>
//                         </h3>

//                         <p className="upcoming-events__description">{description}</p>
//                       </div>

//                       <div className="upcoming-events__footer">
//                         <span className="upcoming-events__location">
//                           <MapPin size={13} />
//                           <span>{location}</span>
//                         </span>

//                         <Link href={eventHref} className="upcoming-events__join-link">
//                           <span>View Event</span>
//                           <ArrowRight size={13} />
//                         </Link>
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchWebsiteEvents, type WebsiteEvent } from '@/services/events.service';

function getEventImage(item: WebsiteEvent): string {
  return String(item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp');
}

function formatDate(date?: string): string {
  if (!date) return 'Upcoming';

  try {
    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? new Date(`${date}T00:00:00`)
      : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Upcoming';
    }

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

        if (isMounted) {
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch {
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
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Events"
            fill
            priority
            className="blog-hero-image"
            sizes="100vw"
          />
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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

                const location = String(
                  item.location ?? item.venue ?? item.city ?? 'Location to be announced',
                );

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
                      <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="upcoming-events__image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
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
