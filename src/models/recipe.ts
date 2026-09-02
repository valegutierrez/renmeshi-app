export type RecipeCategory = 'Appetizers' | 'Mains' | 'Sides' | 'Desserts'

export type Ingredient = {
  id: string
  name: string
  quantity?: number
  unit?: string
  displayText: string
  scalable: boolean
}

export type RecipeImageContentType = 'image/jpeg' | 'image/png' | 'image/webp'

export type RecipeImage = {
  key: string
  contentType: RecipeImageContentType
  width: number
  height: number
  url: string
}

export type Recipe = {
  id: string
  name: string
  category: RecipeCategory
  cookingTimeMinutes: number
  baseServings: number
  keywords: string[]
  ingredients: Ingredient[]
  instructions: string[]
  image?: RecipeImage
}

export const categories: RecipeCategory[] = ['Appetizers', 'Mains', 'Sides', 'Desserts']

export const recipes: Recipe[] = []