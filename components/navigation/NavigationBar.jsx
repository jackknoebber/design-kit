import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 navigation bar (bottom). 3–5 destinations
 * [{label, icon, badge}]. Active item shows a pill indicator behind the icon.
 */
export function NavigationBar({ items = [], value = 0, onChange, style = {}, ...rest }) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  return (
    <nav
      style={{
        display: 'flex',
        height: 80,
        background: 'var(--md-sys-color-surface-container)',
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => {
        const active = i === value;
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => onChange && onChange(i, e)}
            style={{
              flex: 1,
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '12px 0 16px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <span className="md-sl" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 56, height: 32, borderRadius: 'var(--md-sys-shape-corner-full)',
              background: active ? 'var(--md-sys-color-secondary-container)' : 'transparent',
              color: active ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
              position: 'relative',
              transition: 'background 120ms',
            }}>
              <Icon name={it.icon} size={24} fill={active} />
              {it.badge != null && (
                <span style={{
                  position: 'absolute', top: 4, left: '54%',
                  minWidth: it.badge === true ? 6 : 16, height: it.badge === true ? 6 : 16,
                  padding: it.badge === true ? 0 : '0 4px',
                  borderRadius: 'var(--md-sys-shape-corner-full)', background: 'var(--md-sys-color-error)', color: 'var(--md-sys-color-on-error)',
                  font: "500 11px/16px var(--md-ref-typeface-plain)", display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{it.badge === true ? '' : it.badge}</span>
              )}
            </span>
            <span style={{
              font: "500 12px/16px var(--md-ref-typeface-plain)", letterSpacing: '.5px',
              color: active ? 'var(--md-sys-color-on-surface)' : 'var(--md-sys-color-on-surface-variant)',
            }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
