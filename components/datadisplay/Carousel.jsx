import React from 'react';

/**
 * Material 3 carousel (hero / multi-browse). Horizontally scrolling items with
 * large leading items and rounded corners. `items` = [{src, label}].
 */
export function Carousel({ items = [], height = 232, style = {}, ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        padding: 2,
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            flex: i === 0 ? '0 0 56%' : '0 0 30%',
            minWidth: i === 0 ? 0 : 56,
            height,
            scrollSnapAlign: 'start',
            borderRadius: i === 0 ? 28 : 16,
            overflow: 'hidden',
            background: 'var(--md-sys-color-surface-container-high)',
          }}
        >
          {it.src && <img src={it.src} alt={it.label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          {it.label && (
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, padding: '16px 12px 12px',
              background: 'linear-gradient(transparent, rgba(0,0,0,.55))',
              color: '#fff', font: "500 16px/24px var(--md-ref-typeface-plain)",
            }}>{it.label}</div>
          )}
        </div>
      ))}
    </div>
  );
}
