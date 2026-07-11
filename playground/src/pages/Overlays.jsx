import React, { useState } from 'react';
import { Dialog } from 'design-kit/components/overlays/Dialog';
import { Menu } from 'design-kit/components/overlays/Menu';
import { Tooltip } from 'design-kit/components/overlays/Tooltip';
import { Button } from 'design-kit/components/actions/Button';
import { Page, Section, Row, Spec } from '../ui.jsx';

export function Overlays() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [iconDialogOpen, setIconDialogOpen] = useState(false);

  return (
    <Page title="Overlays" intro="Dialogs, menus, and tooltips.">
      <Section title="Dialog" intro="An identity component — themes restyle it via dk-dialog classes (iOS 26 blurs it).">
        <Row>
          <Button variant="tonal" onClick={() => setDialogOpen(true)}>Basic dialog</Button>
          <Button variant="outlined" onClick={() => setIconDialogOpen(true)}>Hero-icon dialog</Button>
        </Row>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          headline="Discard draft?"
          actions={
            <>
              <Button variant="text" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button variant="text" onClick={() => setDialogOpen(false)}>Discard</Button>
            </>
          }
        >
          Your edits to this entry will be lost. This can't be undone.
        </Dialog>
        <Dialog
          open={iconDialogOpen}
          onClose={() => setIconDialogOpen(false)}
          icon="delete"
          headline="Delete 3 entries?"
          actions={
            <>
              <Button variant="text" onClick={() => setIconDialogOpen(false)}>Cancel</Button>
              <Button variant="filled" onClick={() => setIconDialogOpen(false)}>Delete</Button>
            </>
          }
        >
          They'll be removed from every report.
        </Dialog>
      </Section>

      <Section title="Menu" intro="Renders the open surface; apps position it themselves.">
        <Menu
          style={{ display: 'inline-block' }}
          items={[
            { label: 'Rename', icon: 'edit' },
            { label: 'Duplicate', icon: 'content_copy' },
            { label: 'Download', icon: 'download', trailing: '⌘D' },
            { divider: true },
            { label: 'Delete', icon: 'delete' },
            { label: 'Locked action', icon: 'lock', disabled: true },
          ]}
        />
      </Section>

      <Section title="Tooltip" intro="Hover the targets.">
        <Row gap={32}>
          <Spec label="plain">
            <Tooltip label="Saves the entry">
              <Button variant="outlined" icon="save">Hover me</Button>
            </Tooltip>
          </Spec>
          <Spec label="rich">
            <Tooltip
              rich
              subhead="Keyboard shortcuts"
              body="Press ⌘S to save at any time, or ⌘⇧S to save a copy."
              actions={<Button variant="text">Learn more</Button>}
            >
              <Button variant="outlined" icon="keyboard">Hover me</Button>
            </Tooltip>
          </Spec>
        </Row>
      </Section>
    </Page>
  );
}
