import React, { useState } from 'react';
import { Button } from 'design-kit/components/actions/Button';
import { IconButton } from 'design-kit/components/actions/IconButton';
import { TextField } from 'design-kit/components/forms/TextField';
import { Switch } from 'design-kit/components/forms/Switch';
import { Chip } from 'design-kit/components/selection/Chip';
import { Card } from 'design-kit/components/containment/Card';
import { ListItem } from 'design-kit/components/datadisplay/ListItem';
import { Avatar } from 'design-kit/components/datadisplay/Avatar';
import { Divider } from 'design-kit/components/containment/Divider';
import { Page, Section, Row, type } from '../ui.jsx';

export function Overview() {
  const [email, setEmail] = useState('');
  const [remember, setRemember] = useState(true);
  const [tag, setTag] = useState('work');

  return (
    <Page
      title="design-kit"
      intro="One token contract, four design systems. Use the controls in the sidebar to swap the design, theme, and accent — every page (including this chrome) re-skins live."
    >
      <Section title="At a glance" intro="A composite sample — the fastest way to feel a design switch.">
        <Row align="stretch" gap={24}>
          <Card variant="elevated" style={{ width: 320 }}>
            <div style={{ ...type('title-large'), marginBottom: 4 }}>Sign in</div>
            <div style={{ ...type('body-medium'), color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 16 }}>
              Identity components in their natural habitat.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <TextField variant="outlined" label="Email" value={email} onChange={setEmail} />
              <TextField variant="outlined" label="Password" type="password" defaultValue="hunter22" />
              <Switch checked={remember} onChange={setRemember} label="Remember me" />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="text">Help</Button>
                <Button variant="filled" trailingIcon="chevron_right">Sign in</Button>
              </div>
            </div>
          </Card>

          <Card variant="outlined" padding={0} style={{ width: 320 }}>
            <div style={{ padding: '16px 16px 8px' }}>
              <div style={type('title-medium')}>Today</div>
            </div>
            <ListItem
              headline="Deep work"
              supportingText="2h 10m · design-kit"
              leading={<Avatar initials="DK" size={40} />}
              trailing={<IconButton icon="play_arrow" ariaLabel="Resume" />}
            />
            <Divider inset />
            <ListItem
              headline="Code review"
              supportingText="45m · time-tracking"
              leading={<Avatar initials="TT" size={40} color="tertiary" />}
              trailing={<IconButton icon="play_arrow" ariaLabel="Resume" />}
            />
            <div style={{ display: 'flex', gap: 8, padding: 16, flexWrap: 'wrap' }}>
              {['work', 'personal', 'deep'].map((t) => (
                <Chip key={t} variant="filter" label={t} selected={tag === t} onClick={() => setTag(t)} />
              ))}
            </div>
          </Card>
        </Row>
      </Section>

      <Section title="How this site works">
        <ul style={{ ...type('body-medium'), color: 'var(--md-sys-color-on-surface-variant)', margin: 0, paddingLeft: 20, maxWidth: 620, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><b>Foundations</b> pages show the raw contract — color roles, type scale, shape, elevation, icons — with values resolved live from the active design.</li>
          <li><b>Components</b> pages render every React component in its variants and states. Most examples are interactive.</li>
          <li>The playground imports the kit exactly like a consumer app (deep extensionless imports, styles.css + theme files), so what you see here is what apps get.</li>
        </ul>
      </Section>
    </Page>
  );
}
