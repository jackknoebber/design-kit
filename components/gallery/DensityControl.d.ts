import React from 'react';
export interface DensityControlProps { value?: number; min?: number; max?: number; onChange?: (columns: number) => void; label?: string; style?: React.CSSProperties; }
/** Columns slider for the wall. */
export function DensityControl(props: DensityControlProps): JSX.Element;
