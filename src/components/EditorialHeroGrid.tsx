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
  { label: 'CIO Voice', href: '/cio-voice' },
  { label: 'Thought Leadership', href: '/thought-leadership' },
  { label: 'Business Insights', href: '/business-insights' },
  { label: 'Technology Solutions', href: '/category/technology-solutions' },
  { label: 'Leadership Lessons', href: '/leadership-lessons' },
];

const FALLBACK_EDITORIAL_IMAGE = '/assets/blogs/blog-1.webp';
const MAX_THOUGHT_ITEMS = 1;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.core-mediagroup.com';

const BACKEND_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return '';
  }
})();

type ThoughtPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
  image: string;
};

type PressReleasePost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

/* =========================================
   IMAGE URL HANDLING
========================================= */

function extractImageUrl(value: unknown): string {
  if (!value) return '';

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') {
      return '';
    }

    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }

    if (trimmed.startsWith('//')) {
      return `https:${trimmed}`;
    }

    if (trimmed.startsWith('/')) {
      return BACKEND_ORIGIN ? `${BACKEND_ORIGIN}${trimmed}` : trimmed;
    }

    return BACKEND_ORIGIN ? `${BACKEND_ORIGIN}/${trimmed.replace(/^\/+/, '')}` : `/${trimmed}`;
  }

  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;

    const fields = [
      'url',
      'src',
      'path',
      'imageUrl',
      'secure_url',
      'original',
      'large',
      'medium',
      'thumbnail',
    ];

    for (const field of fields) {
      const nestedValue = record[field];

      if (nestedValue) {
        const result = extractImageUrl(nestedValue);

        if (result) return result;
      }
    }

    if (record.urlVariants) {
      const result = extractImageUrl(record.urlVariants);

      if (result) return result;
    }
  }

  return '';
}

function getValidImage(value: unknown): string {
  return extractImageUrl(value) || FALLBACK_EDITORIAL_IMAGE;
}

function getBlogImage(blog: WebsiteBlogItem): string {
  const candidates: unknown[] = [blog.featureImage, blog.seo?.ogImage];

  for (const candidate of candidates) {
    const imageUrl = extractImageUrl(candidate);

    if (imageUrl) return imageUrl;
  }

  return FALLBACK_EDITORIAL_IMAGE;
}

/* =========================================
   IMAGE ERROR HANDLING
========================================= */

function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;

  if (image.src.includes(FALLBACK_EDITORIAL_IMAGE)) {
    return;
  }

  image.src = FALLBACK_EDITORIAL_IMAGE;
}

/* =========================================
   TEXT HELPERS
========================================= */

function cleanThoughtText(text: string, limit = 120) {
  const normalized = text.replace(/\s+/g, ' ').trim();

  return normalized.length > limit ? `${normalized.slice(0, limit)}...` : normalized;
}

function formatDate(date?: string) {
  if (!date) return 'Recent';

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return 'Recent';
  }

  return value.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getBlogCategory(blog: WebsiteBlogItem) {
  return blog.websites?.[0]?.name || blog.tags?.[0] || 'Insight';
}

/* =========================================
   THOUGHT LEADERSHIP MAPPING
========================================= */

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
          .replace(/[“”‘’']/g, '')
          .replace(/&/g, 'and')
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 100),
        image: getValidImage(item.avatar),
      };
    });
}

