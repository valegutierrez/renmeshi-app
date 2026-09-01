import { readThemePreference } from './theme-storage'

export function applyThemeBootstrap(): void {
  document.documentElement.dataset.theme = readThemePreference()
}