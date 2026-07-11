import React from 'react';
import { Page, Section, type, resolveToken, useHtmlEnv } from '../ui.jsx';

const ROLES = ['display', 'headline', 'title', 'body', 'label'];
const SIZES = ['large', 'medium', 'small'];

function cap(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function ScaleRow({ role, size }) {
  const key = `${role}-${size}`;
  const px = resolveToken(`--md-sys-typescale-${key}-size`);
  const weight = resolveToken(`--md-sys-typescale-${key}-weight`);
  const lh = resolveToken(`--md-sys-typescale-${key}-line-height`);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 24,
        padding: '14px 0',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
      }}
    >
      <div style={{ width: 170, flexShrink: 0 }}>
        <div style={{ ...type('label-large') }}>{cap(role)} {cap(size)}</div>
        <div
          style={{
            ...type('label-small'),
            fontFamily: 'var(--md-ref-typeface-mono)',
            color: 'var(--md-sys-color-on-surface-variant)',
          }}
        >
          {px} · {weight} · {lh}
        </div>
      </div>
      <div style={{ ...type(key), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        Sphinx of black quartz
      </div>
    </div>
  );
}

function TypefaceCard({ label, varName }) {
  const stack = resolveToken(varName);
  return (
    <div
      style={{
        flex: '1 1 220px',
        padding: 16,
        borderRadius: 'var(--md-sys-shape-corner-medium)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        background: 'var(--md-sys-color-surface-container-lowest)',
      }}
    >
      <div style={{ fontFamily: `var(${varName})`, fontSize: 30, lineHeight: 1.25 }}>AaBbCc 0123</div>
      <div style={{ ...type('label-medium'), marginTop: 10 }}>{label}</div>
      <div
        style={{
          ...type('label-small'),
          fontFamily: 'var(--md-ref-typeface-mono)',
          color: 'var(--md-sys-color-on-surface-variant)',
          marginTop: 2,
        }}
      >
        {stack}
      </div>
    </div>
  );
}

export function Typography() {
  const env = useHtmlEnv();
  return (
    <Page
      title="Typography"
      intro="Typeface references and the 15-role type scale. The brand face carries headings and display text; the plain face carries everything else."
    >
      <Section title="Typefaces" key={'faces' + env.design}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <TypefaceCard label="brand — --md-ref-typeface-brand" varName="--md-ref-typeface-brand" />
          <TypefaceCard label="plain — --md-ref-typeface-plain" varName="--md-ref-typeface-plain" />
          <TypefaceCard label="mono — --md-ref-typeface-mono" varName="--md-ref-typeface-mono" />
        </div>
      </Section>

      <Section title="Type scale" key={'scale' + env.design}>
        {ROLES.map((role) =>
          SIZES.map((size) => <ScaleRow key={role + size} role={role} size={size} />)
        )}
      </Section>

      <Section title="Body copy">
        <p style={{ ...type('body-large'), maxWidth: 560, margin: 0 }}>
          Body large. The quick brown fox jumps over the lazy dog, then reads the
          fine print, adjusts the kerning, and files a bug about line height.
        </p>
        <p style={{ ...type('body-medium'), maxWidth: 560, margin: '12px 0 0' }}>
          Body medium. The quick brown fox jumps over the lazy dog, then reads the
          fine print, adjusts the kerning, and files a bug about line height.
        </p>
        <p style={{ ...type('body-small'), maxWidth: 560, margin: '12px 0 0' }}>
          Body small. The quick brown fox jumps over the lazy dog, then reads the
          fine print, adjusts the kerning, and files a bug about line height.
        </p>
      </Section>
    </Page>
  );
}
