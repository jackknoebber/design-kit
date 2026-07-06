import React from 'react';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  leadingIcon?: string;
  onLeading?: (e: React.MouseEvent) => void;
  trailing?: React.ReactNode;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

/** Material 3 search bar. */
export function SearchBar(props: SearchBarProps): JSX.Element;
