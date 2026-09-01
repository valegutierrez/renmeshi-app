import type { AdminSession, AuthStatus } from '../models/auth'

const sessionKey = 'renmeshi-admin-session'

function readSession(): AdminSession | null {
  try {
    const raw = window.localStorage.getItem(sessionKey)
    if (!raw) return null
    const session = JSON.parse(raw) as AdminSession
    return session.expiresAt > Date.now() ? session : null
  } catch {
    return null
  }
}

export function getAuthStatus(): AuthStatus {
  const session = readSession()
  return session ? { authenticated: true, actor: session.actor, expiresAt: session.expiresAt } : { authenticated: false }
}

export function signInDemo(actor: string): AdminSession | null {
  const normalizedActor = actor.trim()
  if (!normalizedActor) return null
  const session: AdminSession = { token: crypto.randomUUID(), actor: normalizedActor, expiresAt: Date.now() + 8 * 60 * 60 * 1000 }
  window.localStorage.setItem(sessionKey, JSON.stringify(session))
  return session
}

export function signOut(): void {
  window.localStorage.removeItem(sessionKey)
}
