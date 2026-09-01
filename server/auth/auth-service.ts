import type { IncomingHttpHeaders } from 'node:http'

type Session = { actor: string; expiresAt: number }
const sessions = new Map<string, Session>()
const sessionDuration = 8 * 60 * 60 * 1000

export function signIn(actor: string, password: string): string | null {
  const expectedActor = process.env.RENMESHI_ADMIN_NAME ?? 'demo-admin'
  const expectedPassword = process.env.RENMESHI_ADMIN_PASSWORD ?? 'renmeshi-demo'
  if (actor.trim() !== expectedActor || password !== expectedPassword) return null
  const token = crypto.randomUUID()
  sessions.set(token, { actor: expectedActor, expiresAt: Date.now() + sessionDuration })
  return token
}

export function sessionFromHeaders(headers: IncomingHttpHeaders): { token: string; actor: string } | null {
  const header = headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : ''
  const session = sessions.get(token)
  if (!session || session.expiresAt <= Date.now()) {
    if (token) sessions.delete(token)
    return null
  }
  return { token, actor: session.actor }
}

export function signOut(token: string): void {
  sessions.delete(token)
}
