import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { initializeDatabase } from '@/src/db/init'
import { findUserById, updateUserProgress } from '@/src/db/users'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-prod'

function verifyToken(req: NextRequest): { userId: string; email: string } | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string; email: string }
    return decoded
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase()

    const decoded = verifyToken(req)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const progress = await req.json()

    const user = await findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await updateUserProgress(decoded.userId, progress)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save progress error:', error)
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
  }
}
