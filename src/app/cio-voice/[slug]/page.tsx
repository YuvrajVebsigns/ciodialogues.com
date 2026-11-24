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

type CIOPostDetail = {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
};

type ContentSegment = { type: 'text'; text: string } | { type: 'image'; src: string };

const fallbackImage = '/assets/blogs/blog-1.webp';

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
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

function testimonialToDetail(item: PageTestimonial): CIOPostDetail {
  const meta = getRoleMeta(item.role || '');

  return {
    title: item.author || 'CIO Voice',
    author: meta.author,
    date: meta.date,
    image: getValidImage(item.avatar),
    content: item.quote || '',
  };
}

function parseContentSegments(content: string): ContentSegment[] {
  const normalizedContent = content.replace(/&amp;/gi, '&');
  const urlPattern = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
  const segments: ContentSegment[] = [];
  let cursor = 0;
  let pendingText = '';
  let match: RegExpExecArray | null;

  while ((match = urlPattern.exec(normalizedContent)) !== null) {
    const prefix = normalizedContent.slice(cursor, match.index);
    pendingText += prefix;

    const trailingPunctuation = match[0].match(/[.,;:!?)}\]]+$/)?.[0] ?? '';
    const urlValue = match[0].slice(0, match[0].length - trailingPunctuation.length);
    const src = /^www\./i.test(urlValue) ? `https://${urlValue}` : urlValue;

    const isImageUrl =
      /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)(?:[?#].*)$/i.test(src) ||
      /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(src) ||
      /\/manual_upload\/.*\.(?:avif|bmp|gif|jpe?g|png|svg|webp)/i.test(src);

    if (isImageUrl) {
      if (pendingText.trim()) {
        segments.push({ type: 'text', text: pendingText.trim() });
        pendingText = '';
      }

      segments.push({ type: 'image', src });
    } else {
      pendingText += match[0];
    }

    cursor = match.index + match[0].length;
  }

  pendingText += normalizedContent.slice(cursor);

  if (pendingText.trim()) {
    segments.push({ type: 'text', text: pendingText.trim() });
  }

  return segments;
}

export default function CIOVoiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [post, setPost] = useState<CIOPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(post?.image || fallbackImage);
  useEffect(() => {
    if (post?.image) {
      setImageSrc(post.image);
    }
  }, [post]);
  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      try {
        const response = await fetchWebsitePageBySlug('cio-voice');
        const testimonials = getPageTestimonials(response.data);

        const found = testimonials.find((item: PageTestimonial) => {
          return generateSlug(item.author || 'CIO Voice') === slug;
        });

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

    loadPost();

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
          <Link href="/cio-voice" className="cio-detail-back">
            <ArrowLeft size={18} />
            Back to CIO Voice
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
        <Link href="/cio-voice" className="cio-detail-back">
          <ArrowLeft size={18} />
          Back to CIO Voice
        </Link>

        <article className="cio-detail-article">
          <div className="cio-detail-featured">
            <div className="cio-detail-featured-content">
              <span className="cio-detail-category">CIO VOICE</span>

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
              {/* <Image
                src={post.image}
                alt={post.title}
                width={480}
                height={480}
                unoptimized
                priority
              /> */}
              <Image
                src={imageSrc}
                alt={post.title}
                width={480}
                height={480}
                unoptimized
                priority
                onError={() => setImageSrc(fallbackImage)}
              />
            </div>
          </div>

          <div className="cio-detail-content">
            {post.content
              .split(/\n\s*\n/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) =>
                parseContentSegments(paragraph).map((segment, segmentIndex) => {
                  if (segment.type === 'text') {
                    return <p key={`${index}-${segmentIndex}`}>{segment.text}</p>;
                  }

                  return (
                    <div
                      key={`${index}-${segmentIndex}`}
                      className="cio-inline-image"
                      aria-label={post.title}
                    >
                      <Image
                        src={segment.src}
                        alt={post.title}
                        width={1200}
                        height={675}
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 900px"
                      />
                    </div>
                  );
                }),
              )}
          </div>
        </article>
      </div>
    </main>
  );
}
