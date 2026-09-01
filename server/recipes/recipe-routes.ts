import { badRequest, unauthorized } from '../http/errors.js'
import { requireAdmin } from '../auth/require-admin.js'
import { getRecipeHistory } from '../audit/history-service.js'
import { listRecipes, saveRecipe } from '../storage/recipe-store.js'
import type { IncomingHttpHeaders } from 'node:http'
import type { Recipe, RecipeCategory } from '../../src/models/recipe.js'

const validCategories: RecipeCategory[] = ['Appetizers', 'Mains', 'Sides', 'Desserts']

function validateRecipe(value: unknown): Recipe {
  if (!value || typeof value !== 'object') badRequest('Recipe body is required')
  const recipe = value as Partial<Recipe>
  const hasValidTiming = typeof recipe.cookingTimeMinutes === 'number' && Number.isFinite(recipe.cookingTimeMinutes) && recipe.cookingTimeMinutes > 0
  const hasValidServings = typeof recipe.baseServings === 'number' && Number.isFinite(recipe.baseServings) && recipe.baseServings > 0
  const hasValidIngredients = Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && recipe.ingredients.every((ingredient) => ingredient && typeof ingredient === 'object' && typeof ingredient.name === 'string' && ingredient.name.trim() && typeof ingredient.displayText === 'string')
  const hasValidInstructions = Array.isArray(recipe.instructions) && recipe.instructions.length > 0 && recipe.instructions.every((instruction) => typeof instruction === 'string' && instruction.trim())
  if (!recipe.id || recipe.id.length > 120 || !recipe.name?.trim() || recipe.name.length > 200 || !recipe.category || !validCategories.includes(recipe.category) || !hasValidTiming || !Number.isInteger(recipe.cookingTimeMinutes) || !hasValidServings || !hasValidIngredients || !hasValidInstructions) badRequest('Recipe requires a valid name, supported category, positive whole-minute cooking time and servings, ingredients, and instructions')
  return recipe as Recipe
}

export async function readRecipes() { return listRecipes() }
export async function readHistory(headers: IncomingHttpHeaders) {
  if (!requireAdmin(headers)) unauthorized('Admin authentication required')
  return getRecipeHistory()
}
export async function writeRecipe(headers: IncomingHttpHeaders, value: unknown, action: 'created' | 'edited') {
  const session = requireAdmin(headers)
  if (!session) unauthorized('Admin authentication required')
  const recipe = validateRecipe(value)
  await saveRecipe(recipe, action, session.actor)
  return recipe
}
