import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 segmented button. 2–5 segments [{label, icon}]. Single or
 * multi-select. Selected segment fills with secondary-container + check.
 */
export function SegmentedButton({ segments = [], value = 0, multiple = false, onChange, style = {}, ...rest }) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const selected = multiple ? (Array.isArray(value) ? value : []) : [value];

  const toggle = (i, e) => {
    if (!onChange) return;
    if (multiple) {
      const set = new Set(selected);
      set.has(i) ? set.delete(i) : set.add(i);
      onChange([...set].sort(), e);
    } else {
      onChange(i, e);
    }
  };

  return (
    <div style={{ display: 'inline-flex', borderRadius: 'var(--md-sys-shape-corner-full)', overflow: 'hidden', border: 'var(--dk-border-width) solid var(--md-sys-color-outline)', ...style }} {...rest}>
      {segments.map((s, i) => {
        const active = selected.includes(i);
        return (
          <button
            key={i}
            type="button"
            className="md-sl"
            onClick={(e) => toggle(i, e)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              height: 40, padding: '0 16px', minWidth: 48,
              border: 'none', borderLeft: i === 0 ? 'none' : 'var(--dk-border-width) solid var(--md-sys-color-outline)',
              background: active ? 'var(--md-sys-color-secondary-container)' : 'transparent',
              color: active ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-on-surface)',
              font: "500 14px/20px var(--md-ref-typeface-plain)", letterSpacing: '.1px', cursor: 'pointer',
            }}
          >
            {active ? <Icon name="check" size={18} /> : s.icon ? <Icon name={s.icon} size={18} /> : null}
            {s.label && <span>{s.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
