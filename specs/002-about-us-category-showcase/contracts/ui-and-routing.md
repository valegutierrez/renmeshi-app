# UI and Routing Contract: About Us and Homepage Category Showcase

This feature has no external API contract. Its public contract is the browser-visible route, semantic structure, asset usage, and category-filter behavior.

## Routes

| Route | Entry | Required result |
|---|---|---|
| `#/` | Renmeshi wordmark, Recipes navigation, or category link | Homepage sections render in order; category links select the corresponding recipe category |
| `#/about` | About us navigation | About Us content, patterned statement band, and shared footer render |
| `#/recipe/:id` | Existing recipe card | Existing recipe detail behavior remains unchanged |
| `#/backstage` | Existing Backstage link | Existing admin demo boundary remains unchanged by this public feature |

## Shared Header Contract

- Desktop: centered header content rail; square mark and `renmeshi letters.svg` wordmark at the leading edge; About us and Recipes navigation in the middle; search/theme controls at the trailing edge where already supported.
- Mobile: compact leading wordmark and an accessible menu button; navigation must remain keyboard reachable and must not force desktop controls into overflow.
- The active About us item exposes a visible current-page state without relying on color alone.

## Homepage Category Contract

Each category is a keyboard-focusable link or button with:

- visible label: Appetizer, Main Dish, Side Dish, or Dessert;
- matching image from `src/assets/pixelart/`;
- accessible name that includes the category;
- destination that selects the existing plural recipe category;
- visible focus ring from the shared token layer;
- label and destination preserved if image loading fails.

Desktop presents four equal grid tracks. Mobile presents one ordered track. The image itself is rendered with pixel-preserving interpolation and cannot resize the item’s label or focus target.

## About Us Contract

The route exposes:

1. a semantic main region with one primary heading;
2. a portrait image with approved source, stable aspect-ratio frame, rounded corners, and useful alternative text;
3. ordered creator-story paragraphs;
4. a patterned statement region with readable Pixelpori text;
5. the shared footer using `src/assets/renmeshi.svg`.

Desktop uses an image/content grid; mobile uses document order image then content. All content remains reachable at 320 px width and under browser zoom.

## Theme and Accessibility Contract

- Every color is a semantic token from the shared Material theme layer.
- Light, dark, medium-contrast, and high-contrast variants provide equivalent coverage.
- Body text and controls meet WCAG AA contrast; decorative pattern layers are not relied upon for meaning.
- Links, menu controls, category items, and search controls expose focus-visible states.
- Images have meaningful alt text or are explicitly decorative when the adjacent label is the accessible name.
