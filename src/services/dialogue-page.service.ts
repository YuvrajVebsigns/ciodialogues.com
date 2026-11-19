import { fetchWebsitePageBySlug, getPageTestimonials } from '@/services/pages.service';
import type { PageTestimonial } from '@/services/pages.service';

export interface DialogueItem {
  id: number;
  slug: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export async function fetchDialogues(fallbackDialogues: DialogueItem[]): Promise<DialogueItem[]> {
  const page = await fetchWebsitePageBySlug('dialogues');
  const testimonials = getPageTestimonials(page.data).filter(
    (item) => item.author || item.quote || item.avatar,
  );

  if (testimonials.length === 0) return fallbackDialogues;

  return testimonials.map((item: PageTestimonial, index) => {
    const fallback = fallbackDialogues[index];
    const author = item.author?.trim() || fallback?.author || 'CIO Dialogues';

    return {
      id: fallback?.id ?? index + 1,
      slug:
        fallback?.slug ??
        author
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
      quote: item.quote?.trim() || fallback?.quote || '',
      author,
      role: item.role?.trim() || fallback?.role || '',
      avatar: item.avatar?.trim() || fallback?.avatar || '/assets/dialoges/client-2.webp',
    };
  });
}
