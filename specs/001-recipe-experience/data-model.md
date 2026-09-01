# Data Model: Core Renmeshi Recipe Experience

## Recipe

Represents one cookable catalog entry.

| Field | Required | Rules |
|---|---:|---|
| `id` | Yes | Stable unique identifier. |
| `name` | Yes | Non-empty, user-visible recipe name. |
| `category` | Yes | Exactly `Appetizers`, `Mains`, `Sides`, or `Desserts`. |
| `cookingTimeMinutes` | Yes | Positive whole number used for the four filter bands. |
| `baseServings` | Yes | Positive number greater than zero. |
| `keywords` | No | Searchable terms associated with the recipe. |
| `ingredients` | Yes | Ordered list with at least one item. |
| `instructions` | Yes | Ordered list with at least one non-empty step. |
| `createdAt` | Yes | Creation timestamp. |
| `updatedAt` | Yes | Latest successful edit timestamp. |

## Ingredient

Represents one item in a recipe checklist.

| Field | Required | Rules |
|---|---:|---|
| `id` | Yes | Stable within the recipe. |
| `name` | Yes | Non-empty display text. |
| `quantity` | No | Positive numeric value when scalable. |
| `unit` | No | Display unit preserved during scaling. |
| `displayText` | Yes | Original or descriptive text, including non-scalable amounts. |
| `scalable` | Yes | False for values such as "to taste" or other descriptive amounts. |

## Recipe History Entry

Records successful catalog mutations.

| Field | Required | Rules |
|---|---:|---|
| `id` | Yes | Stable unique identifier. |
| `recipeId` | Yes | References the affected recipe. |
| `action` | Yes | `created` or `edited`. |
| `actorId` | Yes | References the authenticated admin. |
| `occurredAt` | Yes | Timestamp recorded after the data change succeeds. |
| `recipeName` | Yes | Snapshot used for readable history even if the recipe is later renamed. |

## Admin Session

Represents an authenticated admin authorization state.

| Field | Required | Rules |
|---|---:|---|
| `id` | Yes | Server-managed session identifier. |
| `actorId` | Yes | Authorized admin identity. |
| `expiresAt` | Yes | After expiration, Backstage reads and mutations are rejected. |
| `createdAt` | Yes | Session creation timestamp. |

## Client Preferences

Anonymous browser state, not a user account.

- `theme`: `light` or `dark`; invalid or unavailable stored values fall back to a usable default.
- `ingredientChecksByRecipe`: mapping from recipe ID to checked ingredient IDs for the active viewing context.

## State Transitions

- Recipe: `new` -> `created` after valid admin submission; `created` -> `edited` after valid authorized update.
- Admin session: `signed-out` -> `active` after valid sign-in; `active` -> `signed-out` on sign-out or expiration.
- Ingredient item: `unchecked` <-> `checked` during recipe viewing.
- Theme preference: `light` <-> `dark` from any public or admin screen.

## Relationships

- A Recipe has many Ingredients and one ordered instruction list.
- A Recipe has many Recipe History Entries over time.
- An Admin Session belongs to one admin actor; each history entry records that actor.
- Client ingredient-check state is keyed by Recipe ID and does not alter Recipe data.