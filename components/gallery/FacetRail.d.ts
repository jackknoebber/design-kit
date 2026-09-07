import React from 'react';

export interface Facet { id: string | number; label: string; count?: number; selected?: boolean; /** CSS color for a swatch dot (color facets). */ swatch?: string; }
export interface FacetGroup { id: string; label: string; facets: Facet[]; }
export interface FacetRailProps {
  groups?: FacetGroup[];
  /** Controlled type-to-narrow query. */
  query?: string;
  onQuery?: (q: string) => void;
  onToggle?: (facet: Facet, group: FacetGroup, e: React.MouseEvent) => void;
  /** Rows shown per group before "N more". */
  limit?: number;
  placeholder?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Facets with counts in groups; type to narrow, click to stack. */
export function FacetRail(props: FacetRailProps): JSX.Element;
