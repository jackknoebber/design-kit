import React from 'react';

export interface TooltipProps {
  /** Plain tooltip text. */
  label?: React.ReactNode;
  /** Use the rich tooltip layout. */
  rich?: boolean;
  subhead?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Material 3 tooltip (plain or rich). */
export function Tooltip(props: TooltipProps): JSX.Element;
