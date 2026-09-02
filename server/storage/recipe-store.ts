import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import type { Recipe } from '../../src/models/recipe.js'

export type RecipeHistoryEntry = {
  id: string
  recipeId: string
  recipeName: string
  action: 'created' | 'edited'
  actor: string
  timestamp: string
}

type StoreData = { recipes: Recipe[]; history: RecipeHistoryEntry[] }

const storePath = process.env.RENMESHI_STORE_PATH ?? 'data/recipes.json'
let writeQueue = Promise.resolve()

async function readStore(): Promise<StoreData> {
  try {
    return JSON.parse(await readFile(storePath, 'utf8')) as StoreData
  } catch {
    return { recipes: [], history: [] }
  }
}

async function writeStore(data: StoreData): Promise<void> {
  await mkdir(dirname(storePath), { recursive: true })
  const temporaryPath = `${storePath}.tmp`
  await writeFile(temporaryPath, JSON.stringify(data, null, 2), 'utf8')
  await rename(temporaryPath, storePath)
}

function validateImageReference(recipe: Recipe): void {
  if (!recipe.image) return
  if (!/^[a-f0-9-]+\.(?:jpg|png|webp)$/.test(recipe.image.key) || recipe.image.url !== `/uploads/recipes/${recipe.image.key}`) throw new Error('Recipe image reference is invalid')
}

function enqueue(operation: () => Promise<void>): Promise<void> {
  const next = writeQueue.then(operation)
  writeQueue = next.catch(() => undefined)
  return next
}

export async function listRecipes(): Promise<Recipe[]> {
  return (await readStore()).recipes
}

export async function listHistory(): Promise<RecipeHistoryEntry[]> {
  return (await readStore()).history
}

export async function saveRecipe(recipe: Recipe, action: RecipeHistoryEntry['action'], actor: string): Promise<void> {
  await enqueue(async () => {
    validateImageReference(recipe)
    const data = await readStore()
    const index = data.recipes.findIndex((item) => item.id === recipe.id)
    if (action === 'created' && index >= 0) throw new Error('Recipe already exists')
    if (action === 'edited' && index < 0) throw new Error('Recipe does not exist')
    if (index >= 0) data.recipes[index] = recipe
    else data.recipes.push(recipe)
    if (action === 'created') data.history.unshift({ id: crypto.randomUUID(), recipeId: recipe.id, recipeName: recipe.name, action, actor, timestamp: new Date().toISOString() })
    await writeStore(data)
  })
}
