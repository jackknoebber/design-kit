import React, { useMemo, useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce } from '../core/stateLayer.js';

const RAIL_CSS = `
.dk-rail { display: flex; flex-direction: column; min-height: 0; background: var(--md-sys-color-surface-container-low); color: var(--md-sys-color-on-surface); font-family: var(--md-ref-typeface-plain); }
.dk-rail__search { flex: none; display: flex; align-items: center; gap: 8px; margin: 10px 10px 6px; padding: 0 10px; height: 40px; border-radius: var(--md-sys-shape-corner-small); background: var(--md-sys-color-surface-container-high); border: var(--dk-border-width) solid transparent; }
.dk-rail__search:focus-within { border-color: var(--md-sys-color-primary); }
.dk-rail__search input { flex: 1; min-width: 0; height: 100%; border: 0; outline: 0; background: transparent; color: inherit; font: 400 14px/1.4 var(--md-ref-typeface-plain); padding: 0; }
.dk-rail__search input::placeholder { color: var(--md-sys-color-on-surface-variant); }
.dk-rail__scroll { flex: 1 1 auto; overflow-y: auto; min-height: 0; padding-bottom: 12px; }
.dk-rail__group { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px; padding: 8px 14px; font: 600 13px/1.4 var(--md-ref-typeface-plain); color: var(--md-sys-color-on-surface); background: var(--md-sys-color-surface-container); border-top: var(--dk-border-width) solid var(--md-sys-color-outline-variant); cursor: pointer; user-select: none; }
.dk-rail__group .dk-rail__count { color: var(--md-sys-color-on-surface); font-weight: 500; }
.dk-rail__row { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; padding: 4px 14px 4px 22px; border: 0; background: transparent; color: var(--md-sys-color-on-surface-variant); font: 400 13px/1.4 var(--md-ref-typeface-plain); text-align: left; cursor: pointer; border-radius: 0; }
.dk-rail__row:hover { color: var(--md-sys-color-on-surface); }
.dk-rail__row:hover { background: var(--md-sys-color-surface-container); }
.dk-rail__row:focus-visible { outline: 2px solid var(--md-sys-color-primary); outline-offset: -2px; }
.dk-rail__row--on { background: var(--md-sys-color-secondary-container); color: var(--md-sys-color-on-secondary-container); }
.dk-rail__row--on:hover { background: var(--md-sys-color-secondary-container); }
.dk-rail__label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dk-rail__count { flex: none; font: 400 11px/1 var(--md-ref-typeface-mono); color: var(--md-sys-color-on-surface-variant); font-variant-numeric: tabular-nums; }
.dk-rail__row--on .dk-rail__count { color: inherit; }
.dk-rail__empty { padding: 8px 22px; font: 400 12px/1.4 var(--md-ref-typeface-plain); color: var(--md-sys-color-on-surface-variant); }
.dk-rail__more { padding: 4px 14px 6px 22px; border: 0; background: transparent; color: var(--md-sys-color-primary); font: 500 12px/1.4 var(--md-ref-typeface-plain); cursor: pointer; text-align: left; }
`;

const fmt = (n) => (typeof n === 'number' ? n.toLocaleString() : n);

/**
 * The facet rail: groups of facets with counts, type-to-narrow across every
 * group, click to toggle. `groups` = [{ id, label, facets: [{ id, label,
 * count, selected }] }]. Only `limit` rows show per group until "more".
 */
export function FacetRail({
  groups = [],
  query = '',
  onQuery,
  onToggle,
  limit = 12,
  placeholder = 'Narrow tags, sources, colors…',
  header,
  footer,
  style = {},
  ...rest
}) {
  useStyleOnce('dk-rail', RAIL_CSS);
  const [expanded, setExpanded] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const q = query.trim().toLowerCase();

  const shown = useMemo(() => groups.map((g) => {
    const facets = q ? g.facets.filter((f) => String(f.label).toLowerCase().includes(q)) : g.facets;
    // Selected facets always stay visible, ahead of the rest.
    const sel = facets.filter((f) => f.selected);
    const rest = facets.filter((f) => !f.selected);
    const cap = expanded[g.id] || q ? rest.length : Math.max(0, limit - sel.length);
    return { ...g, all: facets.length, rows: [...sel, ...rest.slice(0, cap)], hidden: rest.length - cap };
  }), [groups, q, expanded, limit]);

  return (
    <aside className="dk-rail" style={style} {...rest}>
      {header}
      <label className="dk-rail__search">
        <Icon name="search" size={18} color="var(--md-sys-color-on-surface-variant)" />
        <input value={query} placeholder={placeholder} onChange={(e) => onQuery && onQuery(e.target.value)} />
        {query && (
          <span role="button" tabIndex={0} aria-label="Clear" onClick={() => onQuery && onQuery('')} onKeyDown={(e) => { if (e.key === 'Enter') onQuery && onQuery(''); }} style={{ display: 'inline-flex', cursor: 'pointer' }}>
            <Icon name="close" size={16} color="var(--md-sys-color-on-surface-variant)" />
          </span>
        )}
      </label>
      <div className="dk-rail__scroll">
        {shown.map((g) => (
          <div key={g.id}>
            <div className="dk-rail__group" onClick={() => setCollapsed((c) => ({ ...c, [g.id]: !c[g.id] }))}>
              <span>{g.label}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span className="dk-rail__count">{fmt(g.all)}</span>
                <Icon name={collapsed[g.id] ? 'chevron_right' : 'expand_more'} size={16} />
              </span>
            </div>
            {!collapsed[g.id] && (
              g.rows.length === 0 ? <div className="dk-rail__empty">Nothing matches.</div> : (
                <>
                  {g.rows.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      className={`dk-rail__row${f.selected ? ' dk-rail__row--on' : ''}`}
                      aria-pressed={!!f.selected}
                      onClick={(e) => onToggle && onToggle(f, g, e)}
                    >
                      <span className="dk-rail__label">{f.swatch && <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: f.swatch, marginRight: 8, verticalAlign: '-1px' }} />}{f.label}</span>
                      {f.count != null && <span className="dk-rail__count">{fmt(f.count)}</span>}
                    </button>
                  ))}
                  {g.hidden > 0 && (
                    <button type="button" className="dk-rail__more" onClick={() => setExpanded((x) => ({ ...x, [g.id]: true }))}>{fmt(g.hidden)} more</button>
                  )}
                </>
              )
            )}
          </div>
        ))}
      </div>
      {footer}
    </aside>
  );
}
