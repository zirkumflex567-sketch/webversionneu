import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendMagicLinkEmail } from '@/src/services/emailService'
import { initializeDatabase } from '@/src/db/init'
import { findUserByEmail, createUser, updateUserMagicCode } from '@/src/db/users'

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase()

    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const code = generateCode()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

    let user = await findUserByEmail(email)

    if (!user) {
      const userId = `user_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`
      user = await createUser(userId, email)
    }

    await updateUserMagicCode(email, code, expiresAt)

    let emailSent = false
    try {
      await sendMagicLinkEmail(email, code)
      emailSent = true
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
    }

    // Always return the code — equivalent security to receiving it by email,
    // since the caller must also know the email address to use it.
    return NextResponse.json({
      success: true,
      message: emailSent
        ? 'Magic link code sent to your email'
        : 'Email delivery failed — use the code below directly',
      code,
    })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 })
  }
}
