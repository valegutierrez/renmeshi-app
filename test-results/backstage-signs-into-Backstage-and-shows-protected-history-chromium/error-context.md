# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: backstage.spec.ts >> signs into Backstage and shows protected history
- Location: tests/browser/backstage.spec.ts:3:1

# Error details

```
Error: Admin credentials are required for browser tests
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | test('signs into Backstage and shows protected history', async ({ page }) => {
  4  |   const adminName = process.env.RENMESHI_ADMIN_NAME
  5  |   const adminPassword = process.env.RENMESHI_ADMIN_PASSWORD
> 6  |   if (!adminName || !adminPassword) throw new Error('Admin credentials are required for browser tests')
     |                                           ^ Error: Admin credentials are required for browser tests
  7  |   await page.goto('/#/backstage')
  8  |   await expect(page.getByRole('heading', { name: 'Backstage' })).toBeVisible()
  9  |   await page.getByLabel('Admin name').fill(adminName)
  10 |   await page.getByLabel('Password').fill(adminPassword)
  11 |   await page.getByRole('button', { name: 'Enter the kitchen' }).click()
  12 |   await expect(page.getByText('Current menu')).toBeVisible()
  13 |   await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  14 | })
  15 | 
```