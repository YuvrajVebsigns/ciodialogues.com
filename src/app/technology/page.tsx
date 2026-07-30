// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight, Search, Newspaper } from 'lucide-react';
// import { useEffect, useMemo, useState } from 'react';
// import {
//   fetchWebsitePageBySlug,
//   getPageTestimonials,
//   type PageTestimonial,
// } from '@/services/pages.service';

// type TechnologyPost = {
//   id: string;
//   title: string;
//   author: string;
//   date: string;
//   image: string;
//   excerpt: string;
//   content?: string;
//   slug: string;
// };

// const fallbackImage = '/assets/blogs/blog-1.webp';

// const recentPosts = [
//   'Hilal Khan takes charge as CDIO at JSW Motors',
//   'Religare Broking onboards Devinder Singh',
//   'Executive Circle with ServiceNow Leadership',
//   'Suraj Sud steps into CTO role',
//   'DTDC Express elevates Rishi Sareen',
// ];

// const sections = [
//   'CIO VOICE',
//   'BUSINESS INSIGHTS',
//   'TECHNOLOGY',
//   'LEADERSHIP LESSONS',
//   'EVENTS',
//   'BESPOKE',
//   'CIO TRANSITIONS',
//   'LEADER TRANSITIONS',
//   'PRESS RELEASE',
//   'THOUGHT LEADERSHIP',
// ];

// function cleanText(text: string, limit = 230) {
//   const value = text.replace(/\s+/g, ' ').trim();
//   return value.length > limit ? `${value.slice(0, limit)}...` : value;
// }

// function generateSlug(text: string) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[“”‘’]/g, '')
//     .replace(/&/g, 'and')
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-')
//     .slice(0, 100);
// }

// function getRoleMeta(role = '') {
//   const parts = role
//     .split('|')
//     .map((item) => item.trim())
//     .filter(Boolean);

//   return {
//     author: parts[0] || 'CIO Dialogues Team',
//     date: parts[1] || '',
//   };
// }

// function isValidImageUrl(value?: string) {
//   if (!value) return false;

//   const image = value.trim();
//   return image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://');
// }

// function mapTestimonialsToPosts(testimonials: PageTestimonial[]): TechnologyPost[] {
//   return testimonials
//     .filter((item) => item.author || item.quote || item.avatar)
//     .map((item, index) => {
//       const meta = getRoleMeta(item.role || '');
//       const title = item.author || 'Technology';

//       return {
//         id: `${title}-${index}`,
//         title,
//         author: meta.author,
//         date: meta.date,
//         image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
//         excerpt: cleanText(item.quote || 'Read the latest technology insight.'),
//         content: item.quote || 'Read the latest technology insight.',
//         slug: generateSlug(title),
//       };
//     });
// }

// export default function TechnologyPage() {
//   const [posts, setPosts] = useState<TechnologyPost[]>([]);
//   const [search, setSearch] = useState('');
//   const [activeSection, setActiveSection] = useState('TECHNOLOGY');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPage() {
//       try {
//         const response = await fetchWebsitePageBySlug('technology');
//         const testimonials = getPageTestimonials(response.data);
//         const apiPosts = mapTestimonialsToPosts(testimonials);

//         if (isMounted) setPosts(apiPosts);
//       } catch {
//         if (isMounted) setPosts([]);
//       } finally {
//         if (isMounted) setIsLoading(false);
//       }
//     }

//     loadPage();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const filteredPosts = useMemo(() => {
//     const value = search.toLowerCase().trim();

//     if (!value) return posts;

//     return posts.filter(
//       (post) =>
//         post.title.toLowerCase().includes(value) ||
//         post.author.toLowerCase().includes(value) ||
//         post.excerpt.toLowerCase().includes(value),
//     );
//   }, [search, posts]);

//   return (
//     <main className="cio-interactive-page">
//       <br />
//       <br />
//       <br />

//       <div className="cio-bg-orb cio-bg-orb-one" />
//       <div className="cio-bg-orb cio-bg-orb-two" />

//       <section className="cio-hero">
//         <div>
//           {/* <span className="cio-hero-badge">
//             <Sparkles size={16} />
//             Technology
//           </span> */}

//           <h1>
//             Trends, Innovation & <span>Digital Advancement.</span>
//           </h1>

//           <p>
//             Explore the latest technology trends, innovation strategies, and digital transformation
//             insights shaping modern enterprises.
//           </p>
//         </div>

//         <div className="cio-hero-stat">
//           <Newspaper size={28} />
//           <strong>{posts.length}+</strong>
//           <span>Featured Insights</span>
//         </div>
//       </section>

