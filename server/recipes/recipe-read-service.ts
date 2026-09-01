import { listRecipes } from '../storage/recipe-store.js'

export async function getPublicRecipes() {
  return listRecipes()
}
