import React from 'react';
export interface DensityControlProps { value?: number; min?: number; max?: number; onChange?: (columns: number) => void; /** Fires once when the drag ends. */ onCommit?: (columns: number) => void; label?: string; style?: React.CSSProperties; }
/** Columns slider for the wall. */
export function DensityControl(props: DensityControlProps): JSX.Element;
