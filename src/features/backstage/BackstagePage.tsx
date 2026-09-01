import { useEffect, useState, type FormEvent } from 'react'
import { type Recipe, type RecipeCategory } from '../../models/recipe'
import { fetchHistory, getServerAuthStatus, saveRecipeToServer, type RecipeHistoryEntry } from '../../services/api'
import { SignInPage } from './SignInPage'
import { SignOutButton } from './SignOutButton'
import { RecipeEditorForm } from './RecipeEditorForm'
import { RecipeHistory } from './RecipeHistory'

type FormState = { name: string; category: RecipeCategory; cookingTime: string; servings: string; ingredients: string; instructions: string }
const emptyForm = (): FormState => ({ name: '', category: 'Mains', cookingTime: '20', servings: '2', ingredients: '', instructions: '' })

export function BackstagePage({ recipes, onSaved }: { recipes: Recipe[]; onSaved: (recipe: Recipe) => void }) {
  const [signedIn, setSignedIn] = useState(() => getServerAuthStatus().authenticated)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<RecipeHistoryEntry[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  useEffect(() => { if (signedIn) fetchHistory().then(setHistory).catch((reason: Error) => setError(reason.message)) }, [signedIn])
  if (!signedIn) return <SignInPage onSignedIn={() => setSignedIn(true)} />

  const updateForm = (field: string, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const editRecipe = (recipe: Recipe) => { setEditingId(recipe.id); setForm({ name: recipe.name, category: recipe.category, cookingTime: String(recipe.cookingTimeMinutes), servings: String(recipe.baseServings), ingredients: recipe.ingredients.map((item) => item.displayText).join('\n'), instructions: recipe.instructions.join('\n') }) }
  const resetForm = () => { setEditingId(null); setForm(emptyForm()) }
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError('')
    const cookingTime = Number(form.cookingTime); const servings = Number(form.servings)
    const ingredientLines = form.ingredients.split('\n').map((line) => line.trim()).filter(Boolean); const instructionLines = form.instructions.split('\n').map((line) => line.trim()).filter(Boolean)
    if (!form.name.trim() || !Number.isInteger(cookingTime) || cookingTime < 1 || !Number.isFinite(servings) || servings <= 0 || !ingredientLines.length || !instructionLines.length) { setError('Enter a name, whole-minute cooking time, positive servings, at least one ingredient, and one instruction.'); return }
    const id = editingId ?? (form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `recipe-${Date.now()}`)
    const recipe: Recipe = { id, name: form.name.trim(), category: form.category, cookingTimeMinutes: cookingTime, baseServings: servings, keywords: form.name.toLowerCase().split(/\s+/).filter(Boolean), ingredients: ingredientLines.map((displayText, index) => ({ id: `${id}-ingredient-${index + 1}`, name: displayText, displayText, scalable: false })), instructions: instructionLines, accent: 'teal' }
    try { onSaved(await saveRecipeToServer(recipe, Boolean(editingId))); setHistory(await fetchHistory()); resetForm() } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save recipe') }
  }

  return <><div className="detail-header"><div><p className="eyebrow">The private kitchen</p><h1>Backstage</h1></div><SignOutButton onSignedOut={() => setSignedIn(false)} /></div><div className="admin-grid"><section className="detail-panel"><h2>Menu log</h2>{error && <p role="alert" className="notice">{error}</p>}<RecipeHistory history={history} /><h2>Current menu</h2><div className="history">{recipes.map((recipe) => <div className="history-row" key={recipe.id}><strong>{recipe.name}</strong><button className="nav-button" type="button" onClick={() => editRecipe(recipe)}>Edit</button></div>)}</div></section><section className="detail-panel"><h2>{editingId ? 'Edit recipe' : 'Add a recipe'}</h2><RecipeEditorForm {...form} editing={Boolean(editingId)} onChange={updateForm} onSubmit={submit} onCancel={resetForm} /></section></div></>
}

