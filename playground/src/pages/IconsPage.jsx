import React, { useState } from 'react';
import { Icon } from 'design-kit/components/core/Icon';
import { Switch } from 'design-kit/components/forms/Switch';
import { Page, Section, type, useHtmlEnv } from '../ui.jsx';

// Mostly names that have Framework7 mappings (so Cupertino/iOS 26 visibly
// swap glyphs), plus a few unmapped ones that fall back to Material Symbols.
const NAMES = [
  'add', 'archive', 'bar_chart', 'business', 'calendar_month', 'check',
  'chevron_left', 'chevron_right', 'close', 'delete', 'download', 'edit',
  'expand_more', 'filter_list', 'folder', 'groups', 'info', 'lightbulb',
  'logout', 'picture_as_pdf', 'receipt_long', 'save', 'schedule', 'search',
  'settings', 'table_view', 'favorite', 'home', 'star', 'notifications',
];

export function IconsPage() {
  const env = useHtmlEnv();
  const [fill, setFill] = useState(false);
  return (
    <Page
      title="Icons"
      intro="Components always use semantic Material Symbols names; Cupertino and iOS 26 remap them to Framework7 glyphs, and unmapped names fall back to Material."
    >
      <Section title={`Glyphs — active set: ${env.design === 'cupertino' || env.design === 'ios26' ? 'Framework7' : 'Material Symbols'}`}>
        <div style={{ marginBottom: 20 }}>
          <Switch checked={fill} onChange={setFill} label="Fill axis (Material Symbols only)" />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
            gap: 10,
          }}
        >
          {NAMES.map((name) => (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: '16px 6px 10px',
                borderRadius: 'var(--md-sys-shape-corner-small)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                background: 'var(--md-sys-color-surface-container-lowest)',
              }}
            >
              <Icon name={name} size={26} fill={fill} />
              <span
                style={{
                  ...type('label-small'),
                  fontFamily: 'var(--md-ref-typeface-mono)',
                  color: 'var(--md-sys-color-on-surface-variant)',
                  textAlign: 'center',
                  wordBreak: 'break-all',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}
