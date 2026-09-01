import type { AdminSession, AuthStatus } from '../models/auth'
import type { Recipe } from '../models/recipe'

export type RecipeHistoryEntry = {
  id: string
  recipeId: string
  recipeName: string
  action: 'created' | 'edited'
  actor: string
  timestamp: string
}

const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001'
const sessionKey = 'renmeshi-admin-session'

function token(): string | null {
  try {
    const session = JSON.parse(window.localStorage.getItem(sessionKey) ?? 'null') as AdminSession | null
    return session && session.expiresAt > Date.now() ? session.token : null
  } catch {
    return null
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('content-type', 'application/json')
  const sessionToken = token()
  if (sessionToken) headers.set('authorization', `Bearer ${sessionToken}`)
  const response = await fetch(`${apiBase}${path}`, { ...options, headers })
  if (response.status === 204) return undefined as T
  const body = await response.json() as T & { error?: string }
  if (!response.ok) throw new Error(body.error ?? `Request failed with ${response.status}`)
  return body
}

export async function fetchRecipes(): Promise<Recipe[]> {
  return request<Recipe[]>('/api/recipes')
}

export async function signInWithServer(actor: string, password: string): Promise<AdminSession> {
  const result = await request<{ token: string }>('/api/auth/sign-in', { method: 'POST', body: JSON.stringify({ actor, password }) })
  const session: AdminSession = { token: result.token, actor, expiresAt: Date.now() + 8 * 60 * 60 * 1000 }
  window.localStorage.setItem(sessionKey, JSON.stringify(session))
  return session
}

export async function signOutFromServer(): Promise<void> {
  try { await request('/api/auth/sign-out', { method: 'POST' }) } finally { window.localStorage.removeItem(sessionKey) }
}

export function getServerAuthStatus(): AuthStatus {
  const sessionToken = token()
  return sessionToken ? { authenticated: true } : { authenticated: false }
}

export async function fetchHistory(): Promise<RecipeHistoryEntry[]> {
  return request<RecipeHistoryEntry[]>('/api/history')
}

export async function saveRecipeToServer(recipe: Recipe, editing: boolean): Promise<Recipe> {
  return request<Recipe>(editing ? `/api/recipes/${recipe.id}` : '/api/recipes', { method: editing ? 'PUT' : 'POST', body: JSON.stringify(recipe) })
}
