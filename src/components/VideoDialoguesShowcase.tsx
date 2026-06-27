'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Quote, User, ArrowUpRight } from 'lucide-react';

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

interface DialogueItem {
  id: number;
  slug: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface VideoDialoguesShowcaseProps {
  videos: VideoItem[];
  dialogues: DialogueItem[];
}

export default function VideoDialoguesShowcase({
  videos = [],
  dialogues = [],
}: VideoDialoguesShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);

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
  const displayDialogues = dialogues.slice(0, 4);

  // Fallback video cover image
  const videoCoverImage = '/assets/blogs/blog-1.webp';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Interactive Video Corner (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="border-b border-gray-200 pb-2 mb-6">
            <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-wider border-b-2 border-[#8e0101] inline-block pb-1">
              Featured Video
            </h3>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col flex-1">
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
              {isPlaying ? (
                <iframe
                  src={`${featuredVideo.videoUrl}?autoplay=1`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <>
                  <Image
                    src={videoCoverImage}
                    alt={featuredVideo.title}
                    fill
                    className="object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                  {/* Red Pulse Play Button */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="absolute z-10 w-16 h-16 bg-[#8e0101] hover:bg-[#a30101] text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer focus:outline-hidden"
                    aria-label="Play video"
                  >
                    <Play size={26} fill="white" className="ml-1" />
                    <span className="absolute -inset-2 bg-[#8e0101]/30 rounded-full animate-ping -z-10" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#8e0101] uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded">
                  {featuredVideo.category || 'Reel'}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2 leading-snug">
                  {featuredVideo.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mt-4 border-t border-gray-100 pt-3">
                <span className="flex items-center gap-1">
                  <User size={13} />
                  {featuredVideo.author || 'CORE Media'}
                </span>
                <span>{featuredVideo.date || 'LATEST'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Executive Dialogues 2x2 Grid (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
            <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-wider border-b-2 border-[#8e0101] inline-block pb-1">
              CIO Dialogues
            </h3>
            <Link
              href="/dialoges"
              className="inline-flex items-center gap-1 text-[#8e0101] text-xs font-bold hover:gap-1.5 transition-all"
            >
              <span>View All Dialogues</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {displayDialogues.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-red-100 hover:shadow-md transition-all group"
              >
                <div className="relative">
                  <div className="text-red-100 group-hover:text-red-200 transition-colors mb-3">
                    <Quote size={28} fill="currentColor" className="opacity-40" />
                  </div>
                  <p className="text-gray-700 text-sm italic line-clamp-4 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 border-t border-gray-50 pt-3.5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-red-50 bg-gray-50 shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="text-sm font-bold text-gray-900 truncate">{item.author}</h5>
                    <p className="text-xs text-gray-500 truncate" title={item.role}>
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {displayDialogues.length === 0 && (
              <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-8 text-center flex items-center justify-center">
                <p className="text-gray-400 text-sm font-medium">No dialogues available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
