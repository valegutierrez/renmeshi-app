import { useTheme } from '../../app/theme/use-theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '☾ Dark' : '☀ Light'}</button>
}
