import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 checkbox. Controlled via `checked`. Supports indeterminate.
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  label,
  error = false,
  style = {},
  ...rest
}) {
  const on = checked || indeterminate;
  const boxColor = error ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-primary)';
  const box = (
    <span
      style={{
        position: 'relative',
        width: 18,
        height: 18,
        flex: 'none',
        borderRadius: 2,
        border: on ? 'none' : `2px solid ${error ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)'}`,
        background: on ? boxColor : 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 80ms, border-color 80ms',
      }}
    >
      {on && (
        <Icon
          name={indeterminate ? 'remove' : 'check'}
          size={18}
          weight={600}
          color="var(--md-sys-color-on-primary)"
        />
      )}
    </span>
  );

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, borderRadius: 'var(--md-sys-shape-corner-full)', margin: -11, marginRight: -11,
      }}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.checked, e)}
          style={{ position: 'absolute', opacity: 0, width: 40, height: 40, margin: 0, cursor: 'inherit' }}
        />
        {box}
      </span>
      {label != null && (
        <span style={{ font: "400 16px/24px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface)' }}>
          {label}
        </span>
      )}
    </label>
  );
}
