import { notFound } from 'next/navigation';
import SpeakerDetailClient from './SpeakerDetailClient';
import { getSpeakerBySlug } from '../speakerData';

type SpeakerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpeakerDetailPage({ params }: SpeakerPageProps) {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);

  if (!speaker) {
    notFound();
  }

  return <SpeakerDetailClient slug={slug} />;
}
