import { useEffect, useState, type PropsWithChildren } from 'react'
import type { ThemePreference } from '../../models/theme'
import { readThemePreference, writeThemePreference } from './theme-storage'
import { ThemeContext } from './theme-context'
import './tokens.css'

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemePreference>(readThemePreference)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeThemePreference(theme)
  }, [theme])
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light') }}>{children}</ThemeContext.Provider>
}
