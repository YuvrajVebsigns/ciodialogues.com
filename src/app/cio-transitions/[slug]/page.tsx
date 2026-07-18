'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  fetchWebsitePageBySlug,
  getPageTestimonials,
  type PageTestimonial,
} from '@/services/pages.service';

type CIOTransitionPostDetail = {
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

function testimonialToDetail(item: PageTestimonial): CIOTransitionPostDetail {
  const meta = getRoleMeta(item.role || '');

  return {
    title: item.author || 'CIO Transition',
    author: meta.author,
    date: meta.date,
    image: getValidImage(item.avatar),
    content: item.quote || '',
  };
}

export default function CIOTransitionDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [post, setPost] = useState<CIOTransitionPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      try {
        const response = await fetchWebsitePageBySlug('cio-transitions');
        const testimonials = getPageTestimonials(response.data);

        const found = testimonials.find((item: PageTestimonial) => {
          return generateSlug(item.author || 'CIO Transition') === slug;
        });

        if (isMounted) {
          setPost(found ? testimonialToDetail(found) : null);
        }
      } catch (error) {
        // console.error('Failed to load CIO transition post:', error);

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
          <Link href="/cio-transitions" className="cio-detail-back">
            <ArrowLeft size={18} />
            Back to CIO Transitions
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
        <Link href="/cio-transitions" className="cio-detail-back">
          <ArrowLeft size={18} />
          Back to CIO Transitions
        </Link>

        <article className="cio-detail-article">
          <div className="cio-detail-featured">
            <div className="cio-detail-featured-content">
              <span className="cio-detail-category">CIO TRANSITIONS</span>

              <h1>{post.title}</h1>

              <div className="cio-detail-meta">
                <span>
                  <User size={15} />
                  {post.author}
                </span>

                {post.date ? (
                  <span>
                    <Calendar size={15} />
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
