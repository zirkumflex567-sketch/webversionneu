"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null

  setUser: (user: User | null, token: string | null) => void
  clearAuth: () => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user, token) => set({ user, token, error: null }),
      clearAuth: () => set({ user: null, token: null }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)
