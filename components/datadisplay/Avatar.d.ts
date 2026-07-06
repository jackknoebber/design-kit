import React from 'react';

export interface AvatarProps {
  /** Image URL; takes priority over initials/icon. */
  src?: string;
  /** Monogram initials, e.g. "AB". */
  initials?: string;
  /** Fallback Material Symbols glyph. */
  icon?: string;
  size?: number;
  shape?: 'round' | 'square';
  color?: 'primary' | 'secondary' | 'tertiary';
  style?: React.CSSProperties;
}

/** Material 3 avatar (image / monogram / icon). */
export function Avatar(props: AvatarProps): JSX.Element;
