import React from 'react';
import TrendingTicker from '@/components/TrendingTicker';
import EditorialHeroGrid from '@/components/EditorialHeroGrid';
import VideoDialoguesShowcase from '@/components/VideoDialoguesShowcase';
import UpcomingEventsGrid from '@/components/UpcomingEventsGrid';
import FoundersMessage from '@/components/FoundersMessage';
import ContactSection from '@/components/ContactSection';
import { MOCK_VIDEOS, MOCK_DIALOGUES } from '@/constants/mockData';

export default function Home() {
  return (
    <main className="bg-gray-50/50 min-h-screen pt-28">
      {/* Auto-scrolling trending bar below the navbar */}

      <TrendingTicker />

      {/* Modern 3-Column newspaper editorial grid showing featured articles and newsletters */}
      <EditorialHeroGrid />

      {/* Split layout video showcase (left) paired with CIO dialogues grid (right) */}
      <VideoDialoguesShowcase videos={MOCK_VIDEOS} dialogues={MOCK_DIALOGUES} />

      {/* Showcase of upcoming ICT events and engagements */}
      <UpcomingEventsGrid />

      {/* Refined and modernized Founder's message */}
      <FoundersMessage />

      {/* Quick connection / lead capture section */}
      <ContactSection />
    </main>
  );
}
