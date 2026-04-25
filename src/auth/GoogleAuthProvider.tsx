"use client"

import { GoogleOAuthProvider } from '@react-oauth/google'

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "669658333594-764mv9b0fheq8uvkemrd0117eojocbe2.apps.googleusercontent.com"}>
      {children}
    </GoogleOAuthProvider>
  )
}
