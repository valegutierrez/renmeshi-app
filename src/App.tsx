import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  categories,
  recipes,
  type Recipe,
  type RecipeCategory,
} from "./models/recipe";
import { filterRecipes, type TimeBand } from "./lib/recipe-filtering";
import {
  fetchHistory,
  fetchRecipes,
  getServerAuthStatus,
  saveRecipeToServer,
  signInWithServer,
  signOutFromServer,
  type RecipeHistoryEntry,
} from "./services/api";
import { AppShell } from "./app/AppShell";
import { categoryFromRoute, initialRoute, recipeIdFromRoute } from "./app/routes";
import { RecipeCard } from "./features/discovery/RecipeCard";
import { RecipeEmptyState } from "./features/discovery/RecipeEmptyState";
import { RecipeFilters } from "./features/discovery/RecipeFilters";
import { RecipeDetailPage } from "./features/recipe-detail/RecipeDetailPage";
import { BackstagePage } from "./features/backstage/BackstagePage";
import { aboutUsContent, recipeCategoryLinks } from "./models/about-us";

function App() {
  const [route, setRoute] = useState(initialRoute);
  const [category, setCategory] = useState<RecipeCategory | "All">(() => {
    const routeCategory = categoryFromRoute(initialRoute());
    return categories.includes(routeCategory as RecipeCategory)
      ? (routeCategory as RecipeCategory)
      : "All";
  });
  const [timeBand, setTimeBand] = useState<TimeBand | "all">("all");
  const [search, setSearch] = useState("");
  const [recipeCollection, setRecipeCollection] = useState(recipes);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [recipeLoadError, setRecipeLoadError] = useState("");

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = window.location.hash || "#/";
      const nextCategory = categoryFromRoute(nextRoute) as RecipeCategory;
      setRoute(nextRoute);
      if (categories.includes(nextCategory)) setCategory(nextCategory);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    fetchRecipes()
      .then(setRecipeCollection)
      .catch(() =>
        setRecipeLoadError(
          "The local menu is unavailable. Showing the saved starter recipes.",
        ),
      )
      .finally(() => setRecipesLoading(false));
  }, []);

  const visibleRecipes = useMemo(
    () => filterRecipes(recipeCollection, category, timeBand, search),
    [recipeCollection, category, timeBand, search],
  );
  const detailId = recipeIdFromRoute(route);
  const detail = recipeCollection.find((recipe) => recipe.id === detailId);

  return (
    <AppShell>
      <main className="main">
        {route === "#/about" ? (
          <AboutPage />
        ) : detail ? (
          <RecipeDetailPage recipe={detail} />
        ) : route === "#/backstage" ? (
          <BackstagePage
            recipes={recipeCollection}
            onSaved={(recipe) =>
              setRecipeCollection((current) => [
                ...current.filter((item) => item.id !== recipe.id),
                recipe,
              ])
            }
          />
        ) : (
          <>
            <section className="home-hero-band">
              <div className="hero-copy">
              <div>
                <p className="eyebrow">Your tiny cooking sidekick</p>
                <h1>What are we cooking tonight?</h1>
              </div>
              <p>
                Good food does not need a grand plan. Pick a mood, pick a timer,
                and let dinner find you.
              </p>
              </div>
              <p className="pixel-hero-title">Everyday cravings, simplified.</p>
              <section className="latest-panel" aria-labelledby="latest-heading">
                <div className="latest-heading"><p className="eyebrow">Fresh from the kitchen</p><h2 id="latest-heading">Latest recipes</h2></div>
                <div className="latest-grid">{recipeCollection.slice(0, 3).map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}<a className="view-all-action" href="#/">View all recipes <span aria-hidden="true">→</span></a></div>
              </section>
            </section>
            <section className="discovery-section">
            <RecipeFilters
              category={category}
              timeBand={timeBand}
              search={search}
              onCategoryChange={setCategory}
              onTimeBandChange={setTimeBand}
              onSearchChange={setSearch}
              onClear={() => {
                setCategory("All");
                setTimeBand("all");
                setSearch("");
              }}
            />
            <div className="result-head">
              <h2>Tonight's picks</h2>
              <span className="result-count">
                {visibleRecipes.length} RECIPES FOUND
              </span>
            </div>
            {recipesLoading && (
              <p className="status-message" role="status">
                Loading the latest menu...
              </p>
            )}
            {recipeLoadError && (
              <p className="notice" role="status">
                {recipeLoadError}
              </p>
            )}
            {visibleRecipes.length ? (
              <div className="recipe-grid">
                {visibleRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <RecipeEmptyState />
            )}
            </section>
            <section className="explanation-band" aria-labelledby="explanation-heading"><div className="content-rail"><p className="eyebrow">A meal, refined</p><h2 id="explanation-heading">What is renmeshi (錬メシ)?</h2><p>Renmeshi is a small cooking sidekick for the moments when you want something good but do not want to overthink it.</p><p>Recipes, art, and code come together here to turn everyday cravings into a doable next step.</p></div></section>
            <section className="categories-band" aria-labelledby="categories-heading"><div className="content-rail"><p className="eyebrow">Choose your quest</p><h2 id="categories-heading">Browse by appetite</h2><div className="category-panel">{recipeCategoryLinks.map((item) => <a className="category-link" href={item.href} key={item.category}><span className="category-art"><img src={item.imageSrc} alt={item.imageAlt} /></span><strong>{item.label}</strong></a>)}</div></div></section>
          </>
        )}
      </main>
    </AppShell>
  );
}

