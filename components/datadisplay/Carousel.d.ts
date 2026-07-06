import React from 'react';

export interface CarouselItem { src?: string; label?: React.ReactNode; }
export interface CarouselProps {
  items?: CarouselItem[];
  height?: number;
  style?: React.CSSProperties;
}

/** Material 3 carousel. */
export function Carousel(props: CarouselProps): JSX.Element;
