import { createReadStream } from 'node:fs'
import { mkdir, rename, rm, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { uploadConfig } from '../config.js'
import { validateRecipeImage } from './recipe-image-validation.js'
import type { RecipeImage } from '../../src/models/recipe.js'

export async function storeRecipeImage(data: Buffer, declaredType: string): Promise<RecipeImage> {
  const metadata = validateRecipeImage(data, declaredType)
  await mkdir(uploadConfig.directory, { recursive: true })
  const key = `${crypto.randomUUID()}${metadata.contentType === 'image/png' ? '.png' : metadata.contentType === 'image/webp' ? '.webp' : '.jpg'}`
  const temporaryPath = join(uploadConfig.directory, `.${key}.tmp`)
  const finalPath = join(uploadConfig.directory, key)
  await writeFile(temporaryPath, data, { flag: 'wx' })
  await rename(temporaryPath, finalPath)
  return { key, ...metadata, url: `/uploads/recipes/${key}` }
}

export function streamRecipeImage(key: string) {
  if (basename(key) !== key || !/^[a-f0-9-]+\.(?:jpg|png|webp)$/.test(key)) throw new Error('Image not found')
  return createReadStream(join(uploadConfig.directory, key))
}

export async function removeRecipeImage(image: RecipeImage | undefined): Promise<void> {
  if (!image) return
  await rm(join(uploadConfig.directory, basename(image.key)), { force: true })
}