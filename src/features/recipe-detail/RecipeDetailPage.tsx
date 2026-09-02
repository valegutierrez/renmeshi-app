import { useState } from 'react'
import { scaledIngredients } from '../../lib/serving-scaling'
import type { Recipe } from '../../models/recipe'
import { IngredientChecklist } from './IngredientChecklist'
import { InstructionList } from './InstructionList'
import { RecipeMeta } from './RecipeMeta'
import { ServingScaler } from './ServingScaler'
import { useIngredientChecklist } from './useIngredientChecklist'

export function RecipeDetailPage({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.baseServings)
  const { checked, toggle } = useIngredientChecklist(recipe.id)
  const ingredients = scaledIngredients(recipe.ingredients, recipe.baseServings, servings)
  return <><div className="detail-header"><a className="back-link" href="#/">← Back to the pantry</a><span>{recipe.category} / {recipe.cookingTimeMinutes} min</span></div><RecipeMeta recipe={recipe} /><div className="detail-layout"><div><section className="detail-panel"><h2>Gather your bits</h2><IngredientChecklist ingredients={ingredients} checked={checked} onToggle={toggle} /><ServingScaler servings={servings} onChange={setServings} /></section></div><section className="detail-panel"><h2>Make it happen</h2><InstructionList instructions={recipe.instructions} /></section></div></>
}
