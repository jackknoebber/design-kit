import React from 'react';

/**
 * Material 3 progress indicator. Linear or circular; determinate (set `value`
 * 0–100) or indeterminate.
 */
export function ProgressIndicator({ variant = 'linear', value, size = 48, thickness = 4, style = {}, ...rest }) {
  const indeterminate = value == null;
  useKeyframes();

  if (variant === 'circular') {
    const r = (size - thickness) / 2;
    const circ = 2 * Math.PI * r;
    const dash = indeterminate ? circ * 0.25 : circ * (value / 100);
    return (
      <span style={{ display: 'inline-flex', width: size, height: size, ...style }} {...rest}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={indeterminate ? { animation: 'md-spin 1.4s linear infinite' } : undefined}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--md-sys-color-secondary-container)" strokeWidth={thickness} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke="var(--md-sys-color-primary)" strokeWidth={thickness} strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
      </span>
    );
  }

  return (
    <span style={{ display: 'block', position: 'relative', width: '100%', minWidth: 120, height: thickness, borderRadius: 'var(--md-sys-shape-corner-full)', background: 'var(--md-sys-color-secondary-container)', overflow: 'hidden', ...style }} {...rest}>
      <span
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          width: indeterminate ? '40%' : `${value}%`,
          borderRadius: 'var(--md-sys-shape-corner-full)',
          background: 'var(--md-sys-color-primary)',
          animation: indeterminate ? 'md-linear 1.6s cubic-bezier(0.4,0,0.2,1) infinite' : undefined,
          transition: indeterminate ? undefined : 'width 200ms',
        }}
      />
    </span>
  );
}

function useKeyframes() {
  React.useEffect(() => {
    if (document.getElementById('md-progress-kf')) return;
    const el = document.createElement('style');
    el.id = 'md-progress-kf';
    el.textContent = `
      @keyframes md-spin { to { transform: rotate(360deg); } }
      @keyframes md-linear { 0% { left: -40%; } 100% { left: 100%; } }
    `;
    document.head.appendChild(el);
  }, []);
}
