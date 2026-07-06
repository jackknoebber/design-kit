import React from 'react';

export interface IconButtonProps {
  /** Material Symbols glyph name. */
  icon?: string;
  variant?: 'standard' | 'filled' | 'tonal' | 'outlined';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  shape?: 'round' | 'square';
  /** Selected (toggled) state. */
  selected?: boolean;
  disabled?: boolean;
  /** Force fill axis; defaults to following `selected`. */
  fill?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/** Material 3 icon button. */
export function IconButton(props: IconButtonProps): JSX.Element;
