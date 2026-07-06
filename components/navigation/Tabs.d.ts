import React from 'react';

export interface TabDef { label?: React.ReactNode; icon?: string; }
export interface TabsProps {
  tabs?: TabDef[];
  value?: number;
  variant?: 'primary' | 'secondary';
  onChange?: (index: number, e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Material 3 tabs. */
export function Tabs(props: TabsProps): JSX.Element;
