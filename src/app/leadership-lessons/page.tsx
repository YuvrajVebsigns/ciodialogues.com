// // 'use client';

// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { ArrowLeft, Calendar, User } from 'lucide-react';
// // import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation';
// // import {
// //   fetchWebsitePageBySlug,
// //   getPageTestimonials,
// //   type PageTestimonial,
// // } from '@/services/pages.service';

// // type PostDetail = {
// //   title: string;
// //   author: string;
// //   date: string;
// //   image: string;
// //   content: string;
// // };

// // const fallbackImage = '/assets/blogs/blog-1.webp';

// // function generateSlug(text: string) {
// //   return text
// //     .toLowerCase()
// //     .trim()
// //     .replace(/[“”‘’]/g, '')
// //     .replace(/&/g, 'and')
// //     .replace(/[^\w\s-]/g, '')
// //     .replace(/\s+/g, '-')
// //     .replace(/-+/g, '-')
// //     .slice(0, 100);
// // }

// // function getRoleMeta(role = '') {
// //   const parts = role
// //     .split('|')
// //     .map((item) => item.trim())
// //     .filter(Boolean);

// //   return {
// //     author: parts[0] || 'CIO Dialogues Team',
// //     date: parts[1] || '',
// //   };
// // }

// // function getValidImage(value?: string) {
// //   if (!value) return fallbackImage;

// //   const image = value.trim();

// //   if (image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://')) {
// //     return image;
// //   }

// //   return fallbackImage;
// // }

// // function testimonialToPost(item: PageTestimonial): PostDetail {
// //   const meta = getRoleMeta(item.role);

// //   return {
// //     title: item.author || 'Leadership Lessons',
// //     author: meta.author,
// //     date: meta.date,
// //     image: getValidImage(item.avatar),
// //     content: item.quote || '',
// //   };
// // }

// // export default function LeadershipLessonsDetailPage() {
// //   const params = useParams<{ slug: string }>();
// //   const slug = params.slug;

// //   const [post, setPost] = useState<PostDetail | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     let isMounted = true;

// //     async function loadPost() {
// //       try {
// //         const response = await fetchWebsitePageBySlug('leadership-lessons');
// //         const testimonials = getPageTestimonials(response.data);

// //         const found = testimonials.find((item: PageTestimonial) => {
// //           return generateSlug(item.author || 'Leadership Lessons') === slug;
// //         });

// //         if (isMounted) {
// //           setPost(found ? testimonialToPost(found) : null);
// //         }
// //       } catch {
// //         if (isMounted) {
// //           setPost(null);
// //         }
// //       } finally {
// //         if (isMounted) {
// //           setIsLoading(false);
// //         }
// //       }
// //     }

// //     loadPost();

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, [slug]);

// //   if (isLoading) {
// //     return (
// //       <main className="cio-detail-page">
// //         <div className="cio-detail-container">
// //           <div className="cio-detail-loading">Loading post...</div>
// //         </div>
// //       </main>
// //     );
// //   }

// //   if (!post) {
// //     return (
// //       <main className="cio-detail-page">
// //         <div className="cio-detail-container">
// //           <Link href="/leadership-lessons" className="cio-detail-back">
// //             <ArrowLeft size={18} />
// //             Back to Leadership Lessons
// //           </Link>

// //           <div className="cio-detail-not-found">
// //             <h2>Post not found</h2>
// //             <p>The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
// //           </div>
// //         </div>
// //       </main>
// //     );
// //   }

// //   return (
// //     <main className="cio-detail-page">
// //       <div className="cio-detail-container">
// //         <Link href="/leadership-lessons" className="cio-detail-back">
// //           <ArrowLeft size={18} />
// //           Back to Leadership Lessons
// //         </Link>

// //         <article className="cio-detail-article">
// //           <div className="cio-detail-featured">
// //             <div className="cio-detail-featured-content">
// //               <span className="cio-detail-category">LEADERSHIP LESSONS</span>

// //               <h1>{post.title}</h1>

// //               <div className="cio-detail-meta">
// //                 <span>
// //                   <User size={15} />
// //                   {post.author}
// //                 </span>

// //                 {post.date ? (
// //                   <span>
// //                     <Calendar size={15} />
// //                     {post.date}
// //                   </span>
// //                 ) : null}
// //               </div>
// //             </div>

// //             <div className="cio-detail-featured-image">
// //               <Image
// //                 src={post.image}
// //                 alt={post.title}
// //                 width={480}
// //                 height={480}
// //                 unoptimized
// //                 priority
// //               />
// //             </div>
// //           </div>