function AboutPage() {
  return <div className="about-page"><section className="about-story content-rail"><div className="portrait-frame"><img src={aboutUsContent.portraitSrc} alt={aboutUsContent.portraitAlt} /></div><div className="about-copy"><p className="eyebrow">The people behind the pantry</p><h1>{aboutUsContent.heading}</h1>{aboutUsContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section><section className="statement-band"><p>{aboutUsContent.statement}</p></section></div>
}

export function LegacyBackstage({
  recipes: recipeCollection,
  onSaved,
}: {
  recipes: Recipe[];
  onSaved: (recipe: Recipe) => void;
}) {
  const [signedIn, setSignedIn] = useState(
    () => getServerAuthStatus().authenticated,
  );
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<RecipeHistoryEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "Mains" as RecipeCategory,
    cookingTime: "20",
    servings: "2",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    if (signedIn)
      fetchHistory()
        .then(setHistory)
        .catch((reason: Error) => setError(reason.message));
  }, [signedIn]);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      category: "Mains",
      cookingTime: "20",
      servings: "2",
      ingredients: "",
      instructions: "",
    });
  };
  const editRecipe = (recipe: Recipe) => {
    setEditingId(recipe.id);
    setForm({
      name: recipe.name,
      category: recipe.category,
      cookingTime: String(recipe.cookingTimeMinutes),
      servings: String(recipe.baseServings),
      ingredients: recipe.ingredients
        .map((item) => item.displayText)
        .join("\n"),
      instructions: recipe.instructions.join("\n"),
    });
  };
  const updateForm = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  if (!signedIn)
    return (
      <section
        className="detail-panel"
        style={{ maxWidth: 480, margin: "60px auto" }}
      >
        <p className="eyebrow">Private kitchen</p>
        <h1>Backstage</h1>
        <p style={{ margin: "20px 0" }}>Sign in to manage tonight's menu.</p>
        <form
          className="editor"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            try {
              await signInWithServer(name, password);
              setSignedIn(true);
            } catch (reason) {
              setError(
                reason instanceof Error ? reason.message : "Unable to sign in",
              );
            }
          }}
        >
          <div className="field">
            <label htmlFor="admin-name">Admin name</label>
            <input
              id="admin-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && (
            <p role="alert" className="notice">
              {error}
            </p>
          )}
          <button className="primary-button" type="submit">
            Enter the kitchen
          </button>
        </form>
      </section>
    );

  return (
    <>
      <div className="detail-header">
        <div>
          <p className="eyebrow">The private kitchen</p>
          <h1>Backstage</h1>
        </div>
        <button
          className="nav-button"
          type="button"
          onClick={async () => {
            await signOutFromServer();
            setSignedIn(false);
          }}
        >
          Sign out
        </button>
      </div>
      <div className="admin-grid">
        <section className="detail-panel">
          <h2>Menu log</h2>
          {error && (
            <p role="alert" className="notice">
              {error}
            </p>
          )}
          <div className="history">
            {history.length ? (
              history.map((entry) => (
                <div className="history-row" key={entry.id}>
                  <span>
                    <strong>{entry.recipeName}</strong>
                    <br />
                    <small>
                      {entry.action} by {entry.actor}
                    </small>
                  </span>
                  <small>{new Date(entry.timestamp).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p>No changes recorded yet.</p>
            )}
          </div>
          <h2>Current menu</h2>
          <div className="history">
            {recipeCollection.map((recipe) => (
              <div className="history-row" key={recipe.id}>
                <strong>{recipe.name}</strong>
                <button
                  className="nav-button"
                  type="button"
                  onClick={() => editRecipe(recipe)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="detail-panel">
          <h2>{editingId ? "Edit recipe" : "Add a recipe"}</h2>
          <form
            className="editor"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              const cookingTime = Number(form.cookingTime);
              const servings = Number(form.servings);
              const ingredientLines = form.ingredients
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean);
              const instructionLines = form.instructions
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean);
              if (
                !form.name.trim() ||
                !Number.isInteger(cookingTime) ||
                cookingTime < 1 ||
                !Number.isFinite(servings) ||
                servings <= 0 ||
                ingredientLines.length === 0 ||
                instructionLines.length === 0
              ) {
                setError(
                  "Enter a name, whole-minute cooking time, positive servings, at least one ingredient, and one instruction.",
                );
                return;
              }
              const generatedId = form.name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
              const id = editingId ?? (generatedId || `recipe-${Date.now()}`);
              const ingredients = ingredientLines.map((displayText, index) => ({
                id: `${id}-ingredient-${index + 1}`,
                name: displayText,
                displayText,
                scalable: false,
              }));
              const recipe: Recipe = {
                id,
                name: form.name.trim(),
                category: form.category,
                cookingTimeMinutes: cookingTime,
                baseServings: servings,
                keywords: form.name.toLowerCase().split(/\s+/).filter(Boolean),
                ingredients,
                instructions: instructionLines,
              };
              try {
                const saved = await saveRecipeToServer(
                  recipe,
                  Boolean(editingId),
                );
                onSaved(saved);
                const nextHistory = await fetchHistory();
                setHistory(nextHistory);
                resetForm();
              } catch (reason) {
                setError(
                  reason instanceof Error
                    ? reason.message
                    : "Unable to save recipe",
                );
              }
            }}
          >
            <input
              aria-label="Recipe name"
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Recipe name"
              required
            />
            <select
              aria-label="Recipe category"
              value={form.category}
              onChange={(event) => updateForm("category", event.target.value)}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <input
              aria-label="Cooking time"
              value={form.cookingTime}
              onChange={(event) =>
                updateForm("cookingTime", event.target.value)
              }
              type="number"
              placeholder="Cooking time (minutes)"
              min="1"
              step="1"
              required
            />
            <input
              aria-label="Servings"
              value={form.servings}
              onChange={(event) => updateForm("servings", event.target.value)}
              type="number"
              placeholder="Servings"
              min="0.1"
              step="0.1"
              required
            />
            <textarea
              aria-label="Ingredients"
              value={form.ingredients}
              onChange={(event) =>
                updateForm("ingredients", event.target.value)
              }
              placeholder="Ingredients, one per line"
              required
            />
            <textarea
              aria-label="Instructions"
              value={form.instructions}
              onChange={(event) =>
                updateForm("instructions", event.target.value)
              }
              placeholder="Instructions, one per line"
              required
            />
            <button className="primary-button" type="submit">
              {editingId ? "Update recipe" : "Save recipe"}
            </button>
            {editingId && (
              <button className="nav-button" type="button" onClick={resetForm}>
                Cancel edit
              </button>
            )}
          </form>
        </section>
      </div>
    </>
  );
}

export default App;
