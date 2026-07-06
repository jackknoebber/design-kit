import React from 'react';

/**
 * Material 3 divider. Full-width or inset. Horizontal or vertical.
 */
export function Divider({ inset = false, vertical = false, style = {}, ...rest }) {
  if (vertical) {
    return <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--md-sys-color-outline-variant)', ...style }} {...rest} />;
  }
  return (
    <div
      style={{
        height: 1,
        width: 'auto',
        background: 'var(--md-sys-color-outline-variant)',
        marginLeft: inset ? 16 : 0,
        marginRight: inset ? 16 : 0,
        ...style,
      }}
      {...rest}
    />
  );
}
