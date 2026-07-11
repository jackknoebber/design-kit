import React, { useState } from 'react';
import { TopAppBar } from 'design-kit/components/navigation/TopAppBar';
import { Tabs } from 'design-kit/components/navigation/Tabs';
import { NavigationBar } from 'design-kit/components/navigation/NavigationBar';
import { NavigationRail } from 'design-kit/components/navigation/NavigationRail';
import { NavigationDrawer } from 'design-kit/components/navigation/NavigationDrawer';
import { SearchBar } from 'design-kit/components/navigation/SearchBar';
import { Fab } from 'design-kit/components/actions/Fab';
import { Page, Section, Frame } from '../ui.jsx';

const NAV_ITEMS = [
  { label: 'Home', icon: 'home' },
  { label: 'Reports', icon: 'bar_chart', badge: 3 },
  { label: 'Projects', icon: 'folder' },
  { label: 'Settings', icon: 'settings', badge: true },
];

export function Navigation() {
  const [tab, setTab] = useState(0);
  const [tab2, setTab2] = useState(1);
  const [bar, setBar] = useState(0);
  const [rail, setRail] = useState(0);
  const [drawer, setDrawer] = useState(1);
  const [query, setQuery] = useState('');

  return (
    <Page title="Navigation" intro="App bars, tabs, bars, rails, drawers, and search.">
      <Section title="Top app bar">
        {['small', 'center', 'medium', 'large'].map((v) => (
          <Frame key={v} label={v}>
            <TopAppBar
              variant={v}
              title="Time Tracker"
              leadingIcon="arrow_back"
              actions={[{ icon: 'search' }, { icon: 'more_vert' }]}
            />
          </Frame>
        ))}
      </Section>

      <Section title="Tabs">
        <Frame label="primary · with icons">
          <Tabs
            variant="primary"
            tabs={[{ label: 'Overview', icon: 'home' }, { label: 'Entries', icon: 'schedule' }, { label: 'Reports', icon: 'bar_chart' }]}
            value={tab}
            onChange={setTab}
          />
        </Frame>
        <Frame label="secondary">
          <Tabs
            variant="secondary"
            tabs={[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]}
            value={tab2}
            onChange={setTab2}
          />
        </Frame>
      </Section>

      <Section title="Search bar">
        <div style={{ maxWidth: 420 }}>
          <SearchBar placeholder="Search entries" value={query} onChange={setQuery} />
        </div>
      </Section>

      <Section title="Navigation bar">
        <Frame label="bottom navigation · badges">
          <NavigationBar items={NAV_ITEMS} value={bar} onChange={setBar} />
        </Frame>
      </Section>

      <Section title="Navigation rail">
        <Frame label="rail with FAB header" height={420} style={{ display: 'flex' }}>
          <NavigationRail
            items={NAV_ITEMS}
            value={rail}
            onChange={setRail}
            header={<Fab size="small" lowered color="tertiary" icon="edit" ariaLabel="Compose" />}
          />
          <div style={{ flex: 1 }} />
        </Frame>
      </Section>

      <Section title="Navigation drawer">
        <Frame label="standard drawer" height={420} style={{ display: 'flex' }}>
          <NavigationDrawer
            headline="Workspaces"
            items={[
              { label: 'Inbox', icon: 'inbox', badge: '24' },
              { label: 'Sent', icon: 'send' },
              { label: 'Archive', icon: 'archive' },
              { divider: true },
              { label: 'Trash', icon: 'delete' },
            ]}
            value={drawer}
            onChange={setDrawer}
          />
          <div style={{ flex: 1 }} />
        </Frame>
      </Section>
    </Page>
  );
}
