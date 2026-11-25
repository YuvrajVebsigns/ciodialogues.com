// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { ArrowLeft, Calendar, User } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import {
//   fetchWebsitePageBySlug,
//   getPageTestimonials,
//   type PageTestimonial,
// } from '@/services/pages.service';

// type OurBrandPostDetail = {
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
//     .replace(/[“”‘’]/g, '')
//     .replace(/&/g, 'and')
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-');
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

// function testimonialToDetail(item: PageTestimonial): OurBrandPostDetail {
//   const meta = getRoleMeta(item.role || '');

//   return {
//     title: item.author || 'Our Brand',
//     author: meta.author,
//     date: meta.date,
//     image: getValidImage(item.avatar),
//     content: item.quote || '',
//   };
// }

// export default function OurBrandDetailPage() {
//   const params = useParams<{ slug: string }>();
//   const slug = params.slug;

//   const [post, setPost] = useState<OurBrandPostDetail | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadPost() {
//       try {
//         const response = await fetchWebsitePageBySlug('our-brand');
//         const testimonials = getPageTestimonials(response.data);

//         const found = testimonials.find((item: PageTestimonial) => {
//           return generateSlug(item.author || 'Our Brand') === slug;
//         });

//         if (isMounted) {
//           setPost(found ? testimonialToDetail(found) : null);
//         }
//       } catch (error) {
//         console.error('Failed to load our brand post:', error);

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
//           <Link href="/our-brand" className="cio-detail-back">
//             <ArrowLeft size={18} />
//             Back to Our Brand
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
//         <Link href="/our-brand" className="cio-detail-back">
//           <ArrowLeft size={18} />
//           Back to Our Brand
//         </Link>

//         <article className="cio-detail-article">
//           <div className="cio-detail-featured">
//             <div className="cio-detail-featured-content">
//               <span className="cio-detail-category">OUR BRAND</span>

//               <h1>{post.title}</h1>

//               <div className="cio-detail-meta">
//                 <span>
//                   <User size={15} />
//                   {post.author}
//                 </span>

//                 {post.date ? (
//                   <span>
//                     <Calendar size={15} />
//                     {post.date}
//                   </span>
//                 ) : null}
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
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  fetchWebsitePageBySlug,
  getPageTestimonials,
  type PageTestimonial,
} from '@/services/pages.service';

type OurBrandPostDetail = {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
  images: string[];
};

const fallbackImage = '/assets/blogs/blog-1.webp';

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

function extractContentImages(content: string) {
  const imageUrls: string[] = [];
  const imageUrlPattern = /https?:\/\/[^\s<>"']+/gi;
  let cleanedContent = '';
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = imageUrlPattern.exec(content)) !== null) {
    const url = match[0].replace(/[.,;!?)}\]]+$/, '');

    if (!/\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i.test(url)) {
      continue;
    }

    let prefix = content.slice(cursor, match.index);
    const marker = prefix.match(/\d+\.\s*$/);

    if (marker) {
      const beforeMarker = prefix.slice(0, marker.index);

      if (!beforeMarker || /(?:\.|\n)$/.test(beforeMarker)) {
        prefix = beforeMarker;
      }
    }

    cleanedContent += prefix;
    imageUrls.push(url);
    cursor = match.index + match[0].length;

    const followingMarker = content.slice(cursor).match(/^\s+\d+\.(?=\s*(?:https?:\/\/|$))/i);

    if (followingMarker) {
      cursor += followingMarker[0].length;
    }
  }

  cleanedContent += content.slice(cursor);

  return {
    content: cleanedContent
      .replace(/[ \t]+/g, ' ')
      .replace(/\r\n?/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
    images: imageUrls,
  };
}

function testimonialToDetail(item: PageTestimonial): OurBrandPostDetail {
  const meta = getRoleMeta(item.role || '');
  const { content, images } = extractContentImages(item.quote || '');

  return {
    title: item.author || 'Our Brand',
    author: meta.author,
    date: meta.date,
    image: getValidImage(item.avatar),
    content,
    images,
  };
}

function BrandImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  const showControls = images.length > 1;

  return (
    <div className="brand-image-carousel" aria-label={`${title} images`}>
      <div className="brand-image-carousel__frame">
        <Image
          src={activeImage}
          alt={`${title} image ${activeIndex + 1} of ${images.length}`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 1100px"
        />
      </div>

      {showControls ? (
        <div className="brand-image-carousel__controls">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setActiveIndex((index) => (index - 1 + images.length) % images.length)}
          >
            <ChevronLeft size={20} />
          </button>
          <span aria-live="polite">
            {activeIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setActiveIndex((index) => (index + 1) % images.length)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default function OurBrandDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [post, setPost] = useState<OurBrandPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      try {
        const response = await fetchWebsitePageBySlug('our-brand');

        const testimonials = getPageTestimonials(response.data);

        const found = testimonials.find(
          (item: PageTestimonial) => generateSlug(item.author || 'Our Brand') === slug,
        );

        if (isMounted) {
          setPost(found ? testimonialToDetail(found) : null);
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
          <Link href="/our-brand" className="cio-detail-back">
            <ArrowLeft size={18} />
            Back to Our Brand
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
        <Link href="/our-brand" className="cio-detail-back">
          <ArrowLeft size={18} />
          Back to Our Brand
        </Link>

        <article className="cio-detail-article">
          <div className="cio-detail-featured">
            <div className="cio-detail-featured-content">
              <span className="cio-detail-category">OUR BRAND</span>

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

                {post.date ? (
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
                ) : null}
              </div>
            </div>

            <div className="cio-detail-featured-image">
              <Image
                src={post.image}
                alt={post.title}
                width={480}
                height={480}
                unoptimized
                priority
              />
            </div>
          </div>

          <div className="cio-detail-content our-brand-detail-content">
            {post.content
              .split(/\n\s*\n/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph.trim()}</p>
              ))}
            <BrandImageCarousel images={post.images} title={post.title} />
          </div>
        </article>
      </div>
    </main>
  );
}
