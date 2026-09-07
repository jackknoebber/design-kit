import React, { useMemo, useState } from 'react';
import { Tile } from 'design-kit/components/gallery/Tile';
import { FacetRail } from 'design-kit/components/gallery/FacetRail';
import { QueryField } from 'design-kit/components/gallery/QueryField';
import { DetailPanel, DetailSection } from 'design-kit/components/gallery/DetailPanel';
import { SwatchRow } from 'design-kit/components/gallery/SwatchRow';
import { DensityControl } from 'design-kit/components/gallery/DensityControl';
import { Strip } from 'design-kit/components/gallery/Strip';
import { Chip } from 'design-kit/components/selection/Chip';
import { SegmentedButton } from 'design-kit/components/selection/SegmentedButton';
import { IconButton } from 'design-kit/components/actions/IconButton';
import { Switch } from 'design-kit/components/forms/Switch';
import { Button } from 'design-kit/components/actions/Button';
import { Page, Section, Row, Spec, type } from '../ui.jsx';

// ── sample library (no network: gradients stand in for previews) ──────────
const PALETTES = [
  ['#1f2a6b', '#5f7cff', '#c9d4ff'], ['#3a0f2e', '#c2308a', '#ffd1ec'], ['#0b3d2e', '#2fb38b', '#d6f5e6'],
  ['#3b2f05', '#e0b23a', '#fff1c2'], ['#2a1a4a', '#8d5cff', '#e6d9ff'], ['#0f2f3a', '#2aa8c9', '#d0f0f8'],
  ['#3a1a10', '#e0663a', '#ffd9c8'], ['#1a1a1a', '#8a8a8a', '#e6e6e6'], ['#0a2a52', '#3b7dd8', '#cfe3ff'],
];
const TITLES = ['Nike — Move to Zero', 'Spotify Wrapped', 'Figma Config opener', 'Stripe Sessions ident', 'Notion brand film', 'Airbnb Icons', 'Arc launch', 'Linear 2.0 reveal', 'Vercel Ship', 'Oatly packaging', 'Klim specimen', 'Rico stack'];
const TAGS = { visual: ['identity', 'packaging', 'typography', 'logo', 'wordmark', 'poster', '3d'], motion: ['pan', 'zoom', 'morph', 'reveal', 'kinetic type', 'bounce'], channel: ['instagram', 'vimeo', 'behance'] };
const RATIOS = [16 / 10, 16 / 9, 1, 4 / 5, 16 / 10, 21 / 9];
const CLIPS = Array.from({ length: 48 }, (_, i) => {
  const p = PALETTES[i % PALETTES.length];
  return {
    id: 7000 + i,
    title: TITLES[i % TITLES.length] + (i >= TITLES.length ? ` (${i})` : ''),
    ratio: RATIOS[i % RATIOS.length],
    palette: p,
    tags: { visual: [TAGS.visual[i % 7], TAGS.visual[(i * 3) % 7]], motion: [TAGS.motion[i % 6]], channel: [TAGS.channel[i % 3]] },
    colors: [{ hex: p[1], weight: 0.46, name: 'blue' }, { hex: p[0], weight: 0.31 }, { hex: p[2], weight: 0.14 }, { hex: '#f4f4f4', weight: 0.09, name: 'white' }],
    source: ['underconsideration.com', 'rico.supply', 'bpando.org'][i % 3],
  };
});
const Preview = ({ clip, moving }) => (
  <div style={{ position: 'absolute', inset: '-40%', background: `linear-gradient(${(clip.id * 37) % 360}deg, ${clip.palette[0]}, ${clip.palette[1]} 55%, ${clip.palette[2]})`, animation: moving ? `dkpg-drift ${6 + (clip.id % 5)}s linear infinite` : 'none' }} />
);
const DRIFT = `@keyframes dkpg-drift { from { transform: translate(-8%, -8%) rotate(0deg); } to { transform: translate(8%, 8%) rotate(3deg); } } @media (prefers-reduced-motion: reduce) { [style*="dkpg-drift"] { animation: none !important; } }`;

