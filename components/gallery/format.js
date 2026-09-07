/** 1234 → "1.2K", 15498 → "15.5K", 2000000 → "2M"; under 1000 unchanged. */
export function compactCount(n) {
  if (typeof n !== 'number' || !isFinite(n)) return n == null ? '' : String(n);
  const abs = Math.abs(n);
  if (abs < 1000) return String(n);
  const fmt = (v, suffix) => { const s = v.toFixed(v < 10 ? 1 : 0).replace(/\.0$/, ''); return s + suffix; };
  if (abs < 1e6) return fmt(n / 1e3, 'K');
  return fmt(n / 1e6, 'M');
}
