import type { Recipe } from '../../models/recipe'

export function RecipeMeta({ recipe }: { recipe: Recipe }) {
  return <section className="detail-header"><div><h1>{recipe.name}</h1></div><p>{recipe.keywords.join(' · ')}</p></section>
}
