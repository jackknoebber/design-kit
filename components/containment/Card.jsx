import React from 'react';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

/**
 * Material 3 card surface. Elevated / filled / outlined. `interactive` adds a
 * state layer + pointer.
 *
 * Styling lives in components.css (.dk-card and modifiers) so themes can
 * restyle it; `padding` stays a prop (layout API, not theme identity).
 */
export function Card({
  variant = 'elevated',
  interactive = false,
  children,
  onClick,
  padding = 16,
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const cls = [
    interactive && 'md-sl',
    'dk-card',
    `dk-card--${variant}`,
    interactive && 'dk-card--interactive',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} onClick={onClick} style={{ padding, ...style }} {...rest}>
      {children}
    </div>
  );
}
