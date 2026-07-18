'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';

import { fetchWebsiteBlogs, type WebsiteBlogItem } from '@/services/blogs.service';
import {
  fetchWebsitePageBySlug,
  getPageTestimonials,
  type PageTestimonial,
} from '@/services/pages.service';

const channels = [
  {
    label: 'CIO Voice',
    href: '/cio-voice',
  },
  {
    label: 'Thought Leadership',
    href: '/thought-leadership',
  },
  {
    label: 'Business Insights',
    href: '/business-insights',
  },
  {
    label: 'Technology Solutions',
    href: '/category/technology-solutions',
  },
  {
    label: 'Leadership Lessons',
    href: '/leadership-lessons',
  },
];

const FALLBACK_EDITORIAL_IMAGE = '/assets/blogs/blog-1.webp';
const MAX_THOUGHT_ITEMS = 1;

type ThoughtPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
  image: string;
};

function getValidImage(value?: string) {
  if (!value) return FALLBACK_EDITORIAL_IMAGE;

  const trimmed = value.trim();
  if (!trimmed) return FALLBACK_EDITORIAL_IMAGE;
  if (trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined')
    return FALLBACK_EDITORIAL_IMAGE;

  return trimmed;
}

function cleanThoughtText(text: string, limit = 120) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  return normalized.length > limit ? `${normalized.slice(0, limit)}...` : normalized;
}

function mapTestimonialsToThoughtPosts(testimonials: PageTestimonial[]): ThoughtPost[] {
  return testimonials
    .filter((item) => item.author || item.quote || item.avatar)
    .slice(0, MAX_THOUGHT_ITEMS)
    .map((item, index) => {
      const title = item.author || 'Thought Leadership';
      const date = item.role?.split('|')[1]?.trim() || '';
      return {
        id: `${title}-${index}`,
        title,
        author: item.role?.split('|')[0]?.trim() || 'CIO Dialogues Team',
        date,
        excerpt: cleanThoughtText(item.quote || 'Read the latest thought leadership insight.'),
        slug: title
          .toLowerCase()
          .trim()
          .replace(/[“”‘’]/g, '')
          .replace(/&/g, 'and')
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-'),
        image: getValidImage(item.avatar),
      };
    });
}

function isValidImageUrl(value?: string): value is string {
  if (typeof value !== 'string') return false;

  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') return false;

  return true;
}

function getBlogCategory(blog: WebsiteBlogItem) {
  return blog.websites?.[0]?.name || blog.tags?.[0] || 'Insight';
}

function getBlogImage(blog: WebsiteBlogItem) {
  const candidate = blog.featureImage || blog.seo?.ogImage;
  return isValidImageUrl(candidate) ? candidate : FALLBACK_EDITORIAL_IMAGE;
}

