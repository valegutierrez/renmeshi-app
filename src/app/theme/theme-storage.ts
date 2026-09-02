import { themePreferences, type ThemePreference } from '../../models/theme'

const themeKey = 'renmeshi-theme'

export function readThemePreference(): ThemePreference {
  try {
    const value = window.localStorage.getItem(themeKey)
    return themePreferences.includes(value as ThemePreference) ? value as ThemePreference : 'light'
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