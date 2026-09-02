import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function channel(value: string): number {
  const parsed = Number.parseInt(value, 16) / 255
  return parsed <= 0.03928 ? parsed / 12.92 : ((parsed + 0.055) / 1.055) ** 2.4
}

function contrastRatio(foreground: string, background: string): number {
  const luminance = (color: string) => {
    const channels = [channel(color.slice(1, 3)), channel(color.slice(3, 5)), channel(color.slice(5, 7))]
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  }
  const foregroundLuminance = luminance(foreground)
  const backgroundLuminance = luminance(background)
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
}

describe('theme token contrast', () => {
  it('exposes every light and dark scheme role from the Material Theme export', () => {
    const tokens = readFileSync(resolve(import.meta.dirname, '../../src/app/theme/tokens.css'), 'utf8')
    const roles = [
      'primary', 'surface-tint', 'on-primary', 'primary-container', 'on-primary-container',
      'accent',
      'secondary', 'on-secondary', 'secondary-container', 'on-secondary-container',
      'tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container',
      'error', 'on-error', 'error-container', 'on-error-container', 'surface',
      'on-background', 'surface-variant', 'on-surface', 'on-surface-variant', 'outline',
      'outline-variant', 'shadow', 'scrim', 'inverse-surface', 'inverse-on-surface',
      'inverse-primary', 'primary-fixed', 'on-primary-fixed', 'primary-fixed-dim',
      'on-primary-fixed-variant', 'secondary-fixed', 'on-secondary-fixed',
      'secondary-fixed-dim', 'on-secondary-fixed-variant', 'tertiary-fixed',
      'on-tertiary-fixed', 'tertiary-fixed-dim', 'on-tertiary-fixed-variant',
      'surface-dim', 'surface-bright', 'surface-container-lowest', 'surface-container-low',
      'surface-container', 'surface-container-high', 'surface-container-highest',
    ]
    for (const role of roles) expect(tokens).toContain(`--rm-${role}:`)
  })

  it('declares every supported theme scheme', () => {
    const tokens = readFileSync(resolve(import.meta.dirname, '../../src/app/theme/tokens.css'), 'utf8')
    expect(tokens).toContain(":root[data-theme='dark']")
    expect(tokens).not.toContain('data-contrast')
    expect(tokens.match(/--rm-surface:/g)).toHaveLength(2)
  })

  it('uses exported Material Theme roles for interaction and surfaces', () => {
    const tokens = readFileSync(resolve(import.meta.dirname, '../../src/app/theme/tokens.css'), 'utf8')
    expect(tokens).toContain('--rm-surface: #F4FBF8')
    expect(tokens).toContain('--rm-ink: #161D1C')
    expect(tokens).toContain('--rm-muted: #3F4947')
    expect(tokens).toContain('--rm-focus: #006A63')
    expect(tokens).toContain('--rm-primary: #006A63')
    expect(tokens).toContain('--rm-accent: #850097')
    expect(tokens).toContain('--rm-on-primary: #FFFFFF')
    expect(tokens).toContain('--rm-surface: #0E1514')
    expect(tokens).toContain('--rm-focus: #81D5CB')
    expect(tokens).not.toContain('#b6472d')
    expect(tokens).not.toContain('#ffb08e')
  })

  it('keeps light and dark surface text above WCAG AA normal-text contrast', () => {
    expect(contrastRatio('#161D1C', '#F4FBF8')).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio('#DDE4E2', '#0E1514')).toBeGreaterThanOrEqual(4.5)
  })

})
