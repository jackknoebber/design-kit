import React from 'react';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

const VARIANTS = {
  elevated: { bg: 'var(--md-sys-color-surface-container-low)', border: 'none', shadow: 'var(--md-sys-elevation-level1)' },
  filled:   { bg: 'var(--md-sys-color-surface-container-highest)', border: 'none', shadow: 'none' },
  outlined: { bg: 'var(--md-sys-color-surface)', border: 'var(--dk-border-width) solid var(--md-sys-color-outline-variant)', shadow: 'none' },
};

/**
 * Material 3 card surface. Elevated / filled / outlined. `interactive` adds a
 * state layer + pointer.
 */
export function Card({
  variant = 'elevated',
  interactive = false,
  children,
  onClick,
  padding = 16,
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const v = VARIANTS[variant] || VARIANTS.elevated;
  return (
    <div
      className={interactive ? 'md-sl' : undefined}
      onClick={onClick}
      style={{
        background: v.bg,
        border: v.border,
        boxShadow: v.shadow,
        borderRadius: 'var(--md-sys-shape-corner-medium)',
        padding,
        color: 'var(--md-sys-color-on-surface)',
        cursor: interactive ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
