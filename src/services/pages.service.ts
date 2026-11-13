import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
  getWebsiteDomain,
} from '@/lib/website-auth';

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
  const endpoint = API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug);
  const fetchPage = async (token: Awaited<ReturnType<typeof ensureWebsiteAuth>>) =>
    apiFetch<unknown>(endpoint, {
      requireAuth: false,
      method: 'GET',
      headers: {
        ...buildWebsiteAuthHeaders(token),
        'x-website-domain': domain,
      },
    });

  let res: unknown;
  try {
    res = await fetchPage(await ensureWebsiteAuth(domain));
  } catch (error) {
    if (getApiErrorStatus(error) !== 401) {
      throw error;
    }

    clearWebsiteAuth();
    res = await fetchPage(await ensureWebsiteAuth(domain));
  }

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
