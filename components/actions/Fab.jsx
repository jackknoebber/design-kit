import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

const SIZES = {
  small:   { box: 40, icon: 24, r: 'var(--md-sys-shape-corner-medium)' },
  regular: { box: 56, icon: 24, r: 'var(--md-sys-shape-corner-large)' },
  large:   { box: 96, icon: 36, r: 'var(--md-sys-shape-corner-extra-large)' },
};

const COLORS = {
  primary:   { bg: 'var(--md-sys-color-primary-container)', fg: 'var(--md-sys-color-on-primary-container)' },
  secondary: { bg: 'var(--md-sys-color-secondary-container)', fg: 'var(--md-sys-color-on-secondary-container)' },
  tertiary:  { bg: 'var(--md-sys-color-tertiary-container)', fg: 'var(--md-sys-color-on-tertiary-container)' },
  surface:   { bg: 'var(--md-sys-color-surface-container-high)', fg: 'var(--md-sys-color-primary)' },
};

/**
 * Material 3 Floating Action Button. Three sizes + an extended variant that
 * shows a label. Four color roles.
 */
export function Fab({
  icon = 'add',
  size = 'regular',
  color = 'primary',
  extended = false,
  label,
  lowered = false,
  onClick,
  ariaLabel,
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const s = SIZES[size] || SIZES.regular;
  const c = COLORS[color] || COLORS.primary;
  const isExt = extended && label;

  return (
    <button
      type="button"
      className="md-sl"
      aria-label={ariaLabel || label || icon}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        height: s.box,
        width: isExt ? 'auto' : s.box,
        padding: isExt ? '0 20px' : 0,
        border: 'none',
        borderRadius: s.r,
        background: c.bg,
        color: c.fg,
        boxShadow: lowered
          ? 'var(--md-sys-elevation-level1)'
          : 'var(--md-sys-elevation-level3)',
        fontFamily: "var(--md-ref-typeface-plain)",
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: '0.1px',
        cursor: 'pointer',
        transition: 'box-shadow 120ms',
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={s.icon} />
      {isExt && <span style={{ paddingRight: 4 }}>{label}</span>}
    </button>
  );
}
