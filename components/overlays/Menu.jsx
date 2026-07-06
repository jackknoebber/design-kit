import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 menu. A surface of selectable items. Provide `items`
 * [{label, icon, trailing, onClick, disabled, divider}]. Position with the
 * wrapping element; this renders the open surface only.
 */
export function Menu({ items = [], open = true, minWidth = 200, style = {}, ...rest }) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  if (!open) return null;
  return (
    <div
      role="menu"
      style={{
        minWidth,
        padding: '8px 0',
        background: 'var(--md-sys-color-surface-container)',
        borderRadius: 'var(--md-sys-shape-corner-extra-small)',
        boxShadow: 'var(--md-sys-elevation-level2)',
        color: 'var(--md-sys-color-on-surface)',
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) =>
        it.divider ? (
          <div key={i} style={{ height: 1, background: 'var(--md-sys-color-outline-variant)', margin: '8px 0' }} />
        ) : (
          <button
            key={i}
            type="button"
            role="menuitem"
            className="md-sl"
            disabled={it.disabled}
            onClick={it.onClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              height: 48,
              padding: '0 12px',
              border: 'none',
              background: 'transparent',
              color: 'inherit',
              font: "400 14px/20px var(--md-ref-typeface-plain)",
              textAlign: 'left',
              cursor: it.disabled ? 'default' : 'pointer',
              opacity: it.disabled ? 0.38 : 1,
            }}
          >
            {it.icon && <Icon name={it.icon} size={24} color="var(--md-sys-color-on-surface-variant)" />}
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.trailing && (
              <span style={{ font: "400 14px/20px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface-variant)' }}>
                {typeof it.trailing === 'string' && /^[a-z_]+$/.test(it.trailing) ? <Icon name={it.trailing} size={20} /> : it.trailing}
              </span>
            )}
          </button>
        )
      )}
    </div>
  );
}
