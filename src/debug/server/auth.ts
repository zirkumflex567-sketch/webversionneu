import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-prod'
export const DEBUG_ADMIN_EMAIL = 'kevin@sieg.me'

export interface AuthDebugUser {
  userId: string
  email: string
}

export function parseBearer(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null
  return authHeader.slice(7)
}

export function verifyJwtFromRequest(req: NextRequest): AuthDebugUser | null {
  const token = parseBearer(req)
  if (!token) return null
  try {
    const decoded = jwt.verify(token, SECRET) as AuthDebugUser
    if (!decoded?.email || !decoded?.userId) return null
    return decoded
  } catch {
    return null
  }
}

export function requireDebugAdmin(req: NextRequest): { ok: true; user: AuthDebugUser } | { ok: false; status: number; error: string } {
  const user = verifyJwtFromRequest(req)
  if (!user) return { ok: false, status: 401, error: 'Unauthorized' }
  if (user.email.toLowerCase() !== DEBUG_ADMIN_EMAIL) return { ok: false, status: 403, error: 'Forbidden' }
  return { ok: true, user }
}
