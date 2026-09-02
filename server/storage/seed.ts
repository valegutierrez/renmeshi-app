import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const storePath = process.env.RENMESHI_STORE_PATH ?? 'data/recipes.json'
const starterRecipeIds = new Set([
  'miso-butter-noodles',
  'crispy-tofu-bowl',
  'ginger-cucumber-salad',
  'matcha-mochi-bites',
  'sesame-shishito-skewers',
])

export async function seedRecipes(): Promise<void> {
  try {
    await writeFile(storePath, await writeFileContent(), { flag: 'wx' })
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOENT') {
      await mkdir(dirname(storePath), { recursive: true })
      await writeFile(storePath, await writeFileContent(), 'utf8')
      return
    }
    if (code !== 'EEXIST') return
    await removeStarterRecipes()
  }
}

async function writeFileContent(): Promise<string> {
  return JSON.stringify({ recipes: [], history: [] }, null, 2)
}

async function removeStarterRecipes(): Promise<void> {
  const data = JSON.parse(await readFile(storePath, 'utf8')) as { recipes?: Array<{ id: string }>; history?: Array<{ recipeId: string; action?: string }> }
  const keptRecipes = (data.recipes ?? []).filter((recipe) => !starterRecipeIds.has(recipe.id))
  const keptIds = new Set(keptRecipes.map((recipe) => recipe.id))
  const keptHistory = (data.history ?? []).filter((entry) => keptIds.has(entry.recipeId) && entry.action === 'created')
  if (keptRecipes.length === (data.recipes ?? []).length && keptHistory.length === (data.history ?? []).length) return
  await writeFile(storePath, JSON.stringify({ recipes: keptRecipes, history: keptHistory }, null, 2), 'utf8')
}
