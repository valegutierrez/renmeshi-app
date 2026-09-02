# Feature Specification: About Us and Homepage Category Showcase

**Feature Branch**: `002-about-us-category-showcase`

**Created**: 2026-09-01

**Status**: Draft

**Input**: User description: "Analyze the screenshots in the design-mockups folder to create an About Us page as a new feature in this app and to also include the pixel art images in the assets folder as a categories section in the Homepage. Document the visual layout, positioning, spacing hierarchy, and components."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Learn Who Made Renmeshi (Priority: P1)

A visitor opens About Us from the public navigation and quickly understands who Vale and Danno are, why they built Renmeshi, and what the recipe experience is meant to do. The page feels like the same warm, personal kitchen notebook as the homepage.

**Why this priority**: The About Us page gives the personal story behind the product and is explicitly required by the project constitution.

**Independent Test**: Open the About Us route at desktop and mobile widths, verify the creator story, photo, brand explanation, closing message, header navigation, and footer are all reachable, readable, and visually ordered without horizontal scrolling.

**Acceptance Scenarios**:

1. **Given** a visitor is on any public page, **When** they activate the About us navigation item, **Then** the About Us page opens with the shared Renmeshi header and the current theme intact.
2. **Given** the About Us page is open on a wide screen, **When** the visitor scans the first viewport, **Then** they see a centered two-column introduction with the creator photo on the left and the story heading and paragraphs on the right.
3. **Given** the About Us page is open on a narrow screen, **When** the visitor scrolls through it, **Then** the photo appears above the story text, the content fits the viewport, and no text or controls overlap.
4. **Given** the visitor reads the story, **When** they reach the closing sections, **Then** they see the patterned statement band followed by the teal footer with the square Renmeshi logo and closing message.
5. **Given** either light or dark theme is active, **When** the visitor opens About Us, **Then** all text, image framing, patterned surfaces, navigation, and footer content remain legible and usable.

### User Story 2 - Explore Recipe Categories from Home (Priority: P1)

A visitor lands on the homepage and sees a visual category guide that helps them choose what kind of recipe to browse. They recognize Appetizer, Main Dish, Side Dish, and Dessert from the supplied pixel-art illustrations and can use each category as a path into recipe discovery.

**Why this priority**: The category showcase directly supports the product question of what to cook next and is part of the homepage design direction.

**Independent Test**: Open the homepage at desktop and mobile widths, verify the four supplied category illustrations and labels are visible in the intended order, activate each category, and confirm the visitor reaches the corresponding filtered recipe collection.

**Acceptance Scenarios**:

1. **Given** the visitor is on the homepage, **When** they reach the category section, **Then** they see four items in this order: Appetizer, Main Dish, Side Dish, Dessert.
2. **Given** the homepage is open on a wide screen, **When** the visitor scans the category section, **Then** the items appear in one horizontal row inside a centered, lightly framed panel over the seigaiha-patterned background.
3. **Given** the homepage is open on a narrow screen, **When** the visitor reaches the category section, **Then** the items stack vertically in the same order with enough spacing for each illustration and label to remain distinct.
4. **Given** the visitor activates a category item, **When** navigation completes, **Then** the recipe collection opens with the matching category filter selected.
5. **Given** any supplied category image cannot be loaded, **When** the category section renders, **Then** its accessible text label remains visible and the remaining category items remain usable.

### User Story 3 - Understand the Renmeshi Homepage Story (Priority: P2)

A visitor sees the homepage as a coherent editorial journey: a compact latest-recipes showcase, the meaning and purpose of Renmeshi, a category exploration section, and a recognizable closing footer.

**Why this priority**: The homepage needs a clear visual hierarchy that connects discovery, brand story, and category navigation without overwhelming the visitor.

**Independent Test**: Compare the homepage against the supplied desktop and mobile references at representative widths and verify the section order, major spacing, typography hierarchy, patterned bands, navigation, and footer composition.

**Acceptance Scenarios**:

1. **Given** the homepage is open, **When** the visitor starts at the top, **Then** the page presents the shared header, a pattern-backed latest-recipes section, a prominent "Everyday cravings, simplified." title, and a latest recipes panel with recipe cards and a view-all action.
2. **Given** the visitor continues down the homepage, **When** they reach the explanatory band, **Then** they see a centered "What is renmeshi (錬メシ)?" heading and concise paragraphs explaining the name, creators, and recipe purpose.
3. **Given** the visitor reaches the end of the homepage, **When** they view the category and footer bands, **Then** the category panel precedes a full-width teal footer containing the square logo and closing copy.
4. **Given** the homepage is viewed on mobile, **When** the visitor scrolls from top to bottom, **Then** each section becomes a readable single-column composition while preserving the desktop order and primary actions.

### Edge Cases

