interface AuthApiBaseOptions {
  explicitApiUrl?: string
  explicitBasePath?: string
}

function isLocalhostUrl(value: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/i.test(value)
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

function normalizeBasePath(basePath?: string): string {
  if (!basePath) {
    return ''
  }

  const trimmed = trimTrailingSlash(basePath.trim())
  if (!trimmed) {
    return ''
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export function buildAuthApiBase({
  explicitApiUrl,
  explicitBasePath,
}: AuthApiBaseOptions): string {
  const apiUrl = trimTrailingSlash(explicitApiUrl?.trim() ?? '')
  if (apiUrl && !isLocalhostUrl(apiUrl)) {
    return apiUrl
  }

  const basePath = normalizeBasePath(explicitBasePath)
  if (basePath) {
    return `${basePath}/api`
  }

  return process.env.NODE_ENV === 'production' ? '/combat/api' : '/api'
}

export function buildMagicLinkLoginUrl(appUrl: string, email: string, code: string): string {
  const baseUrl = trimTrailingSlash(appUrl.trim())
  const params = new URLSearchParams({
    email,
    code,
  })
  return `${baseUrl}?${params.toString()}`
}

export function readMagicLinkParams(search: string): { email: string; code: string } | null {
  const params = new URLSearchParams(search)
  const email = params.get('email')?.trim() ?? ''
  const code = params.get('code')?.trim() ?? ''

  if (!email || !code) {
    return null
  }

  return { email, code }
}
