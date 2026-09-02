import { describe, expect, it } from 'vitest'
import { validateRecipeImage } from '../../server/storage/recipe-image-validation'

function png(width = 120, height = 80): Buffer {
  const data = Buffer.alloc(24)
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(data)
  data.writeUInt32BE(width, 16)
  data.writeUInt32BE(height, 20)
  return data
}

describe('recipe image validation', () => {
  it('accepts a PNG whose declaration matches its signature and dimensions', () => {
    expect(validateRecipeImage(png(), 'image/png')).toEqual({ contentType: 'image/png', width: 120, height: 80 })
  })

  it('rejects mismatched declarations and unsupported signatures', () => {
    expect(() => validateRecipeImage(png(), 'image/jpeg')).toThrow('valid JPEG, PNG, or WebP')
    expect(() => validateRecipeImage(Buffer.from('not an image'), 'image/png')).toThrow('valid JPEG, PNG, or WebP')
  })

  it('rejects empty and oversized dimensions', () => {
    expect(() => validateRecipeImage(Buffer.alloc(0), 'image/png')).toThrow('empty or too large')
    expect(() => validateRecipeImage(png(5000, 80), 'image/png')).toThrow('dimensions are not supported')
  })
})
