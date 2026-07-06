import React from 'react';

/**
 * Material 3 icon. Renders a glyph from the Material Symbols variable font —
 * the canonical M3 icon system (FILL, weight, grade, optical-size axes).
 * Pass any Material Symbols name (e.g. "settings", "favorite", "arrow_back").
 */
export function Icon({
  name = 'favorite',
  size = 24,
  fill = false,
  weight = 400,
  grade = 0,
  variant = 'outlined', // 'outlined' | 'rounded'
  color,
  className = '',
  style = {},
  ...rest
}) {
  const cls =
    variant === 'rounded'
      ? 'material-symbols-rounded'
      : 'material-symbols-outlined';
  return (
    <span
      className={`${cls} ${className}`.trim()}
      aria-hidden="true"
      style={{
        fontSize: size,
        width: size,
        height: size,
        color,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${Math.max(20, Math.min(48, size))}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {name}
    </span>
  );
}
