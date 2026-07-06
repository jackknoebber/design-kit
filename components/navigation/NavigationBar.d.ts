import React from 'react';

export interface NavItem {
  label?: React.ReactNode;
  icon?: string;
  /** true = dot badge; number/string = count badge. */
  badge?: boolean | number | string;
}
export interface NavigationBarProps {
  items?: NavItem[];
  value?: number;
  onChange?: (index: number, e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * Material 3 bottom navigation bar.
 * @startingPoint section="Navigation" subtitle="Bottom navigation bar" viewport="700x80"
 */
export function NavigationBar(props: NavigationBarProps): JSX.Element;
