import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 avatar. Image, monogram (initials), or icon. Square or round.
 */
export function Avatar({
  src,
  initials,
  icon = 'person',
  size = 40,
  shape = 'round',
  color = 'primary',
  style = {},
  ...rest
}) {
  const palette = {
    primary: { bg: 'var(--md-sys-color-primary-container)', fg: 'var(--md-sys-color-on-primary-container)' },
    secondary: { bg: 'var(--md-sys-color-secondary-container)', fg: 'var(--md-sys-color-on-secondary-container)' },
    tertiary: { bg: 'var(--md-sys-color-tertiary-container)', fg: 'var(--md-sys-color-on-tertiary-container)' },
  }[color] || { bg: 'var(--md-sys-color-primary-container)', fg: 'var(--md-sys-color-on-primary-container)' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: 'none',
        borderRadius: shape === 'square' ? size * 0.3 : 9999,
        background: src ? 'transparent' : palette.bg,
        color: palette.fg,
        overflow: 'hidden',
        font: `500 ${Math.round(size * 0.4)}px var(--md-ref-typeface-plain)`,
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={initials || 'avatar'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : initials ? (
        initials
      ) : (
        <Icon name={icon} size={Math.round(size * 0.6)} color={palette.fg} />
      )}
    </span>
  );
}
