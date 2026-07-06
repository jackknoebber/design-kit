import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useStyleOnce, STATE_LAYER_BASE } from '../core/stateLayer.js';

// Icon glyph size per button size (content, not theme-structural).
const ICON_SIZES = { xs: 20, s: 20, m: 24, l: 32, xl: 40 };

/**
 * Material 3 common button (M3 expressive sizing). Five sizes (xs–xl), five
 * variants, and a round/square shape toggle.
 *
 * Styling lives in components.css (.dk-button and modifiers) so themes can
 * restyle it — this file carries structure + state only.
 */
export function Button({
  children,
  variant = 'filled',
  size = 's',
  shape = 'round',
  icon,
  trailingIcon,
  disabled = false,
  onClick,
  type = 'button',
  style = {},
  ...rest
}) {
  useStyleOnce('md-state-layer-base', STATE_LAYER_BASE);
  const iconSize = ICON_SIZES[size] || ICON_SIZES.s;
  const cls = [
    'md-sl',
    'dk-button',
    `dk-button--${variant}`,
    `dk-button--${size}`,
    shape === 'square' ? 'dk-button--square' : 'dk-button--round',
  ].join(' ');

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} style={style} {...rest}>
      {icon && <Icon name={icon} size={iconSize} />}
      {children != null && <span>{children}</span>}
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} />}
    </button>
  );
}
