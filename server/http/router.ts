import type { IncomingMessage, ServerResponse } from 'node:http'
import { HttpError } from './errors.js'
import { sendJson } from './response.js'

export async function readJson(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of request) {
    size += Buffer.byteLength(chunk)
    if (size > 256 * 1024) throw new HttpError(413, 'Request body is too large')
    chunks.push(Buffer.from(chunk))
  }
  if (size === 0) throw new HttpError(400, 'Request body is required')
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new HttpError(400, 'Request body must be valid JSON')
  }
}

export function handleError(response: ServerResponse, error: unknown): void {
  const status = error instanceof HttpError ? error.status : 500
  const message = error instanceof Error ? error.message : 'Unexpected server error'
  sendJson(response, status, { error: message })
}
