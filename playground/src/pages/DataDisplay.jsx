import React, { useState } from 'react';
import { Avatar } from 'design-kit/components/datadisplay/Avatar';
import { ListItem } from 'design-kit/components/datadisplay/ListItem';
import { Carousel } from 'design-kit/components/datadisplay/Carousel';
import { Card } from 'design-kit/components/containment/Card';
import { Divider } from 'design-kit/components/containment/Divider';
import { Switch } from 'design-kit/components/forms/Switch';
import { Page, Section, Row, Spec } from '../ui.jsx';

export function DataDisplay() {
  const [selected, setSelected] = useState(1);
  const [wifi, setWifi] = useState(true);
  return (
    <Page title="Data display" intro="Avatars, list items, and the carousel.">
      <Section title="Avatar">
        <Row>
          <Spec label="initials"><Avatar initials="JK" /></Spec>
          <Spec label="icon"><Avatar icon="person" color="secondary" /></Spec>
          <Spec label="tertiary"><Avatar initials="DK" color="tertiary" /></Spec>
          <Spec label="square"><Avatar initials="SQ" shape="square" /></Spec>
          <Spec label="size 56"><Avatar initials="LG" size={56} /></Spec>
          <Spec label="size 24"><Avatar initials="S" size={24} /></Spec>
        </Row>
      </Section>

      <Section title="List item" intro="Click a row to select it.">
        <Card variant="outlined" padding={0} style={{ maxWidth: 480 }}>
          <ListItem
            headline="One line"
            leading="schedule"
            trailing="chevron_right"
            interactive
            selected={selected === 0}
            onClick={() => setSelected(0)}
          />
          <Divider />
          <ListItem
            headline="Two lines with supporting text"
            supportingText="Secondary text that explains the row"
            leading={<Avatar initials="JK" size={40} />}
            trailing="more_vert"
            interactive
            selected={selected === 1}
            onClick={() => setSelected(1)}
          />
          <Divider />
          <ListItem
            overline="OVERLINE"
            headline="Three lines with overline"
            supportingText="Longer supporting text that can wrap to a second line when needed"
            lines={3}
            leading="folder"
            trailing="star"
            interactive
            selected={selected === 2}
            onClick={() => setSelected(2)}
          />
          <Divider />
          <ListItem
            headline="With a control"
            supportingText="Trailing node can be any element"
            leading="wifi"
            trailing={<Switch checked={wifi} onChange={setWifi} />}
          />
        </Card>
      </Section>

      <Section title="Carousel" intro="Scroll horizontally.">
        <Carousel
          height={180}
          items={[
            { src: 'https://picsum.photos/id/1015/400/300', label: 'River' },
            { src: 'https://picsum.photos/id/1016/400/300', label: 'Canyon' },
            { src: 'https://picsum.photos/id/1018/400/300', label: 'Peaks' },
            { src: 'https://picsum.photos/id/1020/400/300', label: 'Bear' },
            { src: 'https://picsum.photos/id/1024/400/300', label: 'Eagle' },
          ]}
        />
      </Section>
    </Page>
  );
}
