import React from 'react';

export interface Segment { label?: React.ReactNode; icon?: string; }
export interface SegmentedButtonProps {
  segments?: Segment[];
  /** Selected index, or array of indices when `multiple`. */
  value?: number | number[];
  multiple?: boolean;
  /** Replace the active segment's icon with a check (M3 default). false keeps the icon. */
  checkmark?: boolean;
  /** 's' = 40px (default), 'xs' = 32px toolbar height. */
  size?: 's' | 'xs';
  onChange?: (value: number | number[], e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Material 3 segmented button. */
export function SegmentedButton(props: SegmentedButtonProps): JSX.Element;
