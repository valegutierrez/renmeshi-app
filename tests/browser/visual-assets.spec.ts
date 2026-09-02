import { expect, test } from '@playwright/test'

const modes = [
  { name: 'light', attributes: {} },
  { name: 'dark', attributes: { 'data-theme': 'dark' } },
  { name: 'medium contrast', attributes: { 'data-contrast': 'medium' } },
  { name: 'high contrast', attributes: { 'data-contrast': 'high' } },
]

test.describe('canonical visual assets', () => {
  for (const mode of modes) {
    test(`keeps canonical pattern and footer logo bindings in ${mode.name}`, async ({ page }) => {
      await page.goto('/')
      await page.evaluate((attributes) => {
        document.documentElement.removeAttribute('data-theme')
        document.documentElement.removeAttribute('data-contrast')
        for (const [name, value] of Object.entries(attributes)) document.documentElement.setAttribute(name, value)
      }, mode.attributes)
      const pattern = page.locator('.wave-strip')
      const bands = page.locator('.home-hero-band, .categories-band, .statement-band')
      const footer = page.locator('.site-footer')
      const logo = page.locator('.footer-logo')
      await expect(pattern).toBeVisible()
      await expect(bands).toHaveCount(2)
      await expect(footer).toBeVisible()
      await expect(logo).toBeVisible()
      await expect(pattern).toHaveCSS('color', /rgb\(/)
      await expect(pattern).toHaveCSS('-webkit-mask-image', /(data:image\/svg\+xml|seigaiha-pattern\.svg)/)
      for (const band of await bands.all()) {
        expect(await band.evaluate((element) => getComputedStyle(element, '::before').webkitMaskImage)).toMatch(/(data:image\/svg\+xml|seigaiha-pattern\.svg)/)
        await expect(band.locator('h1, h2, p').first()).toHaveCSS('color', /rgb\(/)
      }
      await page.goto('/#/about')
      const statement = page.locator('.statement-band')
      await expect(statement).toBeVisible()
      expect(await statement.evaluate((element) => getComputedStyle(element, '::before').webkitMaskImage)).toMatch(/(data:image\/svg\+xml|seigaiha-pattern\.svg)/)
      await expect(statement.locator('p')).toHaveCSS('color', /rgb\(/)
      await expect(logo).toHaveCSS('-webkit-mask-image', /data:image\/svg\+xml/)
      await expect(footer).toHaveCSS('background-color', /rgb\(/)
      expect(await page.locator('body').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
    })
  }
})