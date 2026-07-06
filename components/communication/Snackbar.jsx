import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 snackbar. Single or two-line, optional action + close.
 */
export function Snackbar({ message, action, onAction, onClose, style = {}, ...rest }) {
  return (
    <div
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        minHeight: 48,
        minWidth: 344,
        maxWidth: 600,
        padding: '0 8px 0 16px',
        background: 'var(--md-sys-color-inverse-surface)',
        color: 'var(--md-sys-color-inverse-on-surface)',
        borderRadius: 'var(--md-sys-shape-corner-extra-small)',
        boxShadow: 'var(--md-sys-elevation-level3)',
        ...style,
      }}
      {...rest}
    >
      <span style={{ flex: 1, font: "400 14px/20px var(--md-ref-typeface-plain)", letterSpacing: '.25px', padding: '12px 0' }}>{message}</span>
      {action && (
        <button
          type="button"
          onClick={onAction}
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: 'var(--md-sys-color-inverse-primary)',
            font: "500 14px/20px var(--md-ref-typeface-plain)", letterSpacing: '.1px',
            padding: '8px', borderRadius: 'var(--md-sys-shape-corner-extra-small)',
          }}
        >
          {action}
        </button>
      )}
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'inline-flex', padding: 8, color: 'var(--md-sys-color-inverse-on-surface)' }}>
          <Icon name="close" size={20} />
        </button>
      )}
    </div>
  );
}
