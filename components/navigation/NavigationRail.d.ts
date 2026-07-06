import React from 'react';
import { NavItem } from './NavigationBar';

export interface NavigationRailProps {
  items?: NavItem[];
  value?: number;
  /** Optional top header (e.g. a menu IconButton or FAB). */
  header?: React.ReactNode;
  /** Optional bottom footer, pinned to the bottom of the rail. */
  footer?: React.ReactNode;
  alignment?: 'top' | 'center';
  onChange?: (index: number, e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Material 3 navigation rail. */
export function NavigationRail(props: NavigationRailProps): JSX.Element;
