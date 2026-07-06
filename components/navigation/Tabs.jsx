import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 tabs. Primary (indicator hugs label, optional icon above) or
 * secondary (full-width indicator). `tabs` = [{label, icon}].
 */
export function Tabs({ tabs = [], value = 0, onChange, variant = 'primary', style = {}, ...rest }) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const primary = variant === 'primary';
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--md-sys-color-surface-variant)', background: 'var(--md-sys-color-surface)', ...style }} {...rest}>
      {tabs.map((t, i) => {
        const active = i === value;
        return (
          <button
            key={i}
            type="button"
            className="md-sl"
            onClick={(e) => onChange && onChange(i, e)}
            style={{
              position: 'relative',
              flex: 1,
              display: 'inline-flex',
              flexDirection: primary && t.icon ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: primary && t.icon ? 2 : 8,
              minHeight: primary && t.icon ? 64 : 48,
              padding: '0 16px',
              border: 'none',
              background: 'transparent',
              color: active ? (primary ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface)') : 'var(--md-sys-color-on-surface-variant)',
              font: "500 14px/20px var(--md-ref-typeface-plain)",
              letterSpacing: '.1px',
              cursor: 'pointer',
            }}
          >
            {t.icon && <Icon name={t.icon} size={24} fill={active} />}
            <span>{t.label}</span>
            <span style={{
              position: 'absolute', bottom: 0, height: 3, borderRadius: '3px 3px 0 0',
              background: active ? 'var(--md-sys-color-primary)' : 'transparent',
              left: primary ? '50%' : 0, right: primary ? 'auto' : 0,
              width: primary ? 'min(64px, 60%)' : 'auto',
              transform: primary ? 'translateX(-50%)' : 'none',
              transition: 'background 120ms',
            }} />
          </button>
        );
      })}
    </div>
  );
}
