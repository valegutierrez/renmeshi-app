import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../..')

describe('visual asset policy', () => {
  it('keeps category pixel art out of recipe cards', () => {
    const card = readFileSync(resolve(root, 'src/features/discovery/RecipeCard.tsx'), 'utf8')
    expect(card).not.toMatch(/pixelart|appetizer\.png|main-dish\.png|side-dish\.png|dessert\.png/)
    expect(card).toContain('recipe.image?.url')
  })
})