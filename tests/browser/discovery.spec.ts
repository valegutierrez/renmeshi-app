import { expect, test } from '@playwright/test'

test('filters the public collection and recovers from no matches', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: "Tonight's picks" })).toBeVisible()
  await expect(page.locator('.recipe-grid').getByRole('link', { name: /Nasudon/i })).toBeVisible()
  await page.getByLabel('Search the pantry').fill('does-not-exist')
  await expect(page.getByText('Nothing in the pot yet.')).toBeVisible()
  await page.getByRole('button', { name: 'Clear' }).click()
  await expect(page.locator('.recipe-grid').getByRole('link', { name: /Nasudon/i })).toBeVisible()
})

test('keeps recipe cards image-first and excludes category pixel art', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('.recipe-grid .recipe-card')
  await expect(cards).not.toHaveCount(0)
  for (const card of await cards.all()) {
    await expect(card.locator('img')).toHaveCount(1)
    await expect(card.locator('img')).toHaveAttribute('alt', /recipe/i)
    await expect(card.locator('h3')).toBeVisible()
    await expect(card.locator('.meta-row')).toBeVisible()
    const source = await card.locator('img').getAttribute('src')
    expect(source).not.toMatch(/appetizer|main-dish|side-dish|dessert/)
  }
  expect(await page.locator('body').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
})
