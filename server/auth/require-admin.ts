import type { IncomingHttpHeaders } from 'node:http'
import { sessionFromHeaders } from './auth-service.js'

export function requireAdmin(headers: IncomingHttpHeaders): { actor: string; token: string } | null {
  return sessionFromHeaders(headers)
}
