import { uploadConfig } from '../config.js'
import type { RecipeImageContentType } from '../../src/models/recipe.js'

const signatures: Array<{ type: RecipeImageContentType; bytes: number[] }> = [
  { type: 'image/png', bytes: [137, 80, 78, 71, 13, 10, 26, 10] },
  { type: 'image/jpeg', bytes: [255, 216, 255] },
  { type: 'image/webp', bytes: [82, 73, 70, 70] },
]

export function validateRecipeImage(data: Buffer, declaredType: string): { contentType: RecipeImageContentType; width: number; height: number } {
  if (data.length === 0 || data.length > uploadConfig.maxFileBytes) throw new Error('Recipe image is empty or too large')
  const match = signatures.find((signature) => signature.bytes.every((byte, index) => data[index] === byte))
  if (!match || match.type !== declaredType) throw new Error('Recipe image must be a valid JPEG, PNG, or WebP file')
  let width = 1
  let height = 1
  if (match.type === 'image/png' && data.length >= 24) { width = data.readUInt32BE(16); height = data.readUInt32BE(20) }
  if (match.type === 'image/webp' && data.length >= 30 && data.toString('ascii', 12, 16) === 'VP8X') { width = 1 + data.readUIntLE(24, 3); height = 1 + data.readUIntLE(27, 3) }
  if (!width || !height || width > uploadConfig.maxDimension || height > uploadConfig.maxDimension) throw new Error('Recipe image dimensions are not supported')
  return { contentType: match.type, width, height }
}