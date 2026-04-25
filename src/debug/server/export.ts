import { readFile, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import JSZip from 'jszip'
import { getSession, getTimeline, getSessionDir } from './repository'

export async function buildSessionExport(sessionId: string): Promise<{ filePath: string; fileName: string } | null> {
  const session = await getSession(sessionId)
  if (!session) return null

  const timeline = await getTimeline(sessionId)
  const dir = getSessionDir(sessionId)
  const screenshotsPath = path.join(dir, 'screenshots')

  const zip = new JSZip()
  zip.file('session.json', JSON.stringify(session, null, 2))
  zip.file('timeline.json', JSON.stringify(timeline, null, 2))

  try {
    const screenshotEntries = await readdir(screenshotsPath, { withFileTypes: true })
    for (const entry of screenshotEntries) {
      if (!entry.isFile()) continue
      const full = path.join(screenshotsPath, entry.name)
      const content = await readFile(full)
      zip.file(`screenshots/${entry.name}`, content)
    }
  } catch {
    // no screenshots yet
  }

  const summaryMd = [
    `# Debug Session ${session.id}`,
    '',
    `Status: ${session.status}`,
    `Started: ${session.startedAt}`,
    `Ended: ${session.endedAt ?? '-'}`,
    `Duration(ms): ${session.durationMs ?? '-'}`,
    `Events: ${session.eventCount}`,
    `Screenshots: ${session.screenshotCount}`,
    '',
    '## Notes',
    session.summary ?? 'No summary provided.',
  ].join('\n')

  zip.file('summary.md', summaryMd)

  const buf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } })
  const fileName = `${sessionId}-export.zip`
  const filePath = path.join(dir, fileName)
  await writeFile(filePath, buf)

  return { filePath, fileName }
}
