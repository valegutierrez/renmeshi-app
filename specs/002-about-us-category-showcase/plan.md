# Implementation Plan: About Us and Homepage Category Showcase

**Branch**: `002-about-us-category-showcase` | **Date**: 2026-09-01 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-about-us-category-showcase/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a public About Us route and a homepage category showcase that reproduce the supplied desktop/mobile composition while preserving existing recipe discovery. Implement the work as shared React content and layout primitives in the current Vite client, using CSS Grid for two-dimensional desktop composition, Flexbox for header/footer/card internals, and responsive grid-to-stack transitions. Centralize all colors in the Material theme token layer, load Pixelpori locally, preserve Raleway/Poppins roles, and use the four supplied pixel-art images and approved logos. Add the missing approved creator portrait as an explicit implementation prerequisite.

## Technical Context

**Language/Version**: TypeScript 6.0.2, React 19.2.8, Vite 8.2.2

**Primary Dependencies**: React, React DOM, existing CSS custom-property theme layer; Material UI remains available but is not currently used by the app

**Storage**: N/A for the new public content; existing localStorage theme/checklist behavior remains unchanged

**Testing**: `npm run lint`, `npm run build`, browser responsive/accessibility smoke checks; no new automated tests before user approval per constitution workflow

**Target Platform**: Modern desktop and mobile browsers, minimum tested width 320 px

**Project Type**: Client-rendered web application

**Performance Goals**: Route transitions and category selection remain immediate for the existing local recipe dataset; images and font do not cause layout-breaking shifts

**Constraints**: Material Theme Builder tokens are the only color source; WCAG AA; light/dark/medium/high contrast parity; no horizontal overflow at 320 px; supplied pixel assets and fonts must be used; creator portrait requires approved asset input

**Scale/Scope**: One new public route, two homepage content bands, one shared responsive header/footer treatment, four category links, and no new server or persistence model

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Before Phase 0: PASS. The feature uses the approved pixel-art assets, requires the About Us page, preserves the existing client-side recipe discovery model, and plans a shared theme/token path rather than screenshot-derived component colors. The responsive layout is compatible with the existing single React/Vite project.

Known dependency: the creator portrait visible in the reference is absent from the repository. Implementation cannot be considered complete until an approved portrait is added and its provenance is recorded. This is an asset-input dependency, not a design deviation.

Post-Phase 1: PASS with the same dependency tracked. The design keeps CSS and content concerns separate, defines no external API, preserves the existing category union, and provides browser validation for theme, overflow, focus, route, and image behavior. Principle VII's automated-test timing remains satisfied because this plan only defines checks; tests are added after implementation approval.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── App.tsx                 # hash route selection and public composition
├── App.css                 # shared layout, responsive rules, and component states
├── index.css               # global reset, @font-face, and semantic theme tokens
├── main.tsx                # early theme preference application
├── models/recipe.ts        # existing RecipeCategory and recipe data
├── lib/recipe-filtering.ts # existing pure filtering behavior
└── assets/
    ├── fonts/pixelpori.ttf
    ├── pixelart/{appetizer,main-dish,side-dish,dessert}.png
    ├── renmeshi.svg
    ├── renmeshi letters.svg
    └── creator-portrait.jpg # required approved input before implementation
```

**Structure Decision**: Keep the existing single-project structure. The first implementation can use composed components in `App.tsx` and feature-specific CSS in `App.css` because the repository currently has one route component and no page/component directory. Extract a shared public header/footer or content constants only when reuse is real; do not introduce a new routing or service layer for static content.

## CSS and Layout Strategy

### Shared geometry

- Use full-width section bands for seigaiha and footer surfaces; place content inside a centered `.site-container` with `width: min(100% - 2 * var(--page-gutter), var(--content-max))`.
- Define spacing tokens for page gutter, section padding, panel padding, card gap, and text rhythm. Use `gap`, `padding`, and `margin-block` rather than absolute offsets so translated copy remains stable.
- Keep stable image and control dimensions with `aspect-ratio`, `min-height`, and bounded max widths. Set `image-rendering: pixelated` on category art and avoid scaling it via fractional transforms.

### Homepage

- `.home-hero-band`: full-width seigaiha background; use a one-column flow with the Pixelpori title centered above the latest panel.
- `.latest-panel`: desktop CSS Grid with three equal recipe-card tracks plus a fixed action track, `grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(140px, .8fr)`; recipe cards use Flexbox for image/content/meta stacking. At 800 px, collapse to one card column and a full-width view-all action.
- `.explanation-band`: full-width plain theme surface; constrain copy to a readable text measure and center the heading while left-aligning paragraphs inside the rail.
- `.categories-band`: full-width seigaiha background; `.category-panel` is a centered panel with a four-track Grid (`repeat(4, minmax(0, 1fr))`) and equal alignment. Each `.category-link` is a Flexbox column with a stable art region, label, hover/focus state, and no dependency on image dimensions. At 800 px, use two tracks if space supports it; at 520 px, use one track with consistent vertical gaps, matching the reference mobile order.
- `.site-footer`: full-width Material primary/teal semantic surface; desktop uses Flexbox row alignment for logo and copy, mobile switches to a centered column.

### About Us

- `.about-story`: centered CSS Grid with `grid-template-columns: minmax(0, 1fr) minmax(280px, .82fr)` and a desktop gap based on the spacing scale. The portrait is the first grid item; story copy is the second. The image frame uses `aspect-ratio: 3 / 4`, `overflow: hidden`, rounded corners, and `object-fit: cover`.
- At 800 px, switch to one Grid track. Preserve DOM order as image then story so no CSS `order` is needed for mobile reading order. Use mobile page gutters and a smaller section block gap.
- `.statement-band`: full-width seigaiha background with a readable constrained text rail. Pixelpori copy may use uppercase styling but must wrap naturally and keep a visible focus/contrast boundary if it contains links.
- Header desktop uses Flexbox with leading brand, middle navigation, and trailing controls; at 520 px it hides desktop-only navigation behind an accessible menu control. Footer uses the same shared structure on both routes.

### Theme and typography

- Replace starter hard-coded surface colors on touched public surfaces with semantic variables sourced from the Material Theme Builder export: background, surface, surface-container, on-surface, outline, primary, on-primary, and focus.
- Keep separate light/dark/medium/high-contrast token sets under the same variable names. Pattern layers use token colors with opacity or generated CSS geometry; they do not sample screenshot hex values.
- Add `@font-face` for `pixelpori.ttf` with `font-display: swap`; use Pixelpori for hero/category/eyebrow/tag display, Raleway for regular headings, and Poppins for paragraphs and controls. Set explicit `line-height` for Pixelpori blocks to avoid clipping.

## Asset and Content Strategy

- Use the exact four pixel-art PNGs for category links, with descriptive labels and resilient text when an image fails.
- Use `renmeshi letters.svg` in the desktop-capable header and `renmeshi.svg` for the footer mark, preserving accessible names and intrinsic aspect ratios.
- Add an approved creator portrait before implementation at `src/assets/creator-portrait.jpg`. Do not substitute `hero.png`; document source/provenance in the implementation task or asset note.
- Keep content in typed constants or a small model object so story copy, labels, alt text, category mapping, and destinations are not duplicated across JSX branches.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| None | The feature remains within the existing single client and introduces no new service or persistence boundary. | N/A |
