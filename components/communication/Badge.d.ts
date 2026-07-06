import React from 'react';

export interface BadgeProps {
  /** Numeric count; omit for a small dot (use `dot`). */
  count?: number;
  /** Max before showing "N+". */
  max?: number;
  /** Render a small dot badge with no number. */
  dot?: boolean;
  /** Anchor element the badge attaches to (e.g. an Icon). */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Material 3 badge. */
export function Badge(props: BadgeProps): JSX.Element;
