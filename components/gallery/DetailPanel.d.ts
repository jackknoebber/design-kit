import React from 'react';

export interface DetailPanelProps {
  open?: boolean;
  /** 'full' (default) is a modal over the page: media left, details right, related below. 'side' is a column. */
  mode?: 'side' | 'full';
  title?: React.ReactNode;
  /** The clip itself (video / img). */
  media?: React.ReactNode;
  /** Related strips: across the bottom in full mode, at the end of the body in side mode. */
  related?: React.ReactNode;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onToggleMode?: () => void;
  /** Extra bar controls (download, open source…). */
  actions?: React.ReactNode;
  children?: React.ReactNode;
  /** Side-mode width in px (default 440). */
  width?: number;
  style?: React.CSSProperties;
}
export interface DetailSectionProps { label?: React.ReactNode; children?: React.ReactNode; style?: React.CSSProperties; }

/** Side-panel or full-screen clip detail with Esc / arrow keys. */
export function DetailPanel(props: DetailPanelProps): JSX.Element | null;
/** A labelled block inside the panel body. */
export function DetailSection(props: DetailSectionProps): JSX.Element;
