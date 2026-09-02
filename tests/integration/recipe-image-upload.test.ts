import { describe, expect, it } from 'vitest'
import { validateRecipeImage } from '../../server/storage/recipe-image-validation'

function png(width = 640, height = 480): Buffer {
  const data = Buffer.alloc(24)
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(data)
  data.writeUInt32BE(width, 16)
  data.writeUInt32BE(height, 20)
  return data
}

describe('recipe image upload contract', () => {
  it('accepts bounded PNG uploads and returns serving metadata', () => {
    expect(validateRecipeImage(png(), 'image/png')).toEqual({ contentType: 'image/png', width: 640, height: 480 })
  })

  it('rejects malformed uploads before recipe persistence can occur', () => {
    expect(() => validateRecipeImage(Buffer.from('truncated'), 'image/png')).toThrow()
  })
})