import React from 'react';

/**
 * Material 3 badge. Small dot, or a count/label "large" badge. Wrap an icon to
 * anchor the badge to its corner.
 */
export function Badge({ count, max = 99, dot = false, children, style = {}, ...rest }) {
  const text = count != null ? (count > max ? `${max}+` : String(count)) : '';
  const badge = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: dot ? 6 : 16,
        height: dot ? 6 : 16,
        padding: dot ? 0 : '0 4px',
        borderRadius: 'var(--md-sys-shape-corner-full)',
        background: 'var(--md-sys-color-error)',
        color: 'var(--md-sys-color-on-error)',
        font: "500 11px/16px var(--md-ref-typeface-plain)",
        boxSizing: 'border-box',
        ...(children ? {} : style),
      }}
    >
      {!dot && text}
    </span>
  );

  if (!children) return badge;
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }} {...rest}>
      {children}
      <span style={{ position: 'absolute', top: dot ? 0 : -4, left: dot ? '60%' : '55%' }}>{badge}</span>
    </span>
  );
}
