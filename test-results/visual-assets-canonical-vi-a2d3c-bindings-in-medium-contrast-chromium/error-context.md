# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual-assets.spec.ts >> canonical visual assets >> keeps canonical pattern and footer logo bindings in medium contrast
- Location: tests/browser/visual-assets.spec.ts:12:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.wave-strip')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.wave-strip')

```

```yaml
- banner:
  - link "RENMESHI Tonight's menu, sorted.":
    - /url: "#/"
    - img "RENMESHI"
    - text: Tonight's menu, sorted.
  - navigation "Main navigation":
    - link "About us":
      - /url: "#/about"
    - link "Recipes":
      - /url: "#/"
    - link "Backstage ↗":
      - /url: "#/backstage"
    - button "Switch to dark theme": ☾ Dark
- main:
  - paragraph: Your tiny cooking sidekick
  - heading "What are we cooking tonight?" [level=1]
  - paragraph: Good food does not need a grand plan. Pick a mood, pick a timer, and let dinner find you.
  - paragraph: Everyday cravings, simplified.
  - region "Latest recipes":
    - paragraph: Fresh from the kitchen
    - heading "Latest recipes" [level=2]
    - link "MAINS Miso Butter Noodles quick · noodles · umami 15 min 2 servings":
      - /url: "#/recipe/miso-butter-noodles"
      - text: MAINS
      - heading "Miso Butter Noodles" [level=3]
      - paragraph: quick · noodles · umami
      - text: 15 min 2 servings
    - link "MAINS Crispy Tofu Bowl tofu · rice · healthy 35 min 2 servings":
      - /url: "#/recipe/crispy-tofu-bowl"
      - text: MAINS
      - heading "Crispy Tofu Bowl" [level=3]
      - paragraph: tofu · rice · healthy
      - text: 35 min 2 servings
    - link "SIDES Ginger Cucumber Salad fresh · salad · ginger 10 min 4 servings":
      - /url: "#/recipe/ginger-cucumber-salad"
      - text: SIDES
      - heading "Ginger Cucumber Salad" [level=3]
      - paragraph: fresh · salad · ginger
      - text: 10 min 4 servings
    - link "View all recipes":
      - /url: "#/"
  - region "Recipe filters":
    - text: Search the pantry
    - textbox "Search the pantry":
      - /placeholder: Try tofu, sweet, quick...
    - text: Category
    - combobox "Category":
      - option "All" [selected]
      - option "Appetizers"
      - option "Mains"
      - option "Sides"
      - option "Desserts"
    - text: Time
    - combobox "Time":
      - option "Any time" [selected]
      - option "Under 15 min"
      - option "15-30 min"
      - option "30-60 min"
      - option "60+ min"
    - button "Clear x"
  - heading "Tonight's picks" [level=2]
  - text: 6 RECIPES FOUND
  - link "MAINS Miso Butter Noodles quick · noodles · umami 15 min 2 servings":
    - /url: "#/recipe/miso-butter-noodles"
    - text: MAINS
    - heading "Miso Butter Noodles" [level=3]
    - paragraph: quick · noodles · umami
    - text: 15 min 2 servings
  - link "MAINS Crispy Tofu Bowl tofu · rice · healthy 35 min 2 servings":
    - /url: "#/recipe/crispy-tofu-bowl"
    - text: MAINS
    - heading "Crispy Tofu Bowl" [level=3]
    - paragraph: tofu · rice · healthy
    - text: 35 min 2 servings
  - link "SIDES Ginger Cucumber Salad fresh · salad · ginger 10 min 4 servings":
    - /url: "#/recipe/ginger-cucumber-salad"
    - text: SIDES
    - heading "Ginger Cucumber Salad" [level=3]
    - paragraph: fresh · salad · ginger
    - text: 10 min 4 servings
  - link "DESSERTS Matcha Mochi Bites sweet · matcha · tea 45 min 8 servings":
    - /url: "#/recipe/matcha-mochi-bites"
    - text: DESSERTS
    - heading "Matcha Mochi Bites" [level=3]
    - paragraph: sweet · matcha · tea
    - text: 45 min 8 servings
  - link "APPETIZERS Sesame Shishito Skewers snack · party · vegetable 20 min 3 servings":
    - /url: "#/recipe/sesame-shishito-skewers"
    - text: APPETIZERS
    - heading "Sesame Shishito Skewers" [level=3]
    - paragraph: snack · party · vegetable
    - text: 20 min 3 servings
  - link "MAINS Nasudon nasudon 30 min 2 servings":
    - /url: "#/recipe/nasudon"
    - text: MAINS
    - heading "Nasudon" [level=3]
    - paragraph: nasudon
    - text: 30 min 2 servings
  - region "What is renmeshi (錬メシ)?":
    - paragraph: A meal, refined
    - heading "What is renmeshi (錬メシ)?" [level=2]
    - paragraph: Renmeshi is a small cooking sidekick for the moments when you want something good but do not want to overthink it.
    - paragraph: Recipes, art, and code come together here to turn everyday cravings into a doable next step.
  - region "Browse by appetite":
    - paragraph: Choose your quest
    - heading "Browse by appetite" [level=2]
    - link "Pixel-art appetizer Appetizer":
      - /url: "#/category/Appetizers"
      - img "Pixel-art appetizer"
      - strong: Appetizer
    - link "Pixel-art main dish Main Dish":
      - /url: "#/category/Mains"
      - img "Pixel-art main dish"
      - strong: Main Dish
    - link "Pixel-art side dish Side Dish":
      - /url: "#/category/Sides"
      - img "Pixel-art side dish"
      - strong: Side Dish
    - link "Pixel-art dessert Dessert":
      - /url: "#/category/Desserts"
      - img "Pixel-art dessert"
      - strong: Dessert