//       <div className="cio-interactive-container">
//         <div className="cio-interactive-content">
//           {isLoading ? (
//             <div className="cio-empty-state">
//               <h3>Loading posts...</h3>
//               <p>Fetching latest Technology insights.</p>
//             </div>
//           ) : filteredPosts.length === 0 ? (
//             <div className="cio-empty-state">
//               <h3>No posts found</h3>
//               <p>Try searching with a different keyword.</p>
//             </div>
//           ) : (
//             filteredPosts.map((post, index) => (
//               <article
//                 key={post.id}
//                 className="cio-interactive-post"
//                 style={{ animationDelay: `${index * 120}ms` }}
//               >
//                 <Link href={`/technology/${post.slug}`} className="cio-interactive-post-image">
//                   <Image src={post.image} alt={post.title} width={300} height={300} unoptimized />

//                   <span className="cio-image-hover">Read Story</span>
//                 </Link>

//                 <div className="cio-interactive-post-content">
//                   <span className="cio-interactive-category">TECHNOLOGY</span>

//                   <h2>{post.title}</h2>

//                   <div className="cio-interactive-meta">
//                     {post.author}
//                     {post.date ? ` | ${post.date}` : ''}
//                   </div>

//                   <p>{post.excerpt}</p>

//                   <Link href={`/technology/${post.slug}`} className="cio-interactive-read-more">
//                     Read More
//                     <ArrowUpRight size={15} />
//                   </Link>
//                 </div>
//               </article>
//             ))
//           )}

//           <br />
//           <br />
//           <br />
//         </div>

//         <aside className="cio-interactive-sidebar">
//           <div className="cio-interactive-search">
//             <Search size={16} />

//             <input
//               type="text"
//               placeholder="Search ..."
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//             />
//           </div>

//           <div className="cio-interactive-sidebar-box">
//             <h3>Recent Posts</h3>

//             <ul>
//               {recentPosts.map((item) => (
//                 <li key={item}>
//                   <Link href="#">{item}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="cio-interactive-sidebar-box">
//             <h3>Sections</h3>

//             <ul>
//               {sections.map((item) => (
//                 <li key={item}>
//                   <button
//                     type="button"
//                     className={activeSection === item ? 'active' : ''}
//                     onClick={() => setActiveSection(item)}
//                   >
//                     {item}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight, Search, Newspaper } from 'lucide-react';
// import { useEffect, useMemo, useState } from 'react';
// import {
//   fetchWebsitePageBySlug,
//   getPageTestimonials,
//   type PageTestimonial,
// } from '@/services/pages.service';

// type TechnologyPost = {
//   id: string;
//   title: string;
//   author: string;
//   date: string;
//   image: string;
//   excerpt: string;
//   content?: string;
//   slug: string;
// };

// const fallbackImage = '/assets/blogs/blog-1.webp';

// const recentPosts = [
//   'Hilal Khan takes charge as CDIO at JSW Motors',
//   'Religare Broking onboards Devinder Singh',
//   'Executive Circle with ServiceNow Leadership',
//   'Suraj Sud steps into CTO role',
//   'DTDC Express elevates Rishi Sareen',
// ];

// const sections = [
//   'CIO VOICE',
//   'BUSINESS INSIGHTS',
//   'TECHNOLOGY',
//   'LEADERSHIP LESSONS',
//   'EVENTS',
//   'BESPOKE',
//   'CIO TRANSITIONS',
//   'LEADER TRANSITIONS',
//   'PRESS RELEASE',
//   'THOUGHT LEADERSHIP',
// ];

// function cleanText(text: string, limit = 230) {
//   const value = text.replace(/\s+/g, ' ').trim();
//   return value.length > limit ? `${value.slice(0, limit)}...` : value;
// }

// function generateSlug(text: string) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[“”‘’]/g, '')
//     .replace(/&/g, 'and')
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-')
//     .slice(0, 100);
// }

// function getRoleMeta(role = '') {
//   const parts = role
//     .split('|')
//     .map((item) => item.trim())
//     .filter(Boolean);

//   return {
//     author: parts[0] || 'CIO Dialogues Team',
//     date: parts[1] || '',
//   };
// }

// function isValidImageUrl(value?: string) {
//   if (!value) return false;

//   const image = value.trim();

//   return image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://');
// }

// function mapTestimonialsToPosts(testimonials: PageTestimonial[]): TechnologyPost[] {
//   return testimonials
//     .filter((item) => item.author || item.quote || item.avatar)
//     .map((item, index) => {
//       const meta = getRoleMeta(item.role || '');
//       const title = item.author || 'Technology';

