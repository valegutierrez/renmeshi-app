# UI and Server Contracts: Core Renmeshi Recipe Experience

This feature exposes a browser application contract and a protected server boundary. The
contract describes observable behavior; implementation-specific transport details may vary.

## Public Recipe Collection

- Displays the complete available recipe collection without visitor sign-in.
- Accepts one category filter, one cooking-time band filter, and free-text search.
- Applies active filters conjunctively and updates visible results without a page reload or loading indicator for the initial collection size.
- Provides an actionable empty state when no recipes match.

## Recipe Detail

- Receives a recipe identifier and displays metadata, an ingredient checklist, serving controls, and ordered instructions.
- Checklist activation toggles one ingredient and persists for that recipe during the viewing context.
- Serving changes preserve the original recipe data and display scaled numeric quantities; non-scalable ingredient text remains unchanged.

## Theme

- Provides a light/dark control on every public and Backstage screen.
- Applies one shared theme preference across routes and visits.
- Applies the stored preference before the interface is visible and maintains WCAG AA legibility for content, controls, focus, feedback, and empty states.

## Authentication

- Sign-in accepts valid admin credentials and establishes an authenticated admin session.
- Sign-out invalidates the session and removes Backstage access.
- A signed-out or expired session requesting Backstage is redirected to sign-in.
- Protected reads and mutations reject requests without a valid admin session regardless of client UI state.

## Recipe Management

- Authorized create accepts name, supported category, cooking time, servings, ingredients, and ordered instructions.
- Authorized edit accepts changes to those recipe fields.
- Invalid submissions return field-level feedback and do not change catalog data.
- Successful create/edit operations return the updated recipe and create exactly one corresponding history record with action, recipe, actor, and timestamp.
- Failed operations do not create history records.

## Recipe History

- Backstage displays successful create/edit records in timestamp order.
- Each record identifies the affected recipe, action type, actor, and timestamp.
- History is available only to authenticated admins.