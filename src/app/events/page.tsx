// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import { useEffect, useState } from 'react';
// import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

// function getStoredWebsiteId(): string | undefined {
//   if (typeof window === 'undefined') return undefined;

//   try {
//     const raw = window.localStorage.getItem('websiteAuth');
//     if (!raw) return undefined;

//     const parsed: unknown = JSON.parse(raw);
//     if (typeof parsed === 'object' && parsed !== null && 'websiteId' in parsed) {
//       const websiteId = (parsed as { websiteId?: unknown }).websiteId;
//       return typeof websiteId === 'string' ? websiteId : undefined;
//     }
//   } catch {
//     return undefined;
//   }

//   return undefined;
// }

// export default function EventsPage() {
//   const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

//   useEffect(() => {
//     fetchWebsiteEvents(getStoredWebsiteId())
//       .then((data) => {
//         if (Array.isArray(data) && data.length) setEvents(data);
//         else setEvents([]);
//       })
//       .catch(() => setEvents([]));
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

//   const leftRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const rightRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
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
//           />
//         </div>

//         <div className="blog-hero-overlay"></div>

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

//       <section className="project-section">
//         <div className="project-container">
//           <div className="project-grid">
//             {events === null ? (
//               <div className="events-loading">Loading events…</div>
//             ) : events.length === 0 ? (
//               <div className="events-empty">No events available at the moment.</div>
//             ) : (
//               events.map((item: WebsiteEvent, index: number) => {
//                 const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');

//                 const slug =
//                   typeof item.slug === 'string' && item.slug.trim()
//                     ? item.slug
//                     : item.id && typeof item.id === 'string'
//                       ? String(item.id)
//                       : title
//                           .toLowerCase()
//                           .replace(/\s+/g, '-')
//                           .replace(/[^a-z0-9-]/g, '');

//                 const imageSrc = String(
//                   item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp',
//                 );

//                 const category = String(item.type ?? item.category ?? 'Events');

//                 return (
//                   <Link key={slug} href={`/events/${slug}`}>
//                     <div className="project-card" ref={index === 0 ? leftRef : rightRef}>
//                       <div className="project-image-wrap">
//                         <Image src={imageSrc} alt={title} fill className="project-image" />
//                       </div>

//                       <div className="project-overlay">
//                         <span className="project-category">{category}</span>

//                         <div className="project-content">
//                           <h3>{title}</h3>

//                           <p className="event-excerpt">
//                             {String(
//                               item.excerpt ??
//                                 item.description ??
//                                 'Explore this exclusive event designed for technology leaders and decision-makers.',
//                             )}
//                           </p>
//                         </div>

//                         <span className="event-readmore">View Event</span>
//                         <span className="event-arrow">↗</span>
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

export default function EventsPage() {
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

  useEffect(() => {
    fetchWebsiteEvents()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      })
      .catch(() => {
        setEvents([]);
      });
  }, []);

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

  const leftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const rightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

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
          />
        </div>

        <div className="blog-hero-overlay" />

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Event Calendar</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Events</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="project-container">
          <div className="project-grid">
            {events === null ? (
              <div className="events-loading">Loading events…</div>
            ) : events.length === 0 ? (
              <div className="events-empty">No events available at the moment.</div>
            ) : (
              events.map((item: WebsiteEvent, index: number) => {
                const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');

                const slug =
                  typeof item.slug === 'string' && item.slug.trim()
                    ? item.slug
                    : typeof item.id === 'string' && item.id.trim()
                      ? item.id
                      : title
                          .toLowerCase()
                          .replace(/\s+/g, '-')
                          .replace(/[^a-z0-9-]/g, '');

                const imageSrc = String(
                  item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp',
                );

                const category = String(item.type ?? item.category ?? 'Events');

                const excerpt = String(
                  item.excerpt ??
                    item.description ??
                    'Explore this exclusive event designed for technology leaders and decision-makers.',
                );

                return (
                  <Link key={slug} href={`/events/${slug}`}>
                    <div className="project-card" ref={index === 0 ? leftRef : rightRef}>
                      <div className="project-image-wrap">
                        <Image src={imageSrc} alt={title} fill className="project-image" />
                      </div>

                      <div className="project-overlay">
                        <span className="project-category">{category}</span>

                        <div className="project-content">
                          <h3>{title}</h3>

                          <p className="event-excerpt">{excerpt}</p>
                        </div>

                        <span className="event-readmore">View Event</span>
                        <span className="event-arrow">↗</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
