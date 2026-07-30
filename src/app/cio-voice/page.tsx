'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  fetchWebsitePageBySlug,
  getPageTestimonials,
  type PageTestimonial,
} from '@/services/pages.service';

type CIOPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
  slug: string;
  category: string;
};

const fallbackImage = '/assets/blogs/cio-voice.jpg';

const staticPosts: CIOPost[] = [];

const leftColumnStories = [
  {
    category: 'LEADERSHIP',
    title: 'Technology leadership is evolving beyond the traditional CIO mandate',
    author: 'CIO DIALOGUES BUREAU',
  },
  {
    category: 'INDIA',
    title: 'Enterprise technology investments accelerate across key industries',
    author: 'TECHNOLOGY DESK',
  },
  {
    category: 'APPOINTMENTS',
    title: 'New technology leaders take charge across major organisations',
    author: 'EDITORIAL BUREAU',
  },
];

const popularStories = [
  {
    title: 'CIOs increase investments in generative artificial intelligence',
    image: '/assets/blogs/blog-1.webp',
  },
  {
    title: 'Data governance framework becomes an enterprise priority',
    image: '/assets/blogs/blog-3.webp',
  },
  {
    title: 'Technology leaders rethink cloud cost optimisation strategies',
    image: '/assets/blogs/blog-1.webp',
  },
  {
    title: 'Security teams prepare for a rapidly changing threat landscape',
    image: '/assets/blogs/blog-3.webp',
  },
];

const sections = [
  { label: 'CIO VOICE', href: '/cio-voice' },
  { label: 'THOUGHT LEADERSHIP', href: '/thought-leadership' },
  { label: 'BUSINESS INSIGHTS', href: '/business-insights' },
  { label: 'TECHNOLOGY', href: '/technology' },
  { label: 'LEADERSHIP LESSONS', href: '/leadership-lessons' },
  { label: 'LEADER SPEAK', href: '/leaderspeak' },
  { label: 'EVENTS', href: '/events' },
  { label: 'BESPOKE', href: '/bespoke' },
  { label: 'PRESS RELEASE', href: '/press-release' },
  { label: 'CIO TRANSITIONS', href: '/cio-transitions' },
  { label: 'LEADER TRANSITIONS', href: '/leader-transitions' },
  { label: 'MAIN STORY', href: '/main-story' },
  { label: 'OUR BRAND', href: '/our-brand' },
];

function cleanText(text: string, limit = 230) {
  const value = text.replace(/\s+/g, ' ').trim();

  return value.length > limit ? `${value.slice(0, limit)}...` : value;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

function getRoleMeta(role: string) {
  const parts = role
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    author: parts[0] || 'CIO Dialogues Team',
    date: parts[1] || '',
    category: parts[2]?.toUpperCase() || 'CIO VOICE',
  };
}

function isValidImageUrl(value?: string) {
  if (!value) return false;

  const image = value.trim();

  return image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://');
}

function mapTestimonialsToPosts(testimonials: PageTestimonial[]): CIOPost[] {
  return testimonials
    .filter((item) => item.author || item.quote || item.avatar)
    .map((item, index) => {
      const meta = getRoleMeta(item.role || '');
      const title = item.author || 'CIO Voice';

      return {
        id: `${item.author || 'post'}-${index}`,
        title,
        author: meta.author,
        date: meta.date,
        image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
        excerpt: cleanText(item.quote || 'Read the latest insight from CIO Dialogues.'),
        content: item.quote || 'Read the latest insight from CIO Dialogues.',
        slug: generateSlug(title),
        category: meta.category,
      };
    });
}

