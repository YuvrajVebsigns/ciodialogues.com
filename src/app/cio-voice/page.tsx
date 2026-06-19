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

// type CIOPost = {
//   id: string;
//   title: string;
//   author: string;
//   date: string;
//   image: string;
//   excerpt: string;
//   content?: string;
//   slug?: string;
// };

// const fallbackImage = '/assets/blogs/blog-1.webp';

// const staticPosts: CIOPost[] = [
//   {
//     id: 'static-1',
//     title: 'Building Autonomous Financial Copilots That Think Ahead',
//     author: 'CIO Dialogues Team',
//     date: 'January 5, 2026',
//     image: fallbackImage,
//     excerpt:
//       'Vamsi Ithamraju is the Chief Technology Officer at Axis Mutual Fund. He has over two decades of experience at the inflection of consulting and technology.',
//     content:
//       'Vamsi Ithamraju is the Chief Technology Officer at Axis Mutual Fund. He has over two decades of experience at the inflection of consulting and technology. In this exclusive CIO Voice interview, Vamsi shares insights on building autonomous financial systems, the intersection of AI and fintech, and how enterprise leaders can drive digital transformation in the financial services industry.',
//     slug: 'building-autonomous-financial-copilots-that-think-ahead',
//   },
//   {
//     id: 'static-2',
//     title: 'Driving a Digital-First Mindset through Iterative Delivery',
//     author: 'CIO Dialogues Team',
//     date: 'November 4, 2025',
//     image: '/assets/blogs/blog-2.webp',
//     excerpt:
//       'Arpanarghya Saha shares his perspective on digital-first delivery, business agility, and enterprise transformation.',
//     content:
//       'Arpanarghya Saha shares his perspective on digital-first delivery, business agility, and enterprise transformation. Learn how enterprise leaders can adopt iterative delivery practices to accelerate innovation and respond to market changes faster than ever before.',
//     slug: 'driving-a-digital-first-mindset-through-iterative-delivery',
//   },
// ];

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
// ];

// function cleanText(text: string, limit = 230) {
//   const value = text.replace(/\s+/g, ' ').trim();
//   return value.length > limit ? `${value.slice(0, limit)}...` : value;
// }

// function generateSlug(text: string): string {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-')
//     .slice(0, 100);
// }

// function getRoleMeta(role: string) {
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

// function mapTestimonialsToPosts(testimonials: PageTestimonial[]): CIOPost[] {
//   return testimonials
//     .filter((item) => item.author || item.quote || item.avatar)
//     .map((item, index) => {
//       const meta = getRoleMeta(item.role || '');
//       const title = item.author || 'CIO Voice';
//       const slug = generateSlug(title);

//       return {
//         id: `${item.author || 'post'}-${index}`,
//         title: title,
//         author: meta.author,
//         date: meta.date,
//         image: isValidImageUrl(item.avatar) ? item.avatar.trim() : fallbackImage,
//         excerpt: cleanText(item.quote || 'Read the latest insight from CIO Dialogues.'),
//         content: item.quote || 'Read the latest insight from CIO Dialogues.',
//         slug: slug,
//       };
//     });
// }

// export default function CIOVoicePage() {
//   const [posts, setPosts] = useState<CIOPost[]>(staticPosts);
//   const [search, setSearch] = useState('');
//   const [activeSection, setActiveSection] = useState('CIO VOICE');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPage() {
//       try {
//         const response = await fetchWebsitePageBySlug('cio-voice');
//         const testimonials = getPageTestimonials(response.data);
//         const apiPosts = mapTestimonialsToPosts(testimonials);

//         if (isMounted && apiPosts.length > 0) {
//           setPosts(apiPosts);
//         }
//       } catch {
//         if (isMounted) setPosts(staticPosts);
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
//       <br></br>
//       <br></br>
//       <br></br>
//       <div className="cio-bg-orb cio-bg-orb-one" />
//       <div className="cio-bg-orb cio-bg-orb-two" />

//       <section className="cio-hero">
//         <div>
//           {/* <span className="cio-hero-badge">
//             <Sparkles size={16} />
//             CIO Voice
//           </span> */}

//           <h1>
//             Stories, Signals & <span>Technology Leadership.</span>
//           </h1>

