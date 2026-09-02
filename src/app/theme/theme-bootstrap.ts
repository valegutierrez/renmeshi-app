import { readThemePreference } from './theme-storage'

export function applyThemeBootstrap(): void {
  const preference = readThemePreference()
  const [theme, contrast] = preference.split('-')
  document.documentElement.dataset.theme = theme
  document.documentElement.dataset.contrast = contrast ?? 'standard'
}