# PROJECT NOTES — design-kit

Session-bootstrap document. Read this first (plus `SKILL.md` for UI
conventions and `CONTRACT.md` for the token contract) when starting work in
this repo.

## What this is

Jack's personal, multi-system design system, shared across all his projects.
One **token contract** + multiple **design systems (themes)** that implement
it + **React components** that consume only the contract — so any finished app
can swap its entire design (font, shapes, colors, icons, component anatomy,
light/dark) by loading a theme file and setting attributes on `<html>`.

- Repo: https://github.com/jackknoebber/design-kit (PUBLIC — chosen so
  consumers and Railway builds npm-install it with zero auth)
- Local: `~/ClaudeProjects/design-kit`
- Jack's workflow: he does browser/dashboard clicks only; Claude does all
  git/terminal work. Push to `main` = released (consumers pin a commit via
  their lockfile and roll forward explicitly).

## The four design systems

| data-design | Look | Source of values |
|---|---|---|
| *(unset)* = M3 | Material 3 baseline, violet seed; `data-accent="teal"` variant | M3 Figma variables (original handoff bundle) + `gen-accent.mjs` for teal |
| `cupertino` | Classic iOS: hairline enclosed fields, systemBlue #007AFF, SF stack, F7 icons | Hand-authored |
| `ios26` | Liquid Glass: new blue #0088ff + pink tertiary, HUGE radii (8.5/16/22/34/50), soft diffuse shadows, translucent blurred dialogs, borderless floating cards, F7 icons | Ingested from "iOS and iPadOS 26" community Figma file (`themes/ios26.report.md`) |
| `gumroad` | Brutalist-playful: pink #FF90E8 + black ink, stone neutrals, BLACK 1px borders, hard offset shadows (4px/8px), 4px corners, Archivo (Mabry Pro stand-in) | Ingested from Jack's copy of the Gumroad DS community file (`themes/gumroad.report.md`) |

Theming axes on `<html>` (all independent):
`data-theme` (light/dark) · `data-accent` (color scheme within M3, e.g. teal) ·
`data-design` (design system). Theme files load after `styles.css` and win by
order+specificity; a design wins over an accent when both are set.

## Architecture (the layers, in load order)

1. **`tokens/*.css`** — the contract values for the M3 baseline: 49 color
   roles (`--md-sys-color-*`, light+dark), typeface refs
   (`--md-ref-typeface-*`), type scale, shape scale
   (`--md-sys-shape-corner-*`), elevation (`--md-sys-elevation-level0..5`),
   expression (`--dk-border-width`). `colors.css` also holds the
   `[data-accent="teal"]` scheme.
