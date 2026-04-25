import { initializeDatabase, readDatabase, writeDatabase, StoredUserRecord } from './init'

export interface User {
  id: string
  email: string
  googleId?: string
  createdAt: string
  lastLoginAt?: string
  magicCode?: string
  magicCodeExpires?: number
  progress?: unknown
}

function cloneUser(user: StoredUserRecord): User {
  return {
    id: user.id,
    email: user.email,
    googleId: user.googleId,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
    magicCode: user.magicCode,
    magicCodeExpires: user.magicCodeExpires,
    progress: user.progress ?? null,
  }
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  await initializeDatabase()
  const db = await readDatabase()
  const user = db.users.find((entry) => entry.email === email)
  return user ? cloneUser(user) : undefined
}

export async function findUserById(id: string): Promise<User | undefined> {
  await initializeDatabase()
  const db = await readDatabase()
  const user = db.users.find((entry) => entry.id === id)
  return user ? cloneUser(user) : undefined
}

export async function createUser(
  id: string,
  email: string,
  googleId?: string
): Promise<User> {
  await initializeDatabase()
  const db = await readDatabase()
  const now = new Date().toISOString()
  const user: StoredUserRecord = {
    id,
    email,
    googleId,
    createdAt: now,
    progress: null,
  }
  db.users.push(user)
  await writeDatabase(db)
  return cloneUser(user)
}

export async function updateUserMagicCode(
  email: string,
  code: string,
  expiresAt: number
): Promise<void> {
  const db = await readDatabase()
  const user = db.users.find((entry) => entry.email === email)
  if (!user) return
  user.magicCode = code
  user.magicCodeExpires = expiresAt
  await writeDatabase(db)
}

export async function clearUserMagicCode(email: string): Promise<void> {
  const db = await readDatabase()
  const user = db.users.find((entry) => entry.email === email)
  if (!user) return
  delete user.magicCode
  delete user.magicCodeExpires
  await writeDatabase(db)
}

export async function updateUserLastLogin(id: string): Promise<void> {
  const db = await readDatabase()
  const user = db.users.find((entry) => entry.id === id)
  if (!user) return
  user.lastLoginAt = new Date().toISOString()
  await writeDatabase(db)
}

export async function updateUserProgress(id: string, progress: unknown): Promise<void> {
  const db = await readDatabase()
  const user = db.users.find((entry) => entry.id === id)
  if (!user) return
  user.progress = progress
  await writeDatabase(db)
}

export async function getUserProgress(id: string): Promise<unknown> {
  const db = await readDatabase()
  const user = db.users.find((entry) => entry.id === id)
  return user?.progress ?? null
}

export async function setGoogleId(email: string, googleId: string): Promise<void> {
  const db = await readDatabase()
  const user = db.users.find((entry) => entry.email === email)
  if (!user) return
  user.googleId = googleId
  await writeDatabase(db)
}
