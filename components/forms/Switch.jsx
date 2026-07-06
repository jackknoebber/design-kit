import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 switch (M3 sizing — 52×32 track, growing handle).
 */
export function Switch({
  checked = false,
  disabled = false,
  onChange,
  icons = true,
  label,
  style = {},
  ...rest
}) {
  const handleSize = checked ? 24 : 16;
  const offset = checked ? 52 - 24 - 4 : 4;

  const sw = (
    <span
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        position: 'relative',
        width: 52,
        height: 32,
        flex: 'none',
        borderRadius: 'var(--md-sys-shape-corner-full)',
        background: checked ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-container-highest)',
        border: checked ? '2px solid var(--md-sys-color-primary)' : '2px solid var(--md-sys-color-outline)',
        boxSizing: 'border-box',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'background 120ms',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: offset,
          width: handleSize,
          height: handleSize,
          marginTop: -handleSize / 2,
          borderRadius: 'var(--md-sys-shape-corner-full)',
          background: checked ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-outline)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'left 140ms cubic-bezier(0.2,0,0,1), width 140ms, height 140ms, background 120ms',
        }}
      >
        {icons && checked && (
          <Icon name="check" size={16} weight={600} color="var(--md-sys-color-on-primary-container)" />
        )}
      </span>
    </span>
  );

  if (label == null) return React.cloneElement(sw, { style: { ...sw.props.style, ...style }, ...rest });

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 16, opacity: disabled ? 0.38 : 1, ...style }} {...rest}>
      <span style={{ font: "400 16px/24px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface)' }}>{label}</span>
      {sw}
    </label>
  );
}
