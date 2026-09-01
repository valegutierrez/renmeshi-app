export type RecipeCategory = 'Appetizers' | 'Mains' | 'Sides' | 'Desserts'

export type Ingredient = {
  id: string
  name: string
  quantity?: number
  unit?: string
  displayText: string
  scalable: boolean
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
  accent: string
}

export const categories: RecipeCategory[] = ['Appetizers', 'Mains', 'Sides', 'Desserts']

export const recipes: Recipe[] = [
  { id: 'miso-butter-noodles', name: 'Miso Butter Noodles', category: 'Mains', cookingTimeMinutes: 15, baseServings: 2, keywords: ['quick', 'noodles', 'umami', 'weeknight'], accent: 'coral', ingredients: [{ id: 'noodles', name: 'udon noodles', quantity: 2, unit: 'packs', displayText: '2 packs udon noodles', scalable: true }, { id: 'miso', name: 'white miso', quantity: 2, unit: 'tbsp', displayText: '2 tbsp white miso', scalable: true }, { id: 'butter', name: 'butter', quantity: 1, unit: 'tbsp', displayText: '1 tbsp butter', scalable: true }, { id: 'scallions', name: 'scallions', displayText: 'scallions, sliced', scalable: false }], instructions: ['Boil the udon until springy, then reserve a splash of cooking water.', 'Melt butter in a warm pan and stir in the miso with the reserved water.', 'Toss in the noodles until glossy. Finish with scallions and serve hot.'] },
  { id: 'crispy-tofu-bowl', name: 'Crispy Tofu Bowl', category: 'Mains', cookingTimeMinutes: 35, baseServings: 2, keywords: ['tofu', 'rice', 'healthy', 'crunchy'], accent: 'teal', ingredients: [{ id: 'tofu', name: 'firm tofu', quantity: 400, unit: 'g', displayText: '400 g firm tofu', scalable: true }, { id: 'rice', name: 'cooked rice', quantity: 2, unit: 'cups', displayText: '2 cups cooked rice', scalable: true }, { id: 'soy', name: 'soy sauce', quantity: 2, unit: 'tbsp', displayText: '2 tbsp soy sauce', scalable: true }, { id: 'greens', name: 'greens and sesame', displayText: 'greens and sesame, to finish', scalable: false }], instructions: ['Press the tofu dry and tear it into bite-sized pieces.', 'Season and pan-fry until deeply golden on every side.', 'Build bowls with rice, greens, tofu, and a drizzle of soy sauce.'] },
  { id: 'ginger-cucumber-salad', name: 'Ginger Cucumber Salad', category: 'Sides', cookingTimeMinutes: 10, baseServings: 4, keywords: ['fresh', 'salad', 'ginger', 'cooling'], accent: 'lime', ingredients: [{ id: 'cucumber', name: 'cucumbers', quantity: 3, unit: '', displayText: '3 cucumbers', scalable: true }, { id: 'vinegar', name: 'rice vinegar', quantity: 2, unit: 'tbsp', displayText: '2 tbsp rice vinegar', scalable: true }, { id: 'ginger', name: 'fresh ginger', quantity: 1, unit: 'tsp', displayText: '1 tsp fresh ginger', scalable: true }, { id: 'chili', name: 'chili crisp', displayText: 'chili crisp, to taste', scalable: false }], instructions: ['Smash the cucumbers with the side of a knife and tear into rough pieces.', 'Whisk vinegar and ginger together in a bowl.', 'Toss cucumbers with dressing and chili crisp. Chill for five minutes.'] },
  { id: 'matcha-mochi-bites', name: 'Matcha Mochi Bites', category: 'Desserts', cookingTimeMinutes: 45, baseServings: 8, keywords: ['sweet', 'matcha', 'tea', 'baking'], accent: 'violet', ingredients: [{ id: 'flour', name: 'glutinous rice flour', quantity: 1, unit: 'cup', displayText: '1 cup glutinous rice flour', scalable: true }, { id: 'sugar', name: 'sugar', quantity: .5, unit: 'cup', displayText: '1/2 cup sugar', scalable: true }, { id: 'matcha', name: 'matcha powder', quantity: 2, unit: 'tsp', displayText: '2 tsp matcha powder', scalable: true }, { id: 'salt', name: 'salt', displayText: 'a pinch of salt', scalable: false }], instructions: ['Whisk flour, sugar, matcha, and salt with water until smooth.', 'Steam until set, then cool enough to handle.', 'Cut into bites and dust lightly with starch before serving.'] },
  { id: 'sesame-shishito-skewers', name: 'Sesame Shishito Skewers', category: 'Appetizers', cookingTimeMinutes: 20, baseServings: 3, keywords: ['snack', 'party', 'vegetable', 'grill'], accent: 'gold', ingredients: [{ id: 'peppers', name: 'shishito peppers', quantity: 300, unit: 'g', displayText: '300 g shishito peppers', scalable: true }, { id: 'sesame', name: 'sesame oil', quantity: 1, unit: 'tbsp', displayText: '1 tbsp sesame oil', scalable: true }, { id: 'sesame-seeds', name: 'sesame seeds', quantity: 1, unit: 'tbsp', displayText: '1 tbsp sesame seeds', scalable: true }, { id: 'lemon', name: 'lemon', displayText: 'lemon wedges, to serve', scalable: false }], instructions: ['Thread peppers onto soaked skewers and brush with sesame oil.', 'Grill until blistered and smoky, turning once.', 'Scatter with sesame seeds and serve with lemon.'] },
]