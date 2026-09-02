import { useEffect, useState, type PropsWithChildren } from 'react'
import { themePreferences, type ThemePreference } from '../../models/theme'
import { readThemePreference, writeThemePreference } from './theme-storage'
import { ThemeContext } from './theme-context'
import { createAppTheme } from './mui-theme'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import './tokens.css'

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemePreference>(readThemePreference)
  useEffect(() => {
    const [mode, contrast] = theme.split('-')
    document.documentElement.dataset.theme = mode
    document.documentElement.dataset.contrast = contrast ?? 'standard'
    writeThemePreference(theme)
  }, [theme])
  return <MuiThemeProvider theme={createAppTheme()}><ThemeContext.Provider value={{ theme, setTheme, toggleTheme: () => setTheme((current) => themePreferences[(themePreferences.indexOf(current) + 1) % themePreferences.length]) }}>{children}</ThemeContext.Provider></MuiThemeProvider>
}
