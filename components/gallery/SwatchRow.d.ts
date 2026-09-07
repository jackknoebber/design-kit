import React from 'react';

export interface Swatch { hex: string; /** 0..1 share of the clip. */ weight?: number; name?: string; }
export interface SwatchRowProps {
  colors?: Swatch[];
  /** Chip width follows weight. */
  weighted?: boolean;
  /** Show the hex beside each chip. */
  labels?: boolean;
  min?: number;
  max?: number;
  /** Hex of the selected swatch. */
  selected?: string;
  onPick?: (swatch: Swatch) => void;
  style?: React.CSSProperties;
}

/** Prominent colors of a clip, sized by coverage, click to pick. */
export function SwatchRow(props: SwatchRowProps): JSX.Element;