//       return {
//         id: `${title}-${index}`,
//         title,
//         author: meta.author,
//         date: meta.date,
//         image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
//         excerpt: cleanText(item.quote || 'Read the latest technology insight.'),
//         content: item.quote || 'Read the latest technology insight.',
//         slug: generateSlug(title),
//       };
//     });
// }

// export default function TechnologyPage() {
//   const [posts, setPosts] = useState<TechnologyPost[]>([]);
//   const [search, setSearch] = useState('');
//   const [activeSection, setActiveSection] = useState('TECHNOLOGY');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPage() {
//       try {
//         const response = await fetchWebsitePageBySlug('technology');
//         const testimonials = getPageTestimonials(response.data);
//         const apiPosts = mapTestimonialsToPosts(testimonials);

//         if (isMounted) {
//           setPosts(apiPosts);
//         }
//       } catch {
//         if (isMounted) {
//           setPosts([]);
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     loadPage();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const filteredPosts = useMemo(() => {
//     const value = search.toLowerCase().trim();

//     if (!value) return posts;

//     return posts.filter(
//       (post) =>
//         post.title.toLowerCase().includes(value) ||
//         post.author.toLowerCase().includes(value) ||
//         post.excerpt.toLowerCase().includes(value),
//     );
//   }, [search, posts]);

//   return (
//     <main className="cio-interactive-page">
//       <br />
//       <br />
//       <br />

//       <div className="cio-bg-orb cio-bg-orb-one" />
//       <div className="cio-bg-orb cio-bg-orb-two" />

//       <section className="cio-hero">
//         <div>
//           <h1>
//             Trends, Innovation & <span>Digital Advancement.</span>
//           </h1>

//           <p>
//             Explore the latest technology trends, innovation strategies, and digital transformation
//             insights shaping modern enterprises.
//           </p>
//         </div>

//         <div className="cio-hero-stat">
//           <Newspaper size={28} />
//           <strong>{posts.length}+</strong>
//           <span>Featured Insights</span>
//         </div>
//       </section>

//       <div className="cio-interactive-container">
//         <div className="cio-interactive-content">
//           {isLoading ? (
//             <div className="cio-empty-state">
//               <h3>Loading posts...</h3>
//               <p>Fetching latest Technology insights.</p>
//             </div>
//           ) : filteredPosts.length === 0 ? (
//             <div className="cio-empty-state">
//               <h3>No posts found</h3>
//               <p>Try searching with a different keyword.</p>
//             </div>
//           ) : (
//             filteredPosts.map((post, index) => (
//               <article
//                 key={post.id}
//                 className="cio-interactive-post"
//                 style={{ animationDelay: `${index * 120}ms` }}
//               >
//                 <Link href={`/technology/${post.slug}`} className="cio-interactive-post-image">
//                   <Image src={post.image} alt={post.title} width={300} height={300} unoptimized />

//                   <span className="cio-image-hover">Read Story</span>
//                 </Link>

//                 <div className="cio-interactive-post-content">
//                   <span className="cio-interactive-category">TECHNOLOGY</span>

//                   <h2>{post.title}</h2>

//                   <div className="cio-interactive-meta">
//                     {post.author}
//                     {post.date ? ` | ${post.date}` : ''}
//                   </div>

//                   <p>{post.excerpt}</p>

//                   <Link href={`/technology/${post.slug}`} className="cio-interactive-read-more">
//                     Read More
//                     <ArrowUpRight size={15} />
//                   </Link>
//                 </div>
//               </article>
//             ))
//           )}

//           <br />
//           <br />
//           <br />
//         </div>

//         <aside className="cio-interactive-sidebar">
//           <div className="cio-interactive-search">
//             <Search size={16} />

//             <input
//               type="text"
//               placeholder="Search ..."
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//             />
//           </div>

//           <div className="cio-interactive-sidebar-box">
//             <h3>Recent Posts</h3>

//             <ul>
//               {recentPosts.map((item) => (
//                 <li key={item}>
//                   <Link href="#">{item}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="cio-interactive-sidebar-box">
//             <h3>Sections</h3>

//             <ul>
//               {sections.map((item) => (
//                 <li key={item}>
//                   <button
//                     type="button"
//                     className={activeSection === item ? 'active' : ''}
//                     onClick={() => setActiveSection(item)}
//                   >
//                     {item}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }

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

type TechnologyPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
  slug: string;
};

const fallbackImage = '/assets/blogs/blog-1.webp';

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
    category: 'ARTIFICIAL INTELLIGENCE',
    title: 'Enterprise leaders move from AI experiments to scaled business adoption',
    author: 'CIO DIALOGUES BUREAU',
  },
  {
    category: 'CLOUD',
    title: 'Modern cloud platforms reshape infrastructure and application strategy',
    author: 'TECHNOLOGY DESK',
  },
  {
    category: 'CYBERSECURITY',
    title: 'Identity-first security becomes central to enterprise resilience',
    author: 'EDITORIAL BUREAU',
  },
];

