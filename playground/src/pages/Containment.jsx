import React, { useState } from 'react';
import { Card } from 'design-kit/components/containment/Card';
import { Divider } from 'design-kit/components/containment/Divider';
import { BottomSheet } from 'design-kit/components/containment/BottomSheet';
import { Button } from 'design-kit/components/actions/Button';
import { ListItem } from 'design-kit/components/datadisplay/ListItem';
import { Page, Section, Row, Spec, type } from '../ui.jsx';

function CardBody({ title }) {
  return (
    <div style={{ width: 200 }}>
      <div style={type('title-medium')}>{title}</div>
      <p style={{ ...type('body-medium'), color: 'var(--md-sys-color-on-surface-variant)', margin: '6px 0 0' }}>
        Cards are one of the five identity components — themes reshape them freely.
      </p>
    </div>
  );
}

export function Containment() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Page title="Containment" intro="Cards, dividers, and the bottom sheet.">
      <Section title="Card — variants">
        <Row align="stretch">
          <Spec label="elevated">
            <Card variant="elevated"><CardBody title="Elevated" /></Card>
          </Spec>
          <Spec label="filled">
            <Card variant="filled"><CardBody title="Filled" /></Card>
          </Spec>
          <Spec label="outlined">
            <Card variant="outlined"><CardBody title="Outlined" /></Card>
          </Spec>
          <Spec label="interactive (hover/click)">
            <Card variant="elevated" interactive onClick={() => {}}><CardBody title="Interactive" /></Card>
          </Spec>
        </Row>
      </Section>

      <Section title="Divider">
        <Card variant="outlined" padding={0} style={{ maxWidth: 420 }}>
          <ListItem headline="Full-width divider below" leading="folder" />
          <Divider />
          <ListItem headline="Inset divider below" leading="folder" />
          <Divider inset />
          <ListItem headline="Last item" leading="folder" />
        </Card>
        <Row style={{ marginTop: 20, height: 48 }}>
          <span style={type('body-medium')}>Vertical</span>
          <Divider vertical />
          <span style={type('body-medium')}>divider</span>
        </Row>
      </Section>

      <Section title="Bottom sheet">
        <Button variant="tonal" icon="expand_more" onClick={() => setSheetOpen(true)}>
          Open bottom sheet
        </Button>
        <BottomSheet open={sheetOpen} modal onClose={() => setSheetOpen(false)}>
          <div style={{ padding: '8px 8px 24px' }}>
            <div style={{ ...type('title-medium'), padding: '8px 16px' }}>Share entry</div>
            <ListItem headline="Copy link" leading="link" interactive onClick={() => setSheetOpen(false)} />
            <ListItem headline="Download PDF" leading="picture_as_pdf" interactive onClick={() => setSheetOpen(false)} />
            <ListItem headline="Archive" leading="archive" interactive onClick={() => setSheetOpen(false)} />
          </div>
        </BottomSheet>
      </Section>
    </Page>
  );
}
