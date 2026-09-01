import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { categories, recipes, type Recipe, type RecipeCategory } from './models/recipe'
import { filterRecipes, type TimeBand } from './lib/recipe-filtering'
import { scaledIngredients } from './lib/serving-scaling'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => window.localStorage.getItem('renmeshi-theme') === 'dark' ? 'dark' : 'light')
  const [route, setRoute] = useState(window.location.hash || '#/')
  const [category, setCategory] = useState<RecipeCategory | 'All'>('All')
  const [timeBand, setTimeBand] = useState<TimeBand | 'all'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('renmeshi-theme', theme)
  }, [theme])

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const visibleRecipes = useMemo(() => filterRecipes(recipes, category, timeBand, search), [category, timeBand, search])
  const detailId = route.startsWith('#/recipe/') ? route.replace('#/recipe/', '') : ''
  const detail = recipes.find((recipe) => recipe.id === detailId)

  const toggleTheme = () => setTheme((value) => value === 'light' ? 'dark' : 'light')

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#/"><span className="brand-mark">RM</span><span>RENMESHI<small>Tonight's menu, sorted.</small></span></a>
        <nav className="top-actions" aria-label="Main navigation"><a className="nav-button" href="#/backstage">Backstage ↗</a><button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '☾ Dark' : '☀ Light'}</button></nav>
      </header>
      <main className="main">
        {detail ? <RecipeDetail recipe={detail} /> : route === '#/backstage' ? <Backstage /> : <>
          <section className="hero-copy"><div><p className="eyebrow">Your tiny cooking sidekick</p><h1>What are we cooking tonight?</h1></div><p>Good food does not need a grand plan. Pick a mood, pick a timer, and let dinner find you.</p></section>
          <div className="wave-strip" aria-hidden="true" />
          <section className="filters" aria-label="Recipe filters"><div className="field"><label htmlFor="search">Search the pantry</label><input id="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try tofu, sweet, quick..." /></div><div className="field"><label htmlFor="category">Category</label><select id="category" value={category} onChange={(event) => setCategory(event.target.value as RecipeCategory | 'All')}><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div><div className="field"><label htmlFor="time">Time</label><select id="time" value={timeBand} onChange={(event) => setTimeBand(event.target.value as TimeBand | 'all')}><option value="all">Any time</option><option value="under15">Under 15 min</option><option value="15to30">15-30 min</option><option value="30to60">30-60 min</option><option value="60plus">60+ min</option></select></div><button className="clear-button" type="button" onClick={() => { setCategory('All'); setTimeBand('all'); setSearch('') }}>Clear ×</button></section>
          <div className="result-head"><h2>Tonight's picks</h2><span className="result-count">{visibleRecipes.length} RECIPES FOUND</span></div>
          {visibleRecipes.length ? <div className="recipe-grid">{visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div> : <div className="empty"><h3>Nothing in the pot yet.</h3><p>Try loosening a filter or search for something else.</p></div>}
        </>}
      </main>
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return <a className="recipe-card" href={`#/recipe/${recipe.id}`}><div className={`card-art ${recipe.accent}`}><span>{recipe.category.toUpperCase()}</span><span className="card-emoji" aria-hidden="true">{recipe.category === 'Desserts' ? '✦' : recipe.category === 'Sides' ? '◌' : recipe.category === 'Appetizers' ? '◇' : '✺'}</span></div><div className="card-body"><h3>{recipe.name}</h3><p>{recipe.keywords.slice(0, 3).join(' · ')}</p><div className="meta-row"><span>{recipe.cookingTimeMinutes} min</span><span>{recipe.baseServings} servings</span></div></div></a>
}

function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.baseServings)
  const [checked, setChecked] = useState<Record<string, boolean>>(() => JSON.parse(window.localStorage.getItem(`renmeshi-checks-${recipe.id}`) || '{}'))
  const ingredients = scaledIngredients(recipe.ingredients, recipe.baseServings, servings)
  const updateChecked = (id: string) => setChecked((current) => { const next = { ...current, [id]: !current[id] }; window.localStorage.setItem(`renmeshi-checks-${recipe.id}`, JSON.stringify(next)); return next })
  return <><div className="detail-header"><a className="back-link" href="#/">← Back to the pantry</a><span className="eyebrow">{recipe.category} / {recipe.cookingTimeMinutes} min</span></div><section className="detail-header"><div><p className="eyebrow">Recipe card</p><h1>{recipe.name}</h1></div><p>{recipe.keywords.join(' · ')}</p></section><div className="detail-layout"><div><section className="detail-panel"><h2>Gather your bits</h2><div className="ingredients">{ingredients.map((ingredient) => <label className={`ingredient ${checked[ingredient.id] ? 'checked' : ''}`} key={ingredient.id}><input type="checkbox" checked={Boolean(checked[ingredient.id])} onChange={() => updateChecked(ingredient.id)} /><span>{ingredient.displayText}</span></label>)}</div><div className="scale-row"><strong>Serves</strong><input className="serving-input" type="number" min="1" value={servings} onChange={(event) => { const next = Number(event.target.value); if (next > 0) setServings(next) }} aria-label="Number of servings" /></div></section></div><section className="detail-panel"><h2>Make it happen</h2><ol className="step-list">{recipe.instructions.map((step) => <li key={step}>{step}</li>)}</ol></section></div></>
}

function Backstage() {
  const [signedIn, setSignedIn] = useState(() => window.localStorage.getItem('renmeshi-admin') === 'yes')
  const [name, setName] = useState('')
  if (!signedIn) return <section className="detail-panel" style={{ maxWidth: 480, margin: '60px auto' }}><p className="eyebrow">Private kitchen</p><h1>Backstage</h1><p style={{ margin: '20px 0' }}>Sign in to manage tonight's menu.</p><form className="editor" onSubmit={(event) => { event.preventDefault(); if (name) { window.localStorage.setItem('renmeshi-admin', 'yes'); setSignedIn(true) } }}><div className="field"><label htmlFor="admin-name">Admin name</label><input id="admin-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="demo-admin" required /></div><button className="primary-button" type="submit">Enter the kitchen</button></form></section>
  return <><div className="detail-header"><div><p className="eyebrow">The private kitchen</p><h1>Backstage</h1></div><button className="nav-button" type="button" onClick={() => { window.localStorage.removeItem('renmeshi-admin'); setSignedIn(false) }}>Sign out</button></div><div className="admin-grid"><section className="detail-panel"><h2>Menu log</h2><div className="notice">Demo workspace ready. Connect the protected recipe service before production use.</div><div className="history"><div className="history-row"><span><strong>Miso Butter Noodles</strong><br /><small>edited by demo-admin</small></span><small>Today, 18:42</small></div><div className="history-row"><span><strong>Ginger Cucumber Salad</strong><br /><small>created by demo-admin</small></span><small>Yesterday, 12:10</small></div></div></section><section className="detail-panel"><h2>Add a recipe</h2><form className="editor" onSubmit={(event) => event.preventDefault()}><input aria-label="Recipe name" placeholder="Recipe name" /><select aria-label="Recipe category" defaultValue="Mains"><option>Appetizers</option><option>Mains</option><option>Sides</option><option>Desserts</option></select><input aria-label="Cooking time" type="number" placeholder="Cooking time (minutes)" min="1" /><textarea aria-label="Ingredients" placeholder="Ingredients, one per line" /><textarea aria-label="Instructions" placeholder="Instructions, one per line" /><button className="primary-button" type="submit">Save recipe</button></form></section></div></>
}

export default App
