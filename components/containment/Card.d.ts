import React from 'react';

export interface CardProps {
  variant?: 'elevated' | 'filled' | 'outlined';
  interactive?: boolean;
  padding?: number | string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

/**
 * Material 3 card.
 * @startingPoint section="Containment" subtitle="Elevated / filled / outlined cards" viewport="700x240"
 */
export function Card(props: CardProps): JSX.Element;
