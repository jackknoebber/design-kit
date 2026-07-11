import React from 'react';
import { Page, Section, type, resolveToken, useHtmlEnv } from '../ui.jsx';

const GROUPS = [
  ['Primary', ['primary', 'on-primary', 'primary-container', 'on-primary-container']],
  ['Secondary', ['secondary', 'on-secondary', 'secondary-container', 'on-secondary-container']],
  ['Tertiary', ['tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container']],
  ['Error', ['error', 'on-error', 'error-container', 'on-error-container']],
  [
    'Surface',
    [
      'surface-dim', 'surface', 'surface-bright',
      'surface-container-lowest', 'surface-container-low', 'surface-container',
      'surface-container-high', 'surface-container-highest',
      'on-surface', 'on-surface-variant', 'surface-variant', 'surface-tint',
    ],
  ],
  ['Outline & inverse', ['outline', 'outline-variant', 'inverse-surface', 'inverse-on-surface', 'inverse-primary']],
  [
    'Fixed',
    [
      'primary-fixed', 'primary-fixed-dim', 'on-primary-fixed', 'on-primary-fixed-variant',
      'secondary-fixed', 'secondary-fixed-dim', 'on-secondary-fixed', 'on-secondary-fixed-variant',
      'tertiary-fixed', 'tertiary-fixed-dim', 'on-tertiary-fixed', 'on-tertiary-fixed-variant',
    ],
  ],
  ['Background & misc', ['background', 'on-background', 'scrim', 'shadow']],
];

const ALL_ROLES = new Set(GROUPS.flatMap(([, roles]) => roles));

// The color to draw the "Aa" specimen inside a swatch: the role's on-pair if
// one exists, the base role for on-* roles, otherwise nothing.
function specimenColor(role) {
  if (ALL_ROLES.has(`on-${role}`)) return `var(--md-sys-color-on-${role})`;
  if (role.startsWith('on-') && ALL_ROLES.has(role.slice(3))) return `var(--md-sys-color-${role.slice(3)})`;
  return null;
}

function Swatch({ role }) {
  const varName = `--md-sys-color-${role}`;
  const value = resolveToken(varName);
  const aa = specimenColor(role);
  return (
    <div
      style={{
        borderRadius: 'var(--md-sys-shape-corner-small)',
        overflow: 'hidden',
        border: '1px solid var(--md-sys-color-outline-variant)',
      }}
    >
      <div
        style={{
          height: 64,
          background: `var(${varName})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {aa && <span style={{ ...type('title-medium'), color: aa }}>Aa</span>}
      </div>
      <div style={{ padding: '8px 10px', background: 'var(--md-sys-color-surface-container-lowest)' }}>
        <div style={{ ...type('label-medium') }}>{role}</div>
        <div
          style={{
            ...type('label-small'),
            fontFamily: 'var(--md-ref-typeface-mono)',
            color: 'var(--md-sys-color-on-surface-variant)',
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export function Colors() {
  const env = useHtmlEnv(); // re-resolve swatch values on design/theme change
  return (
    <Page
      title="Color"
      intro="The 49 color roles of the contract, resolved live from the active design system and theme. Every component color references one of these."
    >
      {GROUPS.map(([name, roles]) => (
        <Section key={name + env.design + env.theme + env.accent} title={name}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: 14,
            }}
          >
            {roles.map((role) => (
              <Swatch key={role} role={role} />
            ))}
          </div>
        </Section>
      ))}
    </Page>
  );
}
