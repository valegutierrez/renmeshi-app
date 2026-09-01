import { describe, expect, it } from 'vitest'
import { filterRecipes } from '../../src/lib/recipe-filtering.js'
import type { Recipe } from '../../src/models/recipe.js'

const item: Recipe = { id: 'performance', name: 'Crispy Tofu Bowl', category: 'Mains', cookingTimeMinutes: 35, baseServings: 2, keywords: ['tofu', 'rice'], accent: 'teal', ingredients: [{ id: 'tofu', name: 'tofu', displayText: 'tofu', scalable: false }], instructions: ['Cook'] }

describe('recipe filtering performance', () => {
  it('handles a representative client-side collection without avoidable work', () => {
    const collection = Array.from({ length: 1000 }, (_, index) => ({ ...item, id: `recipe-${index}` }))
    const started = performance.now()
    const result = filterRecipes(collection, 'Mains', '30to60', ' tofu ')
    expect(result).toHaveLength(1000)
    expect(performance.now() - started).toBeLessThan(100)
  })
})