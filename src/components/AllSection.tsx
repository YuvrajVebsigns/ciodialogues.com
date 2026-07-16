'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  fetchWebsitePageBySlug,
  getPageTestimonials,
  type PageTestimonial,
} from '@/services/pages.service';

const FALLBACK_IMAGE = '/assets/blogs/blog-1.webp';

type EditorialPagePost = {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  slug: string;
};

/* =========================================================
   HELPERS
========================================================= */

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[“”‘’']/g, '')
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

function cleanText(value: string, limit = 170) {
  const text = value.replace(/\s+/g, ' ').trim();

  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
}

function getValidImage(value?: string) {
  if (!value) return FALLBACK_IMAGE;

  const image = value.trim();
  const normalizedImage = image.toLowerCase();

  if (!image || normalizedImage === 'null' || normalizedImage === 'undefined') {
    return FALLBACK_IMAGE;
  }

  if (image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return FALLBACK_IMAGE;
}

function getRoleMeta(role?: string) {
  const values = (role || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    author: values[0] || 'CIO Dialogues Team',
    date: values[1] || '',
  };
}

function mapTestimonialsToPagePosts(
  testimonials: PageTestimonial[],
  fallbackTitle: string,
  fallbackExcerpt: string,
): EditorialPagePost[] {
  return testimonials
    .filter((item) => item.author || item.quote || item.avatar)
    .map((item, index) => {
      const title = item.author || fallbackTitle;
      const meta = getRoleMeta(item.role);

      return {
        id: `${generateSlug(title)}-${index}`,
        title,
        author: meta.author,
        date: meta.date,
        image: getValidImage(item.avatar),
        excerpt: cleanText(item.quote || fallbackExcerpt),
        slug: generateSlug(title),
      };
    });
}

/* =========================================================
   SECTION HEADING
========================================================= */

function CategoryHeading({ title, href }: { title: string; href: string }) {
  return (
    <div className="home-editorial__section-heading">
      <Link href={href}>{title}</Link>
    </div>
  );
}

/* =========================================================
   LARGE CARD
========================================================= */

function LargePageCard({ post, basePath }: { post: EditorialPagePost; basePath: string }) {
  return (
    <article className="home-editorial__large-card">
      <Link href={`/${basePath}/${post.slug}`} className="home-editorial__large-image-link">
        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 34vw"
          className="home-editorial__large-image"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </Link>

      <div className="home-editorial__large-content">
        <h3>
          <Link href={`/${basePath}/${post.slug}`}>{post.title}</Link>
        </h3>

        <div className="home-editorial__meta">
          <span>{post.author}</span>

          {post.date ? <span>{post.date}</span> : null}
        </div>

        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}

/* =========================================================
   HORIZONTAL CARD
========================================================= */

function HorizontalPageCard({ post, basePath }: { post: EditorialPagePost; basePath: string }) {
  return (
    <article className="home-editorial__horizontal-card">
      <Link href={`/${basePath}/${post.slug}`} className="home-editorial__horizontal-image-link">
        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 560px) 100vw, 220px"
          className="home-editorial__horizontal-image"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </Link>

      <div className="home-editorial__horizontal-content">
        <h3>
          <Link href={`/${basePath}/${post.slug}`}>{post.title}</Link>
        </h3>

        <div className="home-editorial__meta">
          <span>{post.author}</span>

          {post.date ? <span>{post.date}</span> : null}
        </div>

        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}

/* =========================================================
   SIDEBAR CARD
========================================================= */

function EditorialPageCard({ post, basePath }: { post: EditorialPagePost; basePath: string }) {
  return (
    <article className="home-editorial__sidebar-card">
      <Link href={`/${basePath}/${post.slug}`} className="home-editorial__sidebar-image-link">
        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 992px) 50vw, 320px"
          className="home-editorial__sidebar-image"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div className="home-editorial__sidebar-overlay">
          <h3>{post.title}</h3>
        </div>
      </Link>

      <div className="home-editorial__sidebar-date">
        {post.author}
        {post.date ? ` | ${post.date}` : ''}
      </div>

      {post.excerpt ? <p className="home-editorial__thought-excerpt">{post.excerpt}</p> : null}
    </article>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyCategoryMessage({
  message = 'No articles are currently available in this category.',
}: {
  message?: string;
}) {
  return <div className="home-editorial__category-empty">{message}</div>;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function EditorialCategoryNavbar() {
  const [cioVoicePosts, setCioVoicePosts] = useState<EditorialPagePost[]>([]);

  const [leadershipPosts, setLeadershipPosts] = useState<EditorialPagePost[]>([]);

  const [technologyPosts, setTechnologyPosts] = useState<EditorialPagePost[]>([]);

  const [thoughtPosts, setThoughtPosts] = useState<EditorialPagePost[]>([]);

  const [businessPosts, setBusinessPosts] = useState<EditorialPagePost[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadHomepageSections() {
      try {
        const [
          cioVoiceResponse,
          leadershipResponse,
          technologyResponse,
          thoughtResponse,
          businessResponse,
        ] = await Promise.all([
          fetchWebsitePageBySlug('cio-voice'),
          fetchWebsitePageBySlug('leadership-lessons'),
          fetchWebsitePageBySlug('technology'),
          fetchWebsitePageBySlug('thought-leadership'),
          fetchWebsitePageBySlug('business-insights'),
        ]);

        const cioVoiceTestimonials = getPageTestimonials(cioVoiceResponse.data);

        const leadershipTestimonials = getPageTestimonials(leadershipResponse.data);

        const technologyTestimonials = getPageTestimonials(technologyResponse.data);

        const thoughtTestimonials = getPageTestimonials(thoughtResponse.data);

        const businessTestimonials = getPageTestimonials(businessResponse.data);

        const mappedCioVoicePosts = mapTestimonialsToPagePosts(
          cioVoiceTestimonials,
          'CIO Voice',
          'Read the latest insight from CIO Dialogues.',
        );

        const mappedLeadershipPosts = mapTestimonialsToPagePosts(
          leadershipTestimonials,
          'Leadership Lessons',
          'Read the latest leadership lesson.',
        );

        const mappedTechnologyPosts = mapTestimonialsToPagePosts(
          technologyTestimonials,
          'Technology',
          'Read the latest technology insight.',
        );

        const mappedThoughtPosts = mapTestimonialsToPagePosts(
          thoughtTestimonials,
          'Thought Leadership',
          'Read the latest thought leadership insight.',
        );

        const mappedBusinessPosts = mapTestimonialsToPagePosts(
          businessTestimonials,
          'Business Insights',
          'Read the latest business insight.',
        );

        if (mounted) {
          setCioVoicePosts(mappedCioVoicePosts.slice(0, 2));
          setLeadershipPosts(mappedLeadershipPosts.slice(0, 2));
          setTechnologyPosts(mappedTechnologyPosts.slice(0, 2));
          setThoughtPosts(mappedThoughtPosts.slice(0, 2));
          setBusinessPosts(mappedBusinessPosts.slice(0, 2));
        }
      } catch {
        if (mounted) {
          setCioVoicePosts([]);
          setLeadershipPosts([]);
          setTechnologyPosts([]);
          setThoughtPosts([]);
          setBusinessPosts([]);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadHomepageSections();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="home-editorial">
      <div className="home-editorial__container">
        {isLoading ? (
          <div className="home-editorial__loading">
            <div className="home-editorial__loading-bar" />

            <div className="home-editorial__loading-grid">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="home-editorial__loading-card" />
              ))}
            </div>
          </div>
        ) : (
          <div className="home-editorial__layout">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="home-editorial__main">
              {/* CIO VOICE */}

              <section className="home-editorial__category-section">
                <CategoryHeading title="CIO Voice" href="/cio-voice" />

                {cioVoicePosts.length > 0 ? (
                  <div className="home-editorial__cio-grid">
                    {cioVoicePosts.map((post) => (
                      <LargePageCard key={post.id} post={post} basePath="cio-voice" />
                    ))}
                  </div>
                ) : (
                  <EmptyCategoryMessage message="No CIO Voice articles are currently available." />
                )}
              </section>

              {/* LEADERSHIP LESSONS */}

              <section className="home-editorial__category-section">
                <CategoryHeading title="Leadership Lessons" href="/leadership-lessons" />

                {leadershipPosts.length > 0 ? (
                  <div className="home-editorial__horizontal-list">
                    {leadershipPosts.map((post) => (
                      <HorizontalPageCard key={post.id} post={post} basePath="leadership-lessons" />
                    ))}
                  </div>
                ) : (
                  <EmptyCategoryMessage message="No Leadership Lessons are currently available." />
                )}
              </section>

              {/* TECHNOLOGY */}

              <section className="home-editorial__category-section">
                <CategoryHeading title="Technology" href="/technology" />

                {technologyPosts.length > 0 ? (
                  <div className="home-editorial__horizontal-list home-editorial__technology-list">
                    {technologyPosts.map((post) => (
                      <HorizontalPageCard key={post.id} post={post} basePath="technology" />
                    ))}
                  </div>
                ) : (
                  <EmptyCategoryMessage message="No Technology insights are currently available." />
                )}
              </section>
            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="home-editorial__sidebar">
              {/* THOUGHT LEADERSHIP */}

              <section className="home-editorial__sidebar-section">
                <CategoryHeading title="Thought Leadership" href="/thought-leadership" />

                {thoughtPosts.length > 0 ? (
                  <div className="home-editorial__sidebar-list">
                    {thoughtPosts.map((post) => (
                      <EditorialPageCard key={post.id} post={post} basePath="thought-leadership" />
                    ))}
                  </div>
                ) : (
                  <EmptyCategoryMessage message="No Thought Leadership posts are currently available." />
                )}
              </section>

              {/* BUSINESS INSIGHTS */}

              <section className="home-editorial__sidebar-section">
                <CategoryHeading title="Business Insights" href="/business-insights" />

                {businessPosts.length > 0 ? (
                  <div className="home-editorial__sidebar-list">
                    {businessPosts.map((post) => (
                      <EditorialPageCard key={post.id} post={post} basePath="business-insights" />
                    ))}
                  </div>
                ) : (
                  <EmptyCategoryMessage message="No Business Insights are currently available." />
                )}
              </section>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
