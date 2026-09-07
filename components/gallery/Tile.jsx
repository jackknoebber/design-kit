import React, { useEffect, useRef, useState } from 'react';
import { useStyleOnce } from '../core/stateLayer.js';

const TILE_CSS = `
.dk-tile { position: relative; display: block; overflow: hidden; background: var(--md-sys-color-surface-container-highest); border-radius: var(--md-sys-shape-corner-small); cursor: pointer; outline: none; }
.dk-tile > video, .dk-tile > img { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.dk-tile--auto > video, .dk-tile--auto > img { position: static; height: auto; }
.dk-tile--cover > video, .dk-tile--cover > img { object-fit: cover; }
.dk-tile--contain > video, .dk-tile--contain > img { object-fit: contain; background: var(--md-sys-color-surface-container-lowest); }
.dk-tile--selected { box-shadow: inset 0 0 0 2px var(--md-sys-color-primary); }
.dk-tile:focus-visible { box-shadow: inset 0 0 0 2px var(--md-sys-color-primary), 0 0 0 2px var(--md-sys-color-surface), 0 0 0 4px var(--md-sys-color-primary); }
.dk-tile__caption { position: absolute; left: 0; right: 0; bottom: 0; padding: 6px 8px; font: 500 12px/1.3 var(--md-ref-typeface-plain); color: var(--md-sys-color-on-surface); background: linear-gradient(to top, var(--md-sys-color-scrim) 0%, transparent 100%); opacity: 0; transition: opacity var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dk-tile:hover .dk-tile__caption, .dk-tile:focus-visible .dk-tile__caption, .dk-tile--selected .dk-tile__caption { opacity: 1; }
.dk-tile__badge { position: absolute; top: 6px; left: 6px; padding: 2px 6px; border-radius: var(--md-sys-shape-corner-extra-small); font: 500 10px/1.4 var(--md-ref-typeface-mono); background: var(--md-sys-color-inverse-surface); color: var(--md-sys-color-inverse-on-surface); }
.dk-tile__slot { position: absolute; inset: 0; }
@media (prefers-reduced-motion: reduce) { .dk-tile__caption { transition: none; } }
`;

/**
 * A clip in the wall. Plays the preview WebM when `moving`; otherwise shows
 * the poster and, when `hoverPlay`, plays only while hovered. `aspect`
 * "square" crops to 1:1; "native" keeps `ratio` (w/h) and letterboxes when
 * `fit` is "contain"; "auto" lets the media set the height (masonry). Selection ring and keyboard focus come from tokens.
 */
export function Tile({
  src,
  poster,
  title = '',
  ratio = 16 / 10,
  aspect = 'native',
  fit = 'cover',
  moving = true,
  hoverPlay = true,
  selected = false,
  badge,
  caption = true,
  onClick,
  onDoubleClick,
  children,
  style = {},
  ...rest
}) {
  useStyleOnce('dk-tile', TILE_CSS);
  const videoRef = useRef(null);
  const [hover, setHover] = useState(false);
  const playing = !!src && (moving || (hoverPlay && hover));

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
    else { v.pause(); try { v.currentTime = 0; } catch (_) {} }
  }, [playing, src]);

  const cls = ['dk-tile', `dk-tile--${fit}`, aspect === 'auto' && 'dk-tile--auto', selected && 'dk-tile--selected'].filter(Boolean).join(' ');
  // 'auto' lets the media set the height (masonry); poster-less auto tiles
  // still get a frame from `ratio` so the wall doesn't collapse while loading.
  const ar = aspect === 'square' ? '1 / 1' : aspect === 'auto' ? (src || poster ? undefined : `${ratio} / 1`) : `${ratio} / 1`;

  return (
    <div
      className={cls}
      role="button"
      tabIndex={0}
      aria-label={title || undefined}
      aria-pressed={selected || undefined}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick && onClick(e); } }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ aspectRatio: ar, ...style }}
      {...rest}
    >
      {src ? (
        <video ref={videoRef} src={src} poster={poster || undefined} muted loop playsInline preload="metadata" />
      ) : poster ? (
        <img src={poster} alt="" loading="lazy" />
      ) : null}
      {children && <div className="dk-tile__slot">{children}</div>}
      {badge && <span className="dk-tile__badge">{badge}</span>}
      {caption && title && <div className="dk-tile__caption">{title}</div>}
    </div>
  );
}
