import type { IncomingMessage, ServerResponse } from 'node:http'
import { HttpError } from './errors.js'
import { sendJson } from './response.js'
import { uploadConfig } from '../config.js'

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

export type MultipartUpload = { fields: Record<string, string>; file?: { filename: string; contentType: string; data: Buffer } }

export async function readMultipart(request: IncomingMessage): Promise<MultipartUpload> {
  const contentType = request.headers['content-type'] ?? ''
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)
  if (!boundaryMatch) throw new HttpError(400, 'Multipart boundary is required')
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of request) {
    size += Buffer.byteLength(chunk)
    if (size > uploadConfig.maxRequestBytes) throw new HttpError(413, 'Request body is too large')
    chunks.push(Buffer.from(chunk))
  }
  const boundary = `--${boundaryMatch[1] ?? boundaryMatch[2]}`
  const fields: Record<string, string> = {}
  let file: MultipartUpload['file']
  for (const part of Buffer.concat(chunks).toString('binary').split(boundary).slice(1, -1)) {
    const separator = part.indexOf('\r\n\r\n')
    if (separator < 0) continue
    const headers = part.slice(0, separator)
    const body = part.slice(separator + 4).replace(/\r\n$/, '')
    const disposition = headers.match(/name="([^"]+)"(?:; filename="([^"]*)")?/i)
    if (!disposition) continue
    const name = disposition[1]
    if (disposition[2] !== undefined) file = { filename: disposition[2], contentType: headers.match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim() ?? '', data: Buffer.from(body, 'binary') }
    else fields[name] = body
  }
  return { fields, file }
}

export function handleError(response: ServerResponse, error: unknown): void {
  const status = error instanceof HttpError ? error.status : 500
  const message = error instanceof Error ? error.message : 'Unexpected server error'
  sendJson(response, status, { error: message })
}
