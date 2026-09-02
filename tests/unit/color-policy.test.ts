import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../..')
const cssFiles = ['src/App.css', 'src/index.css']
const styles = cssFiles.map((file) => readFileSync(resolve(root, file), 'utf8')).join('\n')
const tokens = readFileSync(resolve(root, 'src/app/theme/tokens.css'), 'utf8')

const prohibitedNames = /--(?:coral|violet|gold|lime)|\.(?:coral|violet|gold|lime)\b/i
const prohibitedEffects = /(?:rgba?\(|hsla?\(|color-mix\(|(?:radial|linear)-gradient\()/i
const prohibitedOpacity = /opacity\s*:/i
const hardCodedColor = /(?:^|[\s:,(])#[0-9a-f]{3,8}\b/i
const requiredRoles = ['surface', 'surface-raised', 'ink', 'muted', 'line', 'focus', 'primary', 'on-primary', 'outline-variant']

function declarations(source: string): string[] {
  return [...source.matchAll(/--rm-([\w-]+)\s*:/g)].map((match) => match[1])
}

describe('Material Theme color policy', () => {
  it('defines every required semantic role in every supported mode', () => {
    const modeBlocks = [tokens.match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? '', tokens.match(/:root\[data-theme='dark'\]\s*\{([\s\S]*?)\}/)?.[1] ?? '', tokens.match(/:root\[data-contrast='medium'\]\s*\{([\s\S]*?)\}/)?.[1] ?? '', tokens.match(/:root\[data-contrast='high'\]\s*\{([\s\S]*?)\}/)?.[1] ?? '']
    for (const block of modeBlocks) {
      for (const role of requiredRoles) expect(declarations(block)).toContain(role)
    }
  })

  it('contains no custom palette names or derived color declarations in application styles', () => {
    expect(styles).not.toMatch(prohibitedNames)
    expect(styles).not.toMatch(prohibitedEffects)
    expect(styles).not.toMatch(prohibitedOpacity)
    expect(styles).not.toMatch(hardCodedColor)
  })

  it('routes application color declarations through semantic tokens', () => {
    const colorDeclarations = [...styles.matchAll(/(?:^|[;{}\s])(?:color|background(?:-color)?|border-(?:top|right|bottom|left)-color|outline(?:-color)?|accent-color)\s*:\s*([^;{}]+)/gim)]
    for (const declaration of colorDeclarations) {
      expect(declaration[1]).toMatch(/(?:inherit|currentColor|transparent|var\(--(?:rm-(?:surface|surface-raised|ink|muted|line|focus|primary|on-primary|outline-variant)|ink|muted|paper|panel|line|focus|primary|on-primary|outline-variant|shadow)\b)/)
    }
  })

  it('reports a controlled prohibited-color fixture with its source location', () => {
    const fixture = '.example { color: coral; }'
    const violation = fixture.match(prohibitedNames)
    expect(violation?.[0]).toBe('coral')
    expect(violation?.index).toBe(19)
  })
})
