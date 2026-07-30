'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  fetchWebsitePageBySlug,
  getPageTestimonials,
  type PageTestimonial,
} from '@/services/pages.service';

type Post = {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  slug: string;
};

const fallbackImage = '/assets/blogs/image2.jpg';

const recentPosts = [
  'Hilal Khan takes charge as CDIO at JSW Motors',
  'Religare Broking onboards Devinder Singh',
  'Executive Circle with ServiceNow Leadership',
  'Suraj Sud steps into CTO role',
  'DTDC Express elevates Rishi Sareen',
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

const leftColumnStories = [
  {
    category: 'LEADERSHIP',
    title: 'Technology leadership is evolving beyond the traditional CIO mandate',
    author: 'CIO DIALOGUES BUREAU',
  },
  {
    category: 'STRATEGY',
    title: 'Enterprise leaders rethink innovation, culture, and business transformation',
    author: 'EDITORIAL BUREAU',
  },
  {
    category: 'INSIGHTS',
    title: 'Decision-makers share perspectives on navigating continuous disruption',
    author: 'TECHNOLOGY DESK',
  },
];

const popularStories = [
  {
    title: 'Building a leadership culture prepared for intelligent transformation',
    image: '/assets/blogs/blog-1.webp',
  },
  {
    title: 'Why strategic technology decisions now require board-level participation',
    image: '/assets/blogs/blog-3.webp',
  },
  {
    title: 'Enterprise leaders rethink cloud, data, and artificial intelligence priorities',
    image: '/assets/blogs/blog-3.webp',
  },
  {
    title: 'Digital leadership moves from transformation projects to continuous change',
    image: '/assets/blogs/blog-1.webp',
  },
];

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[“”‘’]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function cleanText(text: string, limit = 230) {
  const value = text.replace(/\s+/g, ' ').trim();

  return value.length > limit ? `${value.slice(0, limit)}...` : value;
}

function getRoleMeta(role: string) {
  const parts = role
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    author: parts[0] || 'CIO Dialogues Team',
    date: parts[1] || '',
  };
}

function getValidImage(value?: string) {
  if (!value) return fallbackImage;

  const image = value.trim();

  if (image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return fallbackImage;
}

function mapTestimonialsToPosts(testimonials: PageTestimonial[]): Post[] {
  return testimonials
    .filter((item) => item.author || item.quote || item.avatar)
    .map((item, index) => {
      const title = item.author || 'Thought Leadership';
      const meta = getRoleMeta(item.role || '');

      return {
        id: `${title}-${index}`,
        title,
        author: meta.author,
        date: meta.date,
        image: getValidImage(item.avatar),
        excerpt: cleanText(item.quote || 'Read the latest thought leadership insight.'),
        slug: generateSlug(title),
      };
    });
}

export default function ThoughtLeadershipPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search] = useState('');
  const [activeSection] = useState('THOUGHT LEADERSHIP');
  const [isLoading, setIsLoading] = useState(true);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const getImageSrc = (id: string, image: string) => {
    return imageErrors[id] ? fallbackImage : image;
  };

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        const response = await fetchWebsitePageBySlug('thought-leadership');
        const testimonials = getPageTestimonials(response.data);
        const apiPosts = mapTestimonialsToPosts(testimonials);

        if (isMounted) {
          setPosts(apiPosts);
        }
      } catch {
        if (isMounted) {
          setPosts([]);
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
    const value = search.toLowerCase().trim();

    if (!value) return posts;

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(value) ||
        post.author.toLowerCase().includes(value) ||
        post.excerpt.toLowerCase().includes(value),
    );
  }, [search, posts]);

  const leadPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1, 3);
  const latestPosts = filteredPosts.slice(3);

  return (
    <main className="news-editorial-page">
      {/* <header className="news-editorial-header">
        <Link
          href="/thought-leadership"
          className="news-editorial-brand"
        >
          <span>Thought</span>
          <strong>Leadership</strong>
        </Link>

        <nav
          className="news-editorial-nav"
          aria-label="Thought Leadership sections"
        >
          <button
            type="button"
            className={
              activeSection === 'THOUGHT LEADERSHIP' ? 'active' : ''
            }
            onClick={() => setActiveSection('THOUGHT LEADERSHIP')}
          >
            Thought Leadership
          </button>

          {sections.map((section) => (
            <button
              key={section}
              type="button"
              className={activeSection === section ? 'active' : ''}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </nav>

        <label className="news-editorial-search">
          <Search size={17} />

          <input
            type="search"
            value={search}
            placeholder="Search insights"
            aria-label="Search thought leadership insights"
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </header> */}

      {isLoading ? (
        <section className="news-editorial-status">
          <h2>Loading posts...</h2>
          <p>Fetching latest thought leadership insights.</p>
        </section>
      ) : !leadPost ? (
        <section className="news-editorial-status">
          <h2>No posts found</h2>
          <p>No thought leadership posts available.</p>
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

            <Link
              href={`/thought-leadership/${leadPost.slug}`}
              className="news-editorial-left-feature"
            >
              <div className="news-editorial-left-feature-image">
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

              <span>Thought Leadership</span>
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
              <Link href={`/thought-leadership/${leadPost.slug}`}>
                <h1>{leadPost.title}</h1>
              </Link>

              <div className="news-editorial-lead-meta">
                <span>Thought Leadership</span>

                <small>
                  {leadPost.author}
                  {leadPost.date ? ` · ${leadPost.date}` : ''}
                </small>
              </div>

              <Link
                href={`/thought-leadership/${leadPost.slug}`}
                className="news-editorial-lead-image"
              >
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
              </Link>

              <p>{leadPost.excerpt}</p>
            </article>

            {secondaryPosts.length > 0 && (
              <div className="news-editorial-secondary-grid">
                {secondaryPosts.map((post) => (
                  <article key={post.id} className="news-editorial-secondary-story">
                    <span>Thought Leadership</span>

                    <Link href={`/thought-leadership/${post.slug}`}>
                      <h2>{post.title}</h2>
                    </Link>

                    <small>
                      {post.author}
                      {post.date ? ` · ${post.date}` : ''}
                    </small>

                    <Link
                      href={`/thought-leadership/${post.slug}`}
                      className="news-editorial-secondary-image"
                    >
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
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {latestPosts.length > 0 && (
              <section className="news-editorial-latest">
                <div className="news-editorial-section-heading">
                  <span />
                  <h2>Latest Insights</h2>
                  <span />
                </div>

                <div className="news-editorial-latest-grid">
                  {latestPosts.map((post) => (
                    <article key={post.id} className="news-editorial-latest-card">
                      <Link
                        href={`/thought-leadership/${post.slug}`}
                        className="news-editorial-latest-image"
                      >
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
                      </Link>

                      <span>Thought Leadership</span>

                      <Link href={`/thought-leadership/${post.slug}`}>
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
              <span>Featured</span>

              <div className="news-editorial-ad-box">
                <small>Thought Leadership</small>

                <h3>
                  Expert ideas
                  <br />
                  for modern leaders.
                </h3>

                <p>
                  Explore strategic insights and leadership ideas from technology decision-makers.
                </p>

                <Link href="/thought-leadership">Explore insights</Link>
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

            <section className="news-editorial-sidebar-links">
              <div className="news-editorial-section-heading">
                <span />
                <h2>Recent Posts</h2>
                <span />
              </div>

              <ul>
                {recentPosts.map((item) => (
                  <li key={item}>
                    <Link href="#">{item}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}
