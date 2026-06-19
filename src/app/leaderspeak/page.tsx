// // import React from 'react';

// // export const metadata = {
// //   title: 'LeaderSpeak | CORE Media',
// //   description: 'Direct conversations and candid discussions with technology and business leaders.',
// // };

// // export default function LeaderSpeakPage() {
// //   return (
// //     <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-16">
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-12">
// //           <h1 className="text-5xl font-bold text-gray-900 mb-4">LeaderSpeak</h1>
// //           <p className="text-xl text-gray-600">
// //             Direct conversations and candid discussions with technology and business leaders.
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {Array.from({ length: 9 }).map((_, i) => (
// //             <article
// //               key={i}
// //               className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
// //             >
// //               <div className="h-48 bg-gradient-to-br from-red-400 to-red-600" />
// //               <div className="p-6">
// //                 <h3 className="text-lg font-bold text-gray-900 mb-2">
// //                   Conversation {i + 1}
// //                 </h3>
// //                 <p className="text-gray-600 mb-4">
// //                   Candid insights and leadership perspectives shared directly.
// //                 </p>
// //                 <a href="#" className="text-red-600 hover:text-red-800 font-semibold">
// //                   Read More →
// //                 </a>
// //               </div>
// //             </article>
// //           ))}
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Search } from 'lucide-react';
// import { useEffect, useMemo, useState } from 'react';
// import {
//   fetchWebsitePageBySlug,
//   getPageTestimonials,
//   type PageTestimonial,
// } from '@/services/pages.service';

// type LeaderSpeakPost = {
//   id: string;
//   title: string;
//   author: string;
//   date: string;
//   image: string;
//   excerpt: string;
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

// function generateSlug(text: string) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[“”‘’]/g, '')
//     .replace(/&/g, 'and')
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-');
// }

// function cleanText(text: string, limit = 230) {
//   const value = text.replace(/\s+/g, ' ').trim();
//   return value.length > limit ? `${value.slice(0, limit)}...` : value;
// }

// function getRoleMeta(role = '') {
//   const parts = role.split('|').map((item) => item.trim()).filter(Boolean);

//   return {
//     author: parts[0] || 'CIO Dialogues Team',
//     date: parts[1] || '',
//   };
// }

// function getValidImage(value?: string) {
//   if (!value) return fallbackImage;

//   const image = value.trim();

//   if (image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://')) {
//     return image;
//   }

//   return fallbackImage;
// }

// function mapTestimonials(testimonials: PageTestimonial[]): LeaderSpeakPost[] {
//   return testimonials
//     .filter((item) => item.author || item.quote || item.avatar)
//     .map((item, index) => {
//       const meta = getRoleMeta(item.role);
//       const title = item.author || 'LeaderSpeak';

//       return {
//         id: `${title}-${index}`,
//         title,
//         author: meta.author,
//         date: meta.date,
//         image: getValidImage(item.avatar),
//         excerpt: cleanText(item.quote || 'Read the latest LeaderSpeak insight.'),
//         slug: generateSlug(title),
//       };
//     });
// }

// export default function LeaderSpeakPage() {
//   const [posts, setPosts] = useState<LeaderSpeakPost[]>([]);
//   const [search, setSearch] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPosts() {
//       try {
//         const response = await fetchWebsitePageBySlug('leaderspeak');
//         const testimonials = getPageTestimonials(response.data);
//         const apiPosts = mapTestimonials(testimonials);

//         if (isMounted) setPosts(apiPosts);
//       } catch {
//         if (isMounted) setPosts([]);
//       } finally {
//         if (isMounted) setIsLoading(false);
//       }
//     }

//     loadPosts();

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
//     <main className="business-fixed-page">
//       <div className="business-fixed-container">
//         <div className="business-fixed-content">
//           {isLoading ? (
//             <div className="business-empty">Loading LeaderSpeak posts...</div>
//           ) : filteredPosts.length === 0 ? (
//             <div className="business-empty">No LeaderSpeak posts available.</div>
//           ) : (
//             filteredPosts.map((post) => (
//               <article key={post.id} className="business-fixed-post">
//                 <Link href={`/leaderspeak/${post.slug}`} className="business-fixed-post-image">
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     width={300}
//                     height={300}
//                     unoptimized
//                   />
//                 </Link>

//                 <div className="business-fixed-post-content">
//                   <span className="business-fixed-category">LEADERSPEAK</span>

//                   <h2>{post.title}</h2>

//                   <div className="business-fixed-meta">
//                     {post.author}
//                     {post.date ? ` | ${post.date}` : ''}
//                   </div>

//                   <p>{post.excerpt}</p>

//                   <Link href={`/leaderspeak/${post.slug}`} className="business-fixed-read-more">
//                     Read More →
//                   </Link>
//                 </div>
//               </article>
//             ))
//           )}
//         </div>

//         <aside className="business-fixed-sidebar">
//           <div className="business-fixed-sidebar-search">
//             <Search size={16} />
//             <input
//               type="text"
//               placeholder="Search ..."
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//             />
//             <button type="button">Search</button>
//           </div>

//           <div className="business-fixed-sidebar-box">
//             <h3>Recent Posts</h3>
//             <ul>
//               {recentPosts.map((item) => (
//                 <li key={item}>{item}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="business-fixed-sidebar-box">
//             <h3>Sections</h3>
//             <ul>
//               {sections.map((item) => (
//                 <li key={item}>{item}</li>
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

type LeaderSpeakPost = {
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

function mapTestimonialsToPosts(testimonials: PageTestimonial[]): LeaderSpeakPost[] {
  return testimonials
    .filter((item) => item.author || item.quote || item.avatar)
    .map((item, index) => {
      const meta = getRoleMeta(item.role || '');
      const title = item.author || 'LeaderSpeak';

      return {
        id: `${title}-${index}`,
        title,
        author: meta.author,
        date: meta.date,
        image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
        excerpt: cleanText(item.quote || 'Read the latest LeaderSpeak insight.'),
        content: item.quote || 'Read the latest LeaderSpeak insight.',
        slug: generateSlug(title),
      };
    });
}

export default function LeaderSpeakPage() {
  const [posts, setPosts] = useState<LeaderSpeakPost[]>([]);
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('LEADERSPEAK');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        const response = await fetchWebsitePageBySlug('leaderspeak');
        const testimonials = getPageTestimonials(response.data);
        const apiPosts = mapTestimonialsToPosts(testimonials);

        if (isMounted) setPosts(apiPosts);
      } catch {
        if (isMounted) setPosts([]);
      } finally {
        if (isMounted) setIsLoading(false);
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
          {/* <span className="cio-hero-badge">
            <Sparkles size={16} />
            LeaderSpeak
          </span> */}

          <h1>
            Conversations, Insights & <span>Leadership Voices.</span>
          </h1>

          <p>
            Explore direct conversations, candid discussions, and leadership perspectives from
            technology and business leaders shaping the enterprise world.
          </p>
        </div>

        <div className="cio-hero-stat">
          <Newspaper size={28} />
          <strong>{posts.length}+</strong>
          <span>Featured Conversations</span>
        </div>
      </section>

      <div className="cio-interactive-container">
        <div className="cio-interactive-content">
          {isLoading ? (
            <div className="cio-empty-state">
              <h3>Loading posts...</h3>
              <p>Fetching latest LeaderSpeak insights.</p>
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
                <Link href={`/leaderspeak/${post.slug}`} className="cio-interactive-post-image">
                  <Image src={post.image} alt={post.title} width={300} height={300} unoptimized />

                  <span className="cio-image-hover">Read Story</span>
                </Link>

                <div className="cio-interactive-post-content">
                  <span className="cio-interactive-category">LEADERSPEAK</span>

                  <h2>{post.title}</h2>

                  <div className="cio-interactive-meta">
                    {post.author}
                    {post.date ? ` | ${post.date}` : ''}
                  </div>

                  <p>{post.excerpt}</p>

                  <Link href={`/leaderspeak/${post.slug}`} className="cio-interactive-read-more">
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
