// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
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

// export default function ProjectsSection() {
//   // const [activeVideo, setActiveVideo] = useState<number | null>(null);

//   const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

//   useEffect(() => {
//     fetchWebsiteEvents(getStoredWebsiteId())
//       .then((data) => {
//         if (Array.isArray(data) && data.length) setEvents(data);
//         else setEvents([]);
//       })
//       .catch(() => setEvents([]));
//   }, []);

//   const customLeftRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//   });

//   const customRightRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//   });

//   return (
//     <section className="project-section">
//       <div className="project-container">
//         <div className="project-heading">
//           <h2 className="project-title">
//             Our Work <span>Highlights.</span>
//           </h2>
//         </div>

//         <div className="project-top-bar">
//           <h6 className="project-subtitle">
//             <Image
//               src="/assets/icon.png"
//               alt="Custom Events"
//               width={20}
//               height={20}
//               className="expertise-label-icon"
//             />
//             <span>CUSTOM EVENTS</span>
//           </h6>

//           <Link href="/events" className="talk-btn">
//             <span>More Events</span>
//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>
//         </div>

//         <div className="project-grid">
//           {events === null ? (
//             <div className="events-loading">Loading events…</div>
//           ) : events.length === 0 ? (
//             <div className="events-empty">No events available.</div>
//           ) : (
//             // show only the first two events
//             events.slice(0, 2).map((item: WebsiteEvent, index: number) => {
//               const title = String(
//                 item.title ??
//                   (item['name'] as unknown) ??
//                   (item['eventName'] as unknown) ??
//                   'Event',
//               );
//               const slug =
//                 item.id && typeof item.id === 'string'
//                   ? String(item.id)
//                   : title
//                       .toLowerCase()
//                       .replace(/\s+/g, '-')
//                       .replace(/[^a-z0-9-]/g, '');

//               const imageSrc = String(
//                 item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp',
//               );
//               const category = String(item.category ?? 'Events');

//               return (
//                 <Link key={slug} href={`/events/${slug}`}>
//                   <div className="project-card" ref={index === 0 ? customLeftRef : customRightRef}>
//                     <div className="project-image-wrap">
//                       <Image src={imageSrc} alt={title} fill className="project-image" />
//                     </div>

//                     <div className="project-overlay">
//                       <span className="project-category">{category}</span>

//                       <div className="project-content">
//                         <h3>{title}</h3>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Users, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

function getEventImage(item: WebsiteEvent): string {
  return String(item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp');
}

function formatDate(date?: string): string {
  if (!date) return 'Upcoming';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return 'Upcoming';

  return parsedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function ProjectsSection() {
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

  useEffect(() => {
    fetchWebsiteEvents()
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => setEvents([]));
  }, []);

  const customLeftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
  });

  const customRightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
  });

  return (
    <section className="project-modern-section">
      <div className="project-modern-bg project-modern-bg-one" />
      <div className="project-modern-bg project-modern-bg-two" />

      <div className="project-modern-container">
        <div className="project-modern-heading">
          <span className="project-modern-label">Custom Events</span>

          <h2>
            Our Work <span>Highlights.</span>
          </h2>

          <Link href="/events" className="project-modern-more-btn">
            <span>More Events</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="project-modern-grid">
          {events === null ? (
            <div className="project-modern-status">Loading events…</div>
          ) : events.length === 0 ? (
            <div className="project-modern-status">No events available.</div>
          ) : (
            events.slice(0, 2).map((item, index) => {
              const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');
              const slug = String(item.slug ?? item.id ?? title.toLowerCase().replace(/\s+/g, '-'));
              const imageSrc = getEventImage(item);
              const category = String(item.type ?? item.category ?? 'Event');
              const date = formatDate(item.startDate ?? item.startsAt);
              const totalRegistrations =
                typeof item.totalRegistrations === 'number' ? item.totalRegistrations : 0;

              return (
                <Link key={slug} href={`/events/${slug}`} className="project-modern-link">
                  <article
                    ref={index === 0 ? customLeftRef : customRightRef}
                    className="project-modern-card"
                  >
                    <div className="project-modern-image-wrap">
                      <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="project-modern-image"
                        unoptimized
                      />

                      <div className="project-modern-image-shine" />

                      <span className="project-modern-category">{category}</span>
                    </div>

                    <div className="project-modern-content">
                      <div className="project-modern-meta">
                        <span>
                          <CalendarDays size={15} />
                          {date}
                        </span>

                        <span>
                          <Users size={15} />
                          {totalRegistrations} Registered
                        </span>
                      </div>

                      <h3>{title}</h3>

                      <p>
                        {String(
                          item.excerpt ??
                            item.description ??
                            'Explore this curated event designed for technology leaders and enterprise decision-makers.',
                        )}
                      </p>

                      <div className="project-modern-footer">
                        <span>
                          <MapPin size={15} />
                          {category}
                        </span>

                        <div className="project-modern-arrow">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
