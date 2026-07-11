import React, { useState } from 'react';
import { Chip } from 'design-kit/components/selection/Chip';
import { SegmentedButton } from 'design-kit/components/selection/SegmentedButton';
import { Page, Section, Row, Spec } from '../ui.jsx';

export function Selection() {
  const [filters, setFilters] = useState({ open: true, mine: false });
  const [seg, setSeg] = useState(0);
  const [multi, setMulti] = useState([0, 2]);

  return (
    <Page title="Selection" intro="Chips and segmented buttons.">
      <Section title="Chip — variants">
        <Row>
          <Spec label="assist">
            <Chip variant="assist" icon="calendar_month" label="Set reminder" />
          </Spec>
          <Spec label="filter (click)">
            <Chip
              variant="filter"
              label="Open"
              selected={filters.open}
              onClick={() => setFilters({ ...filters, open: !filters.open })}
            />
          </Spec>
          <Spec label="filter (click)">
            <Chip
              variant="filter"
              label="Assigned to me"
              selected={filters.mine}
              onClick={() => setFilters({ ...filters, mine: !filters.mine })}
            />
          </Spec>
          <Spec label="input · removable">
            <Chip variant="input" label="design-kit" onRemove={() => {}} />
          </Spec>
          <Spec label="suggestion">
            <Chip variant="suggestion" label="Try dark mode" />
          </Spec>
        </Row>
      </Section>

      <Section title="Chip — states">
        <Row>
          <Spec label="elevated">
            <Chip variant="assist" elevated icon="lightbulb" label="Elevated" />
          </Spec>
          <Spec label="disabled">
            <Chip variant="assist" disabled label="Disabled" />
          </Spec>
        </Row>
      </Section>

      <Section title="Segmented button">
        <Row align="flex-start">
          <Spec label="single select">
            <SegmentedButton
              segments={[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]}
              value={seg}
              onChange={setSeg}
            />
          </Spec>
          <Spec label="multi select · icons">
            <SegmentedButton
              multiple
              segments={[
                { label: 'Bold', icon: 'format_bold' },
                { label: 'Italic', icon: 'format_italic' },
                { label: 'Underline', icon: 'format_underlined' },
              ]}
              value={multi}
              onChange={setMulti}
            />
          </Spec>
        </Row>
      </Section>
    </Page>
  );
}
