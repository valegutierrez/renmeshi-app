import { describe, expect, it } from 'vitest'

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
  it('keeps light and dark surface text above WCAG AA normal-text contrast', () => {
    expect(contrastRatio('#173b35', '#fffaf2')).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio('#f4ead7', '#172521')).toBeGreaterThanOrEqual(4.5)
  })

  it('keeps high-contrast surface text at maximum contrast', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeGreaterThanOrEqual(7)
  })
})
