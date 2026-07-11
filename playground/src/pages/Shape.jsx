import React from 'react';
import { Page, Section, Row, Spec, type, resolveToken, useHtmlEnv } from '../ui.jsx';

const CORNERS = [
  'none', 'extra-small', 'small', 'medium', 'large', 'large-increased',
  'extra-large', 'extra-large-increased', 'extra-extra-large', 'full',
];

function CornerBox({ name }) {
  const varName = `--md-sys-shape-corner-${name}`;
  return (
    <Spec label={`${name} · ${resolveToken(varName)}`}>
      <div
        style={{
          width: 124,
          height: 84,
          borderRadius: `var(${varName})`,
          background: 'var(--md-sys-color-primary-container)',
          border: '1px solid var(--md-sys-color-outline-variant)',
        }}
      />
    </Spec>
  );
}

function ElevationBox({ level }) {
  return (
    <Spec label={`level ${level}`}>
      <div
        style={{
          width: 124,
          height: 84,
          borderRadius: 'var(--md-sys-shape-corner-medium)',
          background: 'var(--md-sys-color-surface-container-lowest)',
          boxShadow: `var(--md-sys-elevation-level${level})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...type('title-medium'),
        }}
      >
        {level}
      </div>
    </Spec>
  );
}

export function Shape() {
  const env = useHtmlEnv();
  return (
    <Page
      title="Shape & elevation"
      intro="Corner radii, shadow character, and border expression — three of the strongest identity signals when designs swap."
    >
      <Section title="Corner radius" key={'c' + env.design}>
        <Row gap={18}>
          {CORNERS.map((c) => (
            <CornerBox key={c} name={c} />
          ))}
        </Row>
      </Section>

      <Section
        title="Elevation"
        intro="Shadow tokens level 0–5. Depth between surfaces mostly comes from stepping the surface-container tones, not shadows."
        key={'e' + env.design + env.theme}
      >
        <Row gap={26}>
          {[0, 1, 2, 3, 4, 5].map((l) => (
            <ElevationBox key={l} level={l} />
          ))}
        </Row>
      </Section>

      <Section
        title="Border expression"
        intro="--dk-border-width lets a design make borders part of its identity (Gumroad turns this up)."
        key={'b' + env.design}
      >
        <Row gap={18}>
          <Spec label={`--dk-border-width · ${resolveToken('--dk-border-width') || 'unset'}`}>
            <div
              style={{
                width: 200,
                height: 84,
                borderRadius: 'var(--md-sys-shape-corner-medium)',
                border: 'var(--dk-border-width, 1px) solid var(--md-sys-color-outline)',
                background: 'var(--md-sys-color-surface-container-lowest)',
              }}
            />
          </Spec>
          <Spec label="outline-variant hairline">
            <div
              style={{
                width: 200,
                height: 84,
                borderRadius: 'var(--md-sys-shape-corner-medium)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                background: 'var(--md-sys-color-surface-container-lowest)',
              }}
            />
          </Spec>
        </Row>
      </Section>

      <Section
        title="Surface steps"
        intro="The five container tones on the base surface — this staircase is how the kit does depth."
        key={'s' + env.design + env.theme}
      >
        <Row gap={0} style={{ borderRadius: 'var(--md-sys-shape-corner-medium)', overflow: 'hidden', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          {['surface-container-lowest', 'surface-container-low', 'surface-container', 'surface-container-high', 'surface-container-highest'].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                minWidth: 120,
                height: 96,
                background: `var(--md-sys-color-${s})`,
                display: 'flex',
                alignItems: 'flex-end',
                padding: 10,
              }}
            >
              <span style={{ ...type('label-small'), color: 'var(--md-sys-color-on-surface-variant)' }}>
                {s.replace('surface-container', 'sc')}
              </span>
            </div>
          ))}
        </Row>
      </Section>
    </Page>
  );
}
