import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../..')
const css = readFileSync(resolve(root, 'src/App.css'), 'utf8')
const tokens = readFileSync(resolve(root, 'src/app/theme/tokens.css'), 'utf8')
const shell = readFileSync(resolve(root, 'src/app/AppShell.tsx'), 'utf8')
const seigaiha = readFileSync(resolve(root, 'src/assets/seigaiha-pattern.svg'), 'utf8')
const logo = readFileSync(resolve(root, 'src/assets/renmeshi.svg'), 'utf8')

describe('canonical visual assets', () => {
  it('uses the supplied seigaiha asset and currentColor', () => {
    expect(css).toContain("url('./assets/seigaiha-pattern.svg')")
    expect(css).not.toContain('radial-gradient')
    expect(seigaiha).toContain('fill:currentColor')
    expect(css).toContain('color: var(--rm-outline-variant)')
  })

  it('uses the square logo as an On Primary mask in the footer', () => {
    expect(shell).toContain('className="footer-logo"')
    expect(shell).not.toContain('src={logo}')
    expect(css).toContain("url('./assets/renmeshi.svg')")
    expect(css).toContain('background-color: var(--rm-on-primary)')
    expect(logo).toContain('fill:currentColor')
  })

  it('defines all required semantic tokens for every supported mode', () => {
    expect(tokens.match(/--rm-primary:/g)).toHaveLength(2)
    expect(tokens.match(/--rm-on-primary:/g)).toHaveLength(2)
    expect(tokens.match(/--rm-outline-variant:/g)).toHaveLength(2)
    expect(css).not.toMatch(/--(?:primary|on-primary|outline-variant):/)
    expect(css).toContain('var(--rm-primary)')
    expect(css).toContain('var(--rm-on-primary)')
    expect(css).toContain('var(--rm-outline-variant)')
  })
})