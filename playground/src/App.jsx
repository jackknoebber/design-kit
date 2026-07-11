import React, { useEffect, useState } from 'react';
import { M3Select } from 'design-kit/native-fields';
import { Switch } from 'design-kit/components/forms/Switch';
import { type, useHtmlEnv } from './ui.jsx';

import { Overview } from './pages/Overview.jsx';
import { Colors } from './pages/Colors.jsx';
import { Typography } from './pages/Typography.jsx';
import { Shape } from './pages/Shape.jsx';
import { IconsPage } from './pages/IconsPage.jsx';
import { Actions } from './pages/Actions.jsx';
import { Forms } from './pages/Forms.jsx';
import { Selection } from './pages/Selection.jsx';
import { Communication } from './pages/Communication.jsx';
import { Containment } from './pages/Containment.jsx';
import { DataDisplay } from './pages/DataDisplay.jsx';
import { Navigation } from './pages/Navigation.jsx';
import { Overlays } from './pages/Overlays.jsx';

const NAV = [
  {
    group: 'Foundations',
    items: [
      { id: 'overview', label: 'Overview', page: Overview },
      { id: 'colors', label: 'Color', page: Colors },
      { id: 'typography', label: 'Typography', page: Typography },
      { id: 'shape', label: 'Shape & elevation', page: Shape },
      { id: 'icons', label: 'Icons', page: IconsPage },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'actions', label: 'Actions', page: Actions },
      { id: 'forms', label: 'Forms', page: Forms },
      { id: 'selection', label: 'Selection', page: Selection },
      { id: 'communication', label: 'Communication', page: Communication },
      { id: 'containment', label: 'Containment', page: Containment },
      { id: 'datadisplay', label: 'Data display', page: DataDisplay },
      { id: 'navigation', label: 'Navigation', page: Navigation },
      { id: 'overlays', label: 'Overlays', page: Overlays },
    ],
  },
];

const DESIGNS = [
  { value: 'm3', label: 'Material 3' },
  { value: 'cupertino', label: 'Cupertino' },
  { value: 'ios26', label: 'iOS 26' },
  { value: 'gumroad', label: 'Gumroad' },
];

function currentRoute() {
  return window.location.hash.replace(/^#\/?/, '') || 'overview';
}

function useRoute() {
  const [route, setRoute] = useState(currentRoute);
  useEffect(() => {
    const onChange = () => setRoute(currentRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function setDesign(value) {
  const el = document.documentElement;
  if (value === 'm3') el.removeAttribute('data-design');
  else el.setAttribute('data-design', value);
  localStorage.setItem('dkpg-design', value);
}

function setTheme(dark) {
  const t = dark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.style.colorScheme = t;
  localStorage.setItem('dkpg-theme', t);
}

function setAccent(on) {
  const el = document.documentElement;
  if (on) el.setAttribute('data-accent', 'teal');
  else el.removeAttribute('data-accent');
  localStorage.setItem('dkpg-accent', on ? 'teal' : '');
}

export function App() {
  const env = useHtmlEnv();
  const route = useRoute();
  const active = NAV.flatMap((g) => g.items).find((i) => i.id === route) || NAV[0].items[0];
  const PageComponent = active.page;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      <aside
        style={{
          width: 260,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          padding: '20px 14px 32px',
          background: 'var(--md-sys-color-surface-container-low)',
          borderRight: '1px solid var(--md-sys-color-outline-variant)',
        }}
      >
        <div style={{ padding: '0 14px 4px' }}>
          <div style={{ ...type('title-large'), fontFamily: 'var(--md-ref-typeface-brand)' }}>design-kit</div>
          <div style={{ ...type('body-small'), color: 'var(--md-sys-color-on-surface-variant)' }}>
            one contract · four design systems
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 6px 8px' }}>
          <M3Select label="Design system" value={env.design} onChange={(e) => setDesign(e.target.value)}>
            {DESIGNS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </M3Select>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 8px' }}>
            <Switch checked={env.theme === 'dark'} onChange={setTheme} label="Dark theme" />
            {env.design === 'm3' && (
              <Switch checked={env.accent === 'teal'} onChange={setAccent} label="Teal accent" />
            )}
          </div>
        </div>

        <nav>
          {NAV.map((group) => (
            <div key={group.group} style={{ marginTop: 16 }}>
              <div
                style={{
                  ...type('label-small'),
                  color: 'var(--md-sys-color-on-surface-variant)',
                  textTransform: 'uppercase',
                  letterSpacing: '.8px',
                  padding: '0 14px 6px',
                }}
              >
                {group.group}
              </div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={`#/${item.id}`}
                  className={`pg-nav-link${item.id === route ? ' pg-active' : ''}`}
                  style={type('label-large')}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        <div style={{ maxWidth: 960, padding: '36px 44px 96px' }}>
          <PageComponent key={route} env={env} />
        </div>
      </main>
    </div>
  );
}
