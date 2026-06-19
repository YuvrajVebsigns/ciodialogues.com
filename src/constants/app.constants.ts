export const APP_CONFIG = {
  name: 'Core Media',
  description: 'Core Media Administration Dashboard',
  version: '1.0.0',
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://ciopowerlist.com/api/v1';

/** Must match the domain configured in the admin backend for this website. */
export const WEBSITE_DOMAIN = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN ?? 'ciopowerlist.com';

export const AUTH_COOKIE_NAME = 'cm_auth_token';
export const REFRESH_COOKIE_NAME = 'cm_refresh_token';

export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 10,
  maxLimit: 100,
} as const;
