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
//   const meta = getRoleMeta(item.role || '');

//   return {
//     title: item.author || 'Leadership Lessons',
//     author: meta.author,
//     date: meta.date,
//     image: getValidImage(item.avatar),
//     content: item.quote || '',
//   };
// }

// export default function LeadershipLessonDetailPage() {
//   const params = useParams<{ slug: string }>();
//   const slug = decodeURIComponent(params.slug);

//   const [post, setPost] = useState<PostDetail | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageSrc, setImageSrc] = useState(fallbackImage);

//   useEffect(() => {
//     setImageSrc(post?.image || fallbackImage);
//   }, [post]);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPost() {
//       try {
//         const response = await fetchWebsitePageBySlug('leadership-lessons');

//         const testimonials = getPageTestimonials(response.data);

//         console.log('URL Slug:', slug);
//         console.log('Testimonials:', testimonials);

//         testimonials.forEach((item) => {
//           console.log(item.author, '=>', generateSlug(item.author || 'Leadership Lessons'));
//         });

//         const found = testimonials.find(
//           (item: PageTestimonial) => generateSlug(item.author || 'Leadership Lessons') === slug,
//         );

//         console.log('Matched Post:', found);

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

//     void loadPost();

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
//           <Link href="/leadership-lessons" className="cio-detail-back">
//             <ArrowLeft size={18} />
//             Back to Leadership Lessons
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
//         <Link href="/leadership-lessons" className="cio-detail-back">
//           <ArrowLeft size={18} />
//           Back to Leadership Lessons
//         </Link>

//         <article className="cio-detail-article">
//           <div className="cio-detail-featured">
//             <div className="cio-detail-featured-content">
//               <span className="cio-detail-category">LEADERSHIP LESSONS</span>

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
//                 src={imageSrc}
//                 alt={post.title}
//                 width={480}
//                 height={480}
//                 priority
//                 unoptimized
//                 onError={() => setImageSrc(fallbackImage)}
//               />
//             </div>
//           </div>

//           <div className="cio-detail-content">
//             {post.content
//               .split(/\n\s*\n/)
//               .filter((paragraph) => paragraph.trim())
//               .map((paragraph, index) => (
//                 <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph.trim()}</p>
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
import { ArrowLeft, Calendar, User } from 'lucide-react';
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
    title: item.author || 'Leadership Lessons',
    author: meta.author,
    date: meta.date,
    image: getValidImage(item.avatar),
    content: item.quote || '',
  };
}

export default function LeadershipLessonDetailPage() {
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
        const response = await fetchWebsitePageBySlug('leadership-lessons');

        const testimonials = getPageTestimonials(response.data);

        const found = testimonials.find(
          (item: PageTestimonial) => generateSlug(item.author || 'Leadership Lessons') === slug,
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
          <div className="cio-detail-loading">Loading post...</div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="cio-detail-page">
        <div className="cio-detail-container">
          <Link href="/leadership-lessons" className="cio-detail-back">
            <ArrowLeft size={18} />
            Back to Leadership Lessons
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
        <Link href="/leadership-lessons" className="cio-detail-back">
          <ArrowLeft size={18} />
          Back to Leadership Lessons
        </Link>

        <article className="cio-detail-article">
          <div className="cio-detail-featured">
            <div className="cio-detail-featured-content">
              <span className="cio-detail-category">LEADERSHIP LESSONS</span>

              <h1>{post.title}</h1>

              <div className="cio-detail-meta">
                <span>
                  <User size={15} />
                  {post.author}
                </span>

                {post.date && (
                  <span>
                    <Calendar size={15} />
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
