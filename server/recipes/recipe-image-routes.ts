import type { IncomingMessage, ServerResponse } from 'node:http'
import { streamRecipeImage } from '../storage/recipe-image-store.js'
import { sendJson } from '../http/response.js'

const contentTypes: Record<string, string> = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }

export async function serveRecipeImage(request: IncomingMessage, response: ServerResponse, key: string): Promise<void> {
  if (request.method !== 'GET') return sendJson(response, 404, { error: 'Not found' })
  try {
    const image = streamRecipeImage(key)
    response.writeHead(200, { 'content-type': contentTypes[key.split('.').pop() ?? ''], 'x-content-type-options': 'nosniff', 'cache-control': 'public, max-age=31536000, immutable' })
    image.on('error', () => { if (!response.headersSent) sendJson(response, 404, { error: 'Image not found' }); else response.destroy() })
    image.pipe(response)
  } catch { sendJson(response, 404, { error: 'Image not found' }) }
}