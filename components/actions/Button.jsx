import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

const SIZES = {
  xs: { h: 32, padX: 12, gap: 8, font: 14, lh: 20, icon: 20, squareR: 'var(--md-sys-shape-corner-medium)', roundR: 'var(--md-sys-shape-corner-full)' },
  s:  { h: 40, padX: 16, gap: 8, font: 14, lh: 20, icon: 20, squareR: 'var(--md-sys-shape-corner-medium)', roundR: 'var(--md-sys-shape-corner-full)' },
  m:  { h: 56, padX: 24, gap: 8, font: 16, lh: 24, icon: 24, squareR: 'var(--md-sys-shape-corner-large)', roundR: 'var(--md-sys-shape-corner-full)' },
  l:  { h: 96, padX: 48, gap: 12, font: 24, lh: 32, icon: 32, squareR: 'var(--md-sys-shape-corner-extra-large)', roundR: 'var(--md-sys-shape-corner-full)' },
  xl: { h: 136, padX: 64, gap: 16, font: 32, lh: 40, icon: 40, squareR: 'var(--md-sys-shape-corner-extra-large)', roundR: 'var(--md-sys-shape-corner-full)' },
};

const FILLS = {
  filled:   { bg: 'var(--md-sys-color-primary)', fg: 'var(--md-sys-color-on-primary)', border: 'none', shadow: 'none' },
  tonal:    { bg: 'var(--md-sys-color-secondary-container)', fg: 'var(--md-sys-color-on-secondary-container)', border: 'none', shadow: 'none' },
  elevated: { bg: 'var(--md-sys-color-surface-container-low)', fg: 'var(--md-sys-color-primary)', border: 'none', shadow: 'var(--md-sys-elevation-level1)' },
  outlined: { bg: 'transparent', fg: 'var(--md-sys-color-primary)', border: '1px solid var(--md-sys-color-outline-variant)', shadow: 'none' },
  text:     { bg: 'transparent', fg: 'var(--md-sys-color-primary)', border: 'none', shadow: 'none' },
};

/**
 * Material 3 common button (M3 expressive sizing). Five sizes (xs–xl), five
 * variants, and a round/square shape toggle.
 */
export function Button({
  children,
  variant = 'filled',
  size = 's',
  shape = 'round',
  icon,
  trailingIcon,
  disabled = false,
  onClick,
  type = 'button',
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const s = SIZES[size] || SIZES.s;
  const f = FILLS[variant] || FILLS.filled;
  const radius = shape === 'square' ? s.squareR : s.roundR;
  const textPad = variant === 'text' ? Math.max(12, s.padX - 12) : s.padX;

  return (
    <button
      type={type}
      className="md-sl"
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.h,
        padding: `0 ${textPad}px`,
        minWidth: 48,
        border: f.border,
        borderRadius: radius,
        background: f.bg,
        color: f.fg,
        boxShadow: f.shadow,
        fontFamily: "var(--md-ref-typeface-plain)",
        fontSize: s.font,
        lineHeight: `${s.lh}px`,
        fontWeight: 500,
        letterSpacing: '0.1px',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        transition: 'box-shadow 120ms, background 120ms',
        ...style,
      }}
      {...rest}
    >
      {icon && <Icon name={icon} size={s.icon} />}
      {children != null && <span>{children}</span>}
      {trailingIcon && <Icon name={trailingIcon} size={s.icon} />}
    </button>
  );
}
