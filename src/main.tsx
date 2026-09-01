import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app/theme/typography.css'
import '@fontsource/raleway/500.css'
import '@fontsource/raleway/700.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'
import App from './App.tsx'
import { applyThemeBootstrap } from './app/theme/theme-bootstrap'
import { ThemeProvider } from './app/theme/theme-provider'

applyThemeBootstrap()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider><App /></ThemeProvider>
  </StrictMode>,
)
