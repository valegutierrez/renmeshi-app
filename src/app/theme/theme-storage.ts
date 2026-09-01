import type { ThemePreference } from '../../models/theme'

const themeKey = 'renmeshi-theme'

export function readThemePreference(): ThemePreference {
  try {
    return window.localStorage.getItem(themeKey) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function writeThemePreference(theme: ThemePreference): void {
  try {
    window.localStorage.setItem(themeKey, theme)
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }
}