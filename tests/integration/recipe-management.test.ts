import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Recipe } from '../../src/models/recipe.js'

let store: typeof import('../../server/storage/recipe-store.js')
let storeDirectory: string
const recipe: Recipe = {
  id: 'integration-recipe', name: 'Integration Recipe', category: 'Mains', cookingTimeMinutes: 20, baseServings: 2,
  keywords: ['integration'], accent: 'teal', ingredients: [{ id: 'one', name: 'rice', quantity: 1, unit: 'cup', displayText: '1 cup rice', scalable: true }], instructions: ['Cook rice'],
}

beforeAll(async () => {
  storeDirectory = await mkdtemp(join(tmpdir(), 'renmeshi-store-'))
  process.env.RENMESHI_STORE_PATH = join(storeDirectory, 'recipes.json')
  store = await import('../../server/storage/recipe-store.js')
})

afterAll(async () => {
  await rm(storeDirectory, { recursive: true, force: true })
  delete process.env.RENMESHI_STORE_PATH
})

describe('recipe management persistence', () => {
  it('persists successful mutations with one audit record', async () => {
    await store.saveRecipe(recipe, 'created', 'test-admin')
    const recipes = await store.listRecipes()
    const history = await store.listHistory()
    expect(recipes).toEqual([recipe])
    expect(history).toHaveLength(1)
    expect(history[0]).toMatchObject({ recipeId: recipe.id, recipeName: recipe.name, action: 'created', actor: 'test-admin' })
    expect(Number.isNaN(Date.parse(history[0].timestamp))).toBe(false)
  })

  it('rejects duplicate creates without adding history', async () => {
    await expect(store.saveRecipe(recipe, 'created', 'test-admin')).rejects.toThrow('Recipe already exists')
    expect(await store.listHistory()).toHaveLength(1)
  })

  it('records an edit after replacing the stored recipe', async () => {
    const edited = { ...recipe, name: 'Edited Integration Recipe' }
    await store.saveRecipe(edited, 'edited', 'test-admin')
    expect((await store.listRecipes())[0].name).toBe(edited.name)
    expect(await store.listHistory()).toHaveLength(2)
  })
})
