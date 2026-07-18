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
//         title,
//         author: meta.author,
//         date: meta.date,
//         image: isValidImageUrl(item.avatar) ? item.avatar!.trim() : fallbackImage,
//         excerpt: cleanText(item.quote || 'Read the latest insight from CIO Dialogues.'),
//         content: item.quote || 'Read the latest insight from CIO Dialogues.',
//         slug,
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
//         if (isMounted) {
//           setPosts(staticPosts);
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

const fallbackImage = '/assets/blogs/blog-1.webp';

const staticPosts: CIOPost[] = [
  // {
  //   id: 'static-1',
  //   title: 'Building Autonomous Financial Copilots That Think Ahead',
  //   author: 'CIO Dialogues Team',
  //   date: 'January 5, 2026',
  //   image: fallbackImage,
  //   excerpt:
  //     'Vamsi Ithamraju is the Chief Technology Officer at Axis Mutual Fund. He has over two decades of experience at the inflection of consulting and technology.',
  //   content:
  //     'Vamsi Ithamraju is the Chief Technology Officer at Axis Mutual Fund. He has over two decades of experience at the inflection of consulting and technology. In this exclusive CIO Voice interview, Vamsi shares insights on building autonomous financial systems, the intersection of AI and fintech, and how enterprise leaders can drive digital transformation in the financial services industry.',
  //   slug: 'building-autonomous-financial-copilots-that-think-ahead',
  //   category: 'CIO VOICE',
  // },
  // {
  //   id: 'static-2',
  //   title: 'Driving a Digital-First Mindset Through Iterative Delivery',
  //   author: 'CIO Dialogues Team',
  //   date: 'November 4, 2025',
  //   image: '/assets/blogs/blog-2.webp',
  //   excerpt:
  //     'Arpanarghya Saha shares his perspective on digital-first delivery, business agility, and enterprise transformation.',
  //   content:
  //     'Arpanarghya Saha shares his perspective on digital-first delivery, business agility, and enterprise transformation. Learn how enterprise leaders can adopt iterative delivery practices to accelerate innovation and respond to market changes faster than ever before.',
  //   slug: 'driving-a-digital-first-mindset-through-iterative-delivery',
  //   category: 'LEADERSHIP LESSONS',
  // },
  // {
  //   id: 'static-3',
  //   title: 'How Enterprise Leaders Are Preparing for the Agentic AI Era',
  //   author: 'Technology Desk',
  //   date: 'October 20, 2025',
  //   image: '/assets/blogs/blog-3.webp',
  //   excerpt:
  //     'Technology leaders are redesigning operating models, governance frameworks, and digital infrastructure for the next generation of artificial intelligence.',
  //   content:
  //     'Technology leaders are redesigning operating models, governance frameworks, and digital infrastructure for the next generation of artificial intelligence.',
  //   slug: 'enterprise-leaders-preparing-for-agentic-ai',
  //   category: 'TECHNOLOGY',
  // },
  // {
  //   id: 'static-4',
  //   title: 'Cloud Modernisation Becomes a Boardroom Priority',
  //   author: 'CIO Dialogues Team',
  //   date: 'September 18, 2025',
  //   image: '/assets/blogs/blog-4.webp',
  //   excerpt:
  //     'Modern cloud platforms are helping businesses improve resilience, scalability, operational agility, and customer experience.',
  //   content:
  //     'Modern cloud platforms are helping businesses improve resilience, scalability, operational agility, and customer experience.',
  //   slug: 'cloud-modernisation-boardroom-priority',
  //   category: 'BUSINESS INSIGHTS',
  // },
  // {
  //   id: 'static-5',
  //   title: 'Cybersecurity Leaders Focus on Identity-First Protection',
  //   author: 'Technology Desk',
  //   date: 'August 14, 2025',
  //   image: '/assets/blogs/blog-5.webp',
  //   excerpt:
  //     'Identity security and zero-trust architecture are becoming central to enterprise protection strategies.',
  //   content:
  //     'Identity security and zero-trust architecture are becoming central to enterprise protection strategies.',
  //   slug: 'identity-first-cybersecurity-protection',
  //   category: 'TECHNOLOGY',
  // },
  // {
  //   id: 'static-6',
  //   title: 'Data Governance Moves From Compliance to Business Value',
  //   author: 'Editorial Bureau',
  //   date: 'July 28, 2025',
  //   image: '/assets/blogs/blog-6.webp',
  //   excerpt:
  //     'Organisations are turning trusted and governed data into a foundation for innovation and enterprise AI adoption.',
  //   content:
  //     'Organisations are turning trusted and governed data into a foundation for innovation and enterprise AI adoption.',
  //   slug: 'data-governance-business-value',
  //   category: 'BUSINESS INSIGHTS',
  // },
];

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
    image: '/assets/blogs/blog-2.webp',
  },
  {
    title: 'Data governance framework becomes an enterprise priority',
    image: '/assets/blogs/blog-3.webp',
  },
  {
    title: 'Technology leaders rethink cloud cost optimisation strategies',
    image: '/assets/blogs/blog-4.webp',
  },
  {
    title: 'Security teams prepare for a rapidly changing threat landscape',
    image: '/assets/blogs/blog-5.webp',
  },
];

// const sections = [
//   'ALL',
//   'CIO VOICE',
//   'BUSINESS INSIGHTS',
//   'TECHNOLOGY',
//   'LEADERSHIP LESSONS',
//   'EVENTS',
//   'BESPOKE',
//   'CIO TRANSITIONS',
//   'LEADER TRANSITIONS',
// ];

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
      {/* <header className="news-editorial-header">
        <Link href="/" className="news-editorial-brand">
          <span>CIO</span>
          <strong>Dialogues</strong>
        </Link>

        <nav
          className="news-editorial-nav"
          aria-label="CIO Voice sections"
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
            placeholder="Search stories"
            aria-label="Search stories"
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </header> */}

      {isLoading ? (
        <section className="news-editorial-status">
          <h2>Loading stories...</h2>
          <p>Fetching the latest CIO Voice insights.</p>
        </section>
      ) : !leadPost ? (
        <section className="news-editorial-status">
          <h2>No stories found</h2>
          <p>Try another search keyword or select a different section.</p>
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
                <Image
                  src={leadPost.image}
                  alt={leadPost.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 260px"
                  unoptimized
                />
              </div>

              <span>{leadPost.category}</span>

              <h3>{leadPost.title}</h3>
            </Link>
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
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 600px) 100vw, 310px"
                          unoptimized
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

                <Link href="/cio-voice">Explore now</Link>
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
