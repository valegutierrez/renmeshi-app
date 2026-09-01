import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react'
import type { ThemePreference } from '../../models/theme'
import { readThemePreference, writeThemePreference } from './theme-storage'
import './tokens.css'

type ThemeContextValue = { theme: ThemePreference; toggleTheme: () => void }
const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemePreference>(readThemePreference)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeThemePreference(theme)
  }, [theme])
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light') }}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}