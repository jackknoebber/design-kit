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

## Installing as an iOS PWA (read if the app is Add-to-Home-Screen'd)

Hard-won bug: on an **installed** iOS PWA (`display: standalone`), anything
anchored to the bottom — bottom nav, FAB, a full-height `100dvh` shell —
renders **~59pt too high**, with a dead band of the manifest `background_color`
below it. Cause: iOS sizes the standalone webview SHORTER than the screen and
top-anchors it (e.g. screen 852 → viewport 793 = 852 − status bar), so the
missing ~59pt sit at the physical bottom where no CSS can paint. **The trigger
is the web manifest** — specifically `orientation` / `start_url` / `scope`.

**Fix — the minimal manifest recipe** (a sibling app with this got a correct
full-bleed webview on the same phone). Include ONLY these keys; NO
`orientation`, `start_url`, or `scope`:

```json
{ "name": "…", "short_name": "…", "description": "…",
  "theme_color": "#…", "background_color": "#…",
  "display": "standalone", "icons": [ … ] }
```

Keep in `index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

(`black-translucent` is IGNORED once a manifest exists — don't chase it.) In
the full-bleed frame `env(safe-area-*)` is real, so:

```css
@media (display-mode: standalone) {
  .app { position: fixed; inset: 0; height: auto; } /* pin shell; don't trust 100dvh */
}
.bottom-nav { position: fixed; bottom: 0; padding-bottom: env(safe-area-inset-bottom); }
.fab        { bottom: max(env(safe-area-inset-bottom, 0px), 1.25rem); } /* inset IS the offset */
```

**Testing rules (this is why it battles):**
1. Manifest/meta are read at **Add-to-Home-Screen time** → every test = delete
   the icon, re-add from Safari. Relaunching does nothing.
2. CSS/JS changes only need **force-quit + relaunch** (standalone keeps the
   page alive; returning via the app switcher doesn't refetch).

**Debug method:** don't theorize from screenshots — ship a temporary on-screen
readout of `screen.height`, `window.innerHeight`,
`document.documentElement.clientHeight`, and `env(safe-area-inset-top/bottom)`
(via a hidden probe div's computed padding). The numbers say instantly whether
the webview is cropped (manifest fix) or the shell isn't filling it (CSS fix).

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

**Dialogs:** pass `onSubmit={save}` to any `Dialog` with a primary action so
⌘/Ctrl+Enter submits it (keyboard = clicking Save). Also give form dialogs
`useEscClose(onClose)`. Info/confirm-only dialogs omit `onSubmit`.

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
