import type { Ingredient } from '../../models/recipe'

type IngredientChecklistProps = { ingredients: Ingredient[]; checked: Record<string, boolean>; onToggle: (id: string) => void }

export function IngredientChecklist({ ingredients, checked, onToggle }: IngredientChecklistProps) {
  return <div className="ingredients">{ingredients.map((ingredient) => <label className={`ingredient ${checked[ingredient.id] ? 'checked' : ''}`} key={ingredient.id}><input type="checkbox" checked={Boolean(checked[ingredient.id])} onChange={() => onToggle(ingredient.id)} /><span>{ingredient.displayText}</span></label>)}</div>
}
