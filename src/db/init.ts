import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export interface StoredUserRecord {
  id: string
  email: string
  googleId?: string
  createdAt: string
  lastLoginAt?: string
  magicCode?: string
  magicCodeExpires?: number
  progress?: unknown
}

interface DatabaseShape {
  users: StoredUserRecord[]
}

const dataDir = path.join(process.cwd(), '.data')
const dbPath = path.join(dataDir, 'redline-users.json')

function emptyDatabase(): DatabaseShape {
  return { users: [] }
}

async function ensureDatabaseFile(): Promise<void> {
  await mkdir(dataDir, { recursive: true })
  try {
    await readFile(dbPath, 'utf8')
  } catch {
    await writeFile(dbPath, JSON.stringify(emptyDatabase(), null, 2), 'utf8')
  }
}

export async function initializeDatabase(): Promise<void> {
  await ensureDatabaseFile()
}

export async function readDatabase(): Promise<DatabaseShape> {
  await ensureDatabaseFile()
  try {
    const raw = await readFile(dbPath, 'utf8')
    const parsed = JSON.parse(raw) as Partial<DatabaseShape>
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
    }
  } catch {
    return emptyDatabase()
  }
}

export async function writeDatabase(data: DatabaseShape): Promise<void> {
  await ensureDatabaseFile()
  await writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8')
}
