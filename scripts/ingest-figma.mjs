// Ingest a Figma file's design tokens into a DRAFT theme + report.
//
//   FIGMA_TOKEN=figd_xxx node scripts/ingest-figma.mjs <fileKeyOrUrl> <name>
//
// Reads the file via the Figma REST API and extracts:
//   - published color styles (solid fills)        -> palette inventory
//   - published text styles                       -> typeface + sizes
//   - corner radii across components (histogram)  -> shape-scale suggestion
//   - drop-shadow effects                         -> elevation suggestion
//
// It then writes themes/<name>.css — a COMPLETE valid draft (49 roles, light
// + dark, derived from the file's most saturated brand color via
// material-color-utilities so contrast is spec-correct) — and
// themes/<name>.report.md listing everything found in the file with hints for
// hand-tuning the signature roles (the cupertino workflow: generated long
// tail, hand-set identity). Component STRUCTURE (borders, shadow character,
// field anatomy) is read from the report + eyeballing the file, not automated.
import { writeFileSync } from 'node:fs';
import { Hct, argbFromHex, SchemeTonalSpot, MaterialDynamicColors as MDC } from '@material/material-color-utilities';

const token = process.env.FIGMA_TOKEN;
const [, , fileArg, name] = process.argv;
if (!token || !fileArg || !name) {
  console.error('Usage: FIGMA_TOKEN=figd_xxx node scripts/ingest-figma.mjs <fileKeyOrUrl> <theme-name>');
  process.exit(1);
}
// Accept a raw key or any figma.com URL (…/file/<key>/… or …/design/<key>/…)
const fileKey = fileArg.includes('figma.com') ? fileArg.match(/(?:file|design)\/([A-Za-z0-9]+)/)?.[1] : fileArg;
if (!fileKey) {
  console.error('Could not parse a file key from: ' + fileArg);
  process.exit(1);
}

