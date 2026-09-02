import { createContext } from 'react'
import type { ThemePreference } from '../../models/theme'

export type ThemeContextValue = { theme: ThemePreference; setTheme: (theme: ThemePreference) => void; toggleTheme: () => void }

export const ThemeContext = createContext<ThemeContextValue | null>(null)
