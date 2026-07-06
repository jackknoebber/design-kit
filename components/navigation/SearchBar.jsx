import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 search bar (docked entry point). Leading menu/search icon, the
 * input, and an optional trailing avatar/icon.
 */
export function SearchBar({
  placeholder = 'Search',
  value,
  onChange,
  leadingIcon = 'search',
  onLeading,
  trailing,
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 56,
        padding: '0 16px',
        background: 'var(--md-sys-color-surface-container-high)',
        borderRadius: 'var(--md-sys-shape-corner-full)',
        color: 'var(--md-sys-color-on-surface)',
        ...style,
      }}
      {...rest}
    >
      <button type="button" onClick={onLeading} aria-label="search" style={{ border: 'none', background: 'transparent', padding: 0, display: 'inline-flex', cursor: 'pointer', color: 'var(--md-sys-color-on-surface-variant)' }}>
        <Icon name={leadingIcon} size={24} />
      </button>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          color: 'var(--md-sys-color-on-surface)', font: "400 16px/24px var(--md-ref-typeface-plain)",
        }}
      />
      {trailing && <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--md-sys-color-on-surface-variant)' }}>{trailing}</span>}
    </div>
  );
}
