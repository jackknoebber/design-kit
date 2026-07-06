import React from 'react';

export interface BottomSheetProps {
  open?: boolean;
  onClose?: () => void;
  modal?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Material 3 bottom sheet. */
export function BottomSheet(props: BottomSheetProps): JSX.Element | null;
