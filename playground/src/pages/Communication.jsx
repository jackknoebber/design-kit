import React from 'react';
import { Badge } from 'design-kit/components/communication/Badge';
import { ProgressIndicator } from 'design-kit/components/communication/ProgressIndicator';
import { Snackbar } from 'design-kit/components/communication/Snackbar';
import { Icon } from 'design-kit/components/core/Icon';
import { Page, Section, Row, Spec } from '../ui.jsx';

export function Communication() {
  return (
    <Page title="Communication" intro="Badges, progress indicators, and snackbars.">
      <Section title="Badge">
        <Row gap={32}>
          <Spec label="dot">
            <Badge dot>
              <Icon name="notifications" size={26} />
            </Badge>
          </Spec>
          <Spec label="count">
            <Badge count={3}>
              <Icon name="chat_bubble" size={26} />
            </Badge>
          </Spec>
          <Spec label="max 99">
            <Badge count={128} max={99}>
              <Icon name="mail" size={26} />
            </Badge>
          </Spec>
        </Row>
      </Section>

      <Section title="Progress — linear">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 420 }}>
          <Spec label="determinate · 65%">
            <ProgressIndicator variant="linear" value={65} style={{ width: '100%', minWidth: 240 }} />
          </Spec>
          <Spec label="indeterminate">
            <ProgressIndicator variant="linear" style={{ width: '100%', minWidth: 240 }} />
          </Spec>
        </div>
      </Section>

      <Section title="Progress — circular">
        <Row gap={32}>
          <Spec label="determinate · 65%">
            <ProgressIndicator variant="circular" value={65} />
          </Spec>
          <Spec label="indeterminate">
            <ProgressIndicator variant="circular" />
          </Spec>
        </Row>
      </Section>

      <Section title="Snackbar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
          <Snackbar message="Entry saved" />
          <Snackbar message="Timer stopped" action="Undo" onAction={() => {}} onClose={() => {}} />
        </div>
      </Section>
    </Page>
  );
}
