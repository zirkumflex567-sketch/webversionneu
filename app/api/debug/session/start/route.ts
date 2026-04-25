import { NextRequest, NextResponse } from 'next/server'
import { requireDebugAdmin } from '@/src/debug/server/auth'
import { createDebugSession } from '@/src/debug/server/repository'
import type { DebugSessionStartRequest } from '@/src/debug/types'

export async function POST(req: NextRequest) {
  const auth = requireDebugAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

  const payload = (await req.json().catch(() => ({}))) as DebugSessionStartRequest
  const session = await createDebugSession(auth.user.email, payload)

  return NextResponse.json({
    sessionId: session.id,
    status: session.status,
    startedAt: session.startedAt,
  })
}
