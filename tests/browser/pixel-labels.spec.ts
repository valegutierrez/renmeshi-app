import { expect, test } from '@playwright/test'

test.describe('Pixelpori labels and theme assets', () => {
  for (const theme of ['light', 'dark']) {
    test(`keeps label fill, stroke, and pattern tokenized in ${theme}`, async ({ page }) => {
      await page.goto('/')
      if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
      const label = page.locator('.pixel-hero-title')
      await expect(label).toBeVisible()
      const styles = await label.evaluate((element) => {
        const computed = getComputedStyle(element)
        return { color: computed.color, stroke: computed.webkitTextStrokeColor, pattern: getComputedStyle(document.querySelector('.home-hero-band')!, '::before').webkitMaskImage }
      })
      expect(styles.color).toMatch(/^rgb\(/)
      expect(styles.stroke).toMatch(/^rgb\(/)
      expect(styles.pattern).toMatch(/(data:image\/svg\+xml|seigaiha-pattern\.svg)/)
    })
  }

  test('keeps category art in category contexts and out of recipe cards', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.category-art img')).toHaveCount(4)
    await expect(page.locator('.recipe-card .category-art img')).toHaveCount(0)
    await page.getByRole('button', { name: 'Recipes' }).click()
    await expect(page.getByRole('menu').locator('.menu-category-icon')).toHaveCount(4)
  })
})
