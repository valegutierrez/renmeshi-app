export type AdminSession = {
  token: string
  actor: string
  expiresAt: number
}

export type AuthStatus = {
  authenticated: boolean
  actor?: string
  expiresAt?: number
}
