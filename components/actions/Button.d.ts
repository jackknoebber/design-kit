import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. */
  variant?: 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text';
  /** M3 expressive size: xs 32 / s 40 / m 56 / l 96 / xl 136 px tall. */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  /** Round = pill radius; square = rounded-rect radius. */
  shape?: 'round' | 'square';
  /** Leading Material Symbols icon name. */
  icon?: string;
  /** Trailing Material Symbols icon name. */
  trailingIcon?: string;
  disabled?: boolean;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

/**
 * Material 3 common button.
 * @startingPoint section="Actions" subtitle="M3 buttons — 5 variants, 5 sizes" viewport="700x200"
 */
export function Button(props: ButtonProps): JSX.Element;
