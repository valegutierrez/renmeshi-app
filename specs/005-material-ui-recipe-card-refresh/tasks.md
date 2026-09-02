# Tasks: Material UI Theme and Recipe Card Refresh

**Input**: Design documents from `/specs/005-material-ui-recipe-card-refresh/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/recipe-image-and-ui-contract.md](contracts/recipe-image-and-ui-contract.md), and [quickstart.md](quickstart.md)

**Tests**: Required because the feature specification explicitly requires upload lifecycle, Material UI/theme, recipe-card, Pixelpori, asset-boundary, accessibility, and responsive regression coverage.

**Organization**: Tasks are grouped by user story after shared upload and theme foundations are ready. Story phases are independently testable in the order shown below.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish dependencies, upload configuration, and shared theme/component boundaries without changing existing recipe behavior.

- [X] T001 [P] Verify the existing bounded multipart parser and image metadata/decoding boundary; no third-party dependency is required.
- [X] T002 [P] Add typed upload-directory, request-size, file-size, and decoded-dimension configuration defaults in `server/config.ts`.
- [X] T003 [P] Add the generated recipe-upload directory to `.gitignore` and document its local-runtime role in `README.md`.
- [X] T004 [P] Define the recipe image reference and light/dark theme preference types in `src/models/recipe.ts` and `src/models/theme.ts`.
- [X] T005 [P] Add the Material UI theme provider integration boundary that consumes semantic CSS variables in `src/app/theme/mui-theme.ts` and `src/app/theme/theme-provider.tsx`.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared image storage, validation, serving, and theme-token foundations required by all user stories.

**Checkpoint**: Foundation ready. Recipe metadata can own a validated image reference, image failures roll back safely, and Material UI can consume both semantic schemes.

- [X] T006 Implement streamed temporary image writes, generated opaque keys, cleanup, and atomic replacement helpers in `server/storage/recipe-image-store.ts`.
- [X] T007 Implement JPEG, PNG, and WebP signature/type validation, byte limits, decodability checks, and dimension limits in `server/storage/recipe-image-validation.ts`.
- [X] T008 Extend JSON recipe persistence and successful-mutation history behavior to commit recipe image references without orphaning files in `server/storage/recipe-store.ts`.
- [X] T009 Add a generated-key-only image streaming route with content type and `nosniff` headers in `server/recipes/recipe-image-routes.ts` and register it in `server/http/router.ts`.
- [X] T010 Extend recipe request parsing, response serialization, and error handling for multipart fields and image validation failures in `server/recipes/recipe-routes.ts` and `server/http/errors.ts`.
- [X] T011 Populate semantic CSS variables from the attached Material Theme export for light and dark in `src/app/theme/tokens.css`.
- [X] T012 Update theme storage, bootstrap, provider state, and document attributes to represent and persist light and dark in `src/models/theme.ts`, `src/app/theme/theme-storage.ts`, `src/app/theme/theme-bootstrap.ts`, and `src/app/theme/theme-provider.tsx`.
- [X] T013 Add shared Material UI theme component defaults, focus states, and semantic palette bindings without literal colors in `src/app/theme/mui-theme.ts`.
- [X] T014 Add foundational image lifecycle and light/dark token tests in `tests/integration/recipe-image-upload.test.ts` and `tests/unit/theme-tokens.test.ts`.

## Phase 3: User Story 1 - Use the Approved Material UI Theme (Priority: P1)

**Goal**: Make refreshed public and admin controls use Material UI with the attached Material Theme as their only color authority.

**Independent Test**: Visit public and admin routes in light and dark schemes and verify refreshed controls, menus, cards, states, and focus treatments use Material UI and semantic theme values with no Bootstrap or competing palette.

### Tests for User Story 1

- [X] T015 [P] [US1] Add source assertions for Material UI imports/wrappers, Bootstrap absence, semantic token usage, and light/dark coverage in `tests/unit/material-ui-theme-policy.test.ts`.
- [X] T016 [P] [US1] Add browser assertions for Material UI-rendered controls, menus, focus states, theme switching, and scheme persistence in `tests/browser/material-ui-theme.spec.ts`.

### Implementation for User Story 1

- [X] T017 [US1] Replace refreshed discovery filters, navigation actions, menus, and feedback controls with Material UI components in `src/features/discovery/RecipeFilters.tsx`, `src/app/AppShell.tsx`, and `src/App.tsx`.
- [X] T018 [US1] Replace Backstage editor inputs, selects, buttons, alerts, and history actions with Material UI components while preserving existing workflows in `src/features/backstage/RecipeEditorForm.tsx` and `src/features/backstage/BackstagePage.tsx`.
- [X] T019 [US1] Route refreshed component styling, states, and focus indicators through the Material UI theme and semantic CSS variables in `src/app/theme/mui-theme.ts` and `src/App.css`.
- [X] T020 [US1] Remove remaining Bootstrap, starter, or competing component-library theming references from `src/`, `index.html`, and `package.json`.
- [X] T021 [US1] Verify public and admin route parity, keyboard focus, light/dark persistence, and no palette regressions with `tests/browser/material-ui-theme.spec.ts` and `tests/unit/material-ui-theme-policy.test.ts`.

**Checkpoint**: User Story 1 is independently functional and all refreshed controls use the approved Material UI theme system.

## Phase 4: User Story 2 - Browse Editorial Recipe Cards (Priority: P1)

**Goal**: Make every recipe card use administrator-owned food imagery and the attached mockup's image-first hierarchy.

**Independent Test**: Create or edit a recipe with an image, open the homepage at desktop and mobile widths, and verify the stored image appears prominently with the required card information and no category pixel-art media.

### Tests for User Story 2

- [X] T022 [P] [US2] Add integration coverage for required create/edit image uploads, invalid files, successful replacement, failed replacement rollback, and audit behavior in `tests/integration/recipe-management.test.ts`.
- [X] T023 [P] [US2] Add browser coverage for administrator file selection, upload feedback, public card image rendering, edit replacement, and failed-upload preservation in `tests/browser/backstage.spec.ts`.
- [X] T024 [P] [US2] Add browser coverage for mockup-aligned card hierarchy, stored image sources, restricted pixel-art exclusion, desktop/mobile layout, and overflow in `tests/browser/discovery.spec.ts`.

### Implementation for User Story 2

- [X] T025 [US2] Add the required `image` field and backward-compatible legacy-data handling to recipe reads, seeds, and client models in `src/models/recipe.ts`, `server/storage/seed.ts`, and `server/recipes/recipe-read-service.ts`.
- [X] T026 [US2] Add multipart recipe create/edit client submission and image URL response handling in `src/services/api.ts` and `src/services/recipe-service.ts`.
- [X] T027 [US2] Add required image-file selection, preview, validation feedback, and edit-state preservation to `src/features/backstage/RecipeEditorForm.tsx` and `src/features/backstage/BackstagePage.tsx`.
- [X] T028 [US2] Replace category pixel-art imports in recipe cards with stored recipe image media, mockup-aligned metadata hierarchy, and accessible actions using Material UI in `src/features/discovery/RecipeCard.tsx`.
- [X] T029 [US2] Implement stable responsive recipe-card media sizing, cover cropping, rounded silhouette, text containment, and neutral legacy fallback styling in `src/App.css` and `src/features/discovery/RecipeCard.tsx`.
- [X] T030 [US2] Ensure successful create/edit operations refresh public recipe images and preserve existing navigation/filter behavior in `src/App.tsx`, `src/services/recipe-service.ts`, and `src/features/discovery/RecipeCollectionPage.tsx`.

**Checkpoint**: User Story 2 is independently functional: every publishable recipe has stored food imagery and cards match the attached image-first design without restricted category art.

## Phase 5: User Story 3 - Preserve Pixel-Art Category and Label Identity (Priority: P2)

**Goal**: Keep category pixel art in its approved contexts and implement Pixelpori labels with semantic fill and theme-derived white stroke.

**Independent Test**: Inspect homepage categories, the header Recipes dropdown, and Pixelpori labels in light and dark schemes and confirm placement, asset identity, fill, stroke, contrast, and responsive behavior.

### Tests for User Story 3

- [X] T031 [P] [US3] Add source assertions proving category pixel-art files are limited to category contexts and excluded from recipe-card media in `tests/unit/visual-asset-policy.test.ts`.
- [X] T032 [P] [US3] Add browser assertions for category illustrations, header dropdown icons, Pixelpori `On Surface` fill, theme-derived white stroke, canonical seigaiha, and logo mappings in `tests/browser/visual-assets.spec.ts` and `tests/browser/pixel-labels.spec.ts`.

### Implementation for User Story 3

- [X] T033 [US3] Preserve category illustration rendering only in the homepage category section and header Recipes dropdown icons using Material UI menu components in `src/features/discovery/CategoryShowcase.tsx`, `src/app/AppShell.tsx`, and `src/components/shared/RecipeMenu.tsx`.
- [X] T034 [US3] Add a semantic theme token for the approved white stroke tone and apply Pixelpori `On Surface` fill plus white stroke to subheadings and display labels in `src/app/theme/tokens.css`, `src/app/theme/typography.css`, and `src/App.css`.
- [X] T035 [US3] Preserve canonical seigaiha Outline Variant and Renmeshi Primary/On Primary bindings while integrating refreshed Material UI surfaces in `src/app/AppShell.tsx` and `src/App.css`.
- [X] T036 [US3] Verify category, label, pattern, and logo behavior across light/dark schemes and mobile/desktop breakpoints in `tests/browser/visual-assets.spec.ts` and `tests/browser/pixel-labels.spec.ts`.

**Checkpoint**: User Story 3 is independently functional and the restricted pixel-art and Pixelpori identity rules remain enforceable.

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Complete validation, documentation, accessibility, cleanup, and release readiness.

- [X] T037 [P] Add contributor documentation for image upload requirements, storage behavior, Material UI usage, and light/dark theme validation in `README.md` and `specs/005-material-ui-recipe-card-refresh/quickstart.md`.
- [X] T038 [P] Add controlled regression fixtures for unsupported images, Bootstrap references, restricted card assets, custom colors, and missing recipe images in `tests/unit/feature-005-regressions.test.ts`.
- [X] T039 [P] Add responsive accessibility checks for card image alternatives, labels, keyboard actions, WCAG contrast, and no overflow in `tests/browser/accessibility.spec.ts`.
- [X] T040 Run `npm run lint`, `npm run typecheck:server`, and `npm run build`, resolving only feature-related diagnostics in `src/`, `server/`, and `tests/`.
- [X] T041 Run `npm test` and `npm run test:browser` using `specs/005-material-ui-recipe-card-refresh/quickstart.md`, recording any unrelated pre-existing failures without weakening feature assertions.
- [X] T042 Review implementation against `spec.md`, `plan.md`, `data-model.md`, `contracts/recipe-image-and-ui-contract.md`, and Principles I–III and VI–VII of the constitution.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001-T005 establish dependencies, configuration, model boundaries, and the Material UI theme boundary.
- **Foundational (Phase 2)**: Depends on Phase 1; T006-T014 establish image persistence/serving and light/dark semantic theme foundations.
- **User Story 1 (P1)**: Depends on Phase 2; delivers the Material UI and theme-system increment.
- **User Story 2 (P1)**: Depends on T006-T010 and can proceed after the shared recipe image boundary exists; its card and upload tests validate the primary discovery workflow.
- **User Story 3 (P2)**: Depends on the shared theme boundary and refreshed card/menu surfaces; it preserves approved category and Pixelpori identity rules.
- **Polish**: Depends on all user stories and their focused validation.

### User Story Dependencies

- **US1**: Requires the foundational Material UI theme and light/dark token boundary.
- **US2**: Requires the foundational upload, recipe persistence, and image-serving boundary; it does not depend on the complete US1 control migration.
- **US3**: Requires the shared theme provider and refreshed menu/card surfaces, but remains independently testable through asset and label checks.

### Parallel Opportunities

- T001-T005 can run in parallel because they touch separate setup boundaries.
- T006-T009 can be split between image storage/validation and HTTP serving after configuration is defined.
- T015-T016 can run in parallel after the shared theme boundary is reviewed.
- T022-T024 can run in parallel because they cover separate integration/browser surfaces.
- T031-T032 can run in parallel because source policy and browser asset checks are independent.
- T037-T039 can run in parallel before the final validation commands.

## Parallel Example: User Story 1

```text
Task: "Add source assertions for Material UI imports and Bootstrap absence in tests/unit/material-ui-theme-policy.test.ts"
Task: "Add browser assertions for light/dark controls and persistence in tests/browser/material-ui-theme.spec.ts"
```

## Parallel Example: User Story 2

```text
Task: "Add upload lifecycle integration coverage in tests/integration/recipe-management.test.ts"
Task: "Add recipe-card hierarchy and restricted-asset browser coverage in tests/browser/discovery.spec.ts"
```

## Parallel Example: User Story 3

```text
Task: "Add category asset source policy checks in tests/unit/visual-asset-policy.test.ts"
Task: "Add Pixelpori fill/stroke and light/dark browser coverage in tests/browser/pixel-labels.spec.ts"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete setup and foundational image/theme boundaries.
2. Complete User Story 1 Material UI and semantic theme migration.
3. Run the US1 unit and browser checks and verify all refreshed public/admin controls.
4. Continue to User Story 2 only after the shared theme boundary and control migration are stable.

### Incremental Delivery

1. Establish upload persistence and light/dark theme foundations.
2. Deliver Material UI control and theme migration.
3. Deliver administrator-owned recipe images and mockup-aligned recipe cards.
4. Preserve category pixel art and implement Pixelpori stroke treatment.
5. Complete regression, accessibility, documentation, and full quickstart validation.

### Notes

- Every task uses the required checkbox, sequential task ID, optional `[P]` marker, story label in user-story phases, and an exact repository path.
- Image binaries remain outside the JSON recipe store; recipe records store stable generated references.
- No Bootstrap component or theming dependency is permitted.
- The attached Material Theme export remains the sole application color authority.
