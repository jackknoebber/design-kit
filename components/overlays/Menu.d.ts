import React from 'react';

export interface MenuItem {
  label?: React.ReactNode;
  icon?: string;
  trailing?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface MenuProps {
  items?: MenuItem[];
  open?: boolean;
  minWidth?: number;
  style?: React.CSSProperties;
}

/** Material 3 menu surface. */
export function Menu(props: MenuProps): JSX.Element | null;