//           <p>
//             Explore perspectives from enterprise technology leaders shaping digital transformation,
//             innovation, and business impact.
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
//               <p>Fetching latest CIO Voice insights.</p>
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
//                 <Link href={`/cio-voice/${post.slug}`} className="cio-interactive-post-image">
//                   <Image src={post.image} alt={post.title} width={300} height={300} unoptimized />

//                   <span className="cio-image-hover">Read Story</span>
//                 </Link>

//                 <div className="cio-interactive-post-content">
//                   <span className="cio-interactive-category">CIO VOICE</span>

//                   <h2>{post.title}</h2>

//                   <div className="cio-interactive-meta">
//                     {post.author}
//                     {post.date ? ` | ${post.date}` : ''}
//                   </div>

//                   <p>{post.excerpt}</p>

//                   <Link href={`/cio-voice/${post.slug}`} className="cio-interactive-read-more">
//                     Read More
//                     <ArrowUpRight size={15} />
//                   </Link>
//                 </div>
//               </article>
//             ))
//           )}
//           <br></br>
//           <br></br>
//           <br></br>
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

type CIOPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
  slug?: string;
};

const fallbackImage = '/assets/blogs/blog-1.webp';

const staticPosts: CIOPost[] = [
  {
    id: 'static-1',
    title: 'Building Autonomous Financial Copilots That Think Ahead',
    author: 'CIO Dialogues Team',
    date: 'January 5, 2026',
    image: fallbackImage,
    excerpt:
      'Vamsi Ithamraju is the Chief Technology Officer at Axis Mutual Fund. He has over two decades of experience at the inflection of consulting and technology.',
    content:
      'Vamsi Ithamraju is the Chief Technology Officer at Axis Mutual Fund. He has over two decades of experience at the inflection of consulting and technology. In this exclusive CIO Voice interview, Vamsi shares insights on building autonomous financial systems, the intersection of AI and fintech, and how enterprise leaders can drive digital transformation in the financial services industry.',
    slug: 'building-autonomous-financial-copilots-that-think-ahead',
  },
  {
    id: 'static-2',
    title: 'Driving a Digital-First Mindset through Iterative Delivery',
    author: 'CIO Dialogues Team',
    date: 'November 4, 2025',
    image: '/assets/blogs/blog-2.webp',
    excerpt:
      'Arpanarghya Saha shares his perspective on digital-first delivery, business agility, and enterprise transformation.',
    content:
      'Arpanarghya Saha shares his perspective on digital-first delivery, business agility, and enterprise transformation. Learn how enterprise leaders can adopt iterative delivery practices to accelerate innovation and respond to market changes faster than ever before.',
    slug: 'driving-a-digital-first-mindset-through-iterative-delivery',
  },
];

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
      const slug = generateSlug(title);

      return {
        id: `${item.author || 'post'}-${index}`,
        title,
        author: meta.author,
        date: meta.date,
        image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
        excerpt: cleanText(item.quote || 'Read the latest insight from CIO Dialogues.'),
        content: item.quote || 'Read the latest insight from CIO Dialogues.',
        slug,
      };
    });
}

export default function CIOVoicePage() {
  const [posts, setPosts] = useState<CIOPost[]>(staticPosts);
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('CIO VOICE');
  const [isLoading, setIsLoading] = useState(true);

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
            Stories, Signals & <span>Technology Leadership.</span>
          </h1>

          <p>
            Explore perspectives from enterprise technology leaders shaping digital transformation,
            innovation, and business impact.
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
              <p>Fetching latest CIO Voice insights.</p>
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
                <Link href={`/cio-voice/${post.slug}`} className="cio-interactive-post-image">
                  <Image src={post.image} alt={post.title} width={300} height={300} unoptimized />

                  <span className="cio-image-hover">Read Story</span>
                </Link>

                <div className="cio-interactive-post-content">
                  <span className="cio-interactive-category">CIO VOICE</span>

                  <h2>{post.title}</h2>

                  <div className="cio-interactive-meta">
                    {post.author}
                    {post.date ? ` | ${post.date}` : ''}
                  </div>

                  <p>{post.excerpt}</p>

                  <Link href={`/cio-voice/${post.slug}`} className="cio-interactive-read-more">
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
