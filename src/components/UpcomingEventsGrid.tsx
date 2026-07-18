// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

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
//   if (item.slug) {
//     return String(item.slug);
//   }

//   if (item.id) {
//     return String(item.id);
//   }

//   return title
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// }

// export default function UpcomingEventsGrid() {
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

//   if (isLoading) {
//     return (
//       <section className="upcoming-events upcoming-events--loading">
//         <div className="upcoming-events__container">
//           <div className="upcoming-events__header">
//             <div className="upcoming-events__loading-heading">
//               <div className="upcoming-events__skeleton upcoming-events__skeleton--badge" />
//               <div className="upcoming-events__skeleton upcoming-events__skeleton--title" />
//             </div>

//             <div className="upcoming-events__skeleton upcoming-events__skeleton--button" />
//           </div>

//           <div className="upcoming-events__grid">
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="upcoming-events__skeleton-card" aria-hidden="true" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (events.length === 0) {
//     return null;
//   }

//   const displayEvents = events.slice(0, 3);

//   return (
//     <section className="upcoming-events">
//       <div className="upcoming-events__container">
//         <div className="upcoming-events__header">
//           <div className="upcoming-events__heading">
//             <span className="upcoming-events__badge">Custom Engagements</span>

//             <h2 className="upcoming-events__title">
//               Work <span className="upcoming-events__title-highlight">Highlights &amp; Events</span>
//             </h2>
//           </div>

//           <Link href="/events" className="upcoming-events__view-all">
//             <span>See All Events</span>
//             <ArrowRight size={15} />
//           </Link>
//         </div>

//         <div className="upcoming-events__grid">
//           {displayEvents.map((item) => {
//             const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');

//             const slug = createEventSlug(item, title);
//             const imageSrc = getEventImage(item);

//             const category = String(item.type ?? item.category ?? 'Conference');

//             const date = formatDate(item.startDate ?? item.startsAt);

//             const location = String(
//               item.location ?? item.venue ?? item.city ?? 'Location to be announced',
//             );

//             const description = String(
//               item.excerpt ??
//                 item.description ??
//                 'Join our exclusive networking and insights dialogue designed for enterprise executive decision-makers.',
//             );

//             const totalRegistrations =
//               typeof item.totalRegistrations === 'number' ? item.totalRegistrations : 0;

//             const eventHref = `/events/${slug}`;

//             return (
//               <article key={item.id || slug} className="upcoming-events__card">
//                 <Link
//                   href={eventHref}
//                   className="upcoming-events__media"
//                   aria-label={`View ${title}`}
//                 >
//                   <Image
//                     src={imageSrc}
//                     alt={title}
//                     fill
//                     className="upcoming-events__image"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     unoptimized
//                   />

//                   <span className="upcoming-events__category">{category}</span>
//                 </Link>

//                 <div className="upcoming-events__content">
//                   <div className="upcoming-events__content-top">
//                     <div className="upcoming-events__meta">
//                       <span className="upcoming-events__meta-item">
//                         <Calendar size={13} />
//                         {date}
//                       </span>

//                       {totalRegistrations > 0 && (
//                         <span className="upcoming-events__meta-item">
//                           <Users size={13} />
//                           {totalRegistrations} Registered
//                         </span>
//                       )}
//                     </div>

//                     <h3 className="upcoming-events__card-title">
//                       <Link href={eventHref}>{title}</Link>
//                     </h3>

//                     <p className="upcoming-events__description">{description}</p>
//                   </div>

//                   <div className="upcoming-events__footer">
//                     <span className="upcoming-events__location">
//                       <MapPin size={13} />
//                       <span>{location}</span>
//                     </span>

//                     <Link href={eventHref} className="upcoming-events__join-link">
//                       <span>Join Session</span>
//                       <ArrowRight size={13} />
//                     </Link>
//                   </div>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
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
  if (item.slug) {
    return String(item.slug);
  }

  if (item.id) {
    return String(item.id);
  }

  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function UpcomingEventsGrid() {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

          {/* <div className="upcoming-events__grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="upcoming-events__skeleton-card" aria-hidden="true"/>
            ))}
          </div> */}
          <div className="upcoming-events__grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="upcoming-events__skeleton-card" aria-hidden="true" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

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

            const location = String(
              item.location ?? item.venue ?? item.city ?? 'Location to be announced',
            );

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
