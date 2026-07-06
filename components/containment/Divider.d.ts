import React from 'react';

export interface DividerProps {
  inset?: boolean;
  vertical?: boolean;
  style?: React.CSSProperties;
}

/** Material 3 divider. */
export function Divider(props: DividerProps): JSX.Element;
