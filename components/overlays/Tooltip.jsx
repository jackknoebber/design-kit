import React from 'react';

/**
 * Material 3 tooltip. `rich=false` is the plain tooltip; `rich=true` renders a
 * rich tooltip with subhead/body/actions. Hover the child to reveal.
 */
export function Tooltip({ label, rich = false, subhead, children, body, actions, placement = 'top', style = {}, ...rest }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
  }[placement];

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      {...rest}
    >
      {children}
      {show && (rich ? (
        <span style={{
          position: 'absolute', ...pos, zIndex: 1000, width: 280, textAlign: 'left',
          background: 'var(--md-sys-color-surface-container)',
          color: 'var(--md-sys-color-on-surface-variant)',
          border: '1px solid var(--md-sys-color-outline-variant)',
          borderRadius: 'var(--md-sys-shape-corner-medium)',
          boxShadow: 'var(--md-sys-elevation-level2)', padding: 12,
        }}>
          {subhead && <span style={{ display: 'block', font: "500 14px/20px var(--md-ref-typeface-plain)", color: 'var(--md-sys-color-on-surface)', marginBottom: 4 }}>{subhead}</span>}
          <span style={{ display: 'block', font: "400 14px/20px var(--md-ref-typeface-plain)" }}>{body || label}</span>
          {actions && <span style={{ display: 'flex', gap: 8, marginTop: 12 }}>{actions}</span>}
        </span>
      ) : (
        <span style={{
          position: 'absolute', ...pos, zIndex: 1000, whiteSpace: 'nowrap',
          background: 'var(--md-sys-color-inverse-surface)',
          color: 'var(--md-sys-color-inverse-on-surface)',
          borderRadius: 'var(--md-sys-shape-corner-extra-small)',
          padding: '4px 8px', font: "500 11px/16px var(--md-ref-typeface-plain)",
        }}>
          {label}
        </span>
      ))}
    </span>
  );
}
