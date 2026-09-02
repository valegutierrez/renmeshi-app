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
