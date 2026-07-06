import React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

/** Material 3 checkbox. */
export function Checkbox(props: CheckboxProps): JSX.Element;
