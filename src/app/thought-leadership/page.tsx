// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// const posts = [
//   {
//     id: 1,
//     title: 'Transforming Enterprise Growth Through Data Strategy',
//     author: 'Business Insights Team',
//     date: 'January 5, 2026',
//     image: '/assets/blogs/blog-1.webp',
//     excerpt:
//       'Organizations are increasingly leveraging data-driven strategies to improve decision-making and accelerate business growth...',
//   },
//   {
//     id: 2,
//     title: 'How Modern Enterprises Drive Competitive Advantage',
//     author: 'Business Insights Team',
//     date: 'November 4, 2025',
//     image: '/assets/blogs/blog-2.webp',
//     excerpt:
//       'Business leaders are focusing on innovation, customer experience, and digital transformation to stay ahead...',
//   },
//   {
//     id: 3,
//     title: 'Future Ready Business Models',
//     author: 'Business Insights Team',
//     date: 'May 11, 2022',
//     image: '/assets/blogs/blog-3.webp',
//     excerpt:
//       'The future belongs to organizations that embrace agility, resilience, and emerging technologies...',
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

// export default function BusinessInsightsPage() {
//   return (
//     <main className="cio-page">
//       <div className="cio-container">

//         <div className="cio-content">
//           {posts.map((post) => (
//             <article key={post.id} className="cio-post">
//               <div className="cio-post-image">
//                 <Image
//                   src={post.image}
//                   alt={post.title}
//                   width={300}
//                   height={300}
//                 />
//               </div>

//               <div className="cio-post-content">
//                 <span className="cio-category">BUSINESS INSIGHTS</span>

//                 <h2>{post.title}</h2>

//                 <div className="cio-meta">
//                   {post.author} | {post.date}
//                 </div>

//                 <p>{post.excerpt}</p>

//                 <Link href="#" className="read-more">
//                   Read More →
//                 </Link>
//               </div>
//             </article>
//           ))}
//         </div>

//         <aside className="cio-sidebar">
//           <div className="sidebar-search">
//             <input type="text" placeholder="Search ..." />
//             <button>Search</button>
//           </div>

//           <div className="sidebar-box">
//             <h3>Recent Posts</h3>

//             <ul>
//               {recentPosts.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="sidebar-box">
//             <h3>Sections</h3>

//             <ul>
//               {sections.map((item, index) => (
//                 <li key={index}>{item}</li>
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
import { ArrowUpRight, Search } from 'lucide-react';
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
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('THOUGHT LEADERSHIP');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        const response = await fetchWebsitePageBySlug('thought-leadership');
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
      <section className="cio-hero">
        <span className="cio-hero-badge">THOUGHT LEADERSHIP</span>

        <h1>
          Thought <span>Leadership.</span>
        </h1>

        <p>
          Explore expert perspectives, strategic insights, and leadership ideas from technology
          decision-makers.
        </p>
      </section>

      <div className="cio-interactive-container">
        <div className="cio-interactive-content">
          {isLoading ? (
            <div className="cio-empty-state">
              <h3>Loading posts...</h3>
              <p>Fetching latest thought leadership insights.</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="cio-empty-state">
              <h3>No posts found</h3>
              <p>No thought leadership posts available.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article key={post.id} className="cio-interactive-post">
                <Link
                  href={`/thought-leadership/${post.slug}`}
                  className="cio-interactive-post-image"
                >
                  <Image src={post.image} alt={post.title} width={300} height={300} unoptimized />
                </Link>

                <div className="cio-interactive-post-content">
                  <span className="cio-interactive-category">THOUGHT LEADERSHIP</span>

                  <h2>{post.title}</h2>

                  <div className="cio-interactive-meta">
                    {post.author}
                    {post.date ? ` | ${post.date}` : ''}
                  </div>

                  <p>{post.excerpt}</p>

                  <Link
                    href={`/thought-leadership/${post.slug}`}
                    className="cio-interactive-read-more"
                  >
                    Read More <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))
          )}
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
