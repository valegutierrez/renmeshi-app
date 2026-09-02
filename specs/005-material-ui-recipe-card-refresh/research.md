# Research: Material UI Theme and Recipe Card Refresh

## Recipe Image Uploads

**Decision**: Use `multipart/form-data` for administrator recipe create/edit submissions and
persist validated image binaries as generated files. Store only a stable opaque image reference
and validated metadata in the JSON recipe record.

**Rationale**: Multipart preserves browser-native file semantics, avoids base64 expansion in the
JSON store, permits request and file-size limits, and keeps binary data separate from structured
recipe metadata. Generated keys prevent path traversal and unsafe administrator filenames.

**Validation**: Accept JPEG, PNG, and WebP by verified file signature and declared type. Reject
empty, malformed, truncated, oversized, and unsupported files. Decode content and enforce bounded
dimensions/pixel count where practical. Keep the existing image on failed edits.

**Persistence**: Process the upload in a temporary location, validate the complete recipe and
image, then commit the new image and recipe metadata atomically enough that a failed mutation
leaves the previous recipe, image, and audit history unchanged. Delete old images only after a
successful replacement is committed. Clean temporary files after failures.

**Serving**: Add a narrow generated-key image route that validates keys, prevents traversal,
sets the stored content type and `X-Content-Type-Options: nosniff`, and streams files. Do not
expose the upload directory through a generic static-file handler.

**Alternatives considered**:

- Base64 in JSON: rejected due to storage inflation, memory overhead, and awkward validation.
- External URLs: rejected because the clarified requirement makes the administrator-uploaded
  image application-owned.
- Binary data inside JSON: rejected because the existing JSON store is for structured metadata.
- Save metadata before the image: rejected because it can create recipes with missing media.
- Delete old media before replacement: rejected because failed edits would destroy valid media.

## Material UI and Theme Integration

**Decision**: Keep `src/app/theme/tokens.css` as the single semantic color authority and derive
Material UI theme values from CSS custom properties. Use Material UI components or local wrappers
for refreshed controls, menus, forms, alerts, and recipe cards.

**Rationale**: The constitution forbids a parallel palette and requires the attached Material
Theme export across light and dark schemes. CSS variables let both legacy shared surfaces and Material UI
consume the same active roles. MUI is already installed, so no competing dependency is needed.

**Scheme model**: Represent light and dark explicitly. Avoid broad contrast selectors that
apply light contrast values to dark themes.

**Card treatment**: Use a stable prominent media region with cover cropping, bounded text layout,
and responsive grid constraints. Cards use the stored recipe image, never the restricted category
pixel-art files. Legacy missing images may show a neutral editorial fallback, but publishing
still requires a valid upload.

**Pixel labels**: Preserve Pixelpori and use the active `On Surface` fill plus a theme-derived
approved white tone for the visible stroke. Do not use literal white, opacity, gradients, or
custom palette values.

**Alternatives considered**:

- MUI-only independent palette: rejected because it creates a second color authority.
- MUI defaults with selective overrides: rejected because defaults may bypass export parity.
- Whole-app rewrite: rejected because it increases regression risk; migrate shared provider and
  affected surfaces incrementally.
