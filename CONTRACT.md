# The token contract

Every design system (theme) in this kit implements the SAME set of CSS custom
properties. Components consume ONLY these tokens — never raw hex, font names,
or pixel radii — which is what makes whole design systems swappable on a built
app. If you add a token here, every theme must define it.

## Theming axes (set on `<html>`)

| Attribute | Values | Meaning |
|---|---|---|
| `data-theme` | `light` (default) / `dark` | Light/dark mode. Usually driven by `prefers-color-scheme`. |
| `data-accent` | unset (default) / `teal` / … | Color scheme *within* the M3 design. Generated schemes, same design language. |
| `data-design` | unset (= `m3`, default) / `cupertino` / … | The design system: different font, shape scale, and color values. Load the theme's CSS file, then set the attribute. |

Load order matters: `styles.css` (base M3 tokens) first, then optional theme
files (`themes/*.css`). A theme file loaded later wins ties, so when both
`data-accent` and `data-design` are set, the design wins.

## 1. Color roles — `--md-sys-color-*` (49 roles)

The full Material role set; every theme provides ALL of them for light AND dark:

- `primary`, `on-primary`, `primary-container`, `on-primary-container`, `inverse-primary`
- `secondary`, `on-secondary`, `secondary-container`, `on-secondary-container`
- `tertiary`, `on-tertiary`, `tertiary-container`, `on-tertiary-container`
- `error`, `on-error`, `error-container`, `on-error-container`
- `background`, `on-background`, `surface`, `on-surface`, `surface-variant`,
  `on-surface-variant`, `surface-dim`, `surface-bright`,
  `surface-container-lowest`, `surface-container-low`, `surface-container`,
  `surface-container-high`, `surface-container-highest`, `surface-tint`,
  `inverse-surface`, `inverse-on-surface`
- `outline`, `outline-variant`, `shadow`, `scrim`
- `primary-fixed`, `primary-fixed-dim`, `on-primary-fixed`, `on-primary-fixed-variant`
  (and the same four for `secondary` and `tertiary`)

Rules of use: always pair a `*-container` background with its `on-*-container`
foreground — that's what guarantees contrast across every theme × mode combo.
Surfaces convey depth by stepping the five `surface-container-*` tones, not by
shadows.

Format: `rgb(r, g, b)` (matches the generator output).

## 2. Typeface refs — `--md-ref-typeface-*`

- `--md-ref-typeface-brand` — display/headline face
- `--md-ref-typeface-plain` — body/label face (components use this everywhere)
- `--md-ref-typeface-mono` — code/tabular
- `--md-ref-typeface-weight-regular|medium|bold`

A theme swaps the app's entire typography by overriding these (plus loading its
webfont if needed). Components never name a font family directly.

## 3. Type scale — `--md-sys-typescale-*`

Size/line-height/tracking per role (`display|headline|title|body|label` ×
`large|medium|small`), exposed as the `.md-<role>-<size>` utility classes in
`tokens/typography.css`. Themes may override sizes but usually only need the
typeface refs.

## 4. Shape — `--md-sys-shape-corner-*`

`none` 0 · `extra-small` 4 · `small` 8 · `medium` 12 · `large` 16 ·
`large-increased` 20 · `extra-large` 28 · `extra-large-increased` 32 ·
`extra-extra-large` 48 · `full` 9999 (pill).

Components reference these for every corner. A theme reshapes the entire app by
overriding the scale (e.g. cupertino uses squarer-but-larger iOS-style values).
`full` should stay a pill in any theme.

## 5. Elevation — `--md-sys-elevation-level0…5`

Box-shadow values. Ambient elements are flat (level 0 / outlines / tonal
difference); real shadows are reserved for floating surfaces (dialog, menu,
FAB, snackbar). Themes may redefine the levels to change shadow CHARACTER —
e.g. hard offset shadows (`4px 4px 0 #000`) for a brutalist design.

## 6. Expression — `--dk-border-width`

Component border weight (outlined cards/buttons/chips/fields). Default 1px;
a design can thicken it for identity (e.g. 2px brutalist borders). Dividers
stay hairline regardless.

## 7. Icons — per-design icon sets

`Icon` takes SEMANTIC names (the Material Symbols name: "add", "settings",
"delete"…). The default design renders Material Symbols; another design may
register its own set in `components/core/icon-sets.js` (a name→glyph map plus
the icon font's CSS class; load the font in the theme's CSS file). Unmapped
names fall back to Material Symbols. cupertino ships Framework7 Icons (MIT,
SF-style). When adding icons to components, always use the Material name.

## Adding a new theme

1. Generate the 49-role color set (light + dark) with
   `node scripts/gen-accent.mjs '#seedcolor' name` (spec-correct contrast via
   material-color-utilities), or hand-tune from a generated base.
2. Wrap the blocks in `[data-design="name"]` (or `[data-accent="name"]` if it's
   just an M3 color scheme) — copy the selector structure of an existing theme
   in `themes/`.
3. Override typeface refs and the shape scale if the design language differs.
4. Check the four combos: your theme × light/dark.
