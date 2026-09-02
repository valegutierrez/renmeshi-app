import { expect, test } from '@playwright/test'

test('signs into Backstage and shows protected history', async ({ page }) => {
  const adminName = process.env.RENMESHI_ADMIN_NAME
  const adminPassword = process.env.RENMESHI_ADMIN_PASSWORD
  if (!adminName || !adminPassword) throw new Error('Admin credentials are required for browser tests')
  await page.goto('/#/backstage')
  await expect(page.getByRole('heading', { name: 'Backstage' })).toBeVisible()
  await page.getByLabel('Admin name').fill(adminName)
  await page.getByLabel('Password').fill(adminPassword)
  await page.getByRole('button', { name: 'Enter the kitchen' }).click()
  await expect(page.getByText('Current menu')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
})

test('shows upload validation feedback without publishing an invalid image', async ({ page }) => {
  const adminName = process.env.RENMESHI_ADMIN_NAME
  const adminPassword = process.env.RENMESHI_ADMIN_PASSWORD
  if (!adminName || !adminPassword) throw new Error('Admin credentials are required for browser tests')
  await page.goto('/#/backstage')
  await page.getByLabel('Admin name').fill(adminName)
  await page.getByLabel('Password').fill(adminPassword)
  await page.getByRole('button', { name: 'Enter the kitchen' }).click()
  await expect(page.getByText('Current menu')).toBeVisible()
  await page.getByLabel('Recipe name').fill('Rejected upload')
  await page.getByLabel('Ingredients').fill('1 cup rice')
  await page.getByLabel('Instructions').fill('Cook rice')
  await page.locator('input[type="file"]').setInputFiles({ name: 'not-an-image.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') })
  await page.getByRole('button', { name: 'Save recipe' }).click()
  await expect(page.getByRole('alert')).toContainText(/valid JPEG, PNG, or WebP/i)
  await expect(page.getByText('Rejected upload', { exact: true })).toHaveCount(0)
})
