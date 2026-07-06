import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

const SIZES = {
  xs: { box: 32, icon: 20, r: 'var(--md-sys-shape-corner-medium)' },
  s:  { box: 40, icon: 24, r: 'var(--md-sys-shape-corner-large)' },
  m:  { box: 56, icon: 24, r: 'var(--md-sys-shape-corner-large)' },
  l:  { box: 96, icon: 40, r: 'var(--md-sys-shape-corner-extra-large)' },
  xl: { box: 136, icon: 40, r: 'var(--md-sys-shape-corner-extra-large-increased)' },
};

function colorsFor(variant, selected) {
  switch (variant) {
    case 'filled':
      return selected
        ? { bg: 'var(--md-sys-color-primary)', fg: 'var(--md-sys-color-on-primary)' }
        : { bg: 'var(--md-sys-color-surface-container-highest)', fg: 'var(--md-sys-color-primary)' };
    case 'tonal':
      return selected
        ? { bg: 'var(--md-sys-color-secondary-container)', fg: 'var(--md-sys-color-on-secondary-container)' }
        : { bg: 'var(--md-sys-color-surface-container-highest)', fg: 'var(--md-sys-color-on-surface-variant)' };
    case 'outlined':
      return selected
        ? { bg: 'var(--md-sys-color-inverse-surface)', fg: 'var(--md-sys-color-inverse-on-surface)', border: 'none' }
        : { bg: 'transparent', fg: 'var(--md-sys-color-on-surface-variant)', border: 'var(--dk-border-width) solid var(--md-sys-color-outline-variant)' };
    default: // standard
      return { bg: 'transparent', fg: selected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)' };
  }
}

/**
 * Material 3 icon button. Standard / filled / tonal / outlined, optionally
 * togglable (controlled via `selected`). Round or square shape.
 */
export function IconButton({
  icon = 'favorite',
  variant = 'standard',
  size = 's',
  shape = 'round',
  selected = false,
  disabled = false,
  fill,
  onClick,
  ariaLabel = 'icon button',
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const s = SIZES[size] || SIZES.s;
  const c = colorsFor(variant, selected);
  const radius = shape === 'square' ? s.r : 'var(--md-sys-shape-corner-full)';

  return (
    <button
      type="button"
      className="md-sl"
      aria-label={ariaLabel}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: s.box,
        height: s.box,
        padding: 0,
        border: c.border || 'none',
        borderRadius: radius,
        background: c.bg,
        color: c.fg,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        transition: 'background 120ms, border-radius 120ms',
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={s.icon} fill={fill != null ? fill : selected} />
    </button>
  );
}
