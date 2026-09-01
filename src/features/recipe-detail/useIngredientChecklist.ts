import { useState } from 'react'
import { readChecklist, writeChecklist } from '../../services/recipe-preferences'

export function useIngredientChecklist(recipeId: string) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => readChecklist(recipeId))
  const toggle = (ingredientId: string) => setChecked((current) => {
    const next = { ...current, [ingredientId]: !current[ingredientId] }
    writeChecklist(recipeId, next)
    return next
  })
  return { checked, toggle }
}
