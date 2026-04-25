import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import { initializeDatabase } from '@/src/db/init'
import {
  findUserByEmail,
  createUser,
  setGoogleId,
  updateUserLastLogin,
} from '@/src/db/users'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-prod'
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '669658333594-764mv9b0fheq8uvkemrd0117eojocbe2.apps.googleusercontent.com'

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID)

interface GooglePayload {
  email: string
  sub: string
  email_verified?: boolean
  [key: string]: unknown
}

async function verifyGoogleToken(token: string): Promise<GooglePayload> {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload) {
      throw new Error('No payload in token')
    }

    if (!payload.email) {
      throw new Error('No email in token')
    }

    return {
      email: payload.email as string,
      sub: payload.sub as string,
      email_verified: payload.email_verified,
    } as GooglePayload
  } catch (error) {
    console.error('Token verification failed:', error)
    const err = new Error('Invalid Google token')
    if (error instanceof Error) {
      ;(err as Error & { cause?: Error }).cause = error
    }
    throw err
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase()

    const { googleToken } = await req.json()

    if (!googleToken) {
      return NextResponse.json({ error: 'Google token required' }, { status: 400 })
    }

    let payload
    try {
      payload = await verifyGoogleToken(googleToken)
    } catch {
      return NextResponse.json({ error: 'Invalid Google token' }, { status: 401 })
    }

    const email = payload.email
    if (!email) {
      return NextResponse.json({ error: 'No email in token' }, { status: 401 })
    }

    let user = await findUserByEmail(email)

    if (!user) {
      const userId = `user_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`
      user = await createUser(userId, email, payload.sub)
    } else if (!user.googleId) {
      await setGoogleId(email, payload.sub)
    }

    await updateUserLastLogin(user.id)

    const jwtToken = jwt.sign({ userId: user.id, email }, SECRET, { expiresIn: '24h' })

    return NextResponse.json({
      token: jwtToken,
      user: { id: user.id, email },
    })
  } catch (error) {
    console.error('Google auth error:', error)
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 })
  }
}
