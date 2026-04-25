import { NextRequest, NextResponse } from 'next/server'
import { requireDebugAdmin } from '@/src/debug/server/auth'
import { addEvent } from '@/src/debug/server/repository'
import type { DebugEventInput } from '@/src/debug/types'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireDebugAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { id } = await params
  const payload = (await req.json()) as DebugEventInput
  const event = await addEvent(id, payload)
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ eventId: event.id })
}
