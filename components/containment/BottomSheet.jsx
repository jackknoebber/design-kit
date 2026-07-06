import React from 'react';

/**
 * Material 3 bottom sheet. Slides up from the bottom with a drag handle.
 * `modal` adds a scrim. Render content as children.
 */
export function BottomSheet({ open = true, onClose, modal = true, children, style = {}, ...rest }) {
  if (!open) return null;
  const sheet = (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: '100%',
        maxWidth: 640,
        margin: '0 auto',
        maxHeight: '80vh',
        overflow: 'auto',
        background: 'var(--md-sys-color-surface-container-low)',
        color: 'var(--md-sys-color-on-surface)',
        borderRadius: 'var(--md-sys-shape-corner-extra-large) var(--md-sys-shape-corner-extra-large) 0 0',
        boxShadow: 'var(--md-sys-elevation-level1)',
        padding: '0 16px 24px',
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 8px' }}>
        <span style={{ width: 32, height: 4, borderRadius: 'var(--md-sys-shape-corner-full)', background: 'var(--md-sys-color-on-surface-variant)', opacity: 0.4 }} />
      </div>
      {children}
    </div>
  );

  if (!modal) return sheet;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'color-mix(in srgb, var(--md-sys-color-scrim) 32%, transparent)', zIndex: 1000, display: 'flex', alignItems: 'flex-end' }}>
      {sheet}
    </div>
  );
}
