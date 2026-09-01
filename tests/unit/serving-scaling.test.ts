import { describe, expect, it } from 'vitest'
import { scaleIngredient, scaledIngredients } from '../../src/lib/serving-scaling.js'
import type { Ingredient } from '../../src/models/recipe.js'

const scalable: Ingredient = { id: 'rice', name: 'rice', quantity: 2, unit: 'cups', displayText: '2 cups rice', scalable: true }
const descriptive: Ingredient = { id: 'salt', name: 'salt', displayText: 'salt, to taste', scalable: false }

describe('serving scaling', () => {
  it('scales numeric quantities while preserving units', () => {
    const result = scaleIngredient(scalable, 2, 4)
    expect(result.quantity).toBe(4)
    expect(result.unit).toBe('cups')
    expect(result.displayText).toBe('4 cups rice')
  })

  it('leaves descriptive and invalid-serving ingredients unchanged', () => {
    expect(scaleIngredient(descriptive, 2, 4)).toBe(descriptive)
    expect(scaleIngredient(scalable, 0, 4)).toBe(scalable)
    expect(scaleIngredient(scalable, 2, 0)).toBe(scalable)
    expect(scaledIngredients([scalable, descriptive], 2, 1)[1]).toBe(descriptive)
  })

  it('rounds fractional quantities to two decimal places', () => {
    expect(scaleIngredient({ ...scalable, quantity: 1 }, 3, 1).displayText).toBe('0.33 cups rice')
  })
})
