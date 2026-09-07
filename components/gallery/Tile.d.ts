import React from 'react';

export interface TileProps {
  /** Preview video URL (WebM). Omit for a poster-only tile. */
  src?: string;
  /** Poster image URL, shown until the video plays. */
  poster?: string;
  title?: string;
  /** Width / height for `aspect: 'native'`. Default 16/10. */
  ratio?: number;
  /** 'native' keeps `ratio`; 'square' forces 1:1; 'auto' lets the media set the height (masonry). */
  aspect?: 'native' | 'square' | 'auto';
  /** How media fills the frame: crop or letterbox. */
  fit?: 'cover' | 'contain';
  /** Autoplay the preview. When false, `hoverPlay` decides. */
  moving?: boolean;
  /** Play while hovered when not `moving`. */
  hoverPlay?: boolean;
  selected?: boolean;
  /** Small mono badge in the corner (e.g. "new", "3 tags"). */
  badge?: React.ReactNode;
  /** Show the title caption on hover / selection. */
  caption?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  /** Overlay slot filling the frame (placeholders, custom media). */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** A clip in the wall: preview video or poster, selection ring, keyboard focus. */
export function Tile(props: TileProps): JSX.Element;
