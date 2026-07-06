import React from 'react';
import { useDesign } from './useDesign.js';
import { resolveIcon } from './icon-sets.js';

/**
 * Design-aware icon. `name` is always the SEMANTIC (Material Symbols) name —
 * e.g. "settings", "add", "delete". Under the default M3 design it renders the
 * Material Symbols variable font (FILL/weight/grade/opsz axes); under another
 * design (data-design on <html>) it renders that design's icon set via the
 * registry in icon-sets.js, falling back to Material for unmapped names.
 */
export function Icon({
  name = 'favorite',
  size = 24,
  fill = false,
  weight = 400,
  grade = 0,
  variant = 'outlined', // 'outlined' | 'rounded' (Material set only)
  color,
  className = '',
  style = {},
  ...rest
}) {
  const design = useDesign();
  const materialCls =
    variant === 'rounded'
      ? 'material-symbols-rounded'
      : 'material-symbols-outlined';
  const r = resolveIcon(design, name, materialCls);
  return (
    <span
      className={`${r.className} ${className}`.trim()}
      aria-hidden="true"
      style={{
        fontSize: size,
        width: size,
        height: size,
        color,
        // Variable-font axes only apply to Material Symbols; foreign icon
        // fonts ignore them, but don't send axes at all to keep them clean.
        fontVariationSettings: r.foreign
          ? undefined
          : `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${Math.max(20, Math.min(48, size))}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {r.glyph}
    </span>
  );
}
