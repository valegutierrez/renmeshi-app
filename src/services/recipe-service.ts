import { recipes } from '../models/recipe'
import type { Recipe } from '../models/recipe'

export function getRecipes(): Recipe[] {
  return recipes
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id)
}
