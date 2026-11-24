// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowLeft, Calendar, User } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// import {
//   fetchWebsitePageBySlug,
//   getPageTestimonials,
//   type PageTestimonial,
// } from '@/services/pages.service';

// type PostDetail = {
//   title: string;
//   author: string;
//   date: string;
//   image: string;
//   content: string;
// };

// const fallbackImage = '/assets/blogs/blog-1.webp';

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

// function getValidImage(value?: string) {
//   if (!value) return fallbackImage;

//   const image = value.trim();

//   if (image.startsWith('/') || image.startsWith('http://') || image.startsWith('https://')) {
//     return image;
//   }

//   return fallbackImage;
// }

// function testimonialToPost(item: PageTestimonial): PostDetail {
//   const meta = getRoleMeta(item.role);

//   return {
//     title: item.author || 'LeaderSpeak',
//     author: meta.author,
//     date: meta.date,
//     image: getValidImage(item.avatar),
//     content: item.quote || '',
//   };
// }

// export default function LeaderSpeakDetailPage() {
//   const params = useParams<{ slug: string }>();
//   const slug = decodeURIComponent(params.slug);

//   const [post, setPost] = useState<PostDetail | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPost() {
//       try {
//         const response = await fetchWebsitePageBySlug('leaderspeak');
//         const testimonials = getPageTestimonials(response.data);

//         console.log('URL Slug:', slug);
//         console.log('Testimonials:', testimonials);

//         const found = testimonials.find((item: PageTestimonial) => {
//           const itemSlug = generateSlug(item.author || 'LeaderSpeak');

//           console.log({
//             author: item.author,
//             itemSlug,
//             urlSlug: slug,
//           });

//           return itemSlug === slug;
//         });

//         if (isMounted) {
//           setPost(found ? testimonialToPost(found) : null);
//         }
//       } catch (error) {
//         console.error(error);

//         if (isMounted) {
//           setPost(null);
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     loadPost();

//     return () => {
//       isMounted = false;
//     };
//   }, [slug]);

//   if (isLoading) {
//     return (
//       <main className="cio-detail-page">
//         <div className="cio-detail-container">
//           <div className="cio-detail-loading">Loading post...</div>
//         </div>
//       </main>
//     );
//   }

//   if (!post) {
//     return (
//       <main className="cio-detail-page">
//         <div className="cio-detail-container">
//           <Link href="/leaderspeak" className="cio-detail-back">
//             <ArrowLeft size={18} />
//             Back to LeaderSpeak
//           </Link>

//           <div className="cio-detail-not-found">
//             <h2>Post not found</h2>
//             <p>The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="cio-detail-page">
//       <div className="cio-detail-container">
//         <Link href="/leaderspeak" className="cio-detail-back">
//           <ArrowLeft size={18} />
//           Back to LeaderSpeak
//         </Link>

//         <article className="cio-detail-article">
//           <div className="cio-detail-featured">
//             <div className="cio-detail-featured-content">
//               <span className="cio-detail-category">LEADERSPEAK</span>

//               <h1>{post.title}</h1>

//               <div className="cio-detail-meta">
//                 <span>
//                   <User size={15} />
//                   {post.author}
//                 </span>

//                 {post.date && (
//                   <span>
//                     <Calendar size={15} />
//                     {post.date}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="cio-detail-featured-image">
//               <Image
//                 src={post.image}
//                 alt={post.title}
//                 width={480}
//                 height={480}
//                 unoptimized
//                 priority
//                 onError={(e) => {
//                   (e.currentTarget as HTMLImageElement).src = fallbackImage;
//                 }}
//               />
//             </div>
//           </div>

//           <div className="cio-detail-content">
//             {post.content
//               .split('\n\n')
//               .filter(Boolean)
//               .map((paragraph, index) => (
//                 <p key={index}>{paragraph}</p>
//               ))}
//           </div>
//         </article>
//       </div>
//     </main>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import {
  fetchWebsitePageBySlug,
  getPageTestimonials,
  type PageTestimonial,
} from '@/services/pages.service';

type PostDetail = {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
};

const fallbackImage = '/assets/blogs/blog-1.webp';

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

  if (parts.length === 1) {
    const dateMatch = parts[0]?.match(
      /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i,
    );
    if (dateMatch?.[0]) {
      const date = dateMatch[0];
      const author = (parts[0] ?? '')
        .replace(date, '')
        .replace(/[-–—,]\s*$/, '')
        .trim();
      return { author: author || 'CIO Dialogues Team', date };
    }
  }

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

function testimonialToPost(item: PageTestimonial): PostDetail {
  const meta = getRoleMeta(item.role || '');

  return {
    title: item.author || 'LeaderSpeak',
    author: meta.author,
    date: meta.date,
    image: getValidImage(item.avatar),
    content: item.quote || '',
  };
}

export default function LeaderSpeakDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);

  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(fallbackImage);

  useEffect(() => {
    setImageSrc(post?.image || fallbackImage);
  }, [post]);

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      try {
        const response = await fetchWebsitePageBySlug('leaderspeak');
        const testimonials = getPageTestimonials(response.data);

        const found = testimonials.find(
          (item: PageTestimonial) => generateSlug(item.author || 'LeaderSpeak') === slug,
        );

        if (isMounted) {
          setPost(found ? testimonialToPost(found) : null);
        }
      } catch {
        if (isMounted) {
          setPost(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="cio-detail-page">
        <div className="cio-detail-container">
          <div className="cio-detail-loading">Loading...</div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="cio-detail-page">
        <div className="cio-detail-container">
          <Link href="/leaderspeak" className="cio-detail-back">
            <ArrowLeft size={18} />
            Back to LeaderSpeak
          </Link>

          <div className="cio-detail-not-found">
            <h2>Post not found</h2>
            <p>The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cio-detail-page">
      <div className="cio-detail-container">
        <Link href="/leaderspeak" className="cio-detail-back">
          <ArrowLeft size={18} />
          Back to LeaderSpeak
        </Link>

        <article className="cio-detail-article">
          <div className="cio-detail-featured">
            <div className="cio-detail-featured-content">
              <span className="cio-detail-category">LEADERSPEAK</span>

              <h1>{post.title}</h1>

              <div className="cio-detail-meta">
                <span className="cio-detail-meta-author">
                  <svg
                    viewBox="0 0 24 24"
                    width="34"
                    height="34"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20a8 8 0 0 1 16 0" />
                  </svg>
                  {post.author}
                </span>

                {post.date && (
                  <span className="cio-detail-meta-date">
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="none"
                      stroke="#8e0101"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M16 3v4M8 3v4M3 10h18" />
                    </svg>
                    {post.date}
                  </span>
                )}
              </div>
            </div>

            <div className="cio-detail-featured-image">
              <Image
                src={imageSrc}
                alt={post.title}
                width={480}
                height={480}
                priority
                unoptimized
                onError={() => setImageSrc(fallbackImage)}
              />
            </div>
          </div>

          <div className="cio-detail-content">
            {post.content
              .split(/\n\s*\n/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph.trim()}</p>
              ))}
          </div>
        </article>
      </div>
    </main>
  );
}
