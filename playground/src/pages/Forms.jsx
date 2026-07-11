import React, { useState } from 'react';
import { TextField } from 'design-kit/components/forms/TextField';
import { Checkbox } from 'design-kit/components/forms/Checkbox';
import { Radio } from 'design-kit/components/forms/Radio';
import { Switch } from 'design-kit/components/forms/Switch';
import { Slider } from 'design-kit/components/forms/Slider';
import { M3Select, M3DateField, M3TextArea } from 'design-kit/native-fields';
import { Page, Section, Row, Spec } from '../ui.jsx';

export function Forms() {
  const [name, setName] = useState('Jack');
  const [search, setSearch] = useState('');
  const [fruit, setFruit] = useState('pear');
  const [date, setDate] = useState('2026-07-11');
  const [notes, setNotes] = useState('Multi-line text lives in the same field shell.');
  const [checks, setChecks] = useState({ a: true, b: false });
  const [radio, setRadio] = useState('daily');
  const [on, setOn] = useState(true);
  const [volume, setVolume] = useState(40);

  return (
    <Page title="Forms" intro="Text fields, native field wrappers, and selection controls.">
      <Section title="Text field" intro="One of the five identity components — themes restructure its anatomy via dk-* classes.">
        <Row align="flex-start">
          <Spec label="filled" minWidth={220}>
            <TextField variant="filled" label="Name" value={name} onChange={setName} style={{ width: 220 }} />
          </Spec>
          <Spec label="outlined" minWidth={220}>
            <TextField variant="outlined" label="Name" value={name} onChange={setName} style={{ width: 220 }} />
          </Spec>
          <Spec label="icons + supporting text" minWidth={220}>
            <TextField
              variant="filled"
              label="Search"
              placeholder="Type to search"
              leadingIcon="search"
              trailingIcon="close"
              supportingText="Try a project name"
              value={search}
              onChange={setSearch}
              style={{ width: 220 }}
            />
          </Spec>
        </Row>
        <Row align="flex-start" style={{ marginTop: 20 }}>
          <Spec label="error" minWidth={220}>
            <TextField
              variant="outlined"
              label="Email"
              defaultValue="not-an-email"
              error
              supportingText="Enter a valid address"
              style={{ width: 220 }}
            />
          </Spec>
          <Spec label="disabled" minWidth={220}>
            <TextField variant="filled" label="Locked" defaultValue="Read only" disabled style={{ width: 220 }} />
          </Spec>
        </Row>
      </Section>

      <Section title="Native fields" intro="Native select / date / textarea wrapped in the filled field shell.">
        <Row align="flex-start">
          <Spec label="M3Select" minWidth={220}>
            <M3Select label="Fruit" value={fruit} onChange={(e) => setFruit(e.target.value)} style={{ width: 220 }}>
              <option value="apple">Apple</option>
              <option value="pear">Pear</option>
              <option value="plum">Plum</option>
            </M3Select>
          </Spec>
          <Spec label="M3DateField" minWidth={220}>
            <M3DateField label="Due date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: 220 }} />
          </Spec>
          <Spec label="M3TextArea" minWidth={260}>
            <M3TextArea label="Notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: 260 }} />
          </Spec>
        </Row>
      </Section>

      <Section title="Checkbox">
        <Row>
          <Checkbox checked={checks.a} onChange={(v) => setChecks({ ...checks, a: v })} label="Checked" />
          <Checkbox checked={checks.b} onChange={(v) => setChecks({ ...checks, b: v })} label="Unchecked" />
          <Checkbox indeterminate label="Indeterminate" />
          <Checkbox checked error label="Error" />
          <Checkbox disabled label="Disabled" />
        </Row>
      </Section>

      <Section title="Radio">
        <Row>
          {['daily', 'weekly', 'monthly'].map((v) => (
            <Radio
              key={v}
              name="cadence"
              value={v}
              checked={radio === v}
              onChange={setRadio}
              label={v[0].toUpperCase() + v.slice(1)}
            />
          ))}
          <Radio disabled label="Disabled" />
        </Row>
      </Section>

      <Section title="Switch">
        <Row>
          <Switch checked={on} onChange={setOn} label="Notifications" />
          <Switch checked={on} onChange={setOn} icons label="With icon" />
          <Switch checked disabled label="Disabled on" />
          <Switch disabled label="Disabled off" />
        </Row>
      </Section>

      <Section title="Slider">
        <Row align="flex-start" style={{ maxWidth: 640 }}>
          <Spec label={`continuous · ${volume}`} minWidth={280}>
            <Slider value={volume} onChange={setVolume} showValue style={{ width: 280 }} />
          </Spec>
          <Spec label="stepped (step 10)" minWidth={280}>
            <Slider defaultValue={60} step={10} style={{ width: 280 }} />
          </Spec>
          <Spec label="disabled" minWidth={280}>
            <Slider defaultValue={30} disabled style={{ width: 280 }} />
          </Spec>
        </Row>
      </Section>
    </Page>
  );
}
