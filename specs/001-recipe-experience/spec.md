# Feature Specification: Core Renmeshi Recipe Experience

**Feature Branch**: `001-recipe-experience`

**Created**: 2026-08-31

**Status**: Draft

**Input**: User description: "Build the core Renmeshi recipe experience for home cooks deciding what to cook tonight, including accessible theming, recipe discovery, recipe details, and authenticated Backstage administration."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find a Recipe for Tonight (Priority: P1)

A home cook lands on Renmeshi and browses the full recipe collection. They narrow the collection by category, cooking time, and free-text terms in any combination until they find a recipe that fits their mood and available time.

**Why this priority**: Quickly answering "what should we cook tonight?" is the primary visitor value of the app.

**Independent Test**: Load the public recipe collection with a representative set of recipes, apply each filter individually and in combination, and confirm that matching results update immediately without a page reload, spinner, or unrelated recipes.

**Acceptance Scenarios**:

1. **Given** the public collection contains recipes across all four categories, **When** a visitor selects Appetizers, Mains, Sides, or Desserts, **Then** only recipes in the selected category are shown.
2. **Given** the collection contains recipes in each cooking-time band, **When** a visitor selects under 15 min, 15-30 min, 30-60 min, or 60+ min, **Then** only recipes in that inclusive time band are shown.
3. **Given** recipes have searchable names and keywords, **When** a visitor enters a search term, **Then** results are narrowed to recipes whose name or keyword matches the term without requiring an exact case match.
4. **Given** a visitor has selected a category and cooking-time band, **When** they enter a search term, **Then** the result set satisfies all active filters at the same time.
5. **Given** no recipe satisfies the active filters, **When** filtering completes, **Then** the visitor sees a clear empty-state message and can remove or change filters.

### User Story 2 - Cook From a Recipe (Priority: P1)

A home cook opens a recipe and uses its detail view while preparing food. They adjust servings, check ingredients off as they gather or use them, and follow clearly ordered instructions.

**Why this priority**: A successful discovery experience must continue into a practical cooking workflow.

**Independent Test**: Open a recipe, change the serving count, verify every scalable ingredient quantity changes proportionally, check and uncheck ingredients, and confirm the ordered instructions remain visible and understandable.

**Acceptance Scenarios**:

1. **Given** a recipe has ingredients and ordered instructions, **When** a visitor opens its detail view, **Then** the page presents the ingredient checklist, serving controls, and a high-visibility numbered instruction list.
2. **Given** a recipe is written for four servings, **When** the visitor changes the serving count to two, **Then** each scalable ingredient quantity is recalculated to half its original amount and the selected serving count is visible.
3. **Given** a visitor has checked ingredients while viewing a recipe, **When** they navigate within the recipe and return to the ingredient list during that viewing session, **Then** the checked state remains unchanged.
4. **Given** a visitor has checked an ingredient, **When** they activate it again, **Then** it returns to the unchecked state.

### User Story 3 - Use the App Comfortably in Either Theme (Priority: P2)

A visitor or admin switches between light and dark themes from any screen. The selected theme applies immediately, remains legible across public and Backstage views, and is still selected on a later visit.

**Why this priority**: Theme choice is an accessibility and comfort requirement that affects every workflow.

**Independent Test**: Switch themes from public and admin screens, navigate between screens, reload the app, and verify the chosen theme remains applied without an observable wrong-theme flash and with readable controls, text, and status states.

**Acceptance Scenarios**:

1. **Given** the app is open on any public or admin screen, **When** the user activates the theme switcher, **Then** the complete screen changes to the selected theme immediately without a page reload.
2. **Given** the user selected a theme during an earlier visit, **When** they return to the app, **Then** the same theme is applied before the interface becomes visible.
3. **Given** either theme is active, **When** the user navigates through public and admin screens, **Then** text, controls, recipe content, feedback, and authentication states remain legible and usable at WCAG AA contrast or better.

### User Story 4 - Manage the Recipe Catalog in Backstage (Priority: P2)

An authorized admin signs in to a separate Backstage area, reviews recipe history, creates recipes, edits existing recipes, and signs out. An unauthenticated visitor cannot access or perform Backstage actions.

**Why this priority**: The catalog must be maintainable without code changes for the public experience to remain useful over time.

**Independent Test**: Attempt Backstage access while signed out, sign in as an admin, create and edit a recipe, verify the history entries and timestamps, then sign out and confirm access is blocked again.

**Acceptance Scenarios**:

1. **Given** a signed-out user requests a Backstage screen, **When** access is evaluated, **Then** the user is redirected to sign-in and cannot view or use admin actions.
2. **Given** valid admin credentials, **When** the admin signs in, **Then** Backstage becomes available and the admin can sign out from the area.
3. **Given** an authenticated admin is creating a recipe, **When** they provide a name, one supported category, cooking time, servings, ingredients, and ordered instructions and submit it, **Then** the recipe is added to the collection and the create action appears in recipe history with its timestamp.
4. **Given** an authenticated admin selects an existing recipe, **When** they edit and save its recipe fields, **Then** the updated recipe is reflected in the public collection and the edit action appears in recipe history with its timestamp.
5. **Given** a signed-out user attempts a create or edit action directly, **When** the action is submitted, **Then** it is rejected by the authorization boundary and no recipe data changes.

### Edge Cases

