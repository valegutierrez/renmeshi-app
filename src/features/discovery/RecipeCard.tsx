import type { Recipe } from '../../models/recipe'
import appetizer from '../../assets/pixelart/appetizer.png'
import mainDish from '../../assets/pixelart/main-dish.png'
import sideDish from '../../assets/pixelart/side-dish.png'
import dessert from '../../assets/pixelart/dessert.png'

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const symbol = recipe.category === 'Desserts' ? '*' : recipe.category === 'Sides' ? 'o' : recipe.category === 'Appetizers' ? '<>' : '+'
  const categoryImage = recipe.category === 'Desserts' ? dessert : recipe.category === 'Sides' ? sideDish : recipe.category === 'Appetizers' ? appetizer : mainDish
  return <a className="recipe-card" href={`#/recipe/${recipe.id}`}><div className="card-art"><span>{recipe.category.toUpperCase()}</span><img src={categoryImage} alt="" /><span className="card-emoji" aria-hidden="true">{symbol}</span></div><div className="card-body"><h3>{recipe.name}</h3><p>{recipe.keywords.slice(0, 3).join(' · ')}</p><div className="meta-row"><span>{recipe.cookingTimeMinutes} min</span><span>{recipe.baseServings} servings</span></div></div></a>
}
