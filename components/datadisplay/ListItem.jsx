import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 list item. One/two/three-line. Leading (icon/avatar/image) and
 * trailing (text/icon/control) slots.
 */
export function ListItem({
  headline = 'List item',
  supportingText,
  overline,
  leading,
  trailing,
  lines,
  interactive = false,
  selected = false,
  onClick,
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const n = lines || (supportingText ? (overline ? 3 : 2) : 1);
  const minH = n === 1 ? 56 : n === 2 ? 72 : 88;

  return (
    <div
      className={interactive ? 'md-sl' : undefined}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: n >= 3 ? 'flex-start' : 'center',
        gap: 16,
        minHeight: minH,
        padding: '8px 16px',
        background: selected ? 'var(--md-sys-color-secondary-container)' : 'transparent',
        color: 'var(--md-sys-color-on-surface)',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }}
      {...rest}
    >
      {leading != null && (
        <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', color: 'var(--md-sys-color-on-surface-variant)' }}>
          {typeof leading === 'string' ? <Icon name={leading} size={24} /> : leading}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {overline && <div style={{ font: "400 11px/16px var(--md-ref-typeface-plain)", letterSpacing: '.5px', color: 'var(--md-sys-color-on-surface-variant)' }}>{overline}</div>}
        <div style={{ font: "400 16px/24px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface)' }}>{headline}</div>
        {supportingText && <div style={{ font: "400 14px/20px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: n >= 3 ? 'normal' : 'nowrap' }}>{supportingText}</div>}
      </div>
      {trailing != null && (
        <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', font: "400 12px/16px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface-variant)' }}>
          {typeof trailing === 'string' && trailing.length <= 24 && /^[a-z_]+$/.test(trailing) ? <Icon name={trailing} size={24} /> : trailing}
        </span>
      )}
    </div>
  );
}
