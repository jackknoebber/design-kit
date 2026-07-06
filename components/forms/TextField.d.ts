import React from 'react';

export interface TextFieldProps {
  variant?: 'filled' | 'outlined';
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  supportingText?: string;
  error?: boolean;
  disabled?: boolean;
  type?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

/**
 * Material 3 text field.
 * @startingPoint section="Forms" subtitle="Filled & outlined text fields" viewport="700x140"
 */
export function TextField(props: TextFieldProps): JSX.Element;
