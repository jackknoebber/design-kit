import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 navigation drawer (standard or modal). Sections of items
 * [{label, icon, badge}] with an optional headline. Modal renders a scrim.
 */
export function NavigationDrawer({
  items = [],
  value = 0,
  onChange,
  headline,
  modal = false,
  open = true,
  onClose,
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  if (modal && !open) return null;

  const panel = (
    <aside
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 360,
        maxWidth: '85vw',
        height: '100%',
        padding: 12,
        background: 'var(--md-sys-color-surface-container-low)',
        borderRadius: modal ? '0 16px 16px 0' : 0,
        boxSizing: 'border-box',
        overflow: 'auto',
        ...style,
      }}
      {...rest}
    >
      {headline && (
        <div style={{ padding: '16px 16px 16px 28px', font: "500 14px/20px var(--md-ref-typeface-plain)", letterSpacing: '.1px', color: 'var(--md-sys-color-on-surface-variant)' }}>{headline}</div>
      )}
      {items.map((it, i) => {
        if (it.divider) return <div key={i} style={{ height: 1, background: 'var(--md-sys-color-outline-variant)', margin: '8px 16px' }} />;
        const active = i === value;
        return (
          <button
            key={i}
            type="button"
            className="md-sl"
            onClick={(e) => onChange && onChange(i, e)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%', height: 56,
              padding: '0 24px 0 16px', border: 'none', borderRadius: 'var(--md-sys-shape-corner-full)', cursor: 'pointer',
              background: active ? 'var(--md-sys-color-secondary-container)' : 'transparent',
              color: active ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface-variant)',
              font: "500 14px/20px var(--md-ref-typeface-plain)", letterSpacing: '.1px', textAlign: 'left',
            }}
          >
            {it.icon && <Icon name={it.icon} size={24} fill={active} />}
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.badge != null && <span style={{ font: "500 14px/20px var(--md-ref-typeface-plain)" }}>{it.badge}</span>}
          </button>
        );
      })}
    </aside>
  );

  if (!modal) return panel;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'color-mix(in srgb, var(--md-sys-color-scrim) 32%, transparent)', zIndex: 1000, display: 'flex' }}>
      {panel}
    </div>
  );
}
