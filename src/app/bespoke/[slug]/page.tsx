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

type BespokePostDetail = {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
};

type EmbeddedMedia = {
  type: 'youtube' | 'image' | 'pdf';
  src: string;
};

type ContentSegment =
  | { type: 'text'; text: string }
  | { type: 'media'; media: EmbeddedMedia; caption: string };

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

function testimonialToDetail(item: PageTestimonial): BespokePostDetail {
  const meta = getRoleMeta(item.role || '');

  return {
    title: item.author || 'Bespoke',
    author: meta.author,
    date: meta.date,
    image: getValidImage(item.avatar),
    content: item.quote || '',
  };
}

function getEmbeddedMedia(value: string): EmbeddedMedia | null {
  const normalizedValue = value.replace(/&amp;/gi, '&');
  const urlValue = /^www\./i.test(normalizedValue) ? `https://${normalizedValue}` : normalizedValue;

  let url: URL;
  try {
    url = new URL(urlValue);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

  const hostname = url.hostname.toLowerCase();
  const youtubeHosts = new Set([
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtu.be',
    'youtube-nocookie.com',
    'www.youtube-nocookie.com',
  ]);

  if (youtubeHosts.has(hostname)) {
    const pathParts = url.pathname.split('/').filter(Boolean);
    const videoId =
      hostname === 'youtu.be'
        ? pathParts[0]
        : url.pathname === '/watch'
          ? url.searchParams.get('v')
          : ['embed', 'shorts', 'live'].includes(pathParts[0] ?? '')
            ? pathParts[1]
            : undefined;

    return videoId && /^[\w-]{11}$/.test(videoId)
      ? { type: 'youtube', src: `https://www.youtube-nocookie.com/embed/${videoId}` }
      : null;
  }

  if (/\.pdf$/i.test(url.pathname)) {
    return { type: 'pdf', src: url.href };
  }

  if (/\.(?:avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(url.pathname)) {
    return { type: 'image', src: url.href };
  }

  return null;
}

function getMediaCaption(value: string) {
  const lines = value.trim().split(/\r?\n/);
  const lastLine = lines[lines.length - 1]?.trim() ?? '';
  const watchIndex = lastLine.toLowerCase().lastIndexOf('watch');

  if (watchIndex >= 0 && /^watch\s*:/i.test(lastLine.slice(watchIndex))) {
    return lastLine
      .slice(watchIndex)
      .replace(/^watch\s*:\s*/i, '')
      .trim();
  }

  return lastLine;
}

function parseContentSegments(content: string): ContentSegment[] {
  const normalizedContent = content.replace(/&amp;/gi, '&');
  const urlPattern = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
  const segments: ContentSegment[] = [];
  let cursor = 0;
  let pendingText = '';
  let match: RegExpExecArray | null;

  while ((match = urlPattern.exec(normalizedContent)) !== null) {
    pendingText += normalizedContent.slice(cursor, match.index);

    const trailingPunctuation = match[0].match(/[.,;:!?)}\]]+$/)?.[0] ?? '';
    const urlValue = match[0].slice(0, match[0].length - trailingPunctuation.length);
    const media = getEmbeddedMedia(urlValue);

    if (media) {
      segments.push({
        type: 'media',
        media,
        caption: getMediaCaption(pendingText),
      });
      pendingText = '';
    } else {
      pendingText += trailingPunctuation;
    }

    cursor = match.index + match[0].length;
  }

  pendingText += normalizedContent.slice(cursor);

  if (pendingText.trim()) {
    segments.push({ type: 'text', text: pendingText.trim() });
  }

  return segments;
}

function renderContentSegment(segment: ContentSegment, key: string) {
  if (segment.type === 'text') {
    return <p key={key}>{segment.text}</p>;
  }

  const mediaTitle = segment.caption || 'Bespoke resource';

  return (
    <article
      key={key}
      className={`bespoke-content-media-card bespoke-content-media-card--${segment.media.type}`}
    >
      {segment.caption ? <p className="bespoke-content-media-caption">{segment.caption}</p> : null}

      {segment.media.type === 'youtube' ? (
        <iframe
          className="bespoke-content-media-frame bespoke-content-media-frame--video"
          src={segment.media.src}
          title={segment.caption || 'Bespoke video'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : segment.media.type === 'pdf' ? (
        <iframe
          className="bespoke-content-media-frame bespoke-content-media-frame--pdf"
          src={segment.media.src}
          title={`${mediaTitle} PDF`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <Image
          className="bespoke-content-media-image"
          src={segment.media.src}
          alt={segment.caption || 'Bespoke resource'}
          width={1200}
          height={675}
          unoptimized
        />
      )}
    </article>
  );
}

export default function BespokeDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [post, setPost] = useState<BespokePostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      try {
        const response = await fetchWebsitePageBySlug('bespoke');
        const testimonials = getPageTestimonials(response.data);

        const found = testimonials.find((item: PageTestimonial) => {
          return generateSlug(item.author || 'Bespoke') === slug;
        });

        if (isMounted) {
          setPost(found ? testimonialToDetail(found) : null);
        }
      } catch (error) {
        // console.error('Failed to load bespoke post:', error);

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
          <Link href="/bespoke" className="cio-detail-back">
            <ArrowLeft size={18} />
            Back to Bespoke
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
        <Link href="/bespoke" className="cio-detail-back">
          <ArrowLeft size={18} />
          Back to Bespoke
        </Link>

        <article className="cio-detail-article">
          <div className="cio-detail-featured">
            <div className="cio-detail-featured-content">
              <span className="cio-detail-category">BESPOKE</span>

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
              .map((paragraph, index) =>
                parseContentSegments(paragraph).map((segment, segmentIndex) =>
                  renderContentSegment(segment, `${index}-${segmentIndex}`),
                ),
              )}
          </div>
        </article>
      </div>
    </main>
  );
}
