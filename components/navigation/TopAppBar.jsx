import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../actions/IconButton.jsx';

/**
 * Material 3 top app bar. center-aligned / small / medium / large. Leading nav
 * icon, title, trailing action icons [{icon, onClick, ariaLabel}].
 */
export function TopAppBar({
  title = 'Title',
  variant = 'small',
  leadingIcon = 'menu',
  onLeading,
  actions = [],
  scrolled = false,
  style = {},
  ...rest
}) {
  const tall = variant === 'medium' || variant === 'large';
  const titleSize = variant === 'large' ? 28 : variant === 'medium' ? 24 : 22;
  const center = variant === 'center';

  return (
    <header
      style={{
        background: scrolled ? 'var(--md-sys-color-surface-container)' : 'var(--md-sys-color-surface)',
        color: 'var(--md-sys-color-on-surface)',
        transition: 'background 160ms',
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 64, padding: '0 4px' }}>
        {leadingIcon && <IconButton icon={leadingIcon} variant="standard" onClick={onLeading} ariaLabel="navigation" />}
        {!tall && (
          <h1 style={{
            flex: 1, margin: 0, padding: center ? 0 : '0 12px',
            font: `400 ${titleSize}px/28px var(--md-ref-typeface-plain)`,
            textAlign: center ? 'center' : 'left',
            color: 'var(--md-sys-color-on-surface)',
          }}>{title}</h1>
        )}
        {tall && <div style={{ flex: 1 }} />}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {actions.map((a, i) => (
            <IconButton key={i} icon={a.icon} variant="standard" onClick={a.onClick} ariaLabel={a.ariaLabel || a.icon} />
          ))}
        </div>
      </div>
      {tall && (
        <h1 style={{
          margin: 0, padding: '0 16px 24px',
          font: `400 ${titleSize}px/36px var(--md-ref-typeface-plain)`,
          color: 'var(--md-sys-color-on-surface)',
        }}>{title}</h1>
      )}
    </header>
  );
}