- The About Us creator photo uses a fixed visual frame with rounded corners and remains cropped without distortion at desktop and mobile widths.
- Long creator-story text wraps within the content column and does not push the header, patterned band, or footer outside the viewport.
- The header remains usable when the desktop navigation collapses to a compact mobile menu control.
- Missing or slow-loading category art does not remove the category label or make the category link unusable.
- The four category images retain their labels and relative order in both themes and at all supported widths.
- The patterned seigaiha bands remain decorative and do not reduce text contrast or interfere with keyboard focus.
- The footer logo and copy remain centered and readable when the available width is narrow.
- About Us and homepage content remain readable when the user's preferred light/dark theme is restored on reload.
- The category showcase supplements the existing recipe filters; it does not replace free-text, time, or category filtering behavior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The public site MUST provide an About Us page reachable from the shared public navigation.
- **FR-002**: The About Us page MUST explain the identities of Vale and Danno, their shared interests in cooking and coding, the origin and meaning of Renmeshi, and the purpose of the recipe collection.
- **FR-003**: The About Us page MUST display the approved creator photograph from the design reference as the primary visual in the opening story section.
- **FR-004**: On wide screens, the About Us opening section MUST use a centered two-column hierarchy with the photograph on the left and the story content on the right.
- **FR-005**: On narrow screens, the About Us opening section MUST stack the photograph above the story content while preserving the reading order and preventing horizontal scrolling.
- **FR-006**: The About Us page MUST include a patterned statement band between the story section and a full-width teal footer.
- **FR-007**: The About Us footer MUST use `src/assets/renmeshi.svg` as the square Renmeshi logo and include the closing message shown by the design direction.
- **FR-008**: The shared public header MUST use `src/assets/renmeshi letters.svg` as the Renmeshi wordmark alongside the square mark where the layout allows, and MUST provide About us and recipe navigation.
- **FR-009**: The homepage MUST include a category showcase after the Renmeshi explanation section and before the footer.
- **FR-010**: The category showcase MUST contain exactly four category items in this order: Appetizer, Main Dish, Side Dish, Dessert.
- **FR-011**: The category showcase MUST use `src/assets/pixelart/appetizer.png`, `src/assets/pixelart/main-dish.png`, `src/assets/pixelart/side-dish.png`, and `src/assets/pixelart/dessert.png` for the corresponding category items.
- **FR-012**: Each category item MUST expose an accessible category name and MUST navigate to the recipe collection with the corresponding category filter active.
- **FR-013**: On wide screens, the category items MUST appear in one horizontal row inside a centered panel over a seigaiha-patterned section background.
- **FR-014**: On narrow screens, the category items MUST stack vertically with consistent spacing and preserve their desktop order.
- **FR-015**: The homepage MUST preserve the visual section order represented by the design references: shared header, latest-recipes showcase, Renmeshi explanation, category showcase, and teal footer.
- **FR-016**: The homepage latest-recipes showcase MUST include a prominent pixel-style heading, a latest-recipes panel, recipe cards, and a view-all-recipes action without obscuring existing recipe discovery capabilities.
- **FR-017**: The About Us page and homepage category showcase MUST use the shared Material theme token layer for all colors and MUST remain usable in light and dark themes.
- **FR-018**: The feature MUST use the supplied `src/assets/fonts/pixelpori.ttf` for pixel-style headings, labels, and tags, while body copy follows the established site typography.
- **FR-019**: Pattern backgrounds, image framing, panels, spacing, and responsive composition MUST be inspired by the supplied Home and About Us mockups without overriding Material theme tokens, WCAG AA contrast, or semantic accessibility requirements.
- **FR-020**: The feature MUST not introduce regular visitor accounts, ratings/comments, meal planning, calendars, third-party recipe imports, or unrelated marketing flows.

### Key Entities

- **About Us Content**: The public story content for Vale and Danno, including headings, paragraphs, creator photograph, statement copy, and footer message.
- **Recipe Category Link**: A homepage navigation item containing a category name, approved pixel-art image, accessible alternative text, and destination filter.
- **Homepage Section**: A visually ordered content band representing latest recipes, Renmeshi explanation, category exploration, or the closing footer.
- **Public Navigation**: Shared header controls for the Renmeshi wordmark, About Us, recipe discovery, search, and responsive mobile navigation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In desktop and mobile visual review, 100% of the required homepage sections appear in the specified order with no horizontal overflow or overlapping content.
- **SC-002**: In desktop and mobile visual review, 100% of the four supplied category images render with the correct labels, relative order, and usable category destinations.
- **SC-003**: At least 90% of test visitors can locate About Us from the public header and identify the creators and purpose of Renmeshi within 30 seconds.
- **SC-004**: At least 90% of test visitors can use the homepage category showcase to reach a recipe collection filtered to the selected category on their first attempt.
- **SC-005**: All tested About Us and homepage states pass WCAG AA contrast review in both light and dark themes, including patterned backgrounds, panels, labels, navigation, and footer content.
- **SC-006**: At least 95% of tested viewport widths from 320 px through desktop width display the creator story, category section, and footer without clipped text, inaccessible controls, or layout-breaking overflow.
- **SC-007**: In usability review, at least 90% of visitors describe the About Us page and homepage category showcase as visually consistent with the Renmeshi pixel-art, personal, and cozy identity.

## Assumptions

- The supplied Home and About Us screenshots are the authoritative visual references for composition and responsive hierarchy; the screenshots are inspiration rather than a source of color tokens.
- The creator photograph shown in the About Us references is available in the project’s approved assets or will be supplied through the existing content pipeline; this feature does not invent or license replacement photography.
- The current recipe collection and filter behavior remain the source of truth for category destinations; the new showcase only selects an existing category filter.
- The shared header and footer are reused across public pages so theme behavior and navigation remain consistent.
- The supplied Pixelpori font is available at `src/assets/fonts/pixelpori.ttf` and can be loaded by the public site without a new font substitution.
- Desktop layout uses a centered content rail with generous outer whitespace; mobile layout uses a single content column and a compact header menu control.
- The exact viewport widths, image crop position, and spacing may adapt responsively as long as the documented visual hierarchy and no-overlap requirements remain intact.
- The feature does not alter the authenticated Backstage area beyond keeping shared theme and public navigation boundaries intact.
