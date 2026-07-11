import React, { useEffect, useState } from 'react';

/** Style object for an M3 typescale role, e.g. type('headline-medium'). */
export const type = (role) => ({
  fontFamily: `var(--md-sys-typescale-${role}-font)`,
  fontSize: `var(--md-sys-typescale-${role}-size)`,
  fontWeight: `var(--md-sys-typescale-${role}-weight)`,
  lineHeight: `var(--md-sys-typescale-${role}-line-height)`,
  letterSpacing: `var(--md-sys-typescale-${role}-tracking)`,
});

function readEnv() {
  const el = document.documentElement;
  return {
    design: el.getAttribute('data-design') || 'm3',
    theme: el.getAttribute('data-theme') || 'light',
    accent: el.getAttribute('data-accent') || '',
  };
}

/** Reactive {design, theme, accent} from <html>; re-renders on any change so
 *  resolved token values stay fresh. */
export function useHtmlEnv() {
  const [env, setEnv] = useState(readEnv);
  useEffect(() => {
    const mo = new MutationObserver(() => setEnv(readEnv()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-design', 'data-theme', 'data-accent'],
    });
    return () => mo.disconnect();
  }, []);
  return env;
}

/** Resolved value of a CSS custom property on <html>. */
export function resolveToken(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function Page({ title, intro, children }) {
  return (
    <div>
      <h1 style={{ ...type('display-small'), margin: '0 0 8px' }}>{title}</h1>
      {intro && (
        <p style={{ ...type('body-large'), color: 'var(--md-sys-color-on-surface-variant)', margin: '0 0 12px', maxWidth: 640 }}>
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}

export function Section({ title, intro, children }) {
  return (
    <section style={{ marginTop: 40 }}>
      <h2 style={{ ...type('title-large'), margin: '0 0 4px' }}>{title}</h2>
      {intro && (
        <p style={{ ...type('body-medium'), color: 'var(--md-sys-color-on-surface-variant)', margin: '0 0 16px', maxWidth: 640 }}>
          {intro}
        </p>
      )}
      <div style={{ marginTop: 16 }}>{children}</div>
    </section>
  );
}

export function Row({ children, gap = 20, align = 'center', style }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap, alignItems: align, ...style }}>
      {children}
    </div>
  );
}

/** An example with a small caption underneath. */
export function Spec({ label, children, minWidth }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>{children}</div>
      {label && (
        <div style={{ ...type('label-small'), color: 'var(--md-sys-color-on-surface-variant)', fontFamily: 'var(--md-ref-typeface-mono)' }}>
          {label}
        </div>
      )}
    </div>
  );
}

/** Bordered frame for full-width components (app bars, nav bars, drawers). */
export function Frame({ children, label, height, style }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          border: '1px solid var(--md-sys-color-outline-variant)',
          borderRadius: 'var(--md-sys-shape-corner-medium)',
          overflow: 'hidden',
          height,
          background: 'var(--md-sys-color-surface)',
          ...style,
        }}
      >
        {children}
      </div>
      {label && (
        <div style={{ ...type('label-small'), color: 'var(--md-sys-color-on-surface-variant)', fontFamily: 'var(--md-ref-typeface-mono)', marginTop: 8 }}>
          {label}
        </div>
      )}
    </div>
  );
}