const api = async (path) => {
  const res = await fetch(`https://api.figma.com${path}`, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) throw new Error(`Figma API ${res.status} on ${path}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
};

const toHex = (c) =>
  '#' + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');

// --- 1. Pull the full file (document tree + styles metadata) ---------------
console.error(`Fetching file ${fileKey}…`);
const file = await api(`/v1/files/${fileKey}`);
const styleMeta = file.styles || {}; // styleId -> {name, styleType}

// --- 2. Walk the tree: resolve styles to values + collect radii/effects ----
const colors = new Map(); // styleName -> hex
const texts = new Map(); // styleName -> {family, size, lineHeight, weight}
const radii = new Map(); // radius -> count
const shadows = new Map(); // css shadow -> count
const fontFamilies = new Map(); // family -> count

function walk(node) {
  if (node.styles) {
    for (const [field, styleId] of Object.entries(node.styles)) {
      const meta = styleMeta[styleId];
      if (!meta) continue;
      if (meta.styleType === 'FILL' && (field === 'fill' || field === 'fills')) {
        const solid = (node.fills || []).find((f) => f.type === 'SOLID' && f.visible !== false);
        if (solid && !colors.has(meta.name)) colors.set(meta.name, toHex(solid.color));
      }
      if (meta.styleType === 'TEXT' && node.style && !texts.has(meta.name)) {
        texts.set(meta.name, {
          family: node.style.fontFamily,
          size: node.style.fontSize,
          lineHeight: node.style.lineHeightPx,
          weight: node.style.fontWeight,
        });
      }
    }
  }
  if (node.style?.fontFamily) fontFamilies.set(node.style.fontFamily, (fontFamilies.get(node.style.fontFamily) || 0) + 1);
  if (typeof node.cornerRadius === 'number' && node.cornerRadius > 0) {
    radii.set(node.cornerRadius, (radii.get(node.cornerRadius) || 0) + 1);
  }
  for (const e of node.effects || []) {
    if (e.type === 'DROP_SHADOW' && e.visible !== false) {
      const css = `${e.offset?.x ?? 0}px ${e.offset?.y ?? 0}px ${e.radius ?? 0}px ${e.spread ?? 0}px ${toHex(e.color)}`;
      shadows.set(css, (shadows.get(css) || 0) + 1);
    }
  }
  for (const child of node.children || []) walk(child);
}
walk(file.document);

// --- 3. Pick a brand seed: the most saturated named color ------------------
function saturation(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}
const named = [...colors.entries()];
const seedEntry = named.filter(([, h]) => saturation(h) > 0.25).sort((a, b) => saturation(b[1]) - saturation(a[1]))[0];
const seed = seedEntry?.[1] ?? '#6750A4';

// --- 4. Emit a complete draft theme derived from the seed -------------------
const ROLES = [
  ['primary', 'primary'], ['on-primary', 'onPrimary'], ['primary-container', 'primaryContainer'],
  ['on-primary-container', 'onPrimaryContainer'], ['inverse-primary', 'inversePrimary'],
  ['secondary', 'secondary'], ['on-secondary', 'onSecondary'], ['secondary-container', 'secondaryContainer'],
  ['on-secondary-container', 'onSecondaryContainer'],
  ['tertiary', 'tertiary'], ['on-tertiary', 'onTertiary'], ['tertiary-container', 'tertiaryContainer'],
  ['on-tertiary-container', 'onTertiaryContainer'],
  ['error', 'error'], ['on-error', 'onError'], ['error-container', 'errorContainer'], ['on-error-container', 'onErrorContainer'],
  ['background', 'background'], ['on-background', 'onBackground'], ['surface', 'surface'], ['on-surface', 'onSurface'],
  ['surface-variant', 'surfaceVariant'], ['on-surface-variant', 'onSurfaceVariant'],
  ['surface-dim', 'surfaceDim'], ['surface-bright', 'surfaceBright'],
  ['surface-container-lowest', 'surfaceContainerLowest'], ['surface-container-low', 'surfaceContainerLow'],
  ['surface-container', 'surfaceContainer'], ['surface-container-high', 'surfaceContainerHigh'],
  ['surface-container-highest', 'surfaceContainerHighest'], ['surface-tint', 'surfaceTint'],
  ['inverse-surface', 'inverseSurface'], ['inverse-on-surface', 'inverseOnSurface'],
  ['outline', 'outline'], ['outline-variant', 'outlineVariant'], ['shadow', 'shadow'], ['scrim', 'scrim'],
  ['primary-fixed', 'primaryFixed'], ['primary-fixed-dim', 'primaryFixedDim'],
  ['on-primary-fixed', 'onPrimaryFixed'], ['on-primary-fixed-variant', 'onPrimaryFixedVariant'],
  ['secondary-fixed', 'secondaryFixed'], ['secondary-fixed-dim', 'secondaryFixedDim'],
  ['on-secondary-fixed', 'onSecondaryFixed'], ['on-secondary-fixed-variant', 'onSecondaryFixedVariant'],
  ['tertiary-fixed', 'tertiaryFixed'], ['tertiary-fixed-dim', 'tertiaryFixedDim'],
  ['on-tertiary-fixed', 'onTertiaryFixed'], ['on-tertiary-fixed-variant', 'onTertiaryFixedVariant'],
];
const rgb = (argb) => `rgb(${(argb >> 16) & 255}, ${(argb >> 8) & 255}, ${argb & 255})`;
const block = (selector, dark) => {
  const s = new SchemeTonalSpot(Hct.fromInt(argbFromHex(seed)), dark, 0);
  return `${selector} {\n` + ROLES.map(([css, prop]) => `  --md-sys-color-${css}: ${rgb(MDC[prop].getArgb(s))};`).join('\n') + '\n}\n';
};

const topFamily = [...fontFamilies.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
const radiiSorted = [...radii.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
const shape = radiiSorted.length
  ? `  /* radii seen in the file (by frequency): ${radiiSorted.map(([r, c]) => `${r}px×${c}`).join(', ')} — assign to the scale by eye */`
  : '  /* no corner radii found — keep the base scale or set by eye */';

const css = `/* ${name} — DRAFT theme ingested from Figma file ${fileKey}.
   Seed ${seed}${seedEntry ? ` (style "${seedEntry[0]}")` : ' (fallback)'} — long-tail roles derived (TonalSpot);
   hand-tune the signature roles using themes/${name}.report.md before shipping. */

:root[data-design='${name}'] {
  --md-ref-typeface-brand: '${topFamily ?? 'Inter'}', system-ui, sans-serif;
  --md-ref-typeface-plain: '${topFamily ?? 'Inter'}', system-ui, sans-serif;
${shape}
}

${block(`:root[data-design='${name}'],\n.light[data-design='${name}']`, false)}
${block(`:root[data-design='${name}'][data-theme='dark'],\n.dark[data-design='${name}']`, true)}`;

const report = `# ${name} — Figma ingestion report (${new Date().toISOString().slice(0, 10)})

File: https://www.figma.com/file/${fileKey} — "${file.name}"

## Named color styles (${colors.size})
${named.map(([n, h]) => `- ${n}: \`${h}\``).join('\n') || '- none published'}

## Text styles (${texts.size})
${[...texts.entries()].map(([n, t]) => `- ${n}: ${t.family} ${t.weight} ${t.size}px/${t.lineHeight ?? '—'}px`).join('\n') || '- none published'}

Most used font family in the file: **${topFamily ?? 'unknown'}**

## Corner radii (top by frequency)
${radiiSorted.map(([r, c]) => `- ${r}px (${c} nodes)`).join('\n') || '- none'}

## Drop shadows (top by frequency)
${[...shadows.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([s, c]) => `- \`${s}\` (${c} nodes)`).join('\n') || '- none'}

## Hand-tuning checklist
1. Set primary/on-primary (and containers) to the file's REAL brand pairing.
2. Assign the neutral palette to the surface ramp (canvas/cards/fields).
3. Map the radii above onto --md-sys-shape-corner-* in the theme.
4. If shadows are hard/offset, override --md-sys-elevation-level1..3.
5. Thick borders? Set --dk-border-width and outline/outline-variant colors.
6. Icons: pick a set and add a map in components/core/icon-sets.js.
`;

writeFileSync(new URL(`../themes/${name}.css`, import.meta.url), css);
writeFileSync(new URL(`../themes/${name}.report.md`, import.meta.url), report);
console.error(`Wrote themes/${name}.css (draft, seed ${seed}) and themes/${name}.report.md`);
