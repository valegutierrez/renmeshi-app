# Research: About Us and Homepage Category Showcase

## Decision: Extend the existing single React/Vite client with shared public page primitives

**Rationale**: The repository is a single Vite React application with hash-based routes in `src/App.tsx`, a local recipe model, and CSS custom properties already used across public and Backstage surfaces. The feature adds a public About Us route and homepage sections without introducing a backend, new storage, or a second application.

**Alternatives considered**: A new page framework was rejected because it would duplicate routing and theme behavior. A separate static About Us document was rejected because it would bypass shared navigation, theme state, and responsive behavior.

## Decision: Use a centered CSS container plus explicit grid-to-stack layout transitions

**Rationale**: The screenshots show a centered desktop content rail inside a full-width page, then a single-column mobile flow. CSS Grid is the clearest fit for the desktop About Us two-column story, latest-recipe row, and four-column category row; Flexbox handles header alignment, footer content, card internals, and mobile stacks. Use the existing 800 px tablet transition and 520 px compact-mobile transition, with a 320 px minimum test width.

**Alternatives considered**: Absolute positioning was rejected because it would break with translated copy, font metrics, theme changes, and mobile wrapping. A single flex row for all content was rejected because the About Us and category relationships are two-dimensional at desktop widths.

## Decision: Define a shared CSS token layer and map Material theme exports into it

**Rationale**: The constitution makes Material Theme Builder values authoritative and prohibits component-level hard-coded colors. The implementation should centralize surface, content, outline, primary, secondary, tertiary, and focus tokens in the existing theme mechanism, with light, dark, medium-contrast, and high-contrast datasets sharing the same semantic names. Decorative patterns may use token references but must not introduce screenshot-derived hex values.

**Alternatives considered**: Copying colors sampled from the screenshots was rejected because mockups are layout inspiration only and would violate theme authority. Keeping starter CSS tokens untouched was rejected because the starter values are not a complete Material theme layer.

## Decision: Load Pixelpori locally and preserve Raleway/Poppins roles

**Rationale**: `src/assets/fonts/pixelpori.ttf` exists and is required for pixel headings, labels, and tags. Add a local `@font-face` with `font-display: swap`, use Pixelpori only for display labels, and retain Raleway for conventional headings and Poppins for body copy per the constitution. Explicit font-size, line-height, and wrapping rules are needed to avoid the geometric shifts visible when mockup text is treated as a raw image.

**Alternatives considered**: A system monospace fallback was rejected because it does not reproduce the supplied pixel identity. Applying Pixelpori to body copy was rejected because its readability and line length are unsuitable for paragraphs.

## Decision: Treat the creator portrait as a required approved asset dependency

**Rationale**: No creator portrait exists in the current `src/assets` tree, while the About Us mockup requires one as its primary visual. Implementation must add an approved portrait asset, for example `src/assets/creator-portrait.jpg`, with documented provenance and responsive `object-fit: cover` framing. The plan does not authorize inventing or scraping replacement photography.

**Alternatives considered**: Reusing `hero.png` was rejected because it is not the creator photograph shown in the reference. Omitting the photo was rejected because it removes the main About Us visual and fails FR-003.

## Decision: Keep category destinations compatible with the existing plural recipe model

**Rationale**: The model uses `Appetizers`, `Mains`, `Sides`, and `Desserts`, while the visual labels are singular. The category showcase should store a display label and the matching `RecipeCategory` value, then navigate through the existing hash route and filter state without replacing current free-text or time filters. If URL state is used, it should be explicit and parsed centrally rather than encoded in ad hoc click handlers.

**Alternatives considered**: Renaming the existing recipe model categories was rejected because it would widen the feature and risk regressions in filtering. Four independent hard-coded navigation implementations were rejected because they could drift from the model.

## Decision: Validate layout behavior in a browser at reference and boundary widths

**Rationale**: The important risks are responsive overflow, route integration, image loading, focus visibility, theme parity, and category filter selection. Run the existing lint/build checks plus browser checks at 1440 px, 1024 px, 800 px, 520 px, 375 px, and 320 px. Validate computed layout relationships and visible text rather than pixel-diffing the mockups.

**Alternatives considered**: Unit tests alone were rejected because they cannot detect overflow, image framing, navigation collapse, or theme flash. Pixel-diff tests were not selected because the constitution does not require them for visual styling and Material theme adaptation makes exact color diffs brittle.
