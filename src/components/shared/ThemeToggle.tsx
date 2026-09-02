import { useTheme } from '../../app/theme/use-theme'
import { Button } from '@mui/material'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return <Button className="icon-button" color="inherit" variant="text" sx={{ color: 'var(--rm-ink)' }} type="button" onClick={toggleTheme} aria-label={`Switch to ${nextTheme} theme`}>Theme: {theme}</Button>
}
