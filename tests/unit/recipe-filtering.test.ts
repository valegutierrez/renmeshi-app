import { describe, expect, it } from 'vitest'
import { filterRecipes, matchesTimeBand } from '../../src/lib/recipe-filtering.js'
import type { Recipe } from '../../src/models/recipe.js'

const recipe = (overrides: Partial<Recipe> = {}): Recipe => ({
  id: 'test-recipe', name: '  Ginger Noodles  ', category: 'Mains', cookingTimeMinutes: 15,
  baseServings: 2, keywords: ['Quick', 'UMAMI'], accent: 'teal',
  ingredients: [{ id: 'ingredient', name: 'noodles', displayText: 'noodles', scalable: false }], instructions: ['Cook noodles'], ...overrides,
})

describe('recipe filtering', () => {
  it('uses the documented time-band boundaries', () => {
    expect(matchesTimeBand(14, 'under15')).toBe(true)
    expect(matchesTimeBand(15, 'under15')).toBe(false)
    expect(matchesTimeBand(15, '15to30')).toBe(true)
    expect(matchesTimeBand(30, '15to30')).toBe(true)
    expect(matchesTimeBand(31, '30to60')).toBe(true)
    expect(matchesTimeBand(60, '30to60')).toBe(true)
    expect(matchesTimeBand(61, '60plus')).toBe(true)
  })

  it('matches normalized search text across names and keywords', () => {
    expect(filterRecipes([recipe()], 'All', 'all', '  ginger  ')).toHaveLength(1)
    expect(filterRecipes([recipe()], 'All', 'all', 'umami')).toHaveLength(1)
    expect(filterRecipes([recipe()], 'All', 'all', 'soba')).toHaveLength(0)
  })

  it('combines category, time, and search conjunctively', () => {
    const items = [recipe(), recipe({ id: 'side', category: 'Sides', cookingTimeMinutes: 8 })]
    expect(filterRecipes(items, 'Mains', '15to30', 'quick')).toHaveLength(1)
    expect(filterRecipes(items, 'Sides', '15to30', 'quick')).toHaveLength(0)
    expect(filterRecipes(items, 'All', 'all', 'no match')).toEqual([])
  })
})
