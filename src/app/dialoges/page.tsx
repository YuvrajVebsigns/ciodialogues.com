'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Dialogue {
  id: number;
  slug: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  date: string;
}

export default function DialoguesPage() {
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const heroMediaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const featuredDialogues = dialogues.slice(0, 3);
  const repeatedDialogues = Array.from({ length: 3 }, () => featuredDialogues).flat();

  useEffect(() => {
    fetch('/api/dialoges')
      .then((res) => res.json())
      .then((data) => setDialogues(data))
      .catch(() => setDialogues([]));
  }, []);

  return (
    <>
      <section className="blog-hero dialogues-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Read Dialogues"
            fill
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay" />

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Read Dialogues</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="#8e0101"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>{' '}
              Home
            </Link>

            <span>&gt;</span>

            <p>Dialogues</p>
          </div>
        </div>
      </section>

      <section className="dialogues-section">
        <div className="dialogues-container">
          <br />
          <br />

          <div className="dialogues-list">
            {repeatedDialogues.map((d, index) => {
              const variant =
                index % 3 === 0
                  ? 'animate-fade-in-left'
                  : index % 3 === 1
                    ? 'animate-fade-in'
                    : 'animate-fade-in-right';

              const cardKey = `${d.id}-${index}`;

              return (
                <AnimatedDialogueCard
                  key={cardKey}
                  cardKey={cardKey}
                  dialogue={d}
                  index={index}
                  variant={variant}
                  expandedCard={expandedCard}
                  setExpandedCard={setExpandedCard}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

type AnimatedDialogueCardProps = {
  cardKey: string;
  dialogue: Dialogue;
  index: number;
  variant?: string;
  expandedCard: string | null;
  setExpandedCard: React.Dispatch<React.SetStateAction<string | null>>;
};

function AnimatedDialogueCard({
  cardKey,
  dialogue,
  index,
  variant = 'animate-fade-in',
  expandedCard,
  setExpandedCard,
}: AnimatedDialogueCardProps) {
  const initialTransform = variant.includes('left')
    ? 'translateX(-40px)'
    : variant.includes('right')
      ? 'translateX(40px)'
      : 'translateY(40px)';

  const ref = useScrollAnimation<HTMLDivElement>({
    animationClass: variant,
    initialTransform,
    threshold: 0.12,
    once: false,
  });

  const textRef = useRef<HTMLParagraphElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  const isExpanded = expandedCard === cardKey;

  useEffect(() => {
    if (!textRef.current) return;

    const checkOverflow = () => {
      if (!textRef.current) return;
      setShowReadMore(textRef.current.scrollHeight > textRef.current.clientHeight + 2);
    };

    requestAnimationFrame(checkOverflow);
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [dialogue.quote]);

  return (
    <article ref={ref} className="dialogue-card" style={{ transitionDelay: `${index * 60}ms` }}>
      <Image
        src="/assets/dialoges/quote.png"
        alt="Quote"
        width={56}
        height={56}
        className="dialogue-quote"
      />

      <div className="dialogue-text">
        <p
          ref={textRef}
          className={`dialogue-description ${isExpanded ? 'expanded' : 'collapsed'}`}
        >
          {dialogue.quote}
        </p>

        {showReadMore && (
          <button
            type="button"
            className="dialogue-read-more"
            onClick={() => setExpandedCard(isExpanded ? null : cardKey)}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>

      <div className="dialogue-divider" />

      <div className="dialogue-footer">
        <Image
          src={dialogue.avatar}
          alt={dialogue.author}
          width={65}
          height={65}
          className="dialogue-avatar"
        />

        <div>
          <h4 className="dialogue-author">{dialogue.author}</h4>
          <p className="dialogue-role">{dialogue.role}</p>
        </div>
      </div>
    </article>
  );
}
