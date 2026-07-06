import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 text field. Filled or outlined, with optional leading/trailing
 * icons, supporting & error text. Floating label.
 *
 * Styling lives in components.css (.dk-textfield / .dk-field__*) so themes can
 * restructure the field anatomy — keep this file to structure + state only.
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

  const cls = [
    'dk-textfield',
    filled ? 'dk-textfield--filled' : 'dk-textfield--outlined',
    floated && 'dk-textfield--floated',
    focused && 'dk-textfield--focused',
    error && 'dk-textfield--error',
    disabled && 'dk-textfield--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} style={style} {...rest}>
      <div className="dk-field__shell">
        {leadingIcon && <Icon name={leadingIcon} size={24} color="var(--md-sys-color-on-surface-variant)" />}
        <div className="dk-field__inner">
          <label className="dk-field__label">{label}</label>
          <input
            className="dk-field__input"
            type={type}
            value={val}
            placeholder={floated ? placeholder : ''}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => { setInternal(e.target.value); onChange && onChange(e.target.value, e); }}
          />
        </div>
        {trailingIcon && (
          <Icon
            name={trailingIcon}
            size={24}
            color={error ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)'}
          />
        )}
      </div>
      {supportingText && <span className="dk-field__supporting">{supportingText}</span>}
    </div>
  );
}
