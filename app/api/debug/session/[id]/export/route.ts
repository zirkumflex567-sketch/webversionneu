import { NextRequest, NextResponse } from 'next/server'
import { requireDebugAdmin } from '@/src/debug/server/auth'
import { buildSessionExport } from '@/src/debug/server/export'
import { readFile } from 'node:fs/promises'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireDebugAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { id } = await params
  const built = await buildSessionExport(id)
  if (!built) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const content = await readFile(built.filePath)
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${built.fileName}"`,
    },
  })
}
