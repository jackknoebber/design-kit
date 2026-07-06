import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 basic dialog. Renders a scrim + centered surface when `open`.
 * Provide `actions` (e.g. buttons) for the action row.
 */
export function Dialog({
  open = true,
  onClose,
  icon,
  headline = 'Dialog title',
  children,
  actions,
  style = {},
  ...rest
}) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'color-mix(in srgb, var(--md-sys-color-scrim) 32%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(560px, 100%)',
          maxHeight: '90vh',
          overflow: 'auto',
          background: 'var(--md-sys-color-surface-container-high)',
          color: 'var(--md-sys-color-on-surface)',
          borderRadius: 'var(--md-sys-shape-corner-extra-large)',
          boxShadow: 'var(--md-sys-elevation-level3)',
          padding: 24,
          textAlign: icon ? 'center' : 'left',
          ...style,
        }}
        {...rest}
      >
        {icon && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Icon name={icon} size={24} color="var(--md-sys-color-secondary)" />
          </div>
        )}
        <h2 style={{ margin: '0 0 16px', font: "400 24px/32px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface)' }}>{headline}</h2>
        <div style={{ font: "400 14px/20px var(--md-ref-typeface-plain)", letterSpacing: '.25px', color: 'var(--md-sys-color-on-surface-variant)' }}>{children}</div>
        {actions && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>{actions}</div>
        )}
      </div>
    </div>
  );
}
