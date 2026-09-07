import React, { useRef } from 'react';
import { IconButton } from '../actions/IconButton.jsx';
import { useStyleOnce } from '../core/stateLayer.js';
import { compactCount } from './format.js';

const STRIP_CSS = `
.dk-strip { display: flex; flex-direction: column; gap: 8px; min-width: 0; font-family: var(--md-ref-typeface-plain); color: var(--md-sys-color-on-surface); }
.dk-strip__head { display: flex; align-items: baseline; gap: 10px; padding: 0 2px; }
.dk-strip__title { font: 500 14px/1.3 var(--md-ref-typeface-plain); cursor: pointer; }
.dk-strip__title:hover { text-decoration: underline; }
.dk-strip__count { font: 400 12px/1 var(--md-ref-typeface-mono); color: var(--md-sys-color-on-surface-variant); font-variant-numeric: tabular-nums; }
.dk-strip__more { margin-left: 4px; border: 0; background: transparent; color: var(--md-sys-color-primary); font: 500 12px/1 var(--md-ref-typeface-plain); cursor: pointer; padding: 4px 6px; border-radius: var(--md-sys-shape-corner-small); }
.dk-strip__more:hover { background: color-mix(in srgb, var(--md-sys-color-primary) 12%, transparent); }
.dk-strip__nav { margin-left: auto; display: inline-flex; gap: 2px; }
.dk-strip__row { display: grid; grid-auto-flow: column; grid-auto-columns: var(--dk-strip-w, 200px); gap: 6px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; padding-bottom: 2px; }
.dk-strip__row::-webkit-scrollbar { display: none; }
.dk-strip__row > * { scroll-snap-align: start; }
`;

/**
 * One horizontal row of tiles for a tag, source or color. `tileWidth` sets the
 * column; the row scrolls sideways with snap and arrow buttons.
 */
export function Strip({ title, count, onTitle, onMore, moreLabel = 'See all', tileWidth = 200, children, style = {}, ...rest }) {
  useStyleOnce('dk-strip', STRIP_CSS);
  const row = useRef(null);
  // Page by whole tiles with an instant scroll: smooth scrolling fights
  // scroll-snap on iOS and can land back where it started.
  const by = (dir) => {
    const el = row.current; if (!el) return;
    const step = Math.max(1, Math.floor(el.clientWidth / (tileWidth + 6))) * (tileWidth + 6);
    el.scrollTo({ left: Math.max(0, el.scrollLeft + dir * step), behavior: 'auto' });
  };
  return (
    <section className="dk-strip" style={style} {...rest}>
      <div className="dk-strip__head">
        <span className="dk-strip__title" role={onTitle ? 'button' : undefined} tabIndex={onTitle ? 0 : undefined} onClick={onTitle} onKeyDown={(e) => { if (onTitle && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onTitle(e); } }}>{title}</span>
        {count != null && <span className="dk-strip__count">{typeof count === 'number' ? compactCount(count) : count}</span>}
        {onMore && <button type="button" className="dk-strip__more" onClick={onMore}>{moreLabel}</button>}
        <span className="dk-strip__nav">
          <IconButton icon="chevron_left" size="xs" ariaLabel="Scroll left" onClick={() => by(-1)} />
          <IconButton icon="chevron_right" size="xs" ariaLabel="Scroll right" onClick={() => by(1)} />
        </span>
      </div>
      <div ref={row} className="dk-strip__row" style={{ '--dk-strip-w': `${tileWidth}px` }}>{children}</div>
    </section>
  );
}