function formatDate(date?: string) {
  if (!date) return 'Recent';

  const value = new Date(date);

  if (isNaN(value.getTime())) {
    return 'Recent';
  }

  return value.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EditorialHeroGrid() {
  const [blogs, setBlogs] = useState<WebsiteBlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [thoughtPosts, setThoughtPosts] = useState<ThoughtPost[]>([]);
  const [isThoughtLoading, setIsThoughtLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadBlogs() {
      try {
        const response = await fetchWebsiteBlogs(1, 5);

        if (mounted) {
          setBlogs(response.data?.data || []);
        }
      } catch {
        if (mounted) {
          setBlogs([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    loadBlogs();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadThoughtLeadership() {
      try {
        const response = await fetchWebsitePageBySlug('thought-leadership');
        const testimonials = getPageTestimonials(response.data);
        const items = mapTestimonialsToThoughtPosts(testimonials);

        if (mounted) {
          setThoughtPosts(items);
        }
      } catch {
        if (mounted) {
          setThoughtPosts([]);
        }
      } finally {
        if (mounted) {
          setIsThoughtLoading(false);
        }
      }
    }

    loadThoughtLeadership();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="editorial-hero-grid">
        <div className="editorial-hero-grid__grid">
          <div className="editorial-hero-grid__skeleton-image" />
          <div className="editorial-hero-grid__skeleton-column">
            <div className="editorial-hero-grid__skeleton-heading" />
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="editorial-hero-grid__trending-item">
                <div className="editorial-hero-grid__skeleton-thumb" />
                <div>
                  <div className="editorial-hero-grid__skeleton-line" />
                  <div className="editorial-hero-grid__skeleton-line" />
                </div>
              </div>
            ))}
          </div>
          <div className="editorial-hero-grid__skeleton-panel" />
        </div>
      </section>
    );
  }

  if (!blogs.length) {
    return (
      <div className="editorial-hero-grid__empty">
        <p>No featured stories found.</p>
      </div>
    );
  }
  const featured = blogs[0]!;
  const latestBlogs = blogs.slice(1, 4);
  return (
    <section className="editorial-hero-grid">
      <div className="editorial-hero-grid__grid">
        {/* Featured Article */}
        <article className="editorial-hero-grid__featured-card">
          <div className="editorial-hero-grid__featured-media">
            <Image
              src={getBlogImage(featured)}
              alt={featured.title || 'Featured blog'}
              fill
              priority
              unoptimized
              sizes="(max-width:768px) 100vw, 50vw"
              className="editorial-hero-grid__featured-image"
              onError={(event) => {
                const target = event.currentTarget as HTMLImageElement;
                if (target) target.src = FALLBACK_EDITORIAL_IMAGE;
              }}
            />

            <div className="editorial-hero-grid__featured-overlay">
              <div>
                <div className="editorial-hero-grid__meta-row">
                  <span className="editorial-hero-grid__meta-item">
                    <Calendar size={13} />
                    {formatDate(featured.publishedAt)}
                  </span>
                </div>

                <h2 className="editorial-hero-grid__featured-title">
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>

                <p className="editorial-hero-grid__featured-excerpt">
                  {featured.excerpt || 'Read latest technology and leadership insights.'}
                </p>
              </div>

              <Link href={`/blog/${featured.slug}`} className="editorial-hero-grid__read-more">
                Read Full Story
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </article>

        {/* Latest Updates */}
        <div className="editorial-hero-grid__trending-column">
          <div className="editorial-hero-grid__trending-heading-wrap">
            <h3 className="editorial-hero-grid__trending-heading">Latest Updates</h3>
          </div>
          {latestBlogs.map((blog) => (
            <article key={blog.id} className="editorial-hero-grid__trending-item">
              <div className="editorial-hero-grid__trending-thumb">
                <Image
                  src={getBlogImage(blog)}
                  alt={blog.title || 'Blog image'}
                  fill
                  unoptimized
                  sizes="90px"
                  className="editorial-hero-grid__trending-image"
                  onError={(event) => {
                    const target = event.currentTarget as HTMLImageElement;
                    if (target) target.src = FALLBACK_EDITORIAL_IMAGE;
                  }}
                />
              </div>
              <div>
                <span className="editorial-hero-grid__trending-category">
                  {getBlogCategory(blog)}
                </span>
                <h4 className="editorial-hero-grid__trending-title">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h4>
                <span className="editorial-hero-grid__trending-date">
                  {formatDate(blog.publishedAt)}
                </span>
              </div>
            </article>
          ))}
        </div>
        {/* Sidebar */}
        <aside className="editorial-hero-grid__sidebar">
          <div className="editorial-hero-grid__thought-leadership">
            <h6 className="editorial-hero-grid__newsletter-title">Latest Thought Leadership</h6>
            {isThoughtLoading ? (
              <div className="editorial-hero-grid__loading-state">
                Loading latest thought leadership...
              </div>
            ) : thoughtPosts[0] ? (
              <article key={thoughtPosts[0].id} className="editorial-hero-grid__thought-item">
                <Link
                  href={`/thought-leadership/${thoughtPosts[0].slug}`}
                  className="editorial-hero-grid__thought-image-link"
                >
                  <Image
                    src={thoughtPosts[0].image}
                    alt={thoughtPosts[0].title}
                    width={120}
                    height={80}
                    className="editorial-hero-grid__thought-image"
                    unoptimized
                    onError={(event) => {
                      const target = event.currentTarget as HTMLImageElement;
                      if (target) target.src = FALLBACK_EDITORIAL_IMAGE;
                    }}
                  />
                </Link>
                <div className="editorial-hero-grid__thought-content">
                  <div className="editorial-hero-grid__thought-header">
                    <Link
                      href={`/thought-leadership/${thoughtPosts[0].slug}`}
                      className="editorial-hero-grid__thought-title"
                    >
                      {thoughtPosts[0].title}
                    </Link>
                  </div>
                  <p className="editorial-hero-grid__thought-excerpt">{thoughtPosts[0].excerpt}</p>
                  {thoughtPosts[0].excerpt.length > 100 ? (
                    <Link
                      href={`/thought-leadership/${thoughtPosts[0].slug}`}
                      className="editorial-hero-grid__thought-readmore"
                    >
                      Read More...
                    </Link>
                  ) : null}
                </div>
              </article>
            ) : null}
          </div>
          {/* <div className="editorial-hero-grid__channels">
            <h4 className="editorial-hero-grid__channels-label">Explore Channels</h4>
            <div className="editorial-hero-grid__channels-list">
              {[
                'CIO Voice',
                'Thought Leadership',
                'Business Insights',
                'Technology Solutions',
                'Leadership Lessons',
              ].map((item) => (
                <Link key={item} href="#" className="editorial-hero-grid__channel-link">
                  {item}
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div> */}

          <div className="editorial-hero-grid__channels">
            <h4 className="editorial-hero-grid__channels-label">Explore Channels</h4>

            <div className="editorial-hero-grid__channels-list">
              {channels.map((channel) => (
                <Link
                  key={channel.label}
                  href={channel.href}
                  className="editorial-hero-grid__channel-link"
                >
                  {channel.label}
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
