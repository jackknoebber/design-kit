# design-kit

Jack's personal design system, shared across projects. One **token contract**
(CSS custom properties — see [CONTRACT.md](CONTRACT.md)), multiple **design
systems** that implement it, and **React components** that consume only the
contract — so a finished app can swap its entire design (font, shape, colors,
icons, light/dark) by loading a theme file and setting attributes on `<html>`.

**Visual reference:** https://jackknoebber.github.io/design-kit/ — every
token and component, with live design/theme/accent switching.

## Consumer quick-start (new project)

Known-good stack: Vite + React (≥18). Four steps:

**1. Install** — no auth needed, the repo is public:

```sh
npm install github:jackknoebber/design-kit
```

**2. Import the CSS once** (e.g. in `main.tsx`) — base styles plus whichever
design systems the app should offer:

```js
import 'design-kit/styles.css';           // tokens + fonts + M3 baseline
import 'design-kit/themes/cupertino.css'; // classic iOS
import 'design-kit/themes/ios26.css';     // Liquid Glass
import 'design-kit/themes/gumroad.css';   // brutalist-playful
```

**3. Restore the theming attributes before first paint** — inline in
`index.html`, so there's no flash of the wrong design:

```html
<script>
  (function () {
    var el = document.documentElement;
    var d = localStorage.getItem('design');
    if (d && d !== 'm3') el.setAttribute('data-design', d);
    var a = localStorage.getItem('accent');
    if (a) el.setAttribute('data-accent', a);
    var t = localStorage.getItem('theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    el.setAttribute('data-theme', t);
    el.style.colorScheme = t;
  })();
</script>
```

The three axes are independent: `data-design` (design system; unset = M3),
`data-theme` (light/dark), `data-accent` (color scheme within M3, e.g. teal).

**4. Use the components** — deep, extensionless imports (tsc reads the
`.d.ts` siblings, Vite compiles the `.jsx` source):

```jsx
import { Button } from 'design-kit/components/actions/Button';
import { Dialog } from 'design-kit/components/overlays/Dialog';
import { M3Select } from 'design-kit/native-fields';
```

Icons take semantic Material Symbols names everywhere
(`<Icon name="settings" />`) and re-map per design automatically.

### Bootstrapping a Claude Code session in a consumer project

The kit ships its own instructions for this. In the new project, say:

> This project uses my design system: `npm i github:jackknoebber/design-kit`,
> then read `node_modules/design-kit/SKILL.md` for the UI conventions before
> building any UI. Theme switching is via attributes on `<html>` (see the kit
> README). Visual reference: https://jackknoebber.github.io/design-kit/

…and have the session copy those lines into the project's `CLAUDE.md` so
every future session picks them up automatically.

## What's here

```
tokens/       base, colors (M3 violet baseline + teal accent), typography, shape, elevation, fonts
themes/       cupertino.css · ios26.css · gumroad.css — each implements the full contract
components/   ~30 React components (.jsx + .d.ts) — actions, forms, navigation, overlays, …
components.css  structural dk-* base styles for the identity components (themes restyle these)
native-fields.tsx  M3Select / M3DateField / M3TextArea (native controls, filled-field shell)
playground/   the gallery site (Vite) — deployed to GitHub Pages on every push
scripts/gen-accent.mjs  generate a 49-role color scheme from a seed color
scripts/ingest-figma.mjs  draft a new theme from a Figma file
CONTRACT.md   the universal token contract every theme implements
SKILL.md      conventions for Claude Code sessions building UI with this kit
```

## Updating consumers

Installs from git are **pinned by the consumer's lockfile** — pushing here
never changes a consumer silently. To roll a consumer forward:

```sh
npm install github:jackknoebber/design-kit   # repins lockfile to kit HEAD
```

then build and push the consumer (Railway redeploys on push). Pin a tag
(`github:jackknoebber/design-kit#v1.0.0`) if a project needs to freeze harder.

## Adding a design system

See the bottom of [CONTRACT.md](CONTRACT.md). Short version: generate colors
with `npm run gen-accent -- '#seed' name` (or draft from Figma with
`scripts/ingest-figma.mjs`), wrap in `[data-design="name"]`, override the
typeface refs + shape scale + elevation character, add structural `dk-*`
overrides and an icon map if wanted, verify light and dark — then check every
page of the playground.
