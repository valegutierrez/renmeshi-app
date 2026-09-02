# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: discovery.spec.ts >> filters the public collection and recovers from no matches
- Location: tests/browser/discovery.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /Miso Butter Noodles/i })
Expected: visible
Error: strict mode violation: getByRole('link', { name: /Miso Butter Noodles/i }) resolved to 2 elements:
    1) <a class="recipe-card" href="#/recipe/miso-butter-noodles">…</a> aka getByLabel('Latest recipes').getByRole('link', { name: 'MAINS Miso Butter Noodles' })
    2) <a class="recipe-card" href="#/recipe/miso-butter-noodles">…</a> aka getByRole('link', { name: 'MAINS Miso Butter Noodles' }).nth(1)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /Miso Butter Noodles/i })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "RENMESHI Tonight's menu, sorted." [ref=e5] [cursor=pointer]:
      - /url: "#/"
      - generic [ref=e6]:
        - img "RENMESHI" [ref=e7]
        - generic [ref=e8]: Tonight's menu, sorted.
    - navigation "Main navigation" [ref=e9]:
      - link "About us" [ref=e10] [cursor=pointer]:
        - /url: "#/about"
      - link "Recipes" [ref=e11] [cursor=pointer]:
        - /url: "#/"
      - link "Backstage ↗" [ref=e12] [cursor=pointer]:
        - /url: "#/backstage"
      - button "Switch to dark theme" [ref=e13] [cursor=pointer]: ☾ Dark
  - main [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - paragraph [ref=e18]: Your tiny cooking sidekick
          - heading "What are we cooking tonight?" [level=1] [ref=e19]
        - paragraph [ref=e20]: Good food does not need a grand plan. Pick a mood, pick a timer, and let dinner find you.
      - paragraph [ref=e21]: Everyday cravings, simplified.
      - region [ref=e22]:
        - generic [ref=e23]:
          - paragraph [ref=e24]: Fresh from the kitchen
          - heading "Latest recipes" [level=2] [ref=e25]
        - generic [ref=e26]:
          - link "MAINS Miso Butter Noodles quick · noodles · umami 15 min 2 servings" [ref=e27] [cursor=pointer]:
            - /url: "#/recipe/miso-butter-noodles"
            - generic [ref=e28]:
              - generic [ref=e29]: MAINS
              - generic [ref=e30]: +
            - generic [ref=e31]:
              - heading "Miso Butter Noodles" [level=3] [ref=e32]
              - paragraph [ref=e33]: quick · noodles · umami
              - generic [ref=e34]:
                - generic [ref=e35]: 15 min
                - generic [ref=e36]: 2 servings
          - link "MAINS Crispy Tofu Bowl tofu · rice · healthy 35 min 2 servings" [ref=e37] [cursor=pointer]:
            - /url: "#/recipe/crispy-tofu-bowl"
            - generic [ref=e38]:
              - generic [ref=e39]: MAINS
              - generic [ref=e40]: +
            - generic [ref=e41]:
              - heading "Crispy Tofu Bowl" [level=3] [ref=e42]
              - paragraph [ref=e43]: tofu · rice · healthy
              - generic [ref=e44]:
                - generic [ref=e45]: 35 min
                - generic [ref=e46]: 2 servings
          - link "SIDES Ginger Cucumber Salad fresh · salad · ginger 10 min 4 servings" [ref=e47] [cursor=pointer]:
            - /url: "#/recipe/ginger-cucumber-salad"
            - generic [ref=e48]:
              - generic [ref=e49]: SIDES
              - generic [ref=e50]: o
            - generic [ref=e51]:
              - heading "Ginger Cucumber Salad" [level=3] [ref=e52]
              - paragraph [ref=e53]: fresh · salad · ginger
              - generic [ref=e54]:
                - generic [ref=e55]: 10 min
                - generic [ref=e56]: 4 servings
          - link "View all recipes" [ref=e57] [cursor=pointer]:
            - /url: "#/"
            - text: View all recipes
            - generic [ref=e58]: →
    - generic [ref=e59]:
      - region "Recipe filters" [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e62]: Search the pantry
          - textbox "Search the pantry" [ref=e63]:
            - /placeholder: Try tofu, sweet, quick...
        - generic [ref=e64]:
          - generic [ref=e65]: Category
          - combobox "Category" [ref=e66]:
            - option "All" [selected]
            - option "Appetizers"
            - option "Mains"
            - option "Sides"
            - option "Desserts"
        - generic [ref=e67]:
          - generic [ref=e68]: Time
          - combobox "Time" [ref=e69]:
            - option "Any time" [selected]
            - option "Under 15 min"
            - option "15-30 min"
            - option "30-60 min"
            - option "60+ min"
        - button "Clear x" [ref=e70] [cursor=pointer]
      - generic [ref=e71]:
        - heading "Tonight's picks" [level=2] [ref=e72]
        - generic [ref=e73]: 6 RECIPES FOUND
      - generic [ref=e74]:
        - link "MAINS Miso Butter Noodles quick · noodles · umami 15 min 2 servings" [ref=e75] [cursor=pointer]:
          - /url: "#/recipe/miso-butter-noodles"
          - generic [ref=e76]:
            - generic [ref=e77]: MAINS
            - generic [ref=e78]: +
          - generic [ref=e79]:
            - heading "Miso Butter Noodles" [level=3] [ref=e80]
            - paragraph [ref=e81]: quick · noodles · umami
            - generic [ref=e82]:
              - generic [ref=e83]: 15 min
              - generic [ref=e84]: 2 servings
        - link "MAINS Crispy Tofu Bowl tofu · rice · healthy 35 min 2 servings" [ref=e85] [cursor=pointer]:
          - /url: "#/recipe/crispy-tofu-bowl"
          - generic [ref=e86]:
            - generic [ref=e87]: MAINS
            - generic [ref=e88]: +
          - generic [ref=e89]:
            - heading "Crispy Tofu Bowl" [level=3] [ref=e90]
            - paragraph [ref=e91]: tofu · rice · healthy
            - generic [ref=e92]:
              - generic [ref=e93]: 35 min
              - generic [ref=e94]: 2 servings
        - link "SIDES Ginger Cucumber Salad fresh · salad · ginger 10 min 4 servings" [ref=e95] [cursor=pointer]:
          - /url: "#/recipe/ginger-cucumber-salad"
          - generic [ref=e96]:
            - generic [ref=e97]: SIDES
            - generic [ref=e98]: o
          - generic [ref=e99]:
            - heading "Ginger Cucumber Salad" [level=3] [ref=e100]
            - paragraph [ref=e101]: fresh · salad · ginger
            - generic [ref=e102]:
              - generic [ref=e103]: 10 min
              - generic [ref=e104]: 4 servings
        - link "DESSERTS Matcha Mochi Bites sweet · matcha · tea 45 min 8 servings" [ref=e105] [cursor=pointer]:
          - /url: "#/recipe/matcha-mochi-bites"
          - generic [ref=e106]:
            - generic [ref=e107]: DESSERTS
            - generic [ref=e108]: "*"
          - generic [ref=e109]:
            - heading "Matcha Mochi Bites" [level=3] [ref=e110]
            - paragraph [ref=e111]: sweet · matcha · tea
            - generic [ref=e112]:
              - generic [ref=e113]: 45 min
              - generic [ref=e114]: 8 servings
        - link "APPETIZERS Sesame Shishito Skewers snack · party · vegetable 20 min 3 servings" [ref=e115] [cursor=pointer]:
          - /url: "#/recipe/sesame-shishito-skewers"
          - generic [ref=e116]:
            - generic [ref=e117]: APPETIZERS
            - generic [ref=e118]: <>
          - generic [ref=e119]:
            - heading "Sesame Shishito Skewers" [level=3] [ref=e120]
            - paragraph [ref=e121]: snack · party · vegetable
            - generic [ref=e122]:
              - generic [ref=e123]: 20 min
              - generic [ref=e124]: 3 servings
        - link "MAINS Nasudon nasudon 30 min 2 servings" [ref=e125] [cursor=pointer]:
          - /url: "#/recipe/nasudon"
          - generic [ref=e126]:
            - generic [ref=e127]: MAINS
            - generic [ref=e128]: +
          - generic [ref=e129]:
            - heading "Nasudon" [level=3] [ref=e130]
            - paragraph [ref=e131]: nasudon
            - generic [ref=e132]:
              - generic [ref=e133]: 30 min
              - generic [ref=e134]: 2 servings
    - region [ref=e135]:
      - generic [ref=e136]:
        - paragraph [ref=e137]: A meal, refined
        - heading "What is renmeshi (錬メシ)?" [level=2] [ref=e138]
        - paragraph [ref=e139]: Renmeshi is a small cooking sidekick for the moments when you want something good but do not want to overthink it.
        - paragraph [ref=e140]: Recipes, art, and code come together here to turn everyday cravings into a doable next step.
    - region [ref=e141]:
      - generic [ref=e142]:
        - paragraph [ref=e143]: Choose your quest
        - heading "Browse by appetite" [level=2] [ref=e144]
        - generic [ref=e145]:
          - link [ref=e146] [cursor=pointer]:
            - /url: "#/category/Appetizers"
            - img "Pixel-art appetizer" [ref=e148]
            - strong [ref=e149]: Appetizer
          - link [ref=e150] [cursor=pointer]:
            - /url: "#/category/Mains"
            - img "Pixel-art main dish" [ref=e152]
            - strong [ref=e153]: Main Dish
          - link [ref=e154] [cursor=pointer]:
            - /url: "#/category/Sides"
            - img "Pixel-art side dish" [ref=e156]
            - strong [ref=e157]: Side Dish
          - link [ref=e158] [cursor=pointer]:
            - /url: "#/category/Desserts"
            - img "Pixel-art dessert" [ref=e160]
            - strong [ref=e161]: Dessert
  - contentinfo [ref=e162]:
    - generic [ref=e163]:
      - img "Renmeshi" [ref=e164]
      - paragraph [ref=e165]: Made for the meals that make a day feel better.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | test('filters the public collection and recovers from no matches', async ({ page }) => {
  4  |   await page.goto('/')
  5  |   await expect(page.getByRole('heading', { name: "Tonight's picks" })).toBeVisible()
> 6  |   await expect(page.getByRole('link', { name: /Miso Butter Noodles/i })).toBeVisible()
     |                                                                          ^ Error: expect(locator).toBeVisible() failed
  7  |   await page.getByLabel('Search the pantry').fill('does-not-exist')
  8  |   await expect(page.getByText('Nothing in the pot yet.')).toBeVisible()
  9  |   await page.getByRole('button', { name: 'Clear x' }).click()
  10 |   await expect(page.getByRole('link', { name: /Miso Butter Noodles/i })).toBeVisible()
  11 | })
  12 | 
```