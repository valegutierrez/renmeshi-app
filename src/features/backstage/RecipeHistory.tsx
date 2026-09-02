import type { Recipe } from '../../models/recipe'
import type { RecipeHistoryEntry } from '../../services/api'
import { Box, Button, Stack, Typography } from '@mui/material'

const historyDate = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })

export function RecipeHistory({ history, recipes, onEdit }: { history: RecipeHistoryEntry[]; recipes: Recipe[]; onEdit: (recipe: Recipe) => void }) {
  return <Stack className="history" spacing={1}>{history.length ? history.map((entry) => { const recipe = recipes.find((item) => item.id === entry.recipeId); return <Box className="history-row" key={entry.id} sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr) auto', sm: 'minmax(0, 1fr) auto max-content' }, gridTemplateAreas: { xs: `'details date' 'details action'`, sm: `'details date action'` }, alignItems: 'center', columnGap: 2 }}><Box sx={{ gridArea: 'details', minWidth: 0 }}><Typography component="strong">{entry.recipeName}</Typography><br /><Typography component="small" variant="caption">{entry.action} by {entry.actor}</Typography></Box><Typography component="small" variant="caption" sx={{ gridArea: 'date', whiteSpace: 'nowrap', textAlign: { xs: 'right', sm: 'left' } }}>{historyDate.format(new Date(entry.timestamp))}</Typography>{recipe && <Button variant="text" type="button" onClick={() => onEdit(recipe)} sx={{ gridArea: 'action', justifySelf: 'end' }}>Edit</Button>}</Box> }) : <Typography>No changes recorded yet.</Typography>}</Stack>
}
