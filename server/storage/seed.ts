import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { recipes } from '../../src/models/recipe.js'

const storePath = process.env.RENMESHI_STORE_PATH ?? 'data/recipes.json'

export async function seedRecipes(): Promise<void> {
  try {
    await writeFile(storePath, await writeFileContent(), { flag: 'wx' })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') return
    await mkdir(dirname(storePath), { recursive: true })
    await writeFile(storePath, await writeFileContent(), 'utf8')
  }
}

async function writeFileContent(): Promise<string> {
  return JSON.stringify({ recipes, history: [] }, null, 2)
}
