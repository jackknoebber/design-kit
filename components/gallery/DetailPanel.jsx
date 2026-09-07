import React, { useEffect } from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../actions/IconButton.jsx';
import { useStyleOnce } from '../core/stateLayer.js';

const DP_CSS = `
.dk-dp { display: flex; flex-direction: column; min-height: 0; background: var(--md-sys-color-surface-container); color: var(--md-sys-color-on-surface); font-family: var(--md-ref-typeface-plain); }
.dk-dp--side { height: 100%; border-left: var(--dk-border-width) solid var(--md-sys-color-outline-variant); }
.dk-dp--full { position: fixed; inset: 0; z-index: 60; background: var(--md-sys-color-surface); }
.dk-dp__scrim { position: fixed; inset: 0; z-index: 59; background: color-mix(in srgb, var(--md-sys-color-scrim) 60%, transparent); }
.dk-dp__bar { display: flex; align-items: center; gap: 4px; padding: 8px 8px 8px 14px; border-bottom: var(--dk-border-width) solid var(--md-sys-color-outline-variant); flex: none; }
.dk-dp__title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 14px/1.3 var(--md-ref-typeface-plain); }
.dk-dp__media { flex: none; background: var(--md-sys-color-surface-container-lowest); display: flex; align-items: center; justify-content: center; }
.dk-dp--full .dk-dp__media { flex: 1 1 auto; min-height: 0; }
.dk-dp__media > * { max-width: 100%; max-height: 100%; }
.dk-dp__body { overflow-y: auto; min-height: 0; padding: 12px 14px 20px; display: flex; flex-direction: column; gap: 16px; }
.dk-dp--full .dk-dp__body { flex: 0 0 auto; max-height: 40vh; }
.dk-dp__section { display: flex; flex-direction: column; gap: 6px; }
.dk-dp__label { font: 500 11px/1.4 var(--md-ref-typeface-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--md-sys-color-on-surface-variant); }
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
 * The clip's detail: side-panel or full-screen, one body. Esc closes, arrow
 * keys move to the previous / next clip while open.
 */
export function DetailPanel({
  open = true,
  mode = 'side',
  title,
  media,
  onClose,
  onPrev,
  onNext,
  onToggleMode,
  actions,
  children,
  width = 360,
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

  const panel = (
    <aside className={`dk-dp dk-dp--${mode}`} style={mode === 'side' ? { width, ...style } : style} aria-label={title || 'Detail'} {...rest}>
      <div className="dk-dp__bar">
        <div className="dk-dp__title">{title}</div>
        {onPrev && <IconButton icon="chevron_left" size="xs" ariaLabel="Previous" onClick={onPrev} />}
        {onNext && <IconButton icon="chevron_right" size="xs" ariaLabel="Next" onClick={onNext} />}
        {onToggleMode && <IconButton icon={mode === 'side' ? 'open_in_full' : 'close_fullscreen'} size="xs" ariaLabel={mode === 'side' ? 'Full screen' : 'Side panel'} onClick={onToggleMode} />}
        {actions}
        {onClose && <IconButton icon="close" size="xs" ariaLabel="Close" onClick={onClose} />}
      </div>
      {media && <div className="dk-dp__media">{media}</div>}
      <div className="dk-dp__body">{children}</div>
    </aside>
  );
  if (mode === 'full') return (<><div className="dk-dp__scrim" onClick={onClose} />{panel}</>);
  return panel;
}

export { Icon as _DetailIcon };
