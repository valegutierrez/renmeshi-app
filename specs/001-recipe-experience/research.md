# Research: Core Renmeshi Recipe Experience

## Decision: Use a server-backed boundary for Backstage data and authorization

**Rationale**: The constitution explicitly prohibits trusting client-only auth checks and
requires durable recipe history. A frontend-only implementation cannot satisfy FR-014,
FR-015, or FR-018. The server boundary owns sessions, authorization, recipe writes, and
audit records; the public client consumes the resulting collection.

**Alternatives considered**: Browser-only storage was rejected because signed-out users could
modify data and because it cannot provide trustworthy audit history. A client-hidden admin
route was rejected because hidden UI is not authorization.

## Decision: Keep discovery filtering and serving calculations as pure client-side domain logic

**Rationale**: The initial collection is explicitly scoped to typical dataset sizes, and the
spec requires no reloads, spinners, or avoidable delay for filtering. Pure functions make the
combined filter semantics and proportional scaling deterministic and independently testable.

**Alternatives considered**: Requesting the server on every filter change was rejected for
latency and unnecessary network dependency. Server-only filtering can be revisited if the
collection outgrows the initial responsiveness assumption.

## Decision: Represent quantities as structured numeric and display components

**Rationale**: Ingredient scaling must preserve units and leave non-scalable text such as
"to taste" unchanged. A structured quantity with optional numeric value, unit, and display
text supports exact scaling without unreliable parsing of arbitrary prose at render time.

**Alternatives considered**: Storing every ingredient as one free-text string was rejected
because it makes proportional scaling ambiguous and brittle.

## Decision: Use one shared theme state and an early preference application step

**Rationale**: Public and Backstage screens must switch instantly and persist across visits.
The theme preference needs to be read and applied before the main interface is painted, while
the shared token layer supplies light, dark, and contrast-safe values to every route.

**Alternatives considered**: Per-page theme state was rejected because it causes drift and
flash during navigation. Relying only on the operating-system preference was rejected because
the user’s explicit choice must persist.

## Decision: Treat Backstage as one admin role for this feature

**Rationale**: The spec requires authenticated admins but does not define role distinctions.
One role keeps the access model understandable while preserving a server-side authorization
boundary and leaving room for future roles.

**Alternatives considered**: Multiple roles were rejected as out of scope and would add
permission behavior without a stated user need.

## Decision: Add browser-level checks for no-flash, responsive layout, and route protection

**Rationale**: Unit checks can prove filtering and scaling, but theme initialization,
redirects, focus states, and public-to-Backstage workflows need a real browser to verify
user-visible behavior. These checks complement, rather than replace, domain tests.

**Alternatives considered**: Unit-only validation was rejected because it cannot establish
visual theme timing or actual navigation protection.