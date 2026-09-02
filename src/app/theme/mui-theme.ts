import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary']
    tertiary: Palette['primary']
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary']
    tertiary?: PaletteOptions['primary']
  }
}

export function createAppTheme() {
  return createTheme({
    typography: {
      fontFamily: 'var(--rm-body-font)',
      h1: { fontFamily: 'var(--rm-heading-font)' },
      h2: { fontFamily: 'var(--rm-heading-font)' },
      h3: { fontFamily: 'var(--rm-heading-font)' },
    },
    palette: {
      primary: {
        main: 'rgb(var(--rm-primary-rgb))',
        light: 'rgb(var(--rm-primary-rgb))',
        dark: 'rgb(var(--rm-primary-rgb))',
        contrastText: 'rgb(var(--rm-on-primary-rgb))',
      },
      secondary: {
        main: 'rgb(var(--rm-secondary-rgb))',
        light: 'rgb(var(--rm-secondary-rgb))',
        dark: 'rgb(var(--rm-secondary-rgb))',
        contrastText: 'rgb(var(--rm-on-secondary-rgb))',
      },
      tertiary: {
        main: 'rgb(var(--rm-tertiary-rgb))',
        light: 'rgb(var(--rm-tertiary-rgb))',
        dark: 'rgb(var(--rm-tertiary-rgb))',
        contrastText: 'rgb(var(--rm-on-tertiary-rgb))',
      },
      error: {
        main: 'rgb(var(--rm-error-rgb))',
        light: 'rgb(var(--rm-error-rgb))',
        dark: 'rgb(var(--rm-error-rgb))',
        contrastText: 'rgb(var(--rm-on-error-rgb))',
      },
      accent: {
        main: 'rgb(var(--rm-accent-rgb))',
        light: 'rgb(var(--rm-accent-rgb))',
        dark: 'rgb(var(--rm-accent-rgb))',
      },
      background: { default: 'var(--rm-surface)', paper: 'var(--rm-surface-raised)' },
      text: { primary: 'rgb(var(--rm-ink-rgb))', secondary: 'rgb(var(--rm-muted-rgb))' },
      divider: 'var(--rm-outline-variant)',
    },
    shape: { borderRadius: 2 },
    components: {
      MuiButton: { defaultProps: { disableElevation: true } },
      MuiCard: { defaultProps: { variant: 'outlined' } },
      MuiOutlinedInput: { styleOverrides: { root: { '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--rm-focus)' } } } },
    },
  })
}