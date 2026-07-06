import React from 'react';

/**
 * Material 3 radio button. Controlled via `checked`.
 */
export function Radio({
  checked = false,
  disabled = false,
  onChange,
  label,
  name,
  value,
  style = {},
  ...rest
}) {
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
        position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, borderRadius: 'var(--md-sys-shape-corner-full)', margin: -8,
      }}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value, e)}
          style={{ position: 'absolute', opacity: 0, width: 40, height: 40, margin: 0, cursor: 'inherit' }}
        />
        <span style={{
          width: 20, height: 20, borderRadius: 'var(--md-sys-shape-corner-full)',
          border: `2px solid ${checked ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)'}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 80ms',
        }}>
          {checked && (
            <span style={{ width: 10, height: 10, borderRadius: 'var(--md-sys-shape-corner-full)', background: 'var(--md-sys-color-primary)' }} />
          )}
        </span>
      </span>
      {label != null && (
        <span style={{ font: "400 16px/24px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface)' }}>
          {label}
        </span>
      )}
    </label>
  );
}
