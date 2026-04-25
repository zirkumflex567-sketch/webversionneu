import { NextRequest, NextResponse } from 'next/server'
import { requireDebugAdmin } from '@/src/debug/server/auth'
import { addEventsBatch } from '@/src/debug/server/repository'
import type { DebugEventInput } from '@/src/debug/types'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireDebugAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { id } = await params
  const body = (await req.json().catch(() => ({ events: [] }))) as { events?: DebugEventInput[] }
  const created = await addEventsBatch(id, body.events ?? [])
  return NextResponse.json({ created })
}
