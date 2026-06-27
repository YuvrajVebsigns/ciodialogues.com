'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { fetchWebsiteEvents, type WebsiteEvent } from '@/services/events.service';

function getEventImage(item: WebsiteEvent): string {
  return String(item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp');
}

function formatDate(date?: string): string {
  if (!date) return 'Upcoming';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Upcoming';
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Upcoming';
  }
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
    loadEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section className="w-full bg-[#fcf9f9] border-y border-gray-100 py-16 animate-pulse">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div className="space-y-3">
              <div className="h-5 w-28 bg-gray-200 rounded" />
              <div className="h-8 w-64 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white h-[320px] rounded-2xl border border-gray-150" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Hide the entire section if no events are returned
  if (events.length === 0) {
    return null;
  }

  const displayEvents = events.slice(0, 3);

  return (
    <section className="w-full bg-[#fcf9f9] border-y border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-[#8e0101] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-md font-semibold">
              Custom Engagements
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
              Work <span className="text-[#8e0101]">Highlights & Events</span>
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-lg hover:text-[#8e0101] hover:border-[#8e0101] hover:shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>See All Events</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((item) => {
            const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');
            const slug = String(item.slug ?? item.id ?? title.toLowerCase().replace(/\s+/g, '-'));
            const imageSrc = getEventImage(item);
            const category = String(item.type ?? item.category ?? 'Conference');
            const date = formatDate(item.startDate ?? item.startsAt);
            const totalRegistrations =
              typeof item.totalRegistrations === 'number' ? item.totalRegistrations : 0;

            return (
              <article
                key={item.id || slug}
                className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-xs hover:shadow-md hover:border-red-100 transition-all flex flex-col group"
              >
                <div className="relative aspect-video w-full bg-gray-50 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-400" />
                        {date}
                      </span>
                      {totalRegistrations > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Users size={13} className="text-gray-400" />
                          {totalRegistrations} Registered
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#8e0101] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/events/${slug}`}>{title}</Link>
                    </h3>

                    <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                      {String(
                        item.excerpt ??
                          item.description ??
                          'Join our exclusive networking and insights dialogue designed for enterprise executive decision-makers.',
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-5 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-gray-400" />
                      {category}
                    </span>
                    <Link
                      href={`/events/${slug}`}
                      className="inline-flex items-center gap-1 text-[#8e0101] font-bold hover:gap-1.5 transition-all"
                    >
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
