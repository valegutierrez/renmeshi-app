import type { Recipe } from '../../models/recipe'

export function RecipeMeta({ recipe }: { recipe: Recipe }) {
  return <section className="detail-header"><div><p className="eyebrow">Recipe card</p><h1>{recipe.name}</h1></div><p>{recipe.keywords.join(' · ')}</p></section>
}
