import { expect, test } from '@playwright/test'

const modes = [
  { name: 'light', attributes: {} },
  { name: 'dark', attributes: { 'data-theme': 'dark' } },
  { name: 'medium contrast', attributes: { 'data-contrast': 'medium' } },
  { name: 'high contrast', attributes: { 'data-contrast': 'high' } },
]

function contrastRatio(foreground: [number, number, number], background: [number, number, number]): number {
  const relativeLuminance = (color: [number, number, number]) => color.reduce((sum, channel, index) => {
    const value = channel / 255
    const linear = value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    return sum + linear * [0.2126, 0.7152, 0.0722][index]
  }, 0)
  const foregroundLuminance = relativeLuminance(foreground)
  const backgroundLuminance = relativeLuminance(background)
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
}

test.describe('Material Theme color audit', () => {
  for (const mode of modes) {
    test(`keeps semantic tokens and readable controls in ${mode.name}`, async ({ page }) => {
      await page.goto('/')
      await page.evaluate((attributes) => {
        document.documentElement.removeAttribute('data-theme')
        document.documentElement.removeAttribute('data-contrast')
        for (const [name, value] of Object.entries(attributes)) document.documentElement.setAttribute(name, value)
      }, mode.attributes)

      const result = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement)
        const parseColor = (value: string): [number, number, number] => {
          const normalized = value.trim()
          if (normalized.startsWith('#')) {
            const hex = normalized.slice(1)
            const expanded = hex.length === 3 ? hex.split('').map((channel) => channel + channel).join('') : hex
            return [Number.parseInt(expanded.slice(0, 2), 16), Number.parseInt(expanded.slice(2, 4), 16), Number.parseInt(expanded.slice(4, 6), 16)]
          }
          const channels = normalized.match(/[\d.]+/g)?.map(Number) ?? []
          return [channels[0], channels[1], channels[2]]
        }
        const colors = ['--rm-ink', '--rm-surface', '--rm-primary', '--rm-on-primary'].map((name) => parseColor(root.getPropertyValue(name)))
        return { colors, overflowFree: document.body.scrollWidth <= document.body.clientWidth }
      })

      expect(result.colors.every((color) => color.every(Number.isFinite))).toBe(true)
      expect(contrastRatio(result.colors[0], result.colors[1])).toBeGreaterThanOrEqual(4.5)
      expect(contrastRatio(result.colors[3], result.colors[2])).toBeGreaterThanOrEqual(4.5)
      expect(result.overflowFree).toBe(true)
      await expect(page.locator('button, a').first()).toBeVisible()
    })
  }
})
