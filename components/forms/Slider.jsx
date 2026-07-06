import React from 'react';

/**
 * Material 3 slider (continuous). Controlled via `value` (0–max).
 */
export function Slider({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  showValue = false,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const val = value != null ? value : internal;
  const pct = ((val - min) / (max - min)) * 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 200, opacity: disabled ? 0.38 : 1, ...style }} {...rest}>
      <div style={{ position: 'relative', flex: 1, height: 44, display: 'flex', alignItems: 'center' }}>
        {/* active track */}
        <div style={{ position: 'absolute', left: 0, width: `calc(${pct}% - 6px)`, height: 16, borderRadius: 'var(--md-sys-shape-corner-full)', background: 'var(--md-sys-color-primary)' }} />
        {/* inactive track */}
        <div style={{ position: 'absolute', right: 0, width: `calc(${100 - pct}% - 6px)`, height: 16, borderRadius: 'var(--md-sys-shape-corner-full)', background: 'var(--md-sys-color-secondary-container)' }} />
        {/* handle */}
        <div style={{
          position: 'absolute',
          left: `calc(${pct}% - 2px)`,
          width: 4,
          height: 44,
          borderRadius: 'var(--md-sys-shape-corner-full)',
          background: 'var(--md-sys-color-primary)',
          boxShadow: '0 0 0 0 transparent',
          transition: 'left 60ms linear',
        }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={val}
          disabled={disabled}
          onChange={(e) => { const v = Number(e.target.value); setInternal(v); onChange && onChange(v, e); }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', margin: 0, opacity: 0, cursor: disabled ? 'default' : 'pointer' }}
        />
      </div>
      {showValue && (
        <span style={{ font: "500 14px/20px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface)', minWidth: 28, textAlign: 'right' }}>{Math.round(val)}</span>
      )}
    </div>
  );
}
