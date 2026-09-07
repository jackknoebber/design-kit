import React, { useEffect, useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce } from '../core/stateLayer.js';

const DC_CSS = `
.dk-density { display: inline-flex; align-items: center; gap: 8px; color: var(--md-sys-color-on-surface-variant); font-family: var(--md-ref-typeface-plain); }
.dk-density input[type=range] { -webkit-appearance: none; appearance: none; width: 110px; height: 20px; background: transparent; margin: 0; cursor: pointer; }
.dk-density input[type=range]::-webkit-slider-runnable-track { height: 2px; background: var(--md-sys-color-outline-variant); border-radius: 1px; }
.dk-density input[type=range]::-moz-range-track { height: 2px; background: var(--md-sys-color-outline-variant); border-radius: 1px; }
.dk-density input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; margin-top: -6px; border-radius: 50%; background: var(--md-sys-color-primary); border: 0; }
.dk-density input[type=range]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: var(--md-sys-color-primary); border: 0; }
.dk-density input[type=range]:focus-visible { outline: 2px solid var(--md-sys-color-primary); outline-offset: 2px; border-radius: 2px; }
.dk-density__n { font: 500 12px/1 var(--md-ref-typeface-mono); min-width: 1.5em; text-align: right; color: var(--md-sys-color-on-surface); font-variant-numeric: tabular-nums; }
`;

/**
 * Columns slider: how many tiles across. `onChange` fires on every tick;
 * `onCommit` fires once when the drag ends (use it when re-laying out the
 * wall is expensive). The number shows the live value either way.
 */
export function DensityControl({ value = 5, min = 2, max = 10, onChange, onCommit, label = 'Columns', style = {}, ...rest }) {
  useStyleOnce('dk-density', DC_CSS);
  const [live, setLive] = useState(value);
  useEffect(() => { setLive(value); }, [value]);
  const commit = () => { if (onCommit && live !== value) onCommit(live); };
  return (
    <label className="dk-density" title={label} style={style} {...rest}>
      <Icon name="grid_view" size={18} />
      <input type="range" min={min} max={max} step={1} value={live} aria-label={label}
        onChange={(e) => { const n = Number(e.target.value); setLive(n); onChange && onChange(n); }}
        onPointerUp={commit} onKeyUp={commit} onBlur={commit} onTouchEnd={commit} />
      <span className="dk-density__n">{live}</span>
    </label>
  );
}