2. **`components.css`** — structural base styles (M3 look) for the five
   "identity" components under stable `dk-*` classes: TextField
   (`.dk-textfield`, `.dk-field__*`), native fields (`.dk-nativefield`),
   Button (`.dk-button--{variant|size|shape}`), Card (`.dk-card--*`), Dialog
   (`.dk-dialog*`). Components carry structure/state only; styling moved here
   SO THEMES CAN RESTRUCTURE ANATOMY (e.g. cupertino's enclosed fields,
   gumroad's bordered fields) in plain CSS.
   ⚠ Convention: variant color rules use DOUBLE class
   (`.dk-button.dk-button--filled`) to out-rank consumer-app element rules
   like `button:hover`.
3. **`themes/<name>.css`** — a design system: full 49-role color set
   (light+dark), typeface refs, shape scale, elevation character, plus
   structural `[data-design='name'] .dk-*` overrides, plus its icon font
   `@import` if any.
4. **`components/**.jsx`** (+ `.d.ts` siblings) — ~30 React components.
   Only the five identity components are CSS-class based so far; the rest
   (Chip, ListItem, Menu, Fab, Switch, Tabs, NavigationRail, …) still style
   inline but consume tokens (colors/fonts/radii all tokenized).
5. **Icons** — `Icon` takes SEMANTIC (Material Symbols) names everywhere.
   `components/core/icon-sets.js` maps them per design (cupertino + ios26 →
   Framework7 Icons, an MIT SF-Symbols-style ligature font); unmapped names
   fall back to Material. `useDesign()`
   (`components/core/useDesign.js`) is the reactive data-design hook.

## Key files

```
CONTRACT.md            the token contract + how to add a theme (checklist at bottom)
SKILL.md               UI conventions for Claude sessions in CONSUMER projects
PROJECT_NOTES.md       this file
components.css         dk-* structural base styles (M3 look)
tokens/                contract values (M3 baseline + teal accent)
themes/                cupertino.css · ios26.css · gumroad.css (+ *.report.md ingestion inventories)
components/            React components; core/{Icon,useDesign,icon-sets}
native-fields.tsx      M3Select / M3DateField / M3TextArea (native controls, field shell)
scripts/gen-accent.mjs 49-role scheme from a seed color (material-color-utilities)
scripts/ingest-figma.mjs  Figma file -> draft theme css + report.md
.env                   FIGMA_TOKEN (gitignored, LOCAL ONLY; 90-day token created 2026-07-06)
```

## Workflows

- **New color scheme (within M3):** `npm run gen-accent -- '#seed' name` →
  wrap in `[data-accent="name"]` in `tokens/colors.css`.
- **New design system:** `FIGMA_TOKEN=$(grep -o 'figd_.*' .env) node
  scripts/ingest-figma.mjs <figma-url> <name>` → draft `themes/<name>.css` +
  report → hand-tune signature roles (the auto-seed once picked the PayPal
  logo — always hand-check), add typeface/shape/elevation + structural dk-*
  overrides + icon set if wanted → follow CONTRACT.md checklist → verify all
  4 combos (light/dark × before/after) → push.
- **Consume in a project:** `npm i github:jackknoebber/design-kit`; import
  `design-kit/styles.css` + wanted `design-kit/themes/*.css`; set the `<html>`
  attributes (persist in localStorage, restore BEFORE first paint); components
  import as `design-kit/components/<group>/<Name>` (extensionless — tsc reads
  the .d.ts sibling, Vite compiles the source).
  ⚠ package.json has NO `exports` map ON PURPOSE — legacy deep-import
  resolution is what makes .jsx-source + .d.ts consumption work.
- **Roll a consumer forward:** in the consumer,
  `npm install github:jackknoebber/design-kit` (repins lockfile to kit HEAD)
  → build → push (Railway auto-deploys). Lockfile pinning means kit pushes
  never break consumers silently.
- **QA harness pattern:** in a consumer (or here with a scratch Vite app),
  create a throwaway `fields-debug.html` + `src/fields-debug.tsx` rendering
  the components under test, `npm i <local-kit-path> --no-save` to symlink,
  verify in the preview browser, DELETE both files before committing, then
  reinstall from github. (Idea: give the kit its own permanent playground app
  so this stops being a throwaway.)

## Consumers

- **Time Tracker** (`~/ClaudeProjects/time-tracking`, private repo, Railway):
  the first consumer and living reference. Settings → Appearance has the
  design picker (Material 3 / Cupertino / iOS 26 / Gumroad) + teal accent
  switch (M3 only); `main.tsx` restores `data-design`/`data-accent` from
  localStorage pre-paint and follows OS `prefers-color-scheme` for
  `data-theme` + `style.colorScheme`.

## Decisions & gotchas (learned the hard way)

- Surfaces are seed-tinted per design; depth = stepping the 5
  surface-container tones, NOT shadows (M3 tone-based surface color). Never
  neutralize a design's surfaces to grey wholesale.
- `outline` = identity/component borders; `outline-variant` = SUBTLE hairlines
  (calendar grids, table borders, dividers). Gumroad taught this: both black →
  shouty grids. Components that must keep bold borders reference `outline`
  explicitly in the theme's structural block.
- Native selects/dates need `appearance:none` so shell padding is
  authoritative (iOS vertically centers otherwise and the value crowds the
  floating label); the select draws its own CSS chevron.
- Fonts: font-shorthand strings use `var(--md-ref-typeface-plain)` — never a
  literal family. If a theme names a font, its CSS must actually LOAD it
  (gumroad initially referenced Archivo without loading it → silently fell
  back to Inter).
- Consumer body line-height should be a unitless ratio (1.5) — the M3 base
  sets a fixed 24px that inflates small text.
- Mabry Pro (gumroad) and SF Pro (cupertino/ios26) are licensed — stacks fall
  back to Archivo / system-ui; don't bundle them.

## Open threads / next ideas

- Migrate more components to dk-* CSS classes as themes need them (Chip,
  ListItem, Menu, Fab, Switch, Tabs, NavigationRail…). Follow the
  components.css conventions (double-class variants).
- Gumroad has no custom icon set yet (falls back to Material) — pick a chunky
  set (e.g. Phosphor bold) and add a map in icon-sets.js if wanted.
- A permanent kit playground/demo app (replaces the throwaway harness).
- Figma token in `.env` expires ~2026-10-04; Jack can revoke earlier in Figma
  → Settings → Security (it transited chat once).
- Versioning is "pin by lockfile"; consider git tags if consumers multiply.
