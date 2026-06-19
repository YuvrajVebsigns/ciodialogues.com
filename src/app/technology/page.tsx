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

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Search, Newspaper } from 'lucide-react';
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
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('TECHNOLOGY');
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <main className="cio-interactive-page">
      <br />
      <br />
      <br />

      <div className="cio-bg-orb cio-bg-orb-one" />
      <div className="cio-bg-orb cio-bg-orb-two" />

      <section className="cio-hero">
        <div>
          <h1>
            Trends, Innovation & <span>Digital Advancement.</span>
          </h1>

          <p>
            Explore the latest technology trends, innovation strategies, and digital transformation
            insights shaping modern enterprises.
          </p>
        </div>

        <div className="cio-hero-stat">
          <Newspaper size={28} />
          <strong>{posts.length}+</strong>
          <span>Featured Insights</span>
        </div>
      </section>

      <div className="cio-interactive-container">
        <div className="cio-interactive-content">
          {isLoading ? (
            <div className="cio-empty-state">
              <h3>Loading posts...</h3>
              <p>Fetching latest Technology insights.</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="cio-empty-state">
              <h3>No posts found</h3>
              <p>Try searching with a different keyword.</p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="cio-interactive-post"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <Link href={`/technology/${post.slug}`} className="cio-interactive-post-image">
                  <Image src={post.image} alt={post.title} width={300} height={300} unoptimized />

                  <span className="cio-image-hover">Read Story</span>
                </Link>

                <div className="cio-interactive-post-content">
                  <span className="cio-interactive-category">TECHNOLOGY</span>

                  <h2>{post.title}</h2>

                  <div className="cio-interactive-meta">
                    {post.author}
                    {post.date ? ` | ${post.date}` : ''}
                  </div>

                  <p>{post.excerpt}</p>

                  <Link href={`/technology/${post.slug}`} className="cio-interactive-read-more">
                    Read More
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))
          )}

          <br />
          <br />
          <br />
        </div>

        <aside className="cio-interactive-sidebar">
          <div className="cio-interactive-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="Search ..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="cio-interactive-sidebar-box">
            <h3>Recent Posts</h3>

            <ul>
              {recentPosts.map((item) => (
                <li key={item}>
                  <Link href="#">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="cio-interactive-sidebar-box">
            <h3>Sections</h3>

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
          </div>
        </aside>
      </div>
    </main>
  );
}
