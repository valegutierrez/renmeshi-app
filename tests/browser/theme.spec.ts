import { expect, test } from '@playwright/test'

test('persists the selected theme across reloads', async ({ page }) => {
  await page.goto('/')
  const toggle = page.getByRole('button', { name: /Switch to dark theme/i })
  await toggle.click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})
