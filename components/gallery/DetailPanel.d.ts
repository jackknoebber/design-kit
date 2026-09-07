import React from 'react';

export interface DetailPanelProps {
  open?: boolean;
  /** 'side' fills its column; 'full' covers the viewport with a scrim. */
  mode?: 'side' | 'full';
  title?: React.ReactNode;
  /** The clip itself (video / img), shown large above the body. */
  media?: React.ReactNode;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onToggleMode?: () => void;
  /** Extra bar controls (download, open source…). */
  actions?: React.ReactNode;
  children?: React.ReactNode;
  /** Side-mode width in px. */
  width?: number;
  style?: React.CSSProperties;
}
export interface DetailSectionProps { label?: React.ReactNode; children?: React.ReactNode; style?: React.CSSProperties; }

/** Side-panel or full-screen clip detail with Esc / arrow keys. */
export function DetailPanel(props: DetailPanelProps): JSX.Element | null;
/** A labelled block inside the panel body. */
export function DetailSection(props: DetailSectionProps): JSX.Element;