function mapTestimonialsToPressReleasePosts(testimonials: PageTestimonial[]): PressReleasePost[] {
  return testimonials
    .filter((item) => item.author || item.quote || item.avatar)
    .slice(0, 1)
    .map((item, index) => {
      const title = item.author || 'Press Release';

      return {
        id: `${title}-${index}`,
        title,
        date: item.role?.split('|')[1]?.trim() || '',
        excerpt: cleanThoughtText(item.quote || 'Read the latest press release.', 140),
        slug: title
          .toLowerCase()
          .trim()
          .replace(/[“”‘’']/g, '')
          .replace(/&/g, 'and')
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 100),
      };
    });
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function EditorialHeroGrid() {
  const [blogs, setBlogs] = useState<WebsiteBlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [thoughtPosts, setThoughtPosts] = useState<ThoughtPost[]>([]);
  const [isThoughtLoading, setIsThoughtLoading] = useState(true);

  const [pressReleases, setPressReleases] = useState<PressReleasePost[]>([]);
  const [isPressReleasesLoading, setIsPressReleasesLoading] = useState(true);
  const [pressReleasesError, setPressReleasesError] = useState(false);

  /* =====================================
     LOAD BLOGS
  ===================================== */

  useEffect(() => {
    let mounted = true;

    async function loadBlogs() {
      try {
        const response = await fetchWebsiteBlogs(1, 5);
        const blogData = response.data?.data || [];

        if (mounted) {
          setBlogs(blogData);
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

    async function loadPressReleases() {
      try {
        const response = await fetchWebsitePageBySlug('press-release');
        const posts = mapTestimonialsToPressReleasePosts(getPageTestimonials(response.data));

        if (mounted) {
          setPressReleases(posts);
        }
      } catch {
        if (mounted) {
          setPressReleasesError(true);
        }
      } finally {
        if (mounted) {
          setIsPressReleasesLoading(false);
        }
      }
    }

    loadPressReleases();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================
     LOAD LEADERSPEAK
  ===================================== */

  useEffect(() => {
    let mounted = true;

    async function loadLeaderSpeak() {
      try {
        const response = await fetchWebsitePageBySlug('leaderspeak');

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

    loadLeaderSpeak();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================
     LOADING SKELETON
  ===================================== */

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

  /* =====================================
     EMPTY STATE
  ===================================== */

  if (!blogs.length) {
    return (
      <div className="editorial-hero-grid__empty">
        <p>No featured stories found.</p>
      </div>
    );
  }

  const featured = blogs[0]!;
  const latestBlogs = blogs.slice(1, 4);

  /* =====================================
     MAIN CONTENT
  ===================================== */

  return (
    <section className="editorial-hero-grid">
      <div className="editorial-hero-grid__grid">
        <div className="editorial-hero-grid__featured-column">
          {/* FEATURED ARTICLE */}

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
                onError={handleImageError}
              />

              <div className="editorial-hero-grid__featured-overlay">
                <div>
                  <div className="editorial-hero-grid__meta-row">
                    <span className="editorial-hero-grid__meta-item">
                      <Calendar size={13} />
                      {formatDate(featured.publishedAt)}
                    </span>
                  </div>

                  <div className="editorial-hero-grid__featured-title-row">
                    <h2 className="editorial-hero-grid__featured-title">
                      <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                    </h2>

                    <Link
                      href={`/blog/${featured.slug}`}
                      className="editorial-hero-grid__read-more"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <p className="editorial-hero-grid__featured-excerpt">{featured.excerpt || ''}</p>
                </div>
              </div>
            </div>
          </article>

          {/* PRESS RELEASES */}

          <section className="editorial-hero-grid__press-releases" aria-label="Press releases">
            <div className="editorial-hero-grid__press-releases-heading">
              <h3>Latest Press Release</h3>
              <Link href="/press-release">
                View all
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {isPressReleasesLoading ? (
              <p className="editorial-hero-grid__press-releases-message">
                Loading press releases...
              </p>
            ) : pressReleasesError ? (
              <p className="editorial-hero-grid__press-releases-message">
                Press releases are temporarily unavailable.
              </p>
            ) : pressReleases.length ? (
              <div className="editorial-hero-grid__press-releases-list">
                {pressReleases.map((post) => (
                  <article key={post.id} className="editorial-hero-grid__press-release">
                    {post.date ? (
                      <span className="editorial-hero-grid__press-release-date">{post.date}</span>
                    ) : null}
                    <h4>
                      <Link href={`/press-release/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p>{post.excerpt}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="editorial-hero-grid__press-releases-message">
                No press releases are available right now.
              </p>
            )}
          </section>
        </div>

        {/* LATEST UPDATES */}

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
                  onError={handleImageError}
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

        {/* SIDEBAR */}

        <aside className="editorial-hero-grid__sidebar">
          {/* LEADERSPEAK */}

          <div className="editorial-hero-grid__thought-leadership">
            <h6 className="editorial-hero-grid__newsletter-title">Latest LeaderSpeak</h6>

            {isThoughtLoading ? (
              <div className="editorial-hero-grid__loading-state">
                Loading latest thought leadership...
              </div>
            ) : thoughtPosts[0] ? (
              <article key={thoughtPosts[0].id} className="editorial-hero-grid__thought-item">
                <Link
                  href={`/leaderspeak/${thoughtPosts[0].slug}`}
                  className="editorial-hero-grid__thought-image-link"
                >
                  <Image
                    src={thoughtPosts[0].image}
                    alt={thoughtPosts[0].title}
                    width={120}
                    height={80}
                    className="editorial-hero-grid__thought-image"
                    unoptimized
                    onError={handleImageError}
                  />
                </Link>

                <div className="editorial-hero-grid__thought-content">
                  <div className="editorial-hero-grid__thought-header">
                    <Link
                      href={`/leaderspeak/${thoughtPosts[0].slug}`}
                      className="editorial-hero-grid__thought-title"
                    >
                      {thoughtPosts[0].title}
                    </Link>
                  </div>

                  <p className="editorial-hero-grid__thought-excerpt">{thoughtPosts[0].excerpt}</p>

                  {thoughtPosts[0].excerpt.length > 100 ? (
                    <Link
                      href={`/leaderspeak/${thoughtPosts[0].slug}`}
                      className="editorial-hero-grid__thought-readmore"
                    >
                      Read More...
                    </Link>
                  ) : null}
                </div>
              </article>
            ) : null}
          </div>

          {/* EXPLORE CHANNELS */}

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
