import React from 'react';

export interface ChipProps {
  label?: string;
  variant?: 'assist' | 'filter' | 'input' | 'suggestion';
  /** Selected state (filter / input chips). */
  selected?: boolean;
  elevated?: boolean;
  icon?: string;
  avatar?: React.ReactNode;
  disabled?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/**
 * Material 3 chip.
 * @startingPoint section="Selection" subtitle="Assist / filter / input / suggestion chips" viewport="700x120"
 */
export function Chip(props: ChipProps): JSX.Element;
