import { NextRequest, NextResponse } from 'next/server'
import { requireDebugAdmin } from '@/src/debug/server/auth'
import { getTimeline } from '@/src/debug/server/repository'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireDebugAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { id } = await params
  const timeline = await getTimeline(id)
  return NextResponse.json({ events: timeline })
}
