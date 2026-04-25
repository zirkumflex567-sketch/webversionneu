import { NextRequest, NextResponse } from 'next/server'
import { requireDebugAdmin } from '@/src/debug/server/auth'
import { addEvent, writeScreenshot } from '@/src/debug/server/repository'
import type { DebugSeverity } from '@/src/debug/types'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireDebugAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { id } = await params
  const body = (await req.json()) as {
    timestampMs: number
    description?: string
    category?: string
    severity?: DebugSeverity
    tags?: string[]
    stateSnapshot?: Record<string, unknown>
    image?: string
  }

  if (!body.image) return NextResponse.json({ error: 'Image required' }, { status: 400 })

  const screenshotPath = await writeScreenshot(id, body.timestampMs ?? 0, body.image)
  const event = await addEvent(id, {
    timestampMs: body.timestampMs ?? 0,
    eventType: 'screenshot_taken',
    category: body.category ?? 'visual',
    severity: body.severity ?? 'minor',
    description: body.description,
    tags: body.tags ?? [],
    stateSnapshot: body.stateSnapshot,
    screenshotPath,
    title: 'Screenshot captured',
  })

  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ eventId: event.id, screenshotPath })
}
