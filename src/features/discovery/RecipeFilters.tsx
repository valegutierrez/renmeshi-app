import type { RecipeCategory } from '../../models/recipe'
import type { TimeBand } from '../../lib/recipe-filtering'
import { categories } from '../../models/recipe'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'

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
  return <Stack component="section" className="filters" direction={{ xs: 'column', sm: 'row' }} spacing={1.5} aria-label="Recipe filters">
    <TextField label="Search the pantry" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Try tofu, sweet, quick..." fullWidth />
    <FormControl fullWidth><InputLabel id="filter-category-label">Category</InputLabel><Select labelId="filter-category-label" label="Category" value={category} onChange={(event) => onCategoryChange(event.target.value as RecipeCategory | 'All')}><MenuItem value="All">All</MenuItem>{categories.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select></FormControl>
    <FormControl fullWidth><InputLabel id="filter-time-label">Time</InputLabel><Select labelId="filter-time-label" label="Time" value={timeBand} onChange={(event) => onTimeBandChange(event.target.value as TimeBand | 'all')}><MenuItem value="all">Any time</MenuItem><MenuItem value="under15">Under 15 min</MenuItem><MenuItem value="15to30">15-30 min</MenuItem><MenuItem value="30to60">30-60 min</MenuItem><MenuItem value="60plus">60+ min</MenuItem></Select></FormControl>
    <Button className="clear-button" type="button" onClick={onClear}>Clear</Button>
  </Stack>
}
