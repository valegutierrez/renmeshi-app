import { afterEach, describe, expect, it } from 'vitest'
import { requireAdmin } from '../../server/auth/require-admin.js'
import { sessionFromHeaders, signIn, signOut } from '../../server/auth/auth-service.js'

afterEach(() => {
  delete process.env.RENMESHI_ADMIN_NAME
  delete process.env.RENMESHI_ADMIN_PASSWORD
})

describe('admin authorization', () => {
  it('accepts configured credentials and rejects invalid credentials', () => {
    process.env.RENMESHI_ADMIN_NAME = 'test-admin'
    process.env.RENMESHI_ADMIN_PASSWORD = 'test-password'
    expect(signIn('test-admin', 'wrong')).toBeNull()
    const token = signIn('test-admin', 'test-password')
    expect(token).toBeTruthy()
    expect(requireAdmin({ authorization: `Bearer ${token}` })).toMatchObject({ actor: 'test-admin' })
    signOut(token!)
    expect(sessionFromHeaders({ authorization: `Bearer ${token}` })).toBeNull()
  })

  it('rejects requests without a bearer session', () => {
    expect(requireAdmin({})).toBeNull()
    expect(requireAdmin({ authorization: 'Bearer expired-token' })).toBeNull()
  })
})
