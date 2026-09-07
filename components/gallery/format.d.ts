/** 1234 → "1.2K", 15498 → "15.5K", 2000000 → "2M"; under 1000 unchanged. */
export function compactCount(n: number | null | undefined): string;