- contentinfo:
  - img "Renmeshi"
  - paragraph: Made for the meals that make a day feel better.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | const modes = [
  4  |   { name: 'light', attributes: {} },
  5  |   { name: 'dark', attributes: { 'data-theme': 'dark' } },
  6  |   { name: 'medium contrast', attributes: { 'data-contrast': 'medium' } },
  7  |   { name: 'high contrast', attributes: { 'data-contrast': 'high' } },
  8  | ]
  9  | 
  10 | test.describe('canonical visual assets', () => {
  11 |   for (const mode of modes) {
  12 |     test(`keeps canonical pattern and footer logo bindings in ${mode.name}`, async ({ page }) => {
  13 |       await page.goto('/')
  14 |       await page.evaluate((attributes) => {
  15 |         document.documentElement.removeAttribute('data-theme')
  16 |         document.documentElement.removeAttribute('data-contrast')
  17 |         for (const [name, value] of Object.entries(attributes)) document.documentElement.setAttribute(name, value)
  18 |       }, mode.attributes)
  19 |       const pattern = page.locator('.wave-strip')
  20 |       const bands = page.locator('.home-hero-band, .categories-band, .statement-band')
  21 |       const footer = page.locator('.site-footer')
  22 |       const logo = page.locator('.footer-logo')
> 23 |       await expect(pattern).toBeVisible()
     |                             ^ Error: expect(locator).toBeVisible() failed
  24 |       await expect(bands).toHaveCount(2)
  25 |       await expect(footer).toBeVisible()
  26 |       await expect(logo).toBeVisible()
  27 |       await expect(pattern).toHaveCSS('color', /rgb\(/)
  28 |       await expect(pattern).toHaveCSS('-webkit-mask-image', /(data:image\/svg\+xml|seigaiha-pattern\.svg)/)
  29 |       for (const band of await bands.all()) {
  30 |         expect(await band.evaluate((element) => getComputedStyle(element, '::before').webkitMaskImage)).toMatch(/(data:image\/svg\+xml|seigaiha-pattern\.svg)/)
  31 |         await expect(band.locator('h1, h2, p').first()).toHaveCSS('color', /rgb\(/)
  32 |       }
  33 |       await page.goto('/#/about')
  34 |       const statement = page.locator('.statement-band')
  35 |       await expect(statement).toBeVisible()
  36 |       expect(await statement.evaluate((element) => getComputedStyle(element, '::before').webkitMaskImage)).toMatch(/(data:image\/svg\+xml|seigaiha-pattern\.svg)/)
  37 |       await expect(statement.locator('p')).toHaveCSS('color', /rgb\(/)
  38 |       await expect(logo).toHaveCSS('-webkit-mask-image', /data:image\/svg\+xml/)
  39 |       await expect(footer).toHaveCSS('background-color', /rgb\(/)
  40 |       expect(await page.locator('body').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
  41 |     })
  42 |   }
  43 | })
```