// Generates the full M3 role token set for an accent, light + dark, in the same
// rgb() format + property names as src/m3/tokens/colors.css. Derived with
// @material/material-color-utilities (TonalSpot, contrast 0) so contrast is
// spec-correct — not hand-picked.
//
// Usage: node scripts/gen-accent.mjs '#01776c' teal [--neutral N] [--neutral-variant M]
//
// --neutral / --neutral-variant override the chroma of the two neutral
// palettes (M3 TonalSpot defaults: 6 and 8). The kit uses 2 / 4 for its
// accents — surfaces stay seed-tinted but read as near-neutral at page
// scale, so color contrasts instead of washing everything (Jack, 2026-07).
import {
  Hct, argbFromHex, SchemeTonalSpot, DynamicScheme, TonalPalette,
  MaterialDynamicColors as MDC,
} from '@material/material-color-utilities';

const positional = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const flag = (f) => {
  const i = process.argv.indexOf(f);
  return i === -1 ? undefined : Number(process.argv[i + 1]);
};
const source = positional[0] || '#01776c';
const name = positional[1] || 'teal';
const neutralChroma = flag('--neutral');
const neutralVariantChroma = flag('--neutral-variant');

// css-var suffix -> MaterialDynamicColors accessor (all 49 roles in colors.css)
const GROUPS = [
  ['Primary', [
    ['primary', 'primary'], ['on-primary', 'onPrimary'],
    ['primary-container', 'primaryContainer'], ['on-primary-container', 'onPrimaryContainer'],
    ['inverse-primary', 'inversePrimary'],
  ]],
  ['Secondary', [
    ['secondary', 'secondary'], ['on-secondary', 'onSecondary'],
    ['secondary-container', 'secondaryContainer'], ['on-secondary-container', 'onSecondaryContainer'],
  ]],
  ['Tertiary', [
    ['tertiary', 'tertiary'], ['on-tertiary', 'onTertiary'],
    ['tertiary-container', 'tertiaryContainer'], ['on-tertiary-container', 'onTertiaryContainer'],
  ]],
  ['Error', [
    ['error', 'error'], ['on-error', 'onError'],
    ['error-container', 'errorContainer'], ['on-error-container', 'onErrorContainer'],
  ]],
  ['Surfaces', [
    ['background', 'background'], ['on-background', 'onBackground'],
    ['surface', 'surface'], ['on-surface', 'onSurface'],
    ['surface-variant', 'surfaceVariant'], ['on-surface-variant', 'onSurfaceVariant'],
    ['surface-dim', 'surfaceDim'], ['surface-bright', 'surfaceBright'],
    ['surface-container-lowest', 'surfaceContainerLowest'], ['surface-container-low', 'surfaceContainerLow'],
    ['surface-container', 'surfaceContainer'], ['surface-container-high', 'surfaceContainerHigh'],
    ['surface-container-highest', 'surfaceContainerHighest'], ['surface-tint', 'surfaceTint'],
    ['inverse-surface', 'inverseSurface'], ['inverse-on-surface', 'inverseOnSurface'],
  ]],
  ['Outline & utility', [
    ['outline', 'outline'], ['outline-variant', 'outlineVariant'],
    ['shadow', 'shadow'], ['scrim', 'scrim'],
  ]],
  ['Fixed accent roles', [
    ['primary-fixed', 'primaryFixed'], ['primary-fixed-dim', 'primaryFixedDim'],
    ['on-primary-fixed', 'onPrimaryFixed'], ['on-primary-fixed-variant', 'onPrimaryFixedVariant'],
    ['secondary-fixed', 'secondaryFixed'], ['secondary-fixed-dim', 'secondaryFixedDim'],
    ['on-secondary-fixed', 'onSecondaryFixed'], ['on-secondary-fixed-variant', 'onSecondaryFixedVariant'],
    ['tertiary-fixed', 'tertiaryFixed'], ['tertiary-fixed-dim', 'tertiaryFixedDim'],
    ['on-tertiary-fixed', 'onTertiaryFixed'], ['on-tertiary-fixed-variant', 'onTertiaryFixedVariant'],
  ]],
];

const rgb = (argb) => `rgb(${(argb >> 16) & 255}, ${(argb >> 8) & 255}, ${argb & 255})`;

function makeScheme(isDark) {
  const sourceHct = Hct.fromInt(argbFromHex(source));
  const base = new SchemeTonalSpot(sourceHct, isDark, 0);
  if (neutralChroma === undefined && neutralVariantChroma === undefined) return base;
  // Same TonalSpot accent palettes, quieter neutrals.
  return new DynamicScheme({
    sourceColorArgb: argbFromHex(source),
    variant: 2, // Variant.TONAL_SPOT
    contrastLevel: 0,
    isDark,
    primaryPalette: base.primaryPalette,
    secondaryPalette: base.secondaryPalette,
    tertiaryPalette: base.tertiaryPalette,
    neutralPalette: TonalPalette.fromHueAndChroma(sourceHct.hue, neutralChroma ?? 6),
    neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceHct.hue, neutralVariantChroma ?? 8),
  });
}

function block(selector, isDark) {
  const scheme = makeScheme(isDark);
  let out = `${selector} {\n`;
  for (const [group, roles] of GROUPS) {
    out += `  /* ${group} */\n`;
    for (const [css, prop] of roles) {
      out += `  --md-sys-color-${css}: ${rgb(MDC[prop].getArgb(scheme))};\n`;
    }
  }
  return out + `}\n`;
}

const flags =
  (neutralChroma !== undefined ? ` --neutral ${neutralChroma}` : '') +
  (neutralVariantChroma !== undefined ? ` --neutral-variant ${neutralVariantChroma}` : '');
console.log(`/* ${name} accent (source ${source}) — generated via material-color-utilities`);
console.log(`   TonalSpot, contrast 0${flags ? `, quiet neutrals (${flags.trim()})` : ''}.`);
console.log(`   Regenerate: node scripts/gen-accent.mjs '${source}' ${name}${flags} */`);
console.log(block(`:root[data-accent="${name}"],\n.light[data-accent="${name}"]`, false));
console.log(block(`:root[data-accent="${name}"][data-theme="dark"],\n.dark[data-accent="${name}"]`, true));
