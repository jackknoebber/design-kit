import React from 'react';

export interface QueryChip {
  id: string | number;
  label: string;
  /** tag (default), color (renders a dot from `color`), source, like ("like this clip"). */
  kind?: 'tag' | 'color' | 'source' | 'like';
  /** CSS color for `kind: 'color'`; defaults to `label`. */
  color?: string;
  title?: string;
}
export interface QueryFieldProps {
  value?: string;
  onChange?: (v: string) => void;
  chips?: QueryChip[];
  onRemoveChip?: (chip: QueryChip) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** Leading Material Symbols icon name; null for none. */
  leading?: string | null;
  /** Pickers and scope controls, right-aligned. */
  trailing?: React.ReactNode;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}

/** One field for words, tag chips, color chips and "like this". */
export function QueryField(props: QueryFieldProps): JSX.Element;
