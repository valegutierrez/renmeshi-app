# Data Model: About Us and Homepage Category Showcase

## AboutUsContent

Public, static content rendered by the About Us route.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `heading` | string | yes | Names Vale and Danno; supports highlighted brand names through semantic markup, not embedded styling tokens |
| `paragraphs` | string[] | yes | Ordered story paragraphs; preserve readable paragraph boundaries and allow normal wrapping |
| `portraitSrc` | string | yes | Approved local asset path; must load the creator portrait used by the reference composition |
| `portraitAlt` | string | yes | Describes the people and context without duplicating surrounding prose |
| `statement` | string | yes | Pixel-font patterned-band message about the care behind recipes, art, and code |
| `footerMessage` | string | yes | Closing site message shown beside or below the square logo |

Validation: content must remain meaningful without the image; paragraphs must not rely on color alone; the portrait must have a non-empty alternative text.

## RecipeCategoryLink

A typed mapping between the visual category showcase and the existing recipe model.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `label` | string | yes | Singular display labels: `Appetizer`, `Main Dish`, `Side Dish`, `Dessert` |
| `category` | `RecipeCategory` | yes | Existing plural values: `Appetizers`, `Mains`, `Sides`, `Desserts` |
| `imageSrc` | string | yes | Exact approved pixel-art asset path |
| `imageAlt` | string | yes | Describes the category illustration or uses the visible label when the art is decorative |
| `href` or destination | string | yes | Existing hash route/filter destination; must select the matching category |
| `sortOrder` | number | yes | Values 1 through 4 with no duplicates |

Validation: exactly four records; sort order and display order must match; image failure must not hide the label or destination.

## HomepageSection

A structural composition rather than persisted data.

| Section | Required content | Desktop layout | Mobile layout |
|---|---|---|---|
| `latest-recipes` | pixel heading, recipe cards, view-all action | panel/grid in the pattern band | one card column followed by full-width action |
| `renmeshi-explanation` | heading and explanatory paragraphs | centered readable text rail | single readable text column |
| `categories` | four `RecipeCategoryLink` records | four-column row inside centered panel | one-column ordered stack |
| `footer` | square logo and closing copy | horizontal content group | centered vertical group |

Validation: sections remain in the order header, latest recipes, explanation, categories, footer; no section may create horizontal overflow.

## Relationships

- `HomepageSection(categories)` contains exactly four `RecipeCategoryLink` values.
- Each `RecipeCategoryLink.category` matches one value in the existing `RecipeCategory` union and one or more existing recipes.
- `AboutUsContent` is consumed by the About Us route and shares `PublicNavigation` and `FooterContent` presentation with the homepage.
- `PublicNavigation` routes to About Us and recipe discovery; category links route back to recipe discovery with a category selection.
