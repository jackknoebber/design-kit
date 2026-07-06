import React from 'react';

export interface AppBarAction { icon: string; onClick?: (e: React.MouseEvent) => void; ariaLabel?: string; }
export interface TopAppBarProps {
  title?: React.ReactNode;
  variant?: 'small' | 'center' | 'medium' | 'large';
  leadingIcon?: string;
  onLeading?: (e: React.MouseEvent) => void;
  actions?: AppBarAction[];
  /** Tints the bar to surface-container when content scrolls under it. */
  scrolled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Material 3 top app bar.
 * @startingPoint section="Navigation" subtitle="Top app bar — small/center/medium/large" viewport="700x112"
 */
export function TopAppBar(props: TopAppBarProps): JSX.Element;
