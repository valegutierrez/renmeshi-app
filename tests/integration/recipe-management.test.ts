import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Recipe } from '../../src/models/recipe.js'

let store: typeof import('../../server/storage/recipe-store.js')
let storeDirectory: string
const image = { key: '11111111-1111-4111-8111-111111111111.png', contentType: 'image/png' as const, width: 640, height: 480, url: '/uploads/recipes/11111111-1111-4111-8111-111111111111.png' }
const recipe: Recipe = {
  id: 'integration-recipe', name: 'Integration Recipe', category: 'Mains', cookingTimeMinutes: 20, baseServings: 2,
  keywords: ['integration'], ingredients: [{ id: 'one', name: 'rice', quantity: 1, unit: 'cup', displayText: '1 cup rice', scalable: true }], instructions: ['Cook rice'], image,
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

  it('replaces the stored recipe without adding a history entry', async () => {
    const edited = { ...recipe, name: 'Edited Integration Recipe', image: { ...image, key: '22222222-2222-4222-8222-222222222222.jpg', contentType: 'image/jpeg' as const, url: '/uploads/recipes/22222222-2222-4222-8222-222222222222.jpg' } }
    await store.saveRecipe(edited, 'edited', 'second-admin')
    expect((await store.listRecipes())[0].name).toBe(edited.name)
    expect((await store.listRecipes())[0].image).toEqual(edited.image)
    expect(await store.listHistory()).toHaveLength(1)
    expect((await store.listHistory())[0].actor).toBe('test-admin')
  })

  it('rejects malformed image references without changing the store or history', async () => {
    const invalid = { ...recipe, image: { ...image, key: '../outside.png', url: '/uploads/recipes/../outside.png' } }
    await expect(store.saveRecipe(invalid, 'edited', 'test-admin')).rejects.toThrow('image reference')
    expect((await store.listRecipes())[0].image).toEqual(expect.objectContaining({ key: '22222222-2222-4222-8222-222222222222.jpg' }))
    expect(await store.listHistory()).toHaveLength(1)
  })
})
