import React from 'react';

export interface SnackbarProps {
  message?: React.ReactNode;
  /** Action label; renders a text button. */
  action?: React.ReactNode;
  onAction?: (e: React.MouseEvent) => void;
  onClose?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/** Material 3 snackbar. */
export function Snackbar(props: SnackbarProps): JSX.Element;
