import React from 'react';

/**
 * Injects a <style> block once per unique id. Used by interactive components to
 * declare :hover / :focus-visible / :active state-layer rules that inline styles
 * can't express. Material 3 state layers are a translucent overlay of the
 * "on-" content color at 8% (hover) / 10% (focus, press).
 */
export function useStyleOnce(id, css) {
  React.useInsertionEffect
    ? React.useInsertionEffect(() => inject(id, css), [id])
    : inject(id, css);
}

function inject(id, css) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Base CSS shared by every component that paints an M3 state layer. */
export const STATE_LAYER_BASE = `
.md-sl { position: relative; isolation: isolate; }
.md-sl::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: currentColor; opacity: 0; pointer-events: none;
  transition: opacity 80ms linear; z-index: 0;
}
.md-sl:hover::after { opacity: var(--md-sys-state-hover-opacity, .08); }
.md-sl:focus-visible::after { opacity: var(--md-sys-state-focus-opacity, .1); }
.md-sl:active::after { opacity: var(--md-sys-state-pressed-opacity, .1); }
.md-sl > * { position: relative; z-index: 1; }
.md-sl:disabled, .md-sl[aria-disabled="true"] { pointer-events: none; }
`;