export default function CIOVoicePage() {
  const [posts, setPosts] = useState<CIOPost[]>(staticPosts);
  const [search] = useState('');
  const [activeSection] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const getImageSrc = (id: string, image: string) => {
    return imageErrors[id] ? fallbackImage : image;
  };

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        const response = await fetchWebsitePageBySlug('cio-voice');
        const testimonials = getPageTestimonials(response.data);
        const apiPosts = mapTestimonialsToPosts(testimonials);

        if (isMounted && apiPosts.length > 0) {
          setPosts(apiPosts);
        }
      } catch {
        if (isMounted) {
          setPosts(staticPosts);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return posts.filter((post) => {
      const matchesSearch =
        !searchValue ||
        post.title.toLowerCase().includes(searchValue) ||
        post.author.toLowerCase().includes(searchValue) ||
        post.excerpt.toLowerCase().includes(searchValue);

      const matchesSection = activeSection === 'ALL' || post.category === activeSection;

      return matchesSearch && matchesSection;
    });
  }, [activeSection, posts, search]);

  const leadPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1, 3);
  const latestPosts = filteredPosts.slice(3);

  return (
    <main className="news-editorial-page">
      {isLoading ? (
        <section className="news-editorial-status">
          <h2>Loading stories...</h2>
          <p>Fetching the latest CIO Voice insights.</p>
        </section>
      ) : !leadPost ? (
        <section className="news-editorial-status">
          <h2>No stories found</h2>
          <p>Try selecting another section.</p>
        </section>
      ) : (
        <div className="news-editorial-layout">
          <aside className="news-editorial-left-rail">
            {leftColumnStories.map((story) => (
              <article key={story.title} className="news-editorial-rail-story">
                <span>{story.category}</span>
                <h3>{story.title}</h3>
                <small>{story.author}</small>
              </article>
            ))}

            <Link href={`/cio-voice/${leadPost.slug}`} className="news-editorial-left-feature">
              <div className="news-editorial-left-feature-image">
                {/* <Image
                  src={leadPost.image}
                  alt={leadPost.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 260px"
                  unoptimized
                /> */}
                <Image
                  src={getImageSrc(leadPost.id, leadPost.image)}
                  alt={leadPost.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 260px"
                  unoptimized
                  onError={() =>
                    setImageErrors((prev) => ({
                      ...prev,
                      [leadPost.id]: true,
                    }))
                  }
                />
              </div>

              <span>{leadPost.category}</span>
              <h3>{leadPost.title}</h3>
            </Link>
            <section className="news-editorial-sidebar-links">
              <div className="news-editorial-section-heading">
                <span />
                <h2>Sections</h2>
                <span />
              </div>

              <ul>
                {sections.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={activeSection === item.label ? 'active' : ''}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          <section className="news-editorial-main">
            <article className="news-editorial-lead">
              <Link href={`/cio-voice/${leadPost.slug}`}>
                <h1>{leadPost.title}</h1>
              </Link>

              <div className="news-editorial-lead-meta">
                <span>{leadPost.category}</span>

                <small>
                  {leadPost.author}
                  {leadPost.date ? ` · ${leadPost.date}` : ''}
                </small>
              </div>

              <Link href={`/cio-voice/${leadPost.slug}`} className="news-editorial-lead-image">
                {/* <Image
                  src={leadPost.image}
                  alt={leadPost.title}
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 650px"
                  unoptimized
                /> */}
                <Image
                  src={getImageSrc(leadPost.id, leadPost.image)}
                  alt={leadPost.title}
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 650px"
                  unoptimized
                  onError={() =>
                    setImageErrors((prev) => ({
                      ...prev,
                      [leadPost.id]: true,
                    }))
                  }
                />
              </Link>

              <p>{leadPost.excerpt}</p>
            </article>

            {secondaryPosts.length > 0 && (
              <div className="news-editorial-secondary-grid">
                {secondaryPosts.map((post) => (
                  <article key={post.id} className="news-editorial-secondary-story">
                    <span>{post.category}</span>

                    <Link href={`/cio-voice/${post.slug}`}>
                      <h2>{post.title}</h2>
                    </Link>

                    <small>
                      {post.author}
                      {post.date ? ` · ${post.date}` : ''}
                    </small>

                    <Link
                      href={`/cio-voice/${post.slug}`}
                      className="news-editorial-secondary-image"
                    >
                      {/* <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 600px) 100vw, 330px"
                        unoptimized
                      /> */}
                      <Image
                        src={getImageSrc(leadPost.id, leadPost.image)}
                        alt={leadPost.title}
                        fill
                        priority
                        sizes="(max-width: 800px) 100vw, 650px"
                        unoptimized
                        onError={() =>
                          setImageErrors((prev) => ({
                            ...prev,
                            [leadPost.id]: true,
                          }))
                        }
                      />
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {latestPosts.length > 0 && (
              <section className="news-editorial-latest">
                <div className="news-editorial-section-heading">
                  <span />
                  <h2>Latest Stories</h2>
                  <span />
                </div>

                <div className="news-editorial-latest-grid">
                  {latestPosts.map((post) => (
                    <article key={post.id} className="news-editorial-latest-card">
                      <Link
                        href={`/cio-voice/${post.slug}`}
                        className="news-editorial-latest-image"
                      >
                        <Image
                          src={getImageSrc(post.id, post.image)}
                          alt={post.title}
                          fill
                          sizes="(max-width: 600px) 100vw, 310px"
                          unoptimized
                          onError={() =>
                            setImageErrors((prev) => ({
                              ...prev,
                              [post.id]: true,
                            }))
                          }
                        />
                      </Link>

                      <span>{post.category}</span>

                      <Link href={`/cio-voice/${post.slug}`}>
                        <h3>{post.title}</h3>
                      </Link>

                      <p>{post.excerpt}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </section>

          <aside className="news-editorial-right-rail">
            <section className="news-editorial-ad">
              <span>Advertisement</span>

              <div className="news-editorial-ad-box">
                <small>CIO Dialogues</small>

                <h3>
                  Technology insights
                  <br />
                  for modern leaders.
                </h3>

                <p>
                  Explore enterprise innovation, artificial intelligence, cloud, security, and
                  leadership.
                </p>

                {/* <Link href="/cio-voice">Explore now</Link> */}
              </div>
            </section>

            <section className="news-editorial-popular">
              <span className="news-editorial-ad-label">Most Read</span>

              <div className="news-editorial-section-heading">
                <span />
                <h2>Most Popular</h2>
                <span />
              </div>

              <div className="news-editorial-popular-list">
                {popularStories.map((story, index) => (
                  <article key={story.title} className="news-editorial-popular-story">
                    <div className="news-editorial-popular-image">
                      <Image src={story.image} alt={story.title} fill sizes="72px" unoptimized />
                    </div>

                    <div>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <h3>{story.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}
