import { useSyncExternalStore } from 'react';

// The active design system = <html data-design="...">, 'm3' when unset.
// Components that must BRANCH on the design (e.g. Icon picking an icon set)
// subscribe here; pure styling should go through tokens/theme CSS instead.

function subscribe(callback) {
  const mo = new MutationObserver(callback);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-design'] });
  return () => mo.disconnect();
}

const getSnapshot = () => document.documentElement.dataset.design || 'm3';

export function useDesign() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'm3');
}
