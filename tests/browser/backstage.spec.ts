import { expect, test } from '@playwright/test'

test('signs into Backstage and shows protected history', async ({ page }) => {
  await page.goto('/#/backstage')
  await expect(page.getByRole('heading', { name: 'Backstage' })).toBeVisible()
  await page.getByLabel('Admin name').fill('demo-admin')
  await page.getByLabel('Password').fill('renmeshi-demo')
  await page.getByRole('button', { name: 'Enter the kitchen' }).click()
  await expect(page.getByText('Current menu')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
})
