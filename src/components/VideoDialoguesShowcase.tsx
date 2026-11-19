'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Quote, User, ArrowUpRight } from 'lucide-react';

import { fetchDialogues, type DialogueItem } from '@/services/dialogue-page.service';

interface VideoItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  videoUrl: string;
  image?: string;
}

interface VideoDialoguesShowcaseProps {
  videos: VideoItem[];
  dialogues: DialogueItem[];
}

const EMPTY_DIALOGUES: DialogueItem[] = [];

function DialogueCard({ item }: { item: DialogueItem }) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote || isExpanded) return;

    const checkOverflow = () => {
      setHasOverflow(quote.scrollHeight > quote.clientHeight + 1);
    };

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(quote);

    return () => observer.disconnect();
  }, [isExpanded, item.quote]);

  return (
    <div className="video-dialogues-showcase__dialogue-card">
      <div className="relative">
        <div className="video-dialogues-showcase__quote-icon">
          <Quote
            size={28}
            fill="currentColor"
            className="video-dialogues-showcase__quote-icon-svg"
          />
        </div>
        <p
          ref={quoteRef}
          className={`video-dialogues-showcase__quote-text${isExpanded ? ' is-expanded' : ''}`}
        >
          &ldquo;{item.quote}&rdquo;
        </p>
        {hasOverflow && (
          <button
            type="button"
            className="video-dialogues-showcase__quote-toggle"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>

      <div className="video-dialogues-showcase__dialogue-footer">
        <div className="video-dialogues-showcase__avatar-wrapper">
          <Image
            src={item.avatar}
            alt={item.author}
            fill
            className="video-dialogues-showcase__avatar-image"
            unoptimized
          />
        </div>
        <div className="overflow-hidden">
          <h5 className="video-dialogues-showcase__dialogue-author">{item.author}</h5>
          <p className="video-dialogues-showcase__dialogue-role" title={item.role}>
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VideoDialoguesShowcase({
  videos = [],
  dialogues = EMPTY_DIALOGUES,
}: VideoDialoguesShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [dialogueItems, setDialogueItems] = useState(dialogues);
  const [dialoguesLoadError, setDialoguesLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDialogues() {
      try {
        const mappedDialogues = await fetchDialogues(dialogues);

        if (isMounted && mappedDialogues.length > 0) {
          setDialogueItems(mappedDialogues);
        }
      } catch {
        if (isMounted) {
          setDialoguesLoadError(true);
        }
      }
    }

    void loadDialogues();

    return () => {
      isMounted = false;
    };
  }, [dialogues]);

  // Take the first video as main featured
  const featuredVideo = videos[0] || {
    id: 1,
    title: 'Netmagic DC5 BuildUp Film',
    slug: 'showcase-reel-creative-campaigns',
    category: 'Showreel',
    author: 'CORE Media',
    date: '10 MAY',
    videoUrl: 'https://www.youtube.com/embed/o4LM01aE1PQ',
  };

  // Limit dialogues to 4 items for a clean 2x2 grid
  const displayDialogues = dialogueItems.slice(0, 4);

  // Fallback video cover image
  const videoCoverImage = '/assets/blogs/blog-1.webp';

  return (
    <section className="video-dialogues-showcase">
      <div className="video-dialogues-showcase__grid">
        {/* Left Column: Interactive Video Corner (1/3 width) */}
        <div className="video-dialogues-showcase__featured-column">
          <div className="video-dialogues-showcase__section-heading">
            <h3 className="video-dialogues-showcase__section-title">Featured Video</h3>
          </div>

          <div className="video-dialogues-showcase__featured-card">
            <div className="video-dialogues-showcase__video-wrapper">
              {isPlaying ? (
                <iframe
                  src={`${featuredVideo.videoUrl}?autoplay=1`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-dialogues-showcase__iframe"
                />
              ) : (
                <>
                  <Image
                    src={videoCoverImage}
                    alt={featuredVideo.title}
                    fill
                    className="video-dialogues-showcase__cover-image"
                    unoptimized
                  />
                  <div className="video-dialogues-showcase__video-overlay" />

                  {/* Red Pulse Play Button */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="video-dialogues-showcase__play-button"
                    aria-label="Play video"
                  >
                    <Play size={26} fill="white" className="ml-1" />
                    <span className="video-dialogues-showcase__play-pulse" />
                  </button>
                </>
              )}
            </div>

            <div className="video-dialogues-showcase__featured-content">
              <div>
                <span className="video-dialogues-showcase__tag">
                  {featuredVideo.category || 'Reel'}
                </span>
                <h4 className="video-dialogues-showcase__featured-title">{featuredVideo.title}</h4>
              </div>

              <div className="video-dialogues-showcase__meta-row">
                <span className="video-dialogues-showcase__meta-item">
                  <User size={13} />
                  {featuredVideo.author || 'CORE Media'}
                </span>
                <span>{featuredVideo.date || 'LATEST'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Executive Dialogues 2x2 Grid (2/3 width) */}
        <div className="video-dialogues-showcase__dialogues-column">
          <div className="video-dialogues-showcase__dialogues-header">
            <h3 className="video-dialogues-showcase__section-title">CIO Dialogues</h3>
            <Link href="/dialoges" className="video-dialogues-showcase__view-all-link">
              <span>View All Dialogues</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {dialoguesLoadError
              ? 'Live dialogues could not be loaded. Showing saved dialogues.'
              : ''}
          </p>

          <div className="video-dialogues-showcase__dialogues-grid">
            {displayDialogues.map((item) => (
              <DialogueCard key={item.id} item={item} />
            ))}

            {displayDialogues.length === 0 && (
              <div className="video-dialogues-showcase__no-dialogues-card">
                <p className="video-dialogues-showcase__no-dialogues-text">
                  No dialogues available.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
