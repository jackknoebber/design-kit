import React from 'react';

export interface FabProps {
  /** Material Symbols glyph name. */
  icon?: string;
  size?: 'small' | 'regular' | 'large';
  color?: 'primary' | 'secondary' | 'tertiary' | 'surface';
  /** Extended FAB shows the label beside the icon. */
  extended?: boolean;
  label?: string;
  /** Lowered elevation (level 1 instead of level 3). */
  lowered?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/**
 * Material 3 Floating Action Button.
 * @startingPoint section="Actions" subtitle="FAB & extended FAB" viewport="700x200"
 */
export function Fab(props: FabProps): JSX.Element;