// //           <div className="cio-detail-content">
// //             {post.content.split('\n\n').map((paragraph, index) => (
// //               <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>
// //             ))}
// //           </div>
// //         </article>
// //       </div>
// //     </main>
// //   );
// // }

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

// type LeadershipPost = {
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
//     .replace(/[“”‘’']/g, '')
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

// function mapTestimonialsToPosts(testimonials: PageTestimonial[]): LeadershipPost[] {
//   return testimonials
//     .filter((item) => item.author || item.quote || item.avatar)
//     .map((item, index) => {
//       const meta = getRoleMeta(item.role || '');
//       const title = item.author || 'Leadership Lessons';

//       return {
//         id: `${title}-${index}`,
//         title,
//         author: meta.author,
//         date: meta.date,
//         image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
//         excerpt: cleanText(item.quote || 'Read the latest leadership lesson.'),
//         content: item.quote || 'Read the latest leadership lesson.',
//         slug: generateSlug(title),
//       };
//     });
// }

// export default function LeadershipLessonsPage() {
//   const [posts, setPosts] = useState<LeadershipPost[]>([]);
//   const [search, setSearch] = useState('');
//   const [activeSection, setActiveSection] = useState('LEADERSHIP LESSONS');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPage() {
//       try {
//         const response = await fetchWebsitePageBySlug('leadership-lessons');
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
//             Learn, Lead & <span>Transform with Impact.</span>
//           </h1>

//           <p>
//             Explore leadership lessons, executive experiences, and practical insights from industry
//             leaders shaping enterprise growth and transformation.
//           </p>
//         </div>

//         <div className="cio-hero-stat">
//           <Newspaper size={28} />
//           <strong>{posts.length}+</strong>
//           <span>Featured Lessons</span>
//         </div>
//       </section>

//       <div className="cio-interactive-container">
//         <div className="cio-interactive-content">
//           {isLoading ? (
//             <div className="cio-empty-state">
//               <h3>Loading posts...</h3>
//               <p>Fetching latest Leadership Lessons.</p>
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
//                 <Link
//                   href={`/leadership-lessons/${post.slug}`}
//                   className="cio-interactive-post-image"
//                 >
//                   <Image src={post.image} alt={post.title} width={300} height={300} unoptimized />

//                   <span className="cio-image-hover">Read Story</span>
//                 </Link>

//                 <div className="cio-interactive-post-content">
//                   <span className="cio-interactive-category">LEADERSHIP LESSONS</span>

//                   <h2>{post.title}</h2>

//                   <div className="cio-interactive-meta">
//                     {post.author}
//                     {post.date ? ` | ${post.date}` : ''}
//                   </div>

//                   <p>{post.excerpt}</p>

//                   <Link
//                     href={`/leadership-lessons/${post.slug}`}
//                     className="cio-interactive-read-more"
//                   >
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

type LeadershipPost = {
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
  'CIO VOICE',
  'BUSINESS INSIGHTS',
  'TECHNOLOGY',
  'LEADERSHIP LESSONS',
  'EVENTS',
  'BESPOKE',
  'CIO TRANSITIONS',
  'LEADER TRANSITIONS',
  'PRESS RELEASE',
  'THOUGHT LEADERSHIP',
];

const leftColumnStories = [
  {
    category: 'EXECUTIVE LEADERSHIP',
    title: 'Modern leaders balance technology strategy with people, culture, and business outcomes',
    author: 'CIO DIALOGUES BUREAU',
  },
  {
    category: 'TRANSFORMATION',
    title: 'Leadership teams embrace continuous change as a core enterprise capability',
    author: 'EDITORIAL BUREAU',
  },
  {
    category: 'GROWTH',
    title: 'Industry leaders share practical lessons from complex transformation journeys',
    author: 'LEADERSHIP DESK',
  },
];

