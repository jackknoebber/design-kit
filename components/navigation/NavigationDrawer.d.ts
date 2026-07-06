import React from 'react';

export interface DrawerItem {
  label?: React.ReactNode;
  icon?: string;
  badge?: React.ReactNode;
  divider?: boolean;
}
export interface NavigationDrawerProps {
  items?: DrawerItem[];
  value?: number;
  headline?: React.ReactNode;
  modal?: boolean;
  open?: boolean;
  onClose?: () => void;
  onChange?: (index: number, e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Material 3 navigation drawer (standard or modal). */
export function NavigationDrawer(props: NavigationDrawerProps): JSX.Element | null;
