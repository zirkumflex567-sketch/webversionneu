"use client"

import { useState } from "react"
import { useGameStore } from "../../src/store"
import { useAuthStore } from "../../src/auth/AuthStore"
import { authAPI } from "../../src/auth/AuthAPI"
import { GoogleLogin } from "@react-oauth/google"
import { GlitchHeader, ScanlineOverlay } from "./UIElements"
import { useT } from "../../src/i18n/useT"

export default function LoginView() {
  const t = useT()
  const { setPhase } = useGameStore()
  const { setUser, setLoading, setError, isLoading, error } = useAuthStore()
  
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      setLoading(true)
      const res = authAPI.loginWithGoogle(credentialResponse.credential)
      res.then(data => {
        setUser(data.user, data.token)
        setPhase("Loading")
      }).catch((err: unknown) => {
        setError(err instanceof Error ? err.message : t("ui.login.google_failed"))
      })
    } catch {
      setError(t("ui.login.unexpected_error"))
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      setLoading(true)
      await authAPI.registerWithEmail(email)
      setStep("code")
      setError(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("ui.login.email_registration_failed"))
    } finally {
      setLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return
    try {
      setLoading(true)
      const res = await authAPI.verifyMagicLink(email, code)
      setUser(res.user, res.token)
      setPhase("Loading")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("ui.login.invalid_verification_code"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#040810] flex items-center justify-center font-inter overflow-hidden">
      <div className="noise-bg pointer-events-none opacity-20"></div>
      <ScanlineOverlay />
      
      <div className="relative w-full max-w-md p-8 border-4 border-black bg-black/60 backdrop-blur-xl shadow-[12px_12px_0_0_#000] z-10">
        {/* Decorative corner */}
        <div className="absolute -top-1 -left-1 w-12 h-12 border-t-8 border-l-8 border-[#00ffaa]"></div>
        
        <header className="mb-10 text-center">
          <GlitchHeader text="COMMAND ACCESS" />
          <p className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase mt-4">{t("ui.login.identify_or_register")}</p>
        </header>

        <div className="space-y-8">
          {/* Google Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10"></div>
              <span className="text-[9px] font-bold text-white/20 tracking-widest uppercase">{t("ui.login.fast_sync")}</span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            
            <div className="flex justify-center border-2 border-white/5 p-4 bg-white/5 hover:bg-white/10 transition-all">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError(t("ui.login.google_failed"))}
                theme="filled_black"
                shape="square"
                text="continue_with"
                width="100%"
              />
            </div>
          </div>

          {/* Email Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10"></div>
              <span className="text-[9px] font-bold text-white/20 tracking-widest uppercase">{t("ui.login.legacy_protocol")}</span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder={t("ui.login.enter_email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border-4 border-black p-4 font-bebas text-2xl tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-[#00ffaa]/50 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#00ffaa]/20"></div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-wasteland-premium w-full h-14 text-xl tracking-[0.2em]"
                >
                  {isLoading ? t("ui.login.transmitting") : t("ui.auth.send_magic_link")}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("ui.login.verification_code")}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-black border-4 border-black p-4 font-bebas text-2xl tracking-widest text-[#ffaa00] placeholder:text-white/10 focus:outline-none focus:border-[#ffaa00]/50 transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-wasteland-premium flex-1 h-14 text-xl tracking-[0.2em] border-[#ffaa00] text-[#ffaa00]"
                  >
                    {isLoading ? t("ui.auth.verifying") : t("ui.login.confirm_access")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="w-14 h-14 border-4 border-black bg-white/5 flex items-center justify-center hover:bg-white/10 text-white/40"
                  >
                    ↺
                  </button>
                </div>
              </form>
            )}
          </div>

          {error && (
            <div className="p-4 border-2 border-[#ff4444] bg-[#ff4444]/10">
              <p className="text-[10px] font-black text-[#ff4444] tracking-widest uppercase mb-1">{t("ui.login.system_error")}</p>
              <p className="text-xs text-white/80 uppercase">{error}</p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-[9px] font-bold text-white/10 tracking-[0.5em] uppercase">{t("ui.login.footer")}</p>
        </footer>
      </div>
    </div>
  )
}
