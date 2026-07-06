import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 navigation rail (vertical, for tablet/desktop). Optional FAB-like
 * menu button and items [{label, icon, badge}].
 */
export function NavigationRail({ items = [], value = 0, onChange, header, footer, alignment = 'top', style = {}, ...rest }) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: alignment === 'center' ? 'center' : 'flex-start',
        gap: 12,
        width: 80,
        padding: '44px 0',
        background: 'var(--md-sys-color-surface)',
        height: '100%',
        ...style,
      }}
      {...rest}
    >
      {header && <div style={{ marginBottom: 12 }}>{header}</div>}
      {items.map((it, i) => {
        const active = i === value;
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => onChange && onChange(i, e)}
            style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              border: 'none', background: 'transparent', cursor: 'pointer', width: '100%',
            }}
          >
            <span className="md-sl" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 56, height: 32, borderRadius: 'var(--md-sys-shape-corner-full)',
              background: active ? 'var(--md-sys-color-secondary-container)' : 'transparent',
              color: active ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
              transition: 'background 120ms',
            }}>
              <Icon name={it.icon} size={24} fill={active} />
            </span>
            <span style={{
              font: "500 12px/16px var(--md-ref-typeface-plain)", letterSpacing: '.5px',
              color: active ? 'var(--md-sys-color-on-surface)' : 'var(--md-sys-color-on-surface-variant)',
            }}>{it.label}</span>
          </button>
        );
      })}
      {footer && <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>{footer}</div>}
    </nav>
  );
}
