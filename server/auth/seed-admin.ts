const name = process.env.RENMESHI_ADMIN_NAME
const password = process.env.RENMESHI_ADMIN_PASSWORD

if (!name || !password) {
  throw new Error('RENMESHI_ADMIN_NAME and RENMESHI_ADMIN_PASSWORD must be configured')
}

export const adminFixture = { name, password }
