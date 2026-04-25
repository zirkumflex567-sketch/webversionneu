import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { initializeDatabase } from '@/src/db/init'
import {
  findUserByEmail,
  clearUserMagicCode,
  updateUserLastLogin,
} from '@/src/db/users'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-prod'

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase()

    const { email, code } = await req.json()

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code required' }, { status: 400 })
    }

    const user = await findUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    if (user.magicCode !== code) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 401 })
    }

    if (!user.magicCodeExpires || user.magicCodeExpires < Date.now()) {
      return NextResponse.json({ error: 'Code expired' }, { status: 401 })
    }

    const token = jwt.sign({ userId: user.id, email }, SECRET, { expiresIn: '24h' })

    await clearUserMagicCode(email)
    await updateUserLastLogin(user.id)

    return NextResponse.json({
      token,
      user: { id: user.id, email },
    })
  } catch (error) {
    console.error('Verify code error:', error)
    return NextResponse.json({ error: 'Failed to verify code' }, { status: 500 })
  }
}
