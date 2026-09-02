import { expect, test } from '@playwright/test'

test.describe('responsive accessibility', () => {
  for (const width of [320, 768, 1280]) {
    test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await expect(page.getByRole('heading', { name: "Tonight's picks" })).toBeVisible()
      expect(await page.locator('body').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
    })
  }

  test('recipe and category imagery has useful alternatives', async ({ page }) => {
    await page.goto('/')
    const recipeImages = page.locator('.recipe-card img')
    await expect(recipeImages.first()).toBeVisible()
    for (const image of await recipeImages.all()) expect(await image.getAttribute('alt')).toMatch(/recipe/i)
    for (const image of await page.locator('.category-art img').all()) expect(await image.getAttribute('alt')).toBeTruthy()
  })

  test('main navigation exposes keyboard focus and menu semantics', async ({ page }) => {
    await page.goto('/')
    const recipesButton = page.getByRole('button', { name: 'Recipes' })
    await recipesButton.focus()
    await expect(recipesButton).toBeFocused()
    await recipesButton.press('Enter')
    await expect(page.getByRole('menu')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('menu')).toBeHidden()
  })
})
