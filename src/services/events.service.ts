import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  ensureWebsiteAuth as obtainWebsiteAuth,
  getWebsiteDomain,
} from '@/lib/website-auth';
import type { WebsiteAuth } from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

export type WebsiteEvent = {
  id: string;
  title?: string;
  slug?: string;
  description?: string;
  excerpt?: string;
  type?: string;
  startsAt?: string;
  startDate?: string;
  endDate?: string;
  totalRegistrations?: number;
  [key: string]: unknown;
};

type RawEvent = Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getRecordValue(source: unknown, key: string): unknown {
  return isRecord(source) ? source[key] : undefined;
}

function getStringValue(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function normalizeEvent(it: RawEvent): WebsiteEvent {
  return {
    id: String(it.id ?? it._id ?? it.eventId ?? it.uid ?? it.slug ?? ''),
    title:
      getStringValue(it.title) ??
      getStringValue(it.name) ??
      getStringValue(it.eventName) ??
      undefined,
    slug: getStringValue(it.slug) ?? undefined,
    description:
      getStringValue(it.description) ??
      getStringValue(it.excerpt) ??
      getStringValue(it.summary) ??
      undefined,
    excerpt: getStringValue(it.excerpt) ?? undefined,
    type: getStringValue(it.type) ?? undefined,
    startsAt: getStringValue(it.startsAt) ?? getStringValue(it.startDate) ?? undefined,
    startDate: getStringValue(it.startDate) ?? undefined,
    endDate: getStringValue(it.endDate) ?? undefined,
    totalRegistrations:
      typeof it.totalRegistrations === 'number' ? it.totalRegistrations : undefined,
    ...it,
  };
}

function normalizeEventsResponse(res: unknown): WebsiteEvent[] {
  const items =
    isRecord(res) && isRecord(res.data) && Array.isArray(res.data.data)
      ? res.data.data
      : isRecord(res) && Array.isArray(res.data)
        ? res.data
        : isRecord(res) && Array.isArray(res.items)
          ? res.items
          : isRecord(res) && Array.isArray(res.results)
            ? res.results
            : [];

  return items.map((item) => normalizeEvent(item as RawEvent));
}

export function readStoredWebsiteAuth(): WebsiteAuth | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem('websiteAuth');
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      isRecord(parsed) &&
      typeof parsed.token === 'string' &&
      typeof parsed.websiteId === 'string'
    ) {
      return {
        token: parsed.token,
        websiteId: parsed.websiteId,
        domain: typeof parsed.domain === 'string' ? parsed.domain : getWebsiteDomain(),
      } as WebsiteAuth;
    }
  } catch {
    return null;
  }

  return null;
}

async function ensureWebsiteAuth(domain: string): Promise<WebsiteAuth | null> {
  if (typeof window === 'undefined') return null;

  const stored = readStoredWebsiteAuth();
  if (stored?.token && stored.websiteId) return stored;

  const tokenRes = await apiFetch<unknown>(
    `/api/v1/website/token?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,
      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': domain,
      },
      body: JSON.stringify({ domain }),
    },
  );

  const token =
    getStringValue(getRecordValue(tokenRes, 'token')) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'token')) ??
    getStringValue(
      getRecordValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'data'), 'token'),
    ) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'website'), 'token')) ??
    null;

  const websiteId =
    getStringValue(getRecordValue(tokenRes, 'websiteId')) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'website'), 'id')) ??
    getStringValue(
      getRecordValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'website'), 'id'),
    ) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'websiteId')) ??
    getStringValue(getRecordValue(tokenRes, 'id')) ??
    null;

  if (!token || !websiteId) return null;

  const value = { token, websiteId, domain } as WebsiteAuth;
  window.localStorage.setItem('websiteAuth', JSON.stringify(value));
  return value;
}

function getApiErrorStatus(error: unknown) {
  if (isRecord(error) && 'statusCode' in error) {
    const statusCode = error.statusCode;
    return typeof statusCode === 'number' ? statusCode : Number(statusCode);
  }

  if (isRecord(error) && 'status' in error) {
    const status = error.status;
    return typeof status === 'number' ? status : Number(status);
  }

  return undefined;
}

export async function fetchWebsiteEvents(): Promise<WebsiteEvent[]> {
  const domain = getWebsiteDomain();
  let auth: WebsiteAuth | null = readStoredWebsiteAuth();

  if (!auth?.token || !auth.websiteId) {
    auth = await ensureWebsiteAuth(domain);
  }

  if (!auth?.token || !auth.websiteId) return [];

  try {
    const res = await apiFetch<unknown>(`${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?page=1&limit=10`, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });

    return normalizeEventsResponse(res);
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      const freshAuth = await ensureWebsiteAuth(domain);
      if (!freshAuth?.token || !freshAuth.websiteId) return [];

      const res = await apiFetch<unknown>(`${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?page=1&limit=10`, {
        method: 'GET',
        requireAuth: false,
        headers: buildWebsiteAuthHeaders(freshAuth),
      });

      return normalizeEventsResponse(res);
    }

    return [];
  }
}

export async function fetchWebsiteEventByIdOrSlug(idOrSlug: string): Promise<WebsiteEvent | null> {
  const domain = getWebsiteDomain();
  let auth: WebsiteAuth | null = readStoredWebsiteAuth();

  if (!auth?.token || !auth.websiteId) {
    auth = await obtainWebsiteAuth(domain);
  }

  if (!auth?.token || !auth.websiteId) return null;

  try {
    const res = await apiFetch<unknown>(
      API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(encodeURIComponent(idOrSlug)),
      {
        method: 'GET',
        requireAuth: false,
        headers: buildWebsiteAuthHeaders(auth),
      },
    );

    const data =
      isRecord(res) && isRecord(res.data) && isRecord(res.data.data)
        ? res.data.data
        : isRecord(res) && isRecord(res.data)
          ? res.data
          : isRecord(res)
            ? res
            : null;

    if (!data) return null;

    return normalizeEvent(data as RawEvent);
  } catch {
    return null;
  }
}
