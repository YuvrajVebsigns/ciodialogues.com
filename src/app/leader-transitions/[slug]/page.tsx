'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  fetchWebsitePageBySlug,
  getPageTestimonials,
  type PageTestimonial,
} from '@/services/pages.service';

type LeaderTransitionPostDetail = {
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

function testimonialToDetail(item: PageTestimonial): LeaderTransitionPostDetail {
  const meta = getRoleMeta(item.role || '');

  return {
    title: item.author || 'Leader Transition',
    author: meta.author,
    date: meta.date,
    image: getValidImage(item.avatar),
    content: item.quote || '',
  };
}

export default function LeaderTransitionDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [post, setPost] = useState<LeaderTransitionPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      try {
        const response = await fetchWebsitePageBySlug('leader-transitions');

        const testimonials = getPageTestimonials(response.data);

        const found = testimonials.find((item: PageTestimonial) => {
          return generateSlug(item.author || 'Leader Transition') === slug;
        });

        if (isMounted) {
          setPost(found ? testimonialToDetail(found) : null);
        }
      } catch (error) {
        // console.error('Failed to load leader transition post:', error);

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
          <Link href="/leader-transitions" className="cio-detail-back">
            <ArrowLeft size={18} />
            Back to Leader Transitions
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
        <Link href="/leader-transitions" className="cio-detail-back">
          <ArrowLeft size={18} />
          Back to Leader Transitions
        </Link>

        <article className="cio-detail-article">
          <div className="cio-detail-featured">
            <div className="cio-detail-featured-content">
              <span className="cio-detail-category">LEADER TRANSITIONS</span>

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
