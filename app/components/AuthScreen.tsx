"use client"

import { useEffect, useRef, useState } from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useAuthStore } from '@/src/auth/AuthStore'
import { authAPI } from '@/src/auth/AuthAPI'
import { readMagicLinkParams } from '@/src/auth/authUrl'

export default function AuthScreen({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const setError = useAuthStore((s) => s.setError)
  const setLoading = useAuthStore((s) => s.setLoading)
  const error = useAuthStore((s) => s.error)
  const isLoading = useAuthStore((s) => s.isLoading)

  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [codeStep, setCodeStep] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [emailFallbackMsg, setEmailFallbackMsg] = useState<string | null>(null)
  const autoVerifyRan = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function verifyCode(nextEmail: string, nextCode: string) {
    setLoading(true)
    try {
      const { token, user: userData } = await authAPI.verifyMagicLink(nextEmail, nextCode)
      setUser(userData, token)
      setError(null)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!mounted || autoVerifyRan.current) {
      return
    }

    const params = readMagicLinkParams(window.location.search)
    if (!params) {
      return
    }

    autoVerifyRan.current = true
    setTab('login')
    setEmail(params.email)
    setCode(params.code)
    setCodeStep(true)
    void verifyCode(params.email, params.code)
  }, [mounted])

  // Show nothing until hydrated to avoid flash of game content
  if (!mounted) return null

  const handleRegister = async () => {
    setLoading(true)
    try {
      const res = await authAPI.registerWithEmail(email)
      setCodeStep(true)
      setError(null)
      if (res.code) {
        setCode(res.code)
        const emailFailed = res.message?.includes('failed') || res.message?.includes('fehlgeschlagen')
        setEmailFallbackMsg(
          emailFailed
            ? `Email-Versand fehlgeschlagen. Dein Code: ${res.code}`
            : `Code auch hier sichtbar: ${res.code}`
        )
      } else {
        setEmailFallbackMsg(null)
      }
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    await verifyCode(email, code)
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setLoading(true)
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential received')
      }
      const { token, user: userData } = await authAPI.loginWithGoogle(
        credentialResponse.credential
      )
      setUser(userData, token)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  // Only show game if authenticated
  if (user) {
    return <>{children}</>
  }

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg border border-cyan-500">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">H-Town Combat 67</h1>

        {error && (
          <div className="bg-red-900 text-red-100 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setTab('login')
              setCodeStep(false)
              setCode('')
              setError(null)
            }}
            className={`flex-1 py-2 rounded font-semibold transition ${
              tab === 'login'
                ? 'bg-cyan-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setTab('register')
              setCodeStep(false)
              setCode('')
              setError(null)
            }}
            className={`flex-1 py-2 rounded font-semibold transition ${
              tab === 'register'
                ? 'bg-cyan-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Register
          </button>
        </div>

        {tab === 'register' && !codeStep && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black font-bold py-2 rounded transition"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </div>
        )}

        {codeStep && (
          <div className="space-y-4">
            {emailFallbackMsg ? (
              <div className="bg-yellow-900 border border-yellow-600 text-yellow-200 p-3 rounded text-sm font-mono">
                {emailFallbackMsg}
              </div>
            ) : (
              <p className="text-gray-300 text-sm">Check your email for a code</p>
            )}
            <input
              type="text"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 tracking-widest text-center"
            />
            <button
              onClick={handleVerifyCode}
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black font-bold py-2 rounded transition"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
            <button
              onClick={() => setCodeStep(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 rounded transition"
            >
              Back
            </button>
          </div>
        )}

        {tab === 'login' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google login failed')}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-500">or use magic link</span>
              </div>
            </div>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-bold py-2 rounded transition"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