export function Gallery() {
  const [q, setQ] = useState('');
  const [chips, setChips] = useState([{ id: 't:identity', kind: 'tag', label: 'identity' }, { id: 'c:#5f7cff', kind: 'color', label: '#5f7cff' }]);
  const [railQ, setRailQ] = useState('');
  const [selected, setSelected] = useState(new Set(['identity']));
  const [mode, setMode] = useState(0); // 0 uniform · 1 masonry · 2 strips
  const [cols, setCols] = useState(5);
  const [moving, setMoving] = useState(true);
  const [square, setSquare] = useState(false);
  const [current, setCurrent] = useState(CLIPS[2]);
  const [panelMode, setPanelMode] = useState('side');

  const groups = useMemo(() => [
    { id: 'visual', label: 'Visual', facets: TAGS.visual.map((t, i) => ({ id: t, label: t, count: 1900 - i * 210, selected: selected.has(t) })) },
    { id: 'motion', label: 'Motion', facets: TAGS.motion.map((t, i) => ({ id: t, label: t, count: 6200 - i * 900, selected: selected.has(t) })) },
    { id: 'channel', label: 'Channel', facets: TAGS.channel.map((t, i) => ({ id: t, label: t, count: 3100 - i * 700, selected: selected.has(t) })) },
    { id: 'source', label: 'Source', facets: [{ id: 'uc', label: 'underconsideration.com', count: 14980 }, { id: 'rico', label: 'rico.supply', count: 812 }, { id: 'bp', label: 'bpando.org', count: 654 }] },
    { id: 'color', label: 'Color', facets: PALETTES.slice(0, 6).map((p, i) => ({ id: p[1], label: p[1], count: 900 - i * 120, swatch: p[1] })) },
  ], [selected]);
  const toggle = (f, g) => {
    if (g.id === 'color') { setChips((c) => c.some((x) => x.id === 'c:' + f.id) ? c : [...c, { id: 'c:' + f.id, kind: 'color', label: f.id, color: f.id }]); return; }
    if (g.id === 'source') { setChips((c) => c.some((x) => x.id === 's:' + f.id) ? c : [...c, { id: 's:' + f.id, kind: 'source', label: f.label }]); return; }
    setSelected((s) => { const n = new Set(s); n.has(f.id) ? n.delete(f.id) : n.add(f.id); return n; });
    setChips((c) => c.some((x) => x.id === 't:' + f.id) ? c.filter((x) => x.id !== 't:' + f.id) : [...c, { id: 't:' + f.id, kind: 'tag', label: f.label }]);
  };
  const removeChip = (chip) => { setChips((c) => c.filter((x) => x.id !== chip.id)); if (chip.kind === 'tag') setSelected((s) => { const n = new Set(s); n.delete(chip.label); return n; }); };
  const idx = CLIPS.findIndex((c) => c.id === current?.id);
  const prev = () => setCurrent(CLIPS[(idx - 1 + CLIPS.length) % CLIPS.length]);
  const next = () => setCurrent(CLIPS[(idx + 1) % CLIPS.length]);

  const tile = (clip, extra = {}) => (
    <Tile key={clip.id} title={clip.title} ratio={clip.ratio} aspect={square ? 'square' : 'native'} moving={moving} selected={current?.id === clip.id} onClick={() => setCurrent(clip)} badge={clip.id % 9 === 0 ? 'new' : undefined} {...extra}>
      <Preview clip={clip} moving={moving} />
    </Tile>
  );

  return (
    <Page title="Gallery" intro="The Loophole front-end kit: a wall of looping clips with a facet rail, one query field and a detail panel. Switch the design system to loophole and the dark theme to see it as intended; gradients stand in for previews here.">
      <style>{DRIFT}</style>

      <Section title="The wall" intro="Everything together. Uniform rows for ranked results, masonry for seeing a lot, strips per tag. Density, autoplay and square-or-native apply to all three.">
        <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr) 340px', height: 640, border: '1px solid var(--md-sys-color-outline-variant)', borderRadius: 'var(--md-sys-shape-corner-medium)', overflow: 'hidden', background: 'var(--md-sys-color-surface)' }}>
          <FacetRail groups={groups} query={railQ} onQuery={setRailQ} onToggle={toggle} limit={5}
            header={<div style={{ padding: '14px 14px 2px', fontFamily: 'var(--md-ref-typeface-brand)', fontWeight: 600, fontSize: 15 }}>Loophole</div>} />
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderBottom: '1px solid var(--md-sys-color-outline-variant)', flexWrap: 'wrap' }}>
              <QueryField value={q} onChange={setQ} chips={chips} onRemoveChip={removeChip} style={{ flex: '1 1 320px' }}
                trailing={<><IconButton icon="palette" size="xs" ariaLabel="Pick a color" /><IconButton icon="casino" size="xs" ariaLabel="Shuffle" /></>} />
              <SegmentedButton segments={[{ icon: 'grid_on' }, { icon: 'dashboard' }, { icon: 'view_agenda' }]} value={mode} onChange={(v) => setMode(Array.isArray(v) ? v[0] : v)} />
              <DensityControl value={cols} min={2} max={8} onChange={setCols} />
              <Switch label="Moving" checked={moving} onChange={setMoving} />
              <Switch label="Square" checked={square} onChange={setSquare} />
            </div>
            <div style={{ overflowY: 'auto', minHeight: 0, padding: 6 }}>
              {mode === 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 4 }}>
                  {CLIPS.map((c) => tile(c, { ratio: square ? 1 : 16 / 10, fit: 'cover' }))}
                </div>
              )}
              {mode === 1 && (
                <div style={{ columns: cols, columnGap: 4 }}>
                  {CLIPS.map((c) => <div key={c.id} style={{ breakInside: 'avoid', marginBottom: 4 }}>{tile(c)}</div>)}
                </div>
              )}
              {mode === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: 6 }}>
                  {TAGS.motion.slice(0, 4).map((t, i) => (
                    <Strip key={t} title={t} count={6200 - i * 900} onTitle={() => {}} tileWidth={Math.round(1400 / cols)}>
                      {CLIPS.filter((c) => c.tags.motion.includes(t)).map((c) => tile(c, { ratio: square ? 1 : 16 / 10 }))}
                    </Strip>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DetailPanel open={!!current} mode={panelMode} width={340} title={current?.title} onClose={() => setCurrent(null)} onPrev={prev} onNext={next} onToggleMode={() => setPanelMode((m) => (m === 'side' ? 'full' : 'side'))}
            related={current && <>
              <Strip title="Similar by color" tileWidth={panelMode === 'full' ? 180 : 110}>{CLIPS.filter((c) => c.palette === current.palette && c.id !== current.id).slice(0, 10).map((c) => tile(c, { ratio: 16 / 10, caption: false }))}</Strip>
              <Strip title="Similar by tags" tileWidth={panelMode === 'full' ? 180 : 110}>{CLIPS.filter((c) => c.tags.visual[0] === current.tags.visual[0] && c.id !== current.id).slice(0, 10).map((c) => tile(c, { ratio: 16 / 10, caption: false }))}</Strip>
            </>}
            media={current && <div style={{ position: 'relative', width: '100%', aspectRatio: `${current.ratio} / 1`, overflow: 'hidden' }}><Preview clip={current} moving={moving} /></div>}
            actions={<><IconButton icon="open_in_new" size="xs" ariaLabel="Open source" /><IconButton icon="download" size="xs" ariaLabel="Download" /></>}>
            {current && (
              <>
                <DetailSection label="Source"><div style={{ ...type('body-medium') }}>{current.source}</div></DetailSection>
                <DetailSection label="Colors"><SwatchRow colors={current.colors} labels onPick={(s) => setChips((c) => c.some((x) => x.id === 'c:' + s.hex) ? c : [...c, { id: 'c:' + s.hex, kind: 'color', label: s.hex, color: s.hex }])} /></DetailSection>
                {Object.entries(current.tags).map(([cat, list]) => (
                  <DetailSection key={cat} label={cat}><Row gap={6}>{list.map((t) => <Chip key={t} variant="filter" label={t} selected={selected.has(t)} onClick={() => toggle({ id: t, label: t }, { id: cat })} />)}</Row></DetailSection>
                ))}
              </>
            )}
          </DetailPanel>
        </div>
      </Section>

      <Section title="Tile" intro="Preview or poster, selection ring, keyboard focus, caption on hover, badge.">
        <Row align="flex-start">
          <Spec label="native 16:10 · moving"><div style={{ width: 200 }}>{tile(CLIPS[0])}</div></Spec>
          <Spec label="square · cover"><div style={{ width: 140 }}>{tile(CLIPS[1], { aspect: 'square' })}</div></Spec>
          <Spec label="vertical · contain"><div style={{ width: 200 }}>{tile(CLIPS[3], { fit: 'contain', ratio: 16 / 10 })}</div></Spec>
          <Spec label="selected"><div style={{ width: 200 }}>{tile(CLIPS[4], { selected: true })}</div></Spec>
          <Spec label="badge · still"><div style={{ width: 200 }}>{tile(CLIPS[9], { moving: false, badge: 'new' })}</div></Spec>
        </Row>
      </Section>

      <Section title="Query field" intro="Words plus chips: tag, color, source, and “like this”. Backspace on an empty input removes the last chip.">
        <div style={{ maxWidth: 640 }}>
          <QueryField value="wordmark" chips={[{ id: 1, kind: 'tag', label: 'identity' }, { id: 2, kind: 'color', label: '#e0b23a', color: '#e0b23a' }, { id: 3, kind: 'source', label: 'rico.supply' }, { id: 4, kind: 'like', label: 'like Airbnb Icons' }]} onRemoveChip={() => {}} onChange={() => {}} trailing={<IconButton icon="palette" size="xs" ariaLabel="Pick a color" />} />
        </div>
      </Section>

      <Section title="Swatches and density" intro="Swatch width follows coverage; the density slider sets columns.">
        <Row align="flex-start" gap={40}>
          <Spec label="weighted · labels"><SwatchRow colors={CLIPS[0].colors} labels selected={CLIPS[0].colors[0].hex} /></Spec>
          <Spec label="even"><SwatchRow colors={CLIPS[5].colors} weighted={false} /></Spec>
          <Spec label="density"><DensityControl value={cols} onChange={setCols} /></Spec>
        </Row>
      </Section>

      <Section title="Strip" intro="One horizontal row per tag, source or color; snaps and scrolls with the arrows.">
        <Strip title="kinetic type" count={1240} onTitle={() => {}} tileWidth={180}>{CLIPS.slice(0, 14).map((c) => tile(c, { ratio: 16 / 10 }))}</Strip>
      </Section>

      <Section title="Detail panel, overlay" intro="Media left, details right, related across the bottom, over a scrim. Esc closes, arrows move.">
        <Button variant="tonal" icon="open_in_full" onClick={() => { setCurrent(CLIPS[6]); setPanelMode('full'); }}>Open as overlay</Button>
      </Section>
    </Page>
  );
}
