import { createContext, useContext } from 'react'

export type Theme = 'system' | 'light' | 'dark'

export interface ThemeCtx {
  theme: Theme
  resolved: 'light' | 'dark'
  setTheme: (t: Theme) => void
}

export const Ctx = createContext<ThemeCtx | null>(null)

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
