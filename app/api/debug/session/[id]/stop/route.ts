import { NextRequest, NextResponse } from 'next/server'
import { requireDebugAdmin } from '@/src/debug/server/auth'
import { updateSessionStatus } from '@/src/debug/server/repository'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireDebugAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { id } = await params
  const body = (await req.json().catch(() => ({}))) as { summary?: string; timestampMs?: number }
  const session = await updateSessionStatus(id, 'completed', { summary: body.summary ?? '', end: true, timestampMs: body.timestampMs })
  if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ sessionId: session.id, status: session.status, downloadUrl: `/api/debug/session/${id}/export` })
}
