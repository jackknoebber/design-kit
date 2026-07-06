import React from 'react';

export interface IconProps {
  /** Material Symbols glyph name, e.g. "settings", "favorite", "arrow_back". */
  name?: string;
  /** Pixel size of the glyph box. */
  size?: number;
  /** Filled vs outlined glyph (FILL axis). */
  fill?: boolean;
  /** Weight axis, 100–700. */
  weight?: number;
  /** Grade axis, -50–200. */
  grade?: number;
  /** Glyph family. */
  variant?: 'outlined' | 'rounded';
  /** CSS color (defaults to currentColor). */
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Material 3 icon backed by the Material Symbols variable font.
 */
export function Icon(props: IconProps): JSX.Element;
