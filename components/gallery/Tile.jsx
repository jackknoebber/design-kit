import React, { useEffect, useRef, useState } from 'react';
import { useStyleOnce } from '../core/stateLayer.js';

const TILE_CSS = `
.dk-tile { position: relative; display: block; overflow: hidden; background: var(--md-sys-color-surface-container-highest); border-radius: var(--md-sys-shape-corner-small); cursor: pointer; outline: none; }
.dk-tile > video, .dk-tile > img { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.dk-tile--cover > video, .dk-tile--cover > img { object-fit: cover; }
.dk-tile--contain > video, .dk-tile--contain > img { object-fit: contain; background: var(--md-sys-color-surface-container-lowest); }
.dk-tile--selected { box-shadow: inset 0 0 0 2px var(--md-sys-color-primary); }
.dk-tile:focus-visible { box-shadow: inset 0 0 0 2px var(--md-sys-color-primary), 0 0 0 2px var(--md-sys-color-surface), 0 0 0 4px var(--md-sys-color-primary); }
.dk-tile__caption { position: absolute; left: 0; right: 0; bottom: 0; padding: 18px 10px 10px; font: 500 12px/1.4 var(--md-ref-typeface-plain); color: var(--md-sys-color-on-surface); background: linear-gradient(to top, var(--md-sys-color-scrim) 0%, transparent 100%); opacity: 0; transition: opacity var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dk-tile:hover .dk-tile__caption, .dk-tile:focus-visible .dk-tile__caption, .dk-tile--selected .dk-tile__caption { opacity: 1; }
.dk-tile__badge { position: absolute; top: 6px; left: 6px; padding: 2px 6px; border-radius: var(--md-sys-shape-corner-extra-small); font: 500 10px/1.4 var(--md-ref-typeface-mono); background: var(--md-sys-color-inverse-surface); color: var(--md-sys-color-inverse-on-surface); }
.dk-tile__slot { position: absolute; inset: 0; }
@media (prefers-reduced-motion: reduce) { .dk-tile__caption { transition: none; } }
`;

/**
 * A clip in the wall. Plays the preview WebM when `moving`; otherwise shows
 * the poster and, when `hoverPlay`, plays only while hovered. `aspect`
 * "square" crops to 1:1; "native" keeps `ratio` (w/h) and letterboxes when
 * `fit` is "contain"; "auto" takes the media's own ratio (masonry), learned
 * once from the poster or video and then fixed so walls never reflow. Selection ring and keyboard focus come from tokens.
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
  const rootRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  // Once a tile has been on screen it keeps its source; only playback is
  // gated. Dropping the source would change the media's size and, in a
  // masonry wall, reflow every column under the user.
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (inView) setSeen(true); }, [inView]);
  // For aspect 'auto' the frame takes the media's real ratio the first time
  // it is known and never changes again; until then `ratio` holds the space.
  const [natural, setNatural] = useState(null);
  const learn = (w, h) => { if (w > 0 && h > 0 && natural == null) setNatural(w / h); };
  // Only tiles on (or near) the screen play; a wall of hundreds of clips
  // would otherwise decode everything at once, which is what makes phones lag.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver((es) => setInView(es.some((e) => e.isIntersecting)), { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const playing = !!src && inView && (moving || (hoverPlay && hover));

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
    else { v.pause(); try { v.currentTime = 0; } catch (_) {} }
  }, [playing, src]);

  const cls = ['dk-tile', `dk-tile--${aspect === 'auto' ? 'cover' : fit}`, selected && 'dk-tile--selected'].filter(Boolean).join(' ');
  const ar = aspect === 'square' ? '1 / 1' : aspect === 'auto' ? `${natural || ratio} / 1` : `${ratio} / 1`;

  return (
    <div
      ref={rootRef}
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
        <video ref={videoRef} src={seen ? src : undefined} poster={poster || undefined} muted loop playsInline preload={seen ? 'metadata' : 'none'}
          onLoadedMetadata={(e) => learn(e.currentTarget.videoWidth, e.currentTarget.videoHeight)} />
      ) : poster ? (
        <img src={poster} alt="" loading="lazy" onLoad={(e) => learn(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)} />
      ) : null}
      {src && poster && natural == null && <img src={poster} alt="" style={{ display: 'none' }} onLoad={(e) => learn(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)} />}
      {children && <div className="dk-tile__slot">{children}</div>}
      {badge && <span className="dk-tile__badge">{badge}</span>}
      {caption && title && <div className="dk-tile__caption">{title}</div>}
    </div>
  );
}
