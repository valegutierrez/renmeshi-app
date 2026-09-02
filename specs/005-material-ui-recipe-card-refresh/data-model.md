# Data Model: Material UI Theme and Recipe Card Refresh

## Recipe

Existing recipe metadata plus a required image reference.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `id` | string | yes | Stable unique recipe identifier. |
| `name` | string | yes | Existing recipe-name validation applies. |
| `category` | RecipeCategory | yes | Appetizers, Mains, Sides, or Desserts. |
| `cookingTimeMinutes` | integer | yes | Positive whole minutes. |
| `baseServings` | number | yes | Positive serving count. |
| `keywords` | string[] | yes | Existing normalized keyword behavior applies. |
| `ingredients` | Ingredient[] | yes | At least one valid ingredient. |
| `instructions` | string[] | yes | At least one ordered instruction. |
| `image` | RecipeImage | yes | Must reference a validated stored image. |

## RecipeImage

The recipe-owned image metadata stored with the recipe record. Binary content is stored outside
the JSON document.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `key` | string | yes | Generated opaque identifier; never an original filename or path. |
| `contentType` | `'image/jpeg' \| 'image/png' \| 'image/webp'` | yes | Matches validated file signature. |
| `width` | number | yes | Positive bounded decoded width. |
| `height` | number | yes | Positive bounded decoded height. |
| `url` | string | yes | Stable application image route derived from the generated key. |

## Upload Lifecycle

1. **Received**: multipart request is accepted only for an authenticated administrator.
2. **Temporary**: upload is streamed to a unique temporary file under the configured upload
   directory.
3. **Validated**: type, signature, size, decodability, dimensions, and recipe fields pass.
4. **Committed**: image is moved to its generated final key and the recipe record is atomically
   updated.
5. **Served**: public recipe reads expose the stable image URL.
6. **Replaced**: on successful edit, the new image is committed before the prior image is
   removed; failed replacement retains the prior image and recipe.

## Relationships

- One `Recipe` has exactly one current `RecipeImage`.
- One generated image key belongs to at most one current recipe.
- A recipe history entry references the recipe mutation, not the binary file directly.
- Category pixel-art assets are presentation assets and are not `RecipeImage` values.

## Validation and Failure Rules

- Unsupported, empty, malformed, truncated, oversized, or undecodable images are rejected.
- Original filenames are never used as storage paths.
- A create cannot complete without a valid image.
- An edit upload failure leaves the prior recipe and image unchanged and creates no audit entry.
- Successful replacement may leave an old file only until cleanup confirms the new recipe record is
  durable; orphan cleanup must not delete a currently referenced image.
