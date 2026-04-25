export const ALLOWED_CORS_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3010',
  'http://h-town.duckdns.org',
  'https://h-town.duckdns.org',
] as const

export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false
  return (ALLOWED_CORS_ORIGINS as readonly string[]).includes(origin)
}
