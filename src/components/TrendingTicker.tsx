'use client';

import React from 'react';
import { Flame } from 'lucide-react';

const TICKER_ITEMS = [
  'Ninad Varadkar on Cybersecurity Strategies in Banking and Finance',
  'Vamsi Ithamraju on Building Autonomous Financial Copilots That Think Ahead',
  "Kunal Mehta shares key priorities for Fabindia's technology roadmap",
  'Nitin Seth on why CIOs must evolve into strategic business partners',
  'Hilal Khan takes charge as CDIO at JSW Motors',
  'Arpanarghya Saha on driving a digital-first mindset through iterative delivery',
  'Vinod Bhat on the future of aviation technology and sustainability',
];

export default function TrendingTicker() {
  // Duplicate items to ensure a seamless looping scroll animation
  const doubledItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full bg-white border-b border-gray-100 py-2.5 px-4 overflow-hidden relative flex items-center text-sm font-medium z-10 shadow-xs">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#8e0101] text-white text-xs font-bold uppercase tracking-wider rounded-md shrink-0 mr-4 z-20 shadow-xs">
        <Flame size={12} className="animate-pulse" />
        <span>Trending</span>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {doubledItems.map((item, index) => (
            <span
              key={index}
              className="text-gray-700 hover:text-[#8e0101] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span className="inline-block w-1.5 h-1.5 bg-[#8e0101] rounded-full shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CSS style block for self-contained marquee animation to avoid breaking styling context */}
      <style jsx global>{`
        @keyframes tickerMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: tickerMarquee 45s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