const popularStories = [
  {
    title: 'Agentic AI moves closer to mainstream enterprise deployment',
    image: '/assets/blogs/blog-3.webp',
  },
  {
    title: 'Cloud modernisation becomes a boardroom technology priority',
    image: '/assets/blogs/blog-3.webp',
  },
  {
    title: 'Cybersecurity teams strengthen identity-first protection strategies',
    image: '/assets/blogs/blog-1.webp',
  },
  {
    title: 'Data platforms evolve to support real-time intelligence and automation',
    image: '/assets/blogs/blog-1.webp',
  },
];

function cleanText(text: string, limit = 230) {
  const value = text.replace(/\s+/g, ' ').trim();

  return value.length > limit ? `${value.slice(0, limit)}...` : value;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[“”‘’]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

function getRoleMeta(role = '') {
  const parts = role
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    author: parts[0] || 'CIO Dialogues Team',
    date: parts[1] || '',
  };
}

function isValidImageUrl(value?: string) {
  if (!value) return false;

  const image = value.trim();

  return image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://');
}

function mapTestimonialsToPosts(testimonials: PageTestimonial[]): TechnologyPost[] {
  return testimonials
    .filter((item) => item.author || item.quote || item.avatar)
    .map((item, index) => {
      const meta = getRoleMeta(item.role || '');
      const title = item.author || 'Technology';

      return {
        id: `${title}-${index}`,
        title,
        author: meta.author,
        date: meta.date,
        image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
        excerpt: cleanText(item.quote || 'Read the latest technology insight.'),
        content: item.quote || 'Read the latest technology insight.',
        slug: generateSlug(title),
      };
    });
}

export default function TechnologyPage() {
  const [posts, setPosts] = useState<TechnologyPost[]>([]);
  const [search] = useState('');
  const [activeSection] = useState('TECHNOLOGY');
  const [isLoading, setIsLoading] = useState(true);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const getImageSrc = (id: string, image: string) => {
    return imageErrors[id] ? fallbackImage : image;
  };

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        const response = await fetchWebsitePageBySlug('technology');
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
        <Link href="/technology" className="news-editorial-brand">
          <span>Technology</span>
          <strong>Insights</strong>
        </Link>

        <nav
          className="news-editorial-nav"
          aria-label="Technology sections"
        >
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
            placeholder="Search technology"
            aria-label="Search technology posts"
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </header> */}

      {isLoading ? (
        <section className="news-editorial-status">
          <h2>Loading posts...</h2>
          <p>Fetching latest Technology insights.</p>
        </section>
      ) : !leadPost ? (
        <section className="news-editorial-status">
          <h2>No posts found</h2>
          <p>Try searching with a different keyword.</p>
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

            <Link href={`/technology/${leadPost.slug}`} className="news-editorial-left-feature">
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

              <span>Technology</span>
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
              <Link href={`/technology/${leadPost.slug}`}>
                <h1>{leadPost.title}</h1>
              </Link>

              <div className="news-editorial-lead-meta">
                <span>Technology</span>

                <small>
                  {leadPost.author}
                  {leadPost.date ? ` · ${leadPost.date}` : ''}
                </small>
              </div>

              <Link href={`/technology/${leadPost.slug}`} className="news-editorial-lead-image">
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
                    <span>Technology</span>

                    <Link href={`/technology/${post.slug}`}>
                      <h2>{post.title}</h2>
                    </Link>

                    <small>
                      {post.author}
                      {post.date ? ` · ${post.date}` : ''}
                    </small>

                    <Link
                      href={`/technology/${post.slug}`}
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
                  <h2>Latest Technology</h2>
                  <span />
                </div>

                <div className="news-editorial-latest-grid">
                  {latestPosts.map((post) => (
                    <article key={post.id} className="news-editorial-latest-card">
                      <Link
                        href={`/technology/${post.slug}`}
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

                      <span>Technology</span>

                      <Link href={`/technology/${post.slug}`}>
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
                <small>Technology</small>

                <h3>
                  Innovation insights
                  <br />
                  for modern enterprises.
                </h3>

                <p>
                  Explore technology trends, digital transformation, artificial intelligence, cloud,
                  data, and security.
                </p>

                <Link href="/technology">Explore technology</Link>
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
