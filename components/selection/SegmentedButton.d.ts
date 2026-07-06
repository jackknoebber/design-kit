import React from 'react';

export interface Segment { label?: React.ReactNode; icon?: string; }
export interface SegmentedButtonProps {
  segments?: Segment[];
  /** Selected index, or array of indices when `multiple`. */
  value?: number | number[];
  multiple?: boolean;
  onChange?: (value: number | number[], e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Material 3 segmented button. */
export function SegmentedButton(props: SegmentedButtonProps): JSX.Element;
