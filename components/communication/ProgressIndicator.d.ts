import React from 'react';

export interface ProgressIndicatorProps {
  variant?: 'linear' | 'circular';
  /** 0–100 for determinate; omit for indeterminate. */
  value?: number;
  /** Circular diameter. */
  size?: number;
  thickness?: number;
  style?: React.CSSProperties;
}

/** Material 3 progress indicator. */
export function ProgressIndicator(props: ProgressIndicatorProps): JSX.Element;
