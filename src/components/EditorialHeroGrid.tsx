'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Calendar, User, ArrowUpRight } from 'lucide-react';
import { fetchWebsiteBlogs, type WebsiteBlogItem } from '@/services/blogs.service';

function getBlogCategory(blog: WebsiteBlogItem) {
  return blog.websites?.[0]?.name || blog.tags?.[0] || 'Insight';
}

function getBlogImage(blog: WebsiteBlogItem) {
  return blog.featureImage || blog.seo?.ogImage || '/assets/blogs/blog-1.webp';
}

function formatDate(dateStr?: string) {
  if (!dateStr) return 'Recent';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Recent';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Recent';
  }
}

export default function EditorialHeroGrid() {
  const [blogs, setBlogs] = useState<WebsiteBlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadBlogs() {
      try {
        const response = await fetchWebsiteBlogs(1, 4);
        if (isMounted) {
          setBlogs(response.data?.data || []);
        }
      } catch {
        if (isMounted) {
          setBlogs([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Skeleton Col 1 & 2 */}
          <div className="lg:col-span-2 h-[420px] bg-gray-100 rounded-2xl" />
          {/* Skeleton Col 3 */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="h-6 w-32 bg-gray-100 rounded mb-2" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 w-16 bg-gray-100 rounded" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-3 w-12 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
          {/* Skeleton Col 4 */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="h-[200px] bg-gray-100 rounded-2xl" />
            <div className="h-[150px] bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center bg-white rounded-2xl shadow-xs border border-gray-100">
        <p className="text-gray-500 font-semibold">No featured stories found.</p>
      </div>
    );
  }

  const mainFeatured = blogs[0]!;
  const trendingBlogs = blogs.slice(1, 4);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Column 1 & 2: Large Main Featured Story (50% width) */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-xs hover:shadow-md transition-shadow group">
          <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-50">
            <Image
              src={getBlogImage(mainFeatured)}
              alt={mainFeatured.title}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              unoptimized
            />
            <div className="absolute top-4 left-4 bg-[#8e0101] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
              {getBlogCategory(mainFeatured)}
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {formatDate(mainFeatured.publishedAt)}
                </span>
                {mainFeatured.author?.fullName && (
                  <span className="flex items-center gap-1">
                    <User size={13} />
                    {mainFeatured.author.fullName}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-[#8e0101] transition-colors line-clamp-3 mb-3 leading-snug">
                <Link href={`/blog/${mainFeatured.slug}`}>{mainFeatured.title}</Link>
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                {mainFeatured.excerpt ||
                  'Read the latest thought leadership and digital transformation insights from technology leaders.'}
              </p>
            </div>

            <Link
              href={`/blog/${mainFeatured.slug}`}
              className="inline-flex items-center gap-1.5 text-[#8e0101] text-sm font-bold hover:gap-2.5 transition-all mt-auto"
            >
              <span>Read Full Story</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Column 3: Trending Feed (25% width) */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <div className="border-b border-gray-200 pb-2 mb-1">
            <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-wider border-b-2 border-[#8e0101] inline-block pb-1">
              Latest Updates
            </h3>
          </div>

          {trendingBlogs.map((blog) => (
            <article
              key={blog.id}
              className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 group"
            >
              <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-150">
                <Image
                  src={getBlogImage(blog)}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-300"
                  sizes="80px"
                  unoptimized
                />
              </div>

              <div className="flex flex-col justify-between py-0.5">
                <div>
                  <span className="text-[10px] font-bold text-[#8e0101] uppercase tracking-wider">
                    {getBlogCategory(blog)}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#8e0101] transition-colors line-clamp-2 mt-1 leading-snug">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h4>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">
                  {formatDate(blog.publishedAt)}
                </span>
              </div>
            </article>
          ))}

          {trendingBlogs.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-6">No recent updates found.</p>
          )}
        </div>

        {/* Column 4: Newsletter & Quick Links (25% width) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Newsletter Box */}
          <div className="bg-[#8e0101] text-white p-6 rounded-2xl flex flex-col justify-between shadow-xs relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                <Mail size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Subscribe to Insights</h3>
              <p className="text-xs text-red-100 mb-4 leading-relaxed font-medium">
                Stay updated with the latest CIO dialogues, event updates, and technology insights
                directly in your inbox.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2 mt-auto relative">
              <input
                type="email"
                placeholder="Enter email address"
                required
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-red-200 focus:outline-hidden focus:bg-white/15 focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-[#8e0101] font-bold text-sm rounded-lg hover:bg-red-50 hover:scale-101 active:scale-99 transition-all cursor-pointer shadow-xs"
              >
                Join Now
              </button>
            </form>
          </div>

          {/* Quick Access Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Explore Channels
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'CIO Voice', href: '/cio-voice' },
                { label: 'Thought Leadership', href: '/thought-leadership' },
                { label: 'Business Insights', href: '/business-insights' },
                { label: 'Technology Solutions', href: '/technology' },
                { label: 'Leadership Lessons', href: '/leadership-lessons' },
              ].map((channel, idx) => (
                <Link
                  key={idx}
                  href={channel.href}
                  className="flex items-center justify-between text-sm font-semibold text-gray-700 hover:text-[#8e0101] hover:translate-x-1 transition-all py-1"
                >
                  <span>{channel.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 hover:opacity-100 transition-opacity"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
