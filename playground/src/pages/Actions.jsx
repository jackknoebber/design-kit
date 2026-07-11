import React, { useState } from 'react';
import { Button } from 'design-kit/components/actions/Button';
import { IconButton } from 'design-kit/components/actions/IconButton';
import { Fab } from 'design-kit/components/actions/Fab';
import { Page, Section, Row, Spec } from '../ui.jsx';

export function Actions() {
  const [liked, setLiked] = useState(true);
  return (
    <Page title="Actions" intro="Buttons, icon buttons, and FABs.">
      <Section title="Button — variants">
        <Row>
          {['filled', 'tonal', 'elevated', 'outlined', 'text'].map((v) => (
            <Spec key={v} label={v}>
              <Button variant={v}>Label</Button>
            </Spec>
          ))}
          <Spec label="disabled">
            <Button variant="filled" disabled>Label</Button>
          </Spec>
        </Row>
      </Section>

      <Section title="Button — sizes" intro="M3 expressive sizes: 32 / 40 / 56 / 96 / 136 px tall.">
        <Row align="flex-end">
          {['xs', 's', 'm', 'l', 'xl'].map((s) => (
            <Spec key={s} label={s}>
              <Button variant="tonal" size={s}>Label</Button>
            </Spec>
          ))}
        </Row>
      </Section>

      <Section title="Button — shape & icons">
        <Row>
          <Spec label="round (default)">
            <Button variant="filled" shape="round">Round</Button>
          </Spec>
          <Spec label="square">
            <Button variant="filled" shape="square">Square</Button>
          </Spec>
          <Spec label="leading icon">
            <Button variant="tonal" icon="add">Create</Button>
          </Spec>
          <Spec label="trailing icon">
            <Button variant="outlined" trailingIcon="chevron_right">Next</Button>
          </Spec>
        </Row>
      </Section>

      <Section title="Icon button">
        <Row>
          {['standard', 'filled', 'tonal', 'outlined'].map((v) => (
            <Spec key={v} label={v}>
              <IconButton variant={v} icon="settings" ariaLabel="Settings" />
            </Spec>
          ))}
          <Spec label="toggle (click me)">
            <IconButton
              variant="tonal"
              icon="favorite"
              selected={liked}
              onClick={() => setLiked(!liked)}
              ariaLabel="Like"
            />
          </Spec>
          <Spec label="disabled">
            <IconButton variant="filled" icon="delete" disabled ariaLabel="Delete" />
          </Spec>
        </Row>
      </Section>

      <Section title="FAB">
        <Row>
          <Spec label="small">
            <Fab size="small" icon="edit" ariaLabel="Edit" />
          </Spec>
          <Spec label="regular">
            <Fab icon="add" ariaLabel="Add" />
          </Spec>
          <Spec label="large">
            <Fab size="large" icon="add" ariaLabel="Add" />
          </Spec>
          <Spec label="secondary">
            <Fab color="secondary" icon="edit" ariaLabel="Edit" />
          </Spec>
          <Spec label="tertiary">
            <Fab color="tertiary" icon="check" ariaLabel="Done" />
          </Spec>
          <Spec label="surface · lowered">
            <Fab color="surface" lowered icon="search" ariaLabel="Search" />
          </Spec>
          <Spec label="extended">
            <Fab extended icon="add" label="Compose" />
          </Spec>
        </Row>
      </Section>
    </Page>
  );
}
