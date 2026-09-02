# Recipe Image and UI Contract

## Scope

This contract defines the observable requirements for administrator-uploaded recipe images,
homepage recipe cards, Material UI surfaces, and Pixelpori labels. It supplements the existing
recipe and authentication contracts without changing authentication boundaries.

## Recipe Create/Edit Upload

- Create and edit requests MUST be authenticated administrator actions.
- Requests MUST use `multipart/form-data` with structured recipe fields and one image file.
- A create request without a valid image MUST fail with a client-actionable validation response.
- An edit request with an invalid image MUST leave the existing recipe and image unchanged.
- Accepted image types are JPEG, PNG, and WebP after both declared-type and signature validation.
- The server MUST enforce request/file size and decoded-dimension limits.
- The server MUST generate an opaque image key; client filenames MUST NOT become paths or keys.

## Recipe Response

A successful recipe response includes the required image reference:

```json
{
  "id": "recipe-id",
  "name": "Recipe name",
  "image": {
    "key": "generated-key",
    "contentType": "image/jpeg",
    "width": 1200,
    "height": 900,
    "url": "/uploads/recipes/generated-key.jpg"
  }
}
```

The exact recipe metadata remains governed by the existing recipe contract. The image URL MUST
resolve only to the generated image route and MUST NOT expose arbitrary filesystem paths.

## Image Serving

`GET /uploads/recipes/:key`

- Unknown, malformed, absolute, or traversal keys return a not-found or validation response.
- The response uses the stored validated content type and `X-Content-Type-Options: nosniff`.
- The response streams the image and does not expose the upload directory as generic static files.
- A successful response serves the exact image referenced by the recipe.

## Homepage Recipe Card

Every recipe card MUST:

- Use the recipe's stored image URL in its prominent media region.
- Never use the four restricted category pixel-art images as card media.
- Show category, title, supporting description or keywords, useful metadata, and an accessible
  read-more action in the attached mockup's hierarchy.
- Preserve a stable media aspect ratio, cover-style crop, rounded silhouette, and responsive text
  containment at desktop and mobile widths.
- Provide an accessible image alternative or equivalent meaningful context.

## Category Asset Boundaries

The appetizer, main-dish, side-dish, and dessert pixel-art files are permitted only in their
matching homepage category contexts and header Recipes dropdown icons. They are not valid
`RecipeImage` values.

## Material UI and Theme Contract

- Refreshed controls, menus, forms, alerts, and cards use Material UI or approved local wrappers.
- Material UI theme values resolve through the semantic CSS token layer populated from the
  attached Material Theme export.
- Bootstrap components, themes, utilities, and overrides are not permitted.
- Pixelpori subheading fill uses `On Surface`; its visible white stroke uses an approved export
  white tone through the shared theme layer, never a literal white value.
- The light and dark schemes retain equivalent role coverage and WCAG AA contrast.