const popularStories = [
  {
    title: 'How technology leaders build resilient teams during periods of disruption',
    image: '/assets/blogs/blog-2.webp',
  },
  {
    title: 'Executive decision-making evolves for the intelligent enterprise',
    image: '/assets/blogs/blog-3.webp',
  },
  {
    title: 'Leadership culture becomes central to successful digital transformation',
    image: '/assets/blogs/blog-4.webp',
  },
  {
    title: 'CIOs strengthen collaboration between technology and business teams',
    image: '/assets/blogs/blog-5.webp',
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
    .replace(/[“”‘’']/g, '')
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

function mapTestimonialsToPosts(testimonials: PageTestimonial[]): LeadershipPost[] {
  return testimonials
    .filter((item) => item.author || item.quote || item.avatar)
    .map((item, index) => {
      const meta = getRoleMeta(item.role || '');
      const title = item.author || 'Leadership Lessons';

      return {
        id: `${title}-${index}`,
        title,
        author: meta.author,
        date: meta.date,
        image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
        excerpt: cleanText(item.quote || 'Read the latest leadership lesson.'),
        content: item.quote || 'Read the latest leadership lesson.',
        slug: generateSlug(title),
      };
    });
}

export default function LeadershipLessonsPage() {
  const [posts, setPosts] = useState<LeadershipPost[]>([]);
  const [search] = useState('');
  const [activeSection, setActiveSection] = useState('LEADERSHIP LESSONS');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        const response = await fetchWebsitePageBySlug('leadership-lessons');

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
          href="/leadership-lessons"
          className="news-editorial-brand"
        >
          <span>Leadership</span>
          <strong>Lessons</strong>
        </Link>

        <nav
          className="news-editorial-nav"
          aria-label="Leadership Lessons sections"
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
            placeholder="Search lessons"
            aria-label="Search leadership lessons"
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </header> */}

      {isLoading ? (
        <section className="news-editorial-status">
          <h2>Loading posts...</h2>
          <p>Fetching latest Leadership Lessons.</p>
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

            <Link
              href={`/leadership-lessons/${leadPost.slug}`}
              className="news-editorial-left-feature"
            >
              <div className="news-editorial-left-feature-image">
                <Image
                  src={leadPost.image}
                  alt={leadPost.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 260px"
                  unoptimized
                />
              </div>

              <span>Leadership Lessons</span>
              <h3>{leadPost.title}</h3>
            </Link>
          </aside>

          <section className="news-editorial-main">
            <article className="news-editorial-lead">
              <Link href={`/leadership-lessons/${leadPost.slug}`}>
                <h1>{leadPost.title}</h1>
              </Link>

              <div className="news-editorial-lead-meta">
                <span>Leadership Lessons</span>

                <small>
                  {leadPost.author}
                  {leadPost.date ? ` · ${leadPost.date}` : ''}
                </small>
              </div>

              <Link
                href={`/leadership-lessons/${leadPost.slug}`}
                className="news-editorial-lead-image"
              >
                <Image
                  src={leadPost.image}
                  alt={leadPost.title}
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 650px"
                  unoptimized
                />
              </Link>

              <p>{leadPost.excerpt}</p>
            </article>

            {secondaryPosts.length > 0 && (
              <div className="news-editorial-secondary-grid">
                {secondaryPosts.map((post) => (
                  <article key={post.id} className="news-editorial-secondary-story">
                    <span>Leadership Lessons</span>

                    <Link href={`/leadership-lessons/${post.slug}`}>
                      <h2>{post.title}</h2>
                    </Link>

                    <small>
                      {post.author}
                      {post.date ? ` · ${post.date}` : ''}
                    </small>

                    <Link
                      href={`/leadership-lessons/${post.slug}`}
                      className="news-editorial-secondary-image"
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 600px) 100vw, 330px"
                        unoptimized
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
                  <h2>Latest Lessons</h2>
                  <span />
                </div>

                <div className="news-editorial-latest-grid">
                  {latestPosts.map((post) => (
                    <article key={post.id} className="news-editorial-latest-card">
                      <Link
                        href={`/leadership-lessons/${post.slug}`}
                        className="news-editorial-latest-image"
                      >
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 600px) 100vw, 310px"
                          unoptimized
                        />
                      </Link>

                      <span>Leadership Lessons</span>

                      <Link href={`/leadership-lessons/${post.slug}`}>
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
                <small>Leadership Lessons</small>

                <h3>
                  Learn, lead
                  <br />
                  and transform.
                </h3>

                <p>
                  Explore executive experiences, practical insights, and leadership ideas from
                  industry leaders.
                </p>

                <Link href="/leadership-lessons">Explore lessons</Link>
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

            <section className="news-editorial-sidebar-links">
              <div className="news-editorial-section-heading">
                <span />
                <h2>Sections</h2>
                <span />
              </div>

              <ul>
                {sections.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className={activeSection === item ? 'active' : ''}
                      onClick={() => setActiveSection(item)}
                    >
                      {item}
                    </button>
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
