import { listHistory } from '../storage/recipe-store.js'

export async function getRecipeHistory() {
  return listHistory()
}
