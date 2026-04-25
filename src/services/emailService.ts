import nodemailer from 'nodemailer'

import { buildMagicLinkLoginUrl } from '@/src/auth/authUrl'

const mailHost = process.env.MAIL_HOST || 'smtp.gmail.com'
const mailPort = parseInt(process.env.MAIL_PORT || '465', 10)
const isSecure = mailPort === 465

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: isSecure,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export async function sendMagicLinkEmail(email: string, code: string) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const loginUrl = buildMagicLinkLoginUrl(appUrl, email, code)

    await transporter.sendMail({
      from: `REDLINE FC <${process.env.MAIL_FROM || 'zirkumflex666@gmail.com'}>`,
      to: email,
      subject: 'Your REDLINE FC Magic Link Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">REDLINE FC</h2>
          <p>Your magic link code is:</p>
          <div style="background: #1f2937; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <code style="font-size: 24px; font-weight: bold; color: #06b6d4; letter-spacing: 2px;">${code}</code>
          </div>
          <p style="margin-top: 20px;">Or click the link below to login directly:</p>
          <a href="${loginUrl}" style="display: inline-block; background: #06b6d4; color: black; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 10px 0;">Login to REDLINE FC</a>
          <p style="font-size: 13px; color: #999; margin-top: 20px;">This code expires in 10 minutes.</p>
          <p style="font-size: 13px; color: #999;">If you didn't request this code, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #374151; margin: 20px 0;">
          <p style="font-size: 12px; color: #9ca3af;">© 2026 REDLINE FC. All rights reserved.</p>
        </div>
      `,
      text: `Your REDLINE FC magic link code is: ${code}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this code, you can safely ignore this email.`,
    })

    console.log(`[EMAIL SENT] Magic link code sent to ${email}`)
    return true
  } catch (error) {
    console.error('[EMAIL ERROR]', error)
    throw error
  }
}
