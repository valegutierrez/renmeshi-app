import { expect, test } from '@playwright/test'

test('scales servings and keeps checklist state recipe-scoped', async ({ page }) => {
  await page.goto('/#/recipe/miso-butter-noodles')
  await expect(page.getByRole('heading', { name: 'Miso Butter Noodles' })).toBeVisible()
  const ingredient = page.getByRole('checkbox').first()
  await ingredient.check()
  await page.getByLabel('Number of servings').fill('4')
  await expect(page.getByText('4 packs udon noodles')).toBeVisible()
  await expect(ingredient).toBeChecked()
})
