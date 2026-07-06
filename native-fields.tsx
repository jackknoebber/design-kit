import { useState, ReactNode, CSSProperties, ChangeEvent } from 'react';

// M3 has no select / date-picker component, so these wrap a native control in
// the *filled TextField* shell — label floating inside at the top, value below,
// 56px tall, filled container + bottom active indicator — so they match the M3
// TextField exactly (no label-above mismatch).

function shellStyle(focused: boolean, style?: CSSProperties): CSSProperties {
  return {
    position: 'relative',
    height: 56,
    boxSizing: 'border-box',
    minWidth: 160,
    padding: '0 16px',
    background: 'var(--md-sys-color-surface-container-highest)',
    borderRadius: 'var(--md-sys-shape-corner-extra-small) var(--md-sys-shape-corner-extra-small) 0 0',
    borderBottom: `1px solid ${focused ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)'}`,
    boxShadow: focused ? 'inset 0 -2px 0 0 var(--md-sys-color-primary)' : 'none',
    ...style,
  };
}
const labelStyle = (focused: boolean): CSSProperties => ({
  position: 'absolute',
  top: 8,
  left: 16,
  font: "400 12px/16px var(--md-ref-typeface-plain)",
  color: focused ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
  pointerEvents: 'none',
});
const controlStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 'none',
  background: 'transparent',
  font: "400 16px/24px var(--md-ref-typeface-plain)",
  color: 'var(--md-sys-color-on-surface)',
  outline: 'none',
  padding: '20px 16px 0',
  boxSizing: 'border-box',
};

export function M3Select({
  label,
  value,
  onChange,
  children,
  style,
}: {
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={shellStyle(focused, style)}>
      <label style={labelStyle(focused)}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...controlStyle, cursor: 'pointer' }}
      >
        {children}
      </select>
    </div>
  );
}

export function M3TextArea({
  label,
  value,
  onChange,
  rows = 2,
  style,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  style?: CSSProperties;
}) {
  const [focused, setFocused] = useState(false);
  // Label region (~28px) + rows * 24px line + 8px bottom, fixed (no resize).
  const height = 28 + rows * 24 + 8;
  return (
    <div style={shellStyle(focused, { height, ...style })}>
      <label style={labelStyle(focused)}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          font: "400 16px/24px var(--md-ref-typeface-plain)",
          color: 'var(--md-sys-color-on-surface)',
          outline: 'none',
          padding: '26px 16px 8px',
          boxSizing: 'border-box',
          resize: 'none',
        }}
      />
    </div>
  );
}

export function M3DateField({
  label,
  value,
  min,
  max,
  onChange,
  style,
}: {
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={shellStyle(focused, style)}>
      <label style={labelStyle(focused)}>{label}</label>
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={controlStyle}
      />
    </div>
  );
}
