import type { RecipeCategory } from '../../models/recipe'
import type { TimeBand } from '../../lib/recipe-filtering'
import { categories } from '../../models/recipe'

type RecipeFiltersProps = {
  category: RecipeCategory | 'All'
  timeBand: TimeBand | 'all'
  search: string
  onCategoryChange: (category: RecipeCategory | 'All') => void
  onTimeBandChange: (timeBand: TimeBand | 'all') => void
  onSearchChange: (search: string) => void
  onClear: () => void
}

export function RecipeFilters({ category, timeBand, search, onCategoryChange, onTimeBandChange, onSearchChange, onClear }: RecipeFiltersProps) {
  return <section className="filters" aria-label="Recipe filters">
    <div className="field"><label htmlFor="search">Search the pantry</label><input id="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Try tofu, sweet, quick..." /></div>
    <div className="field"><label htmlFor="category">Category</label><select id="category" value={category} onChange={(event) => onCategoryChange(event.target.value as RecipeCategory | 'All')}><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
    <div className="field"><label htmlFor="time">Time</label><select id="time" value={timeBand} onChange={(event) => onTimeBandChange(event.target.value as TimeBand | 'all')}><option value="all">Any time</option><option value="under15">Under 15 min</option><option value="15to30">15-30 min</option><option value="30to60">30-60 min</option><option value="60plus">60+ min</option></select></div>
    <button className="clear-button" type="button" onClick={onClear}>Clear x</button>
  </section>
}
