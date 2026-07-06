import { useState, ReactNode, CSSProperties, ChangeEvent } from 'react';

// M3 has no select / date-picker component, so these wrap a native control in
// the *filled TextField* shell — label floating inside at the top, value below,
// 56px tall — so they match <TextField variant="filled"> exactly.
//
// Styling lives in components.css (.dk-nativefield / .dk-field__*) so themes
// can restructure the field anatomy; these components carry structure + state.

function shellCls(focused: boolean): string {
  return `dk-nativefield${focused ? ' dk-nativefield--focused' : ''}`;
}

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
    <div className={shellCls(focused)} style={style}>
      <label className="dk-field__label">{label}</label>
      <select
        className="dk-field__control"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </select>
      {/* appearance:none removes the native arrow — draw our own. */}
      <span aria-hidden className="dk-field__arrow" />
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
    <div className={shellCls(focused)} style={{ height, ...style }}>
      <label className="dk-field__label">{label}</label>
      <textarea
        className="dk-field__control"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ padding: '26px 16px 8px', resize: 'none' }}
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
    <div className={shellCls(focused)} style={style}>
      <label className="dk-field__label">{label}</label>
      <input
        className="dk-field__control"
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
