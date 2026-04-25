import { buildAuthApiBase } from './authUrl'

// Prefer a browser-safe relative path under the configured basePath in production.
const API_BASE = buildAuthApiBase({
  explicitApiUrl: process.env.NEXT_PUBLIC_API_URL,
  explicitBasePath: process.env.NEXT_PUBLIC_BASE_PATH,
})

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
  }
}

export const authAPI = {
  async registerWithEmail(email: string): Promise<{ success: boolean; code: string; message: string }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },

  async verifyMagicLink(email: string, code: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },

  async loginWithGoogle(googleToken: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ googleToken }),
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },

  async saveProgress(token: string, progress: Record<string, unknown>): Promise<void> {
    const res = await fetch(`${API_BASE}/progress/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(progress),
    })
    if (!res.ok) throw new Error(await res.text())
  },

  async loadProgress(token: string): Promise<Record<string, unknown>> {
    const res = await fetch(`${API_BASE}/progress/load`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json() as Promise<Record<string, unknown>>
  },
}
