import React from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  /** Show the check glyph on the handle when on. */
  icons?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
}

/** Material 3 switch. */
export function Switch(props: SwitchProps): JSX.Element;
