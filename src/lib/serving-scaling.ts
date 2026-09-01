import type { Ingredient } from '../models/recipe'

export function formatQuantity(quantity: number): string {
  return Number.isInteger(quantity) ? String(quantity) : String(Math.round(quantity * 100) / 100)
}

export function scaleIngredient(ingredient: Ingredient, baseServings: number, servings: number): Ingredient {
  if (!ingredient.scalable || ingredient.quantity === undefined || baseServings <= 0 || servings <= 0) return ingredient
  const quantity = ingredient.quantity * (servings / baseServings)
  return { ...ingredient, quantity, displayText: `${formatQuantity(quantity)}${ingredient.unit ? ` ${ingredient.unit}` : ''} ${ingredient.name}` }
}

export function scaledIngredients(ingredients: Ingredient[], baseServings: number, servings: number): Ingredient[] {
  return ingredients.map((ingredient) => scaleIngredient(ingredient, baseServings, servings))
}