import React from 'react';
export interface StripProps { title?: React.ReactNode; count?: number | string; /** Click on the title ("see all"). */ onTitle?: (e: React.SyntheticEvent) => void; /** "See all" link in the header. */ onMore?: (e: React.MouseEvent) => void; moreLabel?: string; tileWidth?: number; children?: React.ReactNode; style?: React.CSSProperties; }
/** A horizontal, snapping row of tiles for one tag, source or color. */
export function Strip(props: StripProps): JSX.Element;
