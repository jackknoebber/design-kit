# design-kit

Jack's personal design system, shared across projects. One **token contract**
(CSS custom properties — see [CONTRACT.md](CONTRACT.md)), multiple **themes**
that implement it, and **React components** that consume only the contract —
so a finished app can swap its entire design (font, shape, colors, light/dark)
by loading a theme file and setting attributes on `<html>`.

## Install (per project)

```sh
npm install github:jackknoebber/design-kit
```

This tracks the default branch: every fresh `npm install` (e.g. a Railway
deploy) picks up the latest kit. Pin a tag (`github:jackknoebber/design-kit#v1.0.0`)
if a project needs to freeze.

## Use

```js
import 'design-kit/styles.css';           // tokens + fonts (Inter, Material Symbols)
import 'design-kit/themes/cupertino.css'; // optional extra design system(s)
```

```jsx
import { Button } from 'design-kit/components/actions/Button';
import { Dialog } from 'design-kit/components/overlays/Dialog';
import { M3Select } from 'design-kit/native-fields';
```

Theming axes on `<html>`:

```html
<html data-theme="dark" data-accent="teal">       <!-- M3, teal scheme, dark -->
<html data-design="cupertino" data-theme="light"> <!-- cupertino design, light -->
```

## What's here

```
tokens/       base, colors (M3 violet baseline + teal accent), typography, shape, elevation, fonts
themes/       additional design systems (cupertino.css) — each implements the full contract
components/   ~30 React components (.jsx + .d.ts) — actions, forms, navigation, overlays, …
native-fields.tsx  M3Select / M3DateField / M3TextArea (native controls, filled-field shell)
scripts/gen-accent.mjs  generate a 49-role color scheme from a seed color
CONTRACT.md   the universal token contract every theme implements
SKILL.md      conventions for Claude Code sessions building UI with this kit
```

## Updating consumers

Push here → each consumer project picks the new version up on its **next
build** (Railway rebuilds on every push/redeploy). Nothing is fetched at
runtime; the kit is baked in at build time.

## Adding a design system

See the bottom of [CONTRACT.md](CONTRACT.md). Short version: generate colors
with `npm run gen-accent -- '#seed' name`, wrap in `[data-design="name"]`,
override the typeface refs + shape scale, verify light and dark.
