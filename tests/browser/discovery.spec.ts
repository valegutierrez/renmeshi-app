import { expect, test } from '@playwright/test'

test('filters the public collection and recovers from no matches', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: "Tonight's picks" })).toBeVisible()
  await expect(page.getByRole('link', { name: /Miso Butter Noodles/i })).toBeVisible()
  await page.getByLabel('Search the pantry').fill('does-not-exist')
  await expect(page.getByText('Nothing in the pot yet.')).toBeVisible()
  await page.getByRole('button', { name: 'Clear x' }).click()
  await expect(page.getByRole('link', { name: /Miso Butter Noodles/i })).toBeVisible()
})
