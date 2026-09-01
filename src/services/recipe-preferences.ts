const checklistKey = (recipeId: string) => `renmeshi-checks-${recipeId}`

export function readChecklist(recipeId: string): Record<string, boolean> {
  try {
    const stored = window.localStorage.getItem(checklistKey(recipeId))
    return stored ? JSON.parse(stored) as Record<string, boolean> : {}
  } catch {
    return {}
  }
}

export function writeChecklist(recipeId: string, checked: Record<string, boolean>): void {
  window.localStorage.setItem(checklistKey(recipeId), JSON.stringify(checked))
}
