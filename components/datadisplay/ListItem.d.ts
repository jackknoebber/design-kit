import React from 'react';

export interface ListItemProps {
  headline?: React.ReactNode;
  supportingText?: React.ReactNode;
  overline?: React.ReactNode;
  /** Material Symbols name or any node (avatar/image/icon). */
  leading?: React.ReactNode;
  /** Material Symbols name or any node (text/icon/control). */
  trailing?: React.ReactNode;
  /** Force line count 1–3. */
  lines?: 1 | 2 | 3;
  interactive?: boolean;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

/** Material 3 list item. */
export function ListItem(props: ListItemProps): JSX.Element;
