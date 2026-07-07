# ios26 — Figma ingestion report (2026-07-07)

File: https://www.figma.com/file/A8zIlH6GjqFr69Fh3tHGaA — "iOS and iPadOS 26 (Community)"

## Named color styles (22)
- Labels/Primary: `#000000`
- Labels/Tertiary: `#3c3c43`
- Grays/White: `#ffffff`
- Vibrant Labels/Dark/Vibrant Secondary: `#999999`
- Vibrant Labels/Dark/Vibrant Primary: `#ffffff`
- Vibrant Fills/Dark/Vibrant Primary: `#333333`
- Vibrant Labels/Dark/Vibrant Tertiary: `#404040`
- Colors/Blue: `#0088ff`
- Fills/Primary: `#787878`
- Colors/Pink: `#ff2d55`
- Grays/Gray 2: `#aeaeb2`
- Vibrant Fills/Dark/Vibrant Tertiary: `#121212`
- Vibrant Labels/Dark/Vibrant Quaternary: `#262626`
- Vibrant Fills/Light/Vibrant Tertiary: `#ededed`
- Vibrant Fills/Light/Vibrant Secondary: `#e0e0e0`
- Vibrant Fills/Light/Vibrant Primary: `#cccccc`
- Vibrant Labels/Light/Vibrant Tertiary: `#7f7f7f`
- Vibrant Labels/Light/Vibrant Secondary: `#7f7f7f`
- Vibrant Labels/Light/Vibrant Primary: `#000000`
- Vibrant Labels/Light/Vibrant Quaternary: `#7f7f7f`
- Labels/Secondary: `#3c3c43`
- Fills/Tertiary: `#767680`

## Text styles (34)
- Title1/Emphasized: SF Pro 700 28px/34px
- Body/Regular: SF Pro 400 17px/22px
- Large Title/Emphasized: SF Pro 700 34px/41px
- Headline/Regular: SF Pro 590 17px/22px
- Body/Emphasized: SF Pro 590 17px/22px
- Title3/Regular: SF Pro 400 20px/25px
- Subheadline/Regular: SF Pro 400 15px/20px
- Caption2/Regular: SF Pro 400 11px/13px
- Footnote/Regular: SF Pro 400 13px/18px
- Footnote/Emphasized: SF Pro 590 13px/18px
- Caption1/Regular: SF Pro 400 12px/16px
- Callout/Regular: SF Pro 400 16px/21px
- Title2/Regular: SF Pro 400 22px/28px
- Title1/Regular: SF Pro 400 28px/34px
- Large Title/Regular: SF Pro 400 34px/41px
- Caption2/Emphasized Italic: SF Pro 590 11px/13px
- Caption2/Italic: SF Pro 400 11px/13px
- Caption2/Emphasized: SF Pro 590 11px/13px
- Caption1/Emphasized Italic: SF Pro 508 12px/16px
- Caption1/Italic: SF Pro 400 12px/16px
- Caption1/Emphasized: SF Pro 510 12px/16px
- Footnote/Emphasized Italic: SF Pro 590 13px/18px
- Footnote/Italic: SF Pro 400 13px/18px
- Subheadline/Emphaized Italic: SF Pro 590 15px/20px
- Subheadline/Italic: SF Pro 400 15px/20px
- Subheadline/Emphasized: SF Pro 590 15px/20px
- Callout/Emphasized Italic: SF Pro 590 16px/21px
- Callout/Italic: SF Pro 400 16px/21px
- Callout/Emphasized: SF Pro 590 16px/21px
- Body/Emphasized Italic: SF Pro 590 17px/22px
- Body/Italic: SF Pro 400 17px/22px
- Headline/Italic: SF Pro 590 17px/22px
- Title3/Emphasized: SF Pro 590 20px/25px
- Title2/Emphasized: SF Pro 700 22px/28px

Most used font family in the file: **SF Pro**

## Corner radii (top by frequency)
- 100px (2196 nodes)
- 296px (1767 nodes)
- 1000px (1709 nodes)
- 8.5px (940 nodes)
- 50px (640 nodes)
- 34px (236 nodes)

## Drop shadows (top by frequency)
- `0px 2px 25px 0px #000000` (509 nodes)
- `0px 1px 8px 0px #000000` (40 nodes)
- `0px 0px 2px 0px #000000` (40 nodes)
- `0px 2px 20px 0px #000000` (27 nodes)
- `0px 10px 100px 0px #000000` (20 nodes)
- `0px 6px 13px 0px #000000` (18 nodes)
- `0px 0.5px 4px 0px #000000` (18 nodes)
- `0px 3px 14px 6px #000000` (12 nodes)

## Hand-tuning checklist
1. Set primary/on-primary (and containers) to the file's REAL brand pairing.
2. Assign the neutral palette to the surface ramp (canvas/cards/fields).
3. Map the radii above onto --md-sys-shape-corner-* in the theme.
4. If shadows are hard/offset, override --md-sys-elevation-level1..3.
5. Thick borders? Set --dk-border-width and outline/outline-variant colors.
6. Icons: pick a set and add a map in components/core/icon-sets.js.