- A search term with leading/trailing spaces or different capitalization is normalized for matching.
- A recipe collection with zero matches shows an actionable empty state rather than a blank content area.
- A recipe with an ingredient that has no numeric quantity remains usable when servings change; non-scalable text is preserved.
- Serving controls reject empty, zero, negative, or otherwise invalid values and retain the last valid serving count.
- Ingredient checklist state is isolated per recipe and does not carry over to another recipe.
- A malformed or incomplete recipe submission identifies the invalid fields and does not create or overwrite a recipe.
- An expired or invalid admin session returns the user to sign-in and prevents the requested mutation.
- A failed create or edit does not create a misleading history entry and leaves the existing recipe unchanged.
- Theme preference storage is unavailable or corrupted; the app falls back to a usable default theme without blocking access.
- Long recipe names, ingredient text, instructions, and empty history states remain readable without overlapping controls on narrow screens.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The public experience MUST present the complete recipe collection to visitors without requiring an account.
- **FR-002**: Visitors MUST be able to filter recipes by exactly one of Appetizers, Mains, Sides, or Desserts.
- **FR-003**: Visitors MUST be able to filter recipes by cooking time using under 15 min, 15-30 min, 30-60 min, and 60+ min bands.
- **FR-004**: Visitors MUST be able to search recipe names and keywords using free text with case-insensitive matching and whitespace normalization.
- **FR-005**: Category, cooking-time, and text filters MUST be combinable, and the displayed collection MUST satisfy every active filter.
- **FR-006**: Typical collection filtering and search MUST update as the visitor changes input without a page reload, spinner, or avoidable delay.
- **FR-007**: Each recipe detail view MUST show the recipe name, category, cooking time, current servings, ingredient checklist, and ordered step-by-step instructions.
- **FR-008**: Visitors MUST be able to check and uncheck each ingredient, and checklist state MUST persist while they continue viewing that recipe.
- **FR-009**: Visitors MUST be able to change the serving count, and the detail view MUST recalculate numeric ingredient quantities proportionally while preserving ingredient units and text that cannot be scaled.
- **FR-010**: The app MUST provide a theme control on every public and admin screen that switches between light and dark themes immediately.
- **FR-011**: The selected theme MUST persist across visits and be applied before content is shown, with no observable flash of an incorrect theme.
- **FR-012**: All public and admin screens MUST remain usable and meet WCAG AA contrast requirements in both themes, including content, controls, focus states, errors, and empty states.
- **FR-013**: The app MUST provide a separate Backstage area with sign-in and sign-out actions for admins.
- **FR-014**: Backstage MUST require an authenticated admin session for every screen and every recipe create or edit action; client-side visibility checks alone MUST NOT authorize an action.
- **FR-015**: Backstage MUST show a history of recipe creation and edit actions with the affected recipe, action type, actor, and timestamp.
- **FR-016**: Authenticated admins MUST be able to create a recipe with a name, supported category, cooking time, servings, ingredients, and ordered instructions.
- **FR-017**: Authenticated admins MUST be able to edit the fields of an existing recipe, with validation preventing incomplete data from being saved.
- **FR-018**: Recipe create and edit actions MUST be recorded for audit purposes only after the corresponding data change succeeds.
- **FR-019**: The app MUST exclude regular-visitor accounts, profiles, ratings, comments, meal planning, calendars, and third-party recipe imports from this feature.

### Key Entities

- **Recipe**: A cookable entry containing a name, category, cooking time, base serving count, ingredients, ordered instructions, and timestamps for creation and latest edit.
- **Ingredient**: A recipe item containing display text and, when available, a numeric quantity and unit that can be adjusted with servings.
- **Recipe History Entry**: An audit record identifying a create or edit action, the affected recipe, the authenticated admin actor, and the action timestamp.
- **Admin Session**: An authenticated authorization state that permits an admin to view Backstage and perform permitted recipe management actions until sign-out or expiration.
- **Theme Preference**: A visitor or admin preference for light or dark presentation that applies across the app and persists across visits.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability tests with a representative recipe collection, at least 90% of visitors find a recipe satisfying a stated category, time, or keyword constraint within 10 seconds of landing on the public collection.
- **SC-002**: For a typical recipe collection, 95% of filter and search interactions update the visible result set within 100 milliseconds and require no page reload or loading indicator.
- **SC-003**: At least 90% of tested cooks can open a recipe, change servings, check ingredients, and begin following the instructions without assistance.
- **SC-004**: For recipes with numeric quantities, 100% of tested serving changes produce mathematically proportional ingredient quantities; ingredient checklist state remains correct for 100% of tested navigation-away-and-return flows within the recipe.
- **SC-005**: In accessibility review, every public and Backstage screen passes WCAG AA contrast checks and all tested theme transitions show no user-visible incorrect-theme flash.
- **SC-006**: At least 95% of signed-out Backstage access and mutation attempts are blocked or redirected, and 100% of successful recipe creates and edits have a corresponding history entry with an actor and timestamp.
- **SC-007**: In an admin usability test, at least 90% of admins can create and edit a valid recipe without touching application code, and invalid submissions leave the catalog unchanged.

## Assumptions

- The initial recipe collection is small enough for client-side search and filtering to remain responsive; a future scale requirement can introduce a different discovery strategy.
- A standard session-based admin authentication flow and one authorized admin role are sufficient for this feature; additional roles and self-service account management are out of scope.
- Theme preference is stored per browser/user environment because regular visitors do not have accounts; authenticated admins use the same preference behavior.
- Recipe quantities are scaled only when a numeric quantity is available; descriptive amounts such as "to taste" remain unchanged.
- Cooking-time filters use the displayed total cooking time and assign boundary values consistently: under 15 means less than 15 minutes, 15-30 includes 15 through 30, 30-60 includes more than 30 through 60, and 60+ means more than 60 minutes.
- Timestamps are displayed in the user’s local time while retaining enough precision to distinguish successive actions.
- The existing application provides the runtime environment and visual assets; this feature does not require third-party recipe imports or external content licensing.
- Automated tests for search/filter logic, serving-scaling math, and authorization behavior are required before the feature is considered complete, after implementation code has been reviewed and approved.