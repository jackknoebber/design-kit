import React from 'react';

export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  /** Optional hero icon (centers the dialog content). */
  icon?: string;
  headline?: React.ReactNode;
  children?: React.ReactNode;
  /** Action row content, e.g. <Button>. */
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Material 3 basic dialog. */
export function Dialog(props: DialogProps): JSX.Element | null;
