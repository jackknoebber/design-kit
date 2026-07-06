---
name: design-kit
description: Jack's personal design system for all projects — universal token contract, swappable themes (Material 3 baseline/teal, cupertino), and React components. Read this before building any UI in a project that uses design-kit.
user-invocable: true
---

# Building UI with design-kit

This package is the design system for Jack's projects. Its core idea: components
and app CSS consume ONLY the token contract (see `CONTRACT.md`), so whole design
systems — font, shape, color — swap by loading a theme and setting one attribute
on `<html>`. Never hardcode a hex color, a font family, or a corner radius.

## Wiring (per project)

```js
// main entry
import 'design-kit/styles.css';          // base M3 tokens + fonts + components' base
import 'design-kit/themes/cupertino.css'; // optional: any extra design systems offered
```

- Dark mode: set `data-theme="dark"` on `<html>` from `prefers-color-scheme`
  (listen for changes; also set `style.colorScheme` so native controls match).
- Accent / design: `data-accent="teal"`, `data-design="cupertino"` — persist the
  user's choice (localStorage) and restore it BEFORE first paint to avoid a flash.

```jsx
import { Button } from 'design-kit/components/actions/Button';
import { M3Select, M3DateField, M3TextArea } from 'design-kit/native-fields';
```

Components are source `.jsx` with `.d.ts` siblings — Vite compiles them from
node_modules; tsc reads the `.d.ts`. Import them extensionless as above.

## Conventions (established across projects — follow them)

**Text fields:** the **filled** variant (`<TextField variant="filled">`), never
outlined (the outlined notch renders unevenly). Selects/dates/textareas use
`M3Select` / `M3DateField` / `M3TextArea` from `native-fields` — native controls
in the filled shell, label INSIDE at the top, 56px. Never mix label-above and
label-inside.

**Buttons:** default size `s` (40px). Form action buttons go on their own line
BELOW the fields, never inline beside 56px fields.

**Form screens:** outlined `Card` (padding 24, column flex, gap 16–20) that
fills the centered `.screen`; H1 (`md-headline-small`) with the description as
`md-body-medium` on-surface-variant BELOW the H1, OUTSIDE the card.

**Lists:** `ListItem`s in an outlined Card with inset `Divider`s (marginLeft 56).

**Elevation:** ambient elements (buttons, bars, tables, cards) are FLAT —
separation via outlines and surface-container tones. Real shadows only on
floating surfaces (dialog, menu, FAB, snackbar).

**Tone-based surfaces:** page canvas = `surface-container`; chrome (rail/top
bar) = `surface-container-low`; cards = `surface`; the main content plane
(e.g. a calendar grid) = `surface-container-lowest`; filled fields =
`surface-container-highest`. Don't neutralize the seed tint — the tint IS the
system; depth = stepping the tones.

**Accent pops (contrast without noise):** a handful of deliberate
container-colored moments on quiet surfaces. Always `*-container` bg +
`on-*-container` text. ONE `primary-container` hero per screen. Small status
chips are filled tonal (bad = error-container, good = secondary-container,
neutral = surface-container-high). `tertiary-container` marks "different
category" items. A FAB (`Fab` color="primary" → primary-container) is the
screen's one floating accent.

**Navigation:** desktop = left `NavigationRail` (brand mark header, sign-out in
`footer`); mobile = top bar or `NavigationBar`. Sub-page tabs = the full-width
track pill pattern (container `surface-container-high`, active pill
`secondary-container`) or `Tabs`; on narrow screens collapse to a full-width
`M3Select`.

**Type:** body line-height as a unitless ratio (1.5) so small text doesn't
inherit fixed 24px line boxes. Sentence case; short verb labels; no emoji; no
ad-hoc SVG icons — Material Symbols via `<Icon name="…" />`. 4dp spacing grid;
touch targets ≥48dp. 16px font on form fields (stops iOS auto-zoom).

## Rules of thumb

- Interactive elements get the state layer (`.md-sl` — components do this).
- When user feedback conflicts with the system, push back with the M3 rationale
  before complying.
- New color scheme? `npm run gen-accent -- '#seed' name` and follow CONTRACT.md.
