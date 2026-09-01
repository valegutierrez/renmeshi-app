import type { Recipe, RecipeCategory } from '../models/recipe'

export type TimeBand = 'under15' | '15to30' | '30to60' | '60plus'

export function matchesTimeBand(minutes: number, band: TimeBand): boolean {
  if (band === 'under15') return minutes < 15
  if (band === '15to30') return minutes >= 15 && minutes <= 30
  if (band === '30to60') return minutes > 30 && minutes <= 60
  return minutes > 60
}

export function filterRecipes(items: Recipe[], category: RecipeCategory | 'All', band: TimeBand | 'all', search: string): Recipe[] {
  const query = search.trim().toLocaleLowerCase()
  return items.filter((recipe) => (category === 'All' || recipe.category === category) && (band === 'all' || matchesTimeBand(recipe.cookingTimeMinutes, band)) && (!query || [recipe.name, ...recipe.keywords].join(' ').toLocaleLowerCase().includes(query)))
}