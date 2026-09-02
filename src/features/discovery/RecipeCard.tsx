import type { Recipe } from '../../models/recipe'
import { Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import heroImage from '../../assets/hero.png'

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return <Card className="recipe-card" component="a" href={`#/recipe/${recipe.id}`} sx={{ textDecoration: 'none' }}>
    <CardMedia component="img" className="recipe-card-image" image={recipe.image?.url ?? heroImage} alt={`${recipe.name} recipe`} />
    <CardContent className="card-body">
      <Chip label={recipe.category} size="small" />
      <Typography component="h3" variant="h3">{recipe.name}</Typography>
      <Typography color="text.secondary">{recipe.keywords.slice(0, 3).join(' · ')}</Typography>
      <Stack className="meta-row" direction="row"><span>{recipe.cookingTimeMinutes} min</span><span>{recipe.baseServings} servings</span></Stack>
    </CardContent>
  </Card>
}
