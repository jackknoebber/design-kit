import React from 'react';

export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  name?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

/** Material 3 radio button. */
export function Radio(props: RadioProps): JSX.Element;
