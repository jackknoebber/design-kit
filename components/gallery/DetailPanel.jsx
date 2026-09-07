import React, { useEffect } from 'react';
import { IconButton } from '../actions/IconButton.jsx';
import { useStyleOnce } from '../core/stateLayer.js';

const DP_CSS = `
.dk-dp { display: flex; flex-direction: column; min-height: 0; background: var(--md-sys-color-surface-container); color: var(--md-sys-color-on-surface); font-family: var(--md-ref-typeface-plain); }
.dk-dp--side { height: 100%; border-left: var(--dk-border-width) solid var(--md-sys-color-outline-variant); }
.dk-dp__scrim { position: fixed; inset: 0; z-index: 59; background: color-mix(in srgb, var(--md-sys-color-scrim) 70%, transparent); }
.dk-dp--full { position: fixed; inset: 20px; z-index: 60; border-radius: var(--md-sys-shape-corner-large); box-shadow: var(--md-sys-elevation-level5); border: var(--dk-border-width) solid var(--md-sys-color-outline-variant); overflow: hidden; }
@media (max-width: 1000px) { .dk-dp--full { inset: 0; border-radius: 0; border: 0; } }
.dk-dp__bar { display: flex; align-items: center; gap: 4px; padding: 8px 8px 8px 14px; border-bottom: var(--dk-border-width) solid var(--md-sys-color-outline-variant); flex: none; }
.dk-dp__title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 14px/1.3 var(--md-ref-typeface-plain); }
.dk-dp__media { flex: none; background: var(--md-sys-color-surface-container-lowest); display: flex; align-items: center; justify-content: center; min-height: 0; }
.dk-dp__media > * { max-width: 100%; max-height: 100%; }
.dk-dp__body { overflow-y: auto; min-height: 0; padding: 12px 14px 20px; display: flex; flex-direction: column; gap: 16px; }
.dk-dp__section { display: flex; flex-direction: column; gap: 6px; }
.dk-dp__label { font: 500 11px/1.4 var(--md-ref-typeface-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--md-sys-color-on-surface-variant); }
/* Full: media left, details right, related across the bottom. */
.dk-dp__main { display: grid; grid-template-columns: minmax(0, 3fr) minmax(300px, 2fr); min-height: 0; flex: 1 1 auto; }
.dk-dp--full .dk-dp__media { height: 100%; }
.dk-dp--full .dk-dp__media > * { width: 100%; height: 100%; }
.dk-dp--full .dk-dp__body { border-left: var(--dk-border-width) solid var(--md-sys-color-outline-variant); }
.dk-dp__related { flex: none; max-height: 38vh; overflow-y: auto; border-top: var(--dk-border-width) solid var(--md-sys-color-outline-variant); padding: 12px 14px 16px; display: flex; flex-direction: column; gap: 16px; background: var(--md-sys-color-surface-container-low); }
.dk-dp--side .dk-dp__related { max-height: none; overflow: visible; border-top: 0; padding: 0; background: transparent; }
@media (max-width: 1000px) { .dk-dp__main { grid-template-columns: 1fr; grid-template-rows: auto minmax(0, 1fr); } .dk-dp--full .dk-dp__media { height: auto; max-height: 40vh; } .dk-dp--full .dk-dp__body { border-left: 0; } }
`;

/** A titled block inside the panel body. */
export function DetailSection({ label, children, style }) {
  return (
    <section className="dk-dp__section" style={style}>
      {label && <div className="dk-dp__label">{label}</div>}
      {children}
    </section>
  );
}

/**
 * The clip's detail. `mode="full"` is a modal over the page: media left,
 * details right, `related` across the bottom. `mode="side"` is a column
 * with media on top, details, then `related`. Esc closes; arrow keys move
 * to the previous / next clip while open. The page underneath stays as is.
 */
export function DetailPanel({
  open = true,
  mode = 'full',
  title,
  media,
  related,
  onClose,
  onPrev,
  onNext,
  onToggleMode,
  actions,
  children,
  width = 440,
  style = {},
  ...rest
}) {
  useStyleOnce('dk-dp', DP_CSS);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === 'Escape' && onClose) { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowLeft' && onPrev) { e.preventDefault(); onPrev(); }
      else if (e.key === 'ArrowRight' && onNext) { e.preventDefault(); onNext(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, onPrev, onNext]);
  if (!open) return null;

  const bar = (
    <div className="dk-dp__bar">
      <div className="dk-dp__title">{title}</div>
      {onPrev && <IconButton icon="chevron_left" size="xs" ariaLabel="Previous" onClick={onPrev} />}
      {onNext && <IconButton icon="chevron_right" size="xs" ariaLabel="Next" onClick={onNext} />}
      {onToggleMode && <IconButton icon={mode === 'side' ? 'open_in_full' : 'dock_to_right'} size="xs" ariaLabel={mode === 'side' ? 'Open as overlay' : 'Open as drawer'} onClick={onToggleMode} />}
      {actions}
      {onClose && <IconButton icon="close" size="xs" ariaLabel="Close" onClick={onClose} />}
    </div>
  );

  if (mode === 'full') {
    return (
      <>
        <div className="dk-dp__scrim" onClick={onClose} />
        <aside className="dk-dp dk-dp--full" style={style} aria-label={title || 'Detail'} role="dialog" aria-modal="true" {...rest}>
          {bar}
          <div className="dk-dp__main">
            <div className="dk-dp__media">{media}</div>
            <div className="dk-dp__body">{children}</div>
          </div>
          {related && <div className="dk-dp__related">{related}</div>}
        </aside>
      </>
    );
  }
  return (
    <aside className="dk-dp dk-dp--side" style={{ width, ...style }} aria-label={title || 'Detail'} {...rest}>
      {bar}
      {media && <div className="dk-dp__media">{media}</div>}
      <div className="dk-dp__body">{children}{related && <div className="dk-dp__related">{related}</div>}</div>
    </aside>
  );
}
