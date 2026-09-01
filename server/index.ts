import { createServer } from 'node:http'
import { signIn, signOut, sessionFromHeaders } from './auth/auth-service.js'
import { handleError, readJson } from './http/router.js'
import { sendJson } from './http/response.js'
import { getPublicRecipes } from './recipes/recipe-read-service.js'
import { readHistory, writeRecipe } from './recipes/recipe-routes.js'
import { seedRecipes } from './storage/seed.js'

const port = Number(process.env.PORT ?? 3001)
const allowedOrigins = new Set([process.env.RENMESHI_WEB_ORIGIN ?? 'http://localhost:5173', 'http://127.0.0.1:5173'])

const server = createServer(async (request, response) => {
  try {
    const origin = request.headers.origin
    if (origin && allowedOrigins.has(origin)) response.setHeader('access-control-allow-origin', origin)
    response.setHeader('access-control-allow-headers', 'content-type, authorization')
    response.setHeader('access-control-allow-methods', 'GET, POST, PUT, OPTIONS')
    if (request.method === 'OPTIONS') return sendJson(response, 204, {})
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)
    if (request.method === 'GET' && url.pathname === '/api/health') return sendJson(response, 200, { ok: true })
    if (request.method === 'GET' && url.pathname === '/api/recipes') return sendJson(response, 200, await getPublicRecipes())
    if (request.method === 'GET' && url.pathname === '/api/history') return sendJson(response, 200, await readHistory(request.headers))
    if (request.method === 'POST' && url.pathname === '/api/auth/sign-in') {
      const body = await readJson(request) as { actor?: string; password?: string }
      const token = signIn(body.actor ?? '', body.password ?? '')
      return token ? sendJson(response, 200, { token }) : sendJson(response, 401, { error: 'Invalid admin credentials' })
    }
    if (request.method === 'POST' && url.pathname === '/api/auth/sign-out') {
      const session = sessionFromHeaders(request.headers)
      if (session) signOut(session.token)
      return sendJson(response, 204, {})
    }
    if (request.method === 'POST' && url.pathname === '/api/recipes') return sendJson(response, 201, await writeRecipe(request.headers, await readJson(request), 'created'))
    if (request.method === 'PUT' && url.pathname.startsWith('/api/recipes/')) return sendJson(response, 200, await writeRecipe(request.headers, await readJson(request), 'edited'))
    sendJson(response, 404, { error: 'Not found' })
  } catch (error) {
    handleError(response, error)
  }
})

await seedRecipes()
server.listen(port, () => console.log(`Renmeshi server listening on http://localhost:${port}`))
