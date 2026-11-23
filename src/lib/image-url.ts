const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.core-mediagroup.com';

const BACKEND_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return '';
  }
})();

export function extractImageUrl(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') {
      return undefined;
    }

    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith('//')) return `https:${trimmed}`;
    if (trimmed.startsWith('/')) return BACKEND_ORIGIN ? `${BACKEND_ORIGIN}${trimmed}` : trimmed;

    return BACKEND_ORIGIN
      ? `${BACKEND_ORIGIN}/${trimmed.replace(/^\/+/, '')}`
      : `/${trimmed.replace(/^\/+/, '')}`;
  }

  if (typeof value !== 'object' || value === null) return undefined;

  const image = value as Record<string, unknown>;
  const fields = [
    'url',
    'src',
    'path',
    'imageUrl',
    'secure_url',
    'original',
    'large',
    'medium',
    'small',
    'thumbnail',
    'urlVariants',
  ];

  for (const field of fields) {
    const imageUrl = extractImageUrl(image[field]);
    if (imageUrl) return imageUrl;
  }

  return undefined;
}
