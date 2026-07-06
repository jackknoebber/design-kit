import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 chip. assist / filter / input / suggestion. `selected` fills the
 * chip (filter/input). Optional leading icon, avatar, and trailing remove.
 */
export function Chip({
  label = 'Chip',
  variant = 'assist',
  selected = false,
  elevated = false,
  icon,
  avatar,
  onRemove,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const isSelected = selected && (variant === 'filter' || variant === 'input');
  const bg = isSelected
    ? 'var(--md-sys-color-secondary-container)'
    : elevated
    ? 'var(--md-sys-color-surface-container-low)'
    : 'transparent';
  const fg = isSelected ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)';
  const border = isSelected || elevated ? 'none' : 'var(--dk-border-width) solid var(--md-sys-color-outline-variant)';

  return (
    <button
      type="button"
      className="md-sl"
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 32,
        padding: avatar ? '0 16px 0 4px' : `0 16px 0 ${icon || isSelected ? 8 : 16}px`,
        border,
        borderRadius: 'var(--md-sys-shape-corner-small)',
        background: bg,
        color: fg,
        boxShadow: elevated ? 'var(--md-sys-elevation-level1)' : 'none',
        font: "500 14px/20px var(--md-ref-typeface-plain)",
        letterSpacing: '0.1px',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        ...style,
      }}
      {...rest}
    >
      {avatar && <span style={{ width: 24, height: 24, borderRadius: 'var(--md-sys-shape-corner-full)', overflow: 'hidden', flex: 'none' }}>{avatar}</span>}
      {isSelected && !icon && !avatar && <Icon name="check" size={18} color={fg} />}
      {icon && <Icon name={icon} size={18} color={isSelected ? fg : 'var(--md-sys-color-primary)'} />}
      <span>{label}</span>
      {onRemove && (
        <span onClick={(e) => { e.stopPropagation(); onRemove(e); }} style={{ display: 'inline-flex', marginRight: -8 }}>
          <Icon name="close" size={18} color={fg} />
        </span>
      )}
    </button>
  );
}
