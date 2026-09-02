import { expect, test } from '@playwright/test'

test('keeps checklist state recipe-scoped for the real recipe collection', async ({ page }) => {
  await page.goto('/#/recipe/nasudon')
  await expect(page.getByRole('heading', { name: 'Nasudon' })).toBeVisible()
  const ingredient = page.getByRole('checkbox').first()
  await ingredient.check()
  await expect(ingredient).toBeChecked()
})
