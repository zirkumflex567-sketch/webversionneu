import { NextRequest, NextResponse } from 'next/server'
import { requireDebugAdmin } from '@/src/debug/server/auth'
import { listSessions } from '@/src/debug/server/repository'

export async function GET(req: NextRequest) {
  const auth = requireDebugAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const sessions = await listSessions()
  return NextResponse.json({ sessions })
}
