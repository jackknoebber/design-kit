import React from 'react';
import { useStyleOnce } from '../core/stateLayer.js';

const SW_CSS = `
.dk-swatches { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.dk-swatch { display: inline-flex; align-items: center; gap: 6px; border: 0; padding: 0; background: transparent; cursor: pointer; border-radius: var(--md-sys-shape-corner-extra-small); }
.dk-swatch__chip { display: block; height: 22px; border-radius: var(--md-sys-shape-corner-extra-small); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--md-sys-color-on-surface) 14%, transparent); }
.dk-swatch--on .dk-swatch__chip { box-shadow: inset 0 0 0 2px var(--md-sys-color-primary); }
.dk-swatch:focus-visible { outline: 2px solid var(--md-sys-color-primary); outline-offset: 2px; }
.dk-swatch__hex { font: 400 11px/1 var(--md-ref-typeface-mono); color: var(--md-sys-color-on-surface-variant); }
`;

/**
 * A clip's prominent colors. Width follows `weight` (coverage) when `weighted`;
 * the hex shows beside each chip when `labels`. Click to pick.
 */
export function SwatchRow({ colors = [], weighted = true, labels = false, min = 22, max = 72, selected, onPick, style = {}, ...rest }) {
  useStyleOnce('dk-swatches', SW_CSS);
  const top = Math.max(...colors.map((c) => c.weight || 0), 0.0001);
  return (
    <div className="dk-swatches" style={style} {...rest}>
      {colors.map((c) => {
        const w = weighted && c.weight != null ? Math.round(min + (max - min) * (c.weight / top)) : min;
        const on = selected && selected.toLowerCase() === c.hex.toLowerCase();
        return (
          <button key={c.hex} type="button" className={`dk-swatch${on ? ' dk-swatch--on' : ''}`} title={`${c.name ? c.name + ' · ' : ''}${c.hex}${c.weight != null ? ` · ${Math.round(c.weight * 100)}%` : ''}`} aria-label={c.name || c.hex} onClick={() => onPick && onPick(c)}>
            <span className="dk-swatch__chip" style={{ width: w, background: c.hex }} />
            {labels && <span className="dk-swatch__hex">{c.hex}</span>}
          </button>
        );
      })}
    </div>
  );
}
