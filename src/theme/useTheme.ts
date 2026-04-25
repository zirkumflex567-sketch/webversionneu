import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeState, UITheme } from './types'

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      uiTheme: 'wasteland',
      setUITheme: (theme: UITheme) => set({ uiTheme: theme }),
    }),
    {
      name: 'ui-theme-storage',
    }
  )
)

export const useTheme = () => {
  const { uiTheme, setUITheme } = useThemeStore()
  return { uiTheme, setUITheme }
}
