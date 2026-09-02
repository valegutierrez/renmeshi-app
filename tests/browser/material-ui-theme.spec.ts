import { expect, test } from '@playwright/test'

test.describe('Material UI theme surfaces', () => {
  test('uses Material UI controls across public and admin routes', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: /theme/i })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Recipes' })).toHaveClass(/MuiButton-root/)
    await page.getByRole('button', { name: 'Recipes' }).click()
    await expect(page.getByRole('menu')).toBeVisible()
    await expect(page.getByRole('menuitem').first()).toHaveClass(/MuiMenuItem-root/)
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: /Switch to dark theme/i }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

  test('renders Material UI sign-in fields on Backstage', async ({ page }) => {
    await page.goto('/#/backstage')
    await expect(page.getByLabel('Admin name')).toHaveClass(/MuiInputBase-input/)
    await expect(page.getByLabel('Password')).toHaveClass(/MuiInputBase-input/)
  })
})
