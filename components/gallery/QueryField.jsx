import React, { useRef } from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce } from '../core/stateLayer.js';

const QF_CSS = `
.dk-qf { display: flex; align-items: center; flex-wrap: nowrap; gap: 6px; height: 44px; padding: 0 8px 0 12px; overflow: hidden; border-radius: var(--md-sys-shape-corner-medium); background: var(--md-sys-color-surface-container-high); border: var(--dk-border-width) solid transparent; color: var(--md-sys-color-on-surface); font-family: var(--md-ref-typeface-plain); cursor: text; }
.dk-qf:focus-within { border-color: var(--md-sys-color-primary); }
.dk-qf__chips { display: flex; align-items: center; gap: 6px; flex: 0 1 auto; min-width: 0; overflow-x: auto; scrollbar-width: none; }
.dk-qf__chips::-webkit-scrollbar { display: none; }
.dk-qf__chip { flex: none; }
.dk-qf__input { flex: 1 1 120px; min-width: 60px; border: 0; outline: 0; background: transparent; color: inherit; font: 400 14px/1.2 var(--md-ref-typeface-plain); padding: 4px 0; }
.dk-qf__input::placeholder { color: var(--md-sys-color-on-surface-variant); }
.dk-qf__chip { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 6px 0 10px; border-radius: var(--md-sys-shape-corner-small); background: var(--md-sys-color-secondary-container); color: var(--md-sys-color-on-secondary-container); font: 500 13px/1 var(--md-ref-typeface-plain); }
.dk-qf__chip--color { font-family: var(--md-ref-typeface-mono); font-weight: 400; }
.dk-qf__chip--like { background: var(--md-sys-color-tertiary-container); color: var(--md-sys-color-on-tertiary-container); }
.dk-qf__chip--source { background: var(--md-sys-color-surface-container-highest); color: var(--md-sys-color-on-surface); }
.dk-qf__dot { width: 12px; height: 12px; border-radius: 2px; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15); }
.dk-qf__x { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border: 0; background: transparent; color: inherit; border-radius: var(--md-sys-shape-corner-full); cursor: pointer; padding: 0; }
.dk-qf__x:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.dk-qf__trailing { display: inline-flex; align-items: center; gap: 2px; margin-left: auto; flex: none; }
`;

/**
 * One field for the whole query: free text plus chips for tags, colors,
 * sources and "like this clip". Backspace on an empty input removes the last
 * chip; Enter submits. Put pickers (color, scope) in `trailing`.
 */
export function QueryField({
  value = '',
  onChange,
  chips = [],
  onRemoveChip,
  onSubmit,
  placeholder = 'Search words, tags, a color, or a clip…',
  leading = 'search',
  trailing,
  autoFocus = false,
  style = {},
  ...rest
}) {
  useStyleOnce('dk-qf', QF_CSS);
  const inputRef = useRef(null);
  return (
    <div className="dk-qf" style={style} onClick={() => inputRef.current && inputRef.current.focus()} {...rest}>
      {leading && <Icon name={leading} size={20} color="var(--md-sys-color-on-surface-variant)" />}
      <span className="dk-qf__chips">{chips.map((c) => (
        <span key={c.id} className={`dk-qf__chip dk-qf__chip--${c.kind || 'tag'}`} title={c.title || c.label}>
          {c.kind === 'color' && <span className="dk-qf__dot" style={{ background: c.color || c.label }} />}
          {c.kind === 'like' && <Icon name="auto_awesome" size={14} />}
          <span>{c.label}</span>
          {onRemoveChip && (
            <button type="button" className="dk-qf__x" aria-label={`Remove ${c.label}`} onClick={(e) => { e.stopPropagation(); onRemoveChip(c); }}>
              <Icon name="close" size={14} />
            </button>
          )}
        </span>
      ))}</span>
      <input
        ref={inputRef}
        className="dk-qf__input"
        value={value}
        placeholder={chips.length ? '' : placeholder}
        autoFocus={autoFocus}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); onSubmit && onSubmit(value); }
          else if (e.key === 'Backspace' && !value && chips.length && onRemoveChip) { e.preventDefault(); onRemoveChip(chips[chips.length - 1]); }
        }}
      />
      {(value || chips.length > 0) && onChange && (
        <button type="button" className="dk-qf__x" aria-label="Clear" onClick={(e) => { e.stopPropagation(); onChange(''); chips.forEach((c) => onRemoveChip && onRemoveChip(c)); }} style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          <Icon name="close" size={16} />
        </button>
      )}
      {trailing && <span className="dk-qf__trailing" onClick={(e) => e.stopPropagation()}>{trailing}</span>}
    </div>
  );
}
