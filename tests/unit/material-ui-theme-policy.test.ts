import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../..')

describe('Material UI feature policy', () => {
  it('uses Material UI in refreshed controls and has no Bootstrap dependency', () => {
    const packageJson = readFileSync(resolve(root, 'package.json'), 'utf8')
    const filters = readFileSync(resolve(root, 'src/features/discovery/RecipeFilters.tsx'), 'utf8')
    const editor = readFileSync(resolve(root, 'src/features/backstage/RecipeEditorForm.tsx'), 'utf8')
    const tokens = readFileSync(resolve(root, 'src/app/theme/tokens.css'), 'utf8')
    const muiTheme = readFileSync(resolve(root, 'src/app/theme/mui-theme.ts'), 'utf8')
    expect(packageJson).not.toMatch(/bootstrap/i)
    expect(filters).toContain("from '@mui/material'")
    expect(editor).toContain("from '@mui/material'")
    expect(muiTheme).toContain('var(--rm-surface)')
    expect(tokens.match(/--rm-surface:/g)).toHaveLength(2)
  })
})