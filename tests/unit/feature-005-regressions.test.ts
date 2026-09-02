import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { validateRecipeImage } from '../../server/storage/recipe-image-validation.js'

const root = resolve(import.meta.dirname, '../..')
const read = (path: string) => readFileSync(resolve(root, path), 'utf8')

const tinyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64')

describe('feature 005 regression policy', () => {
  it('rejects unsupported image signatures and mismatched declarations', () => {
    expect(() => validateRecipeImage(Buffer.from('BMnot-an-image'), 'image/bmp')).toThrow()
    expect(() => validateRecipeImage(tinyPng, 'image/jpeg')).toThrow()
  })

  it('rejects images with dimensions outside the configured bound', () => {
    const oversizedPng = Buffer.from(tinyPng)
    oversizedPng.writeUInt32BE(10000, 16)
    expect(() => validateRecipeImage(oversizedPng, 'image/png')).toThrow(/dimensions/)
  })

  it('keeps Bootstrap and competing card media out of the refreshed source', () => {
    const source = [read('index.html'), read('package.json')].join('\n')
    const sourceFiles = ['src/App.tsx', 'src/app/AppShell.tsx', 'src/features/discovery/RecipeCard.tsx'].map((path) => read(path)).join('\n')
    expect(`${source}\n${sourceFiles}`).not.toMatch(/bootstrap|react-bootstrap/i)
    const card = read('src/features/discovery/RecipeCard.tsx')
    expect(card).not.toMatch(/pixelart|appetizer\.png|main-dish\.png|side-dish\.png|dessert\.png/)
    expect(card).toContain('recipe.image?.url')
  })

  it('keeps colors behind semantic tokens and the static recipe collection empty', () => {
    const model = read('src/models/recipe.ts')
    expect(model).toContain('export const recipes: Recipe[] = []')
    const appStyles = read('src/App.css')
    expect(appStyles).not.toMatch(/#[0-9a-f]{3,8}\b/i)
    expect(read('src/app/theme/tokens.css')).toContain('--rm-label-stroke')
  })

  it('keeps legacy image data optional at the client boundary', () => {
    expect(read('src/models/recipe.ts')).toMatch(/image\?: RecipeImage/)
    expect(read('server/storage/seed.ts')).toContain('recipes: [], history: []')
  })
})
