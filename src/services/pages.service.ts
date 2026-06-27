import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';
import { buildWebsiteAuthHeaders, ensureWebsiteAuth, getWebsiteDomain } from '@/lib/website-auth';

export interface WebsitePageContentBlock {
  id?: string;
  type?: string;
  data?: Record<string, unknown>;
}

export interface WebsitePageContent {
  time?: number;
  blocks?: WebsitePageContentBlock[];
  version?: string;
}

export interface WebsitePageSection {
  type?: string;
  order?: number;
  data?: Record<string, unknown>;
}

export interface WebsitePage {
  siteId?: string;
  title?: string;
  slug?: string;
  shortDescription?: string;
  content?: WebsitePageContent;
  pageType?: string;
  status?: string;
  sections?: WebsitePageSection[];
  isHomepage?: boolean;
  publishedAt?: string;
  seo?: Record<string, unknown>;
  createdBy?: string;
  updatedBy?: string;
  id?: string;
}

export interface WebsitePageApiResponse {
  success: boolean;
  message: string;
  data: WebsitePage;
}

export type PageTestimonial = {
  author?: string;
  role?: string;
  quote?: string;
  avatar?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizePageResponse(res: unknown): WebsitePageApiResponse {
  if (isRecord(res) && isRecord(res.data) && isRecord(res.data.data)) {
    return {
      success: Boolean(res.success ?? true),
      message: String(res.message ?? 'Operation successful'),
      data: res.data.data as WebsitePage,
    };
  }

  if (isRecord(res) && isRecord(res.data)) {
    return {
      success: Boolean(res.success ?? true),
      message: String(res.message ?? 'Operation successful'),
      data: res.data as WebsitePage,
    };
  }

  return {
    success: false,
    message: 'Invalid page response',
    data: {},
  };
}

export async function fetchWebsitePageBySlug(slug: string): Promise<WebsitePageApiResponse> {
  const domain = getWebsiteDomain();
  const auth = await ensureWebsiteAuth(domain);

  const headers = {
    ...buildWebsiteAuthHeaders(auth),
    'x-website-domain': domain,
  };

  const res = await apiFetch<unknown>(API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug), {
    requireAuth: false,
    method: 'GET',
    headers,
  });

  return normalizePageResponse(res);
}

export function getPageTestimonials(page?: WebsitePage): PageTestimonial[] {
  if (!page) return [];

  const fromSections = page.sections?.find((section) => section.type === 'TESTIMONIALS')?.data
    ?.testimonials;

  if (Array.isArray(fromSections)) {
    return fromSections as PageTestimonial[];
  }

  const fromBlocks = page.content?.blocks?.find((block) => block.type === 'testimonialsSection')
    ?.data?.testimonials;

  if (Array.isArray(fromBlocks)) {
    return fromBlocks as PageTestimonial[];
  }

  return [];
}
