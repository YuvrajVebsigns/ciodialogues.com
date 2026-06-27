'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

export default function FoundersMessage() {
  return (
    <section className="w-full bg-[#fcf9f9] border-t border-gray-100 py-16 md:py-20 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Stats (5 cols) */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Portrait Card */}
            <div className="relative w-full max-w-sm aspect-5/6 bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image
                src="/assets/team/Anoop-Mathur.png"
                alt="Anoop Mathur - Founder"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                unoptimized
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-2 md:right-8 bg-white border border-gray-100 p-4 rounded-xl shadow-lg max-w-[200px] hover:translate-y-[-2px] transition-transform">
              <span className="block text-2xl font-black text-[#8e0101]">13+ Years</span>
              <p className="text-xs text-gray-500 font-semibold mt-1 leading-relaxed">
                Pioneering ICT Community & Media Innovation
              </p>
            </div>
          </div>

          {/* Right Column: Message Contents (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div>
              <span className="text-xs font-bold text-[#8e0101] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-md">
                Founder&apos;s Message
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
                Building Connections <br />
                <span className="text-[#8e0101]">In A Digital-First World</span>
              </h2>
            </div>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              For over 13 years, CORE Media has pioneered innovation at the intersection of
              technology, leadership, and community building. We establish bespoke, high-impact
              channels that connect executive decision-makers, transform business structures, and
              spark actionable industrial growth.
            </p>

            {/* Quote block */}
            <div className="bg-red-50/50 border-l-4 border-[#8e0101] p-5 rounded-r-xl relative">
              <Quote className="absolute top-4 right-4 text-[#8e0101]/10 w-12 h-12 pointer-events-none" />
              <p className="text-gray-700 font-medium italic text-sm md:text-base leading-relaxed relative">
                &ldquo;We innovate to foster premium executive relationships that deliver
                exceptional collaborative success, every single time.&rdquo;
              </p>
            </div>

            {/* Author */}
            <div>
              <h3 className="text-lg font-bold text-gray-900">Anoop Mathur</h3>
              <p className="text-xs text-gray-500 font-semibold">
                Founder & Visionary Leader, CORE Media
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/#contact-section"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#8e0101] hover:bg-[#9d0101] text-white font-bold text-sm rounded-lg hover:shadow-md transition-all cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
