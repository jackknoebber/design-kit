import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 text field. Filled or outlined, with optional leading/trailing
 * icons, supporting & error text. Floating label.
 */
export function TextField({
  variant = 'outlined',
  label = 'Label',
  value,
  defaultValue,
  placeholder,
  onChange,
  leadingIcon,
  trailingIcon,
  supportingText,
  error = false,
  disabled = false,
  type = 'text',
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue || '');
  const val = value != null ? value : internal;
  const filled = variant === 'filled';
  const floated = focused || (val != null && String(val).length > 0) || placeholder;

  const accent = error
    ? 'var(--md-sys-color-error)'
    : focused
    ? 'var(--md-sys-color-primary)'
    : 'var(--md-sys-color-on-surface-variant)';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', minWidth: 210, opacity: disabled ? 0.38 : 1, ...style }} {...rest}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          height: 56,
          padding: '0 16px',
          background: filled ? 'var(--md-sys-color-surface-container-highest)' : 'transparent',
          border: filled ? 'none' : `var(--dk-border-width) solid ${error ? 'var(--md-sys-color-error)' : focused ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline)'}`,
          // Keep the active-indicator width change off the box model so the text
          // doesn't shift on focus: constant 1px border, thicken via box-shadow.
          borderBottom: filled ? `1px solid ${accent}` : undefined,
          boxShadow: focused
            ? filled
              ? `inset 0 -2px 0 0 ${accent}`
              : `inset 0 0 0 1px ${error ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-primary)'}`
            : 'none',
          borderRadius: filled ? '4px 4px 0 0' : 4,
          transition: 'border-color 80ms, box-shadow 80ms',
        }}
      >
        {leadingIcon && <Icon name={leadingIcon} size={24} color="var(--md-sys-color-on-surface-variant)" />}
        <div style={{ position: 'relative', flex: 1, height: '100%' }}>
          <label
            style={{
              position: 'absolute',
              left: 0,
              top: floated ? (filled ? 8 : -8) : '50%',
              transform: floated ? 'none' : 'translateY(-50%)',
              fontSize: floated ? 12 : 16,
              lineHeight: floated ? '16px' : '24px',
              color: accent,
              background: !filled && floated ? 'var(--md-sys-color-surface)' : 'transparent',
              padding: !filled && floated ? '0 4px' : 0,
              margin: !filled && floated ? '0 -4px' : 0,
              pointerEvents: 'none',
              fontFamily: "var(--md-ref-typeface-plain)",
              transition: 'top 120ms, font-size 120ms, color 80ms',
            }}
          >
            {label}
          </label>
          <input
            type={type}
            value={val}
            placeholder={floated ? placeholder : ''}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => { setInternal(e.target.value); onChange && onChange(e.target.value, e); }}
            style={{
              position: 'absolute',
              left: 0,
              bottom: filled ? 8 : '50%',
              transform: filled ? 'none' : 'translateY(50%)',
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: 'var(--md-sys-color-on-surface)',
              font: "400 16px/24px var(--md-ref-typeface-plain)",
              padding: 0,
            }}
          />
        </div>
        {trailingIcon && <Icon name={trailingIcon} size={24} color={error ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)'} />}
      </div>
      {supportingText && (
        <span style={{
          font: "400 12px/16px var(--md-ref-typeface-plain)",
          color: error ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)',
          padding: '4px 16px 0',
        }}>
          {supportingText}
        </span>
      )}
    </div>
  );
}
