Material 3 common button — primary tappable action; use filled for the top action on a screen, tonal/elevated/outlined for secondary, text for low-emphasis.

```jsx
<Button variant="filled" icon="add">New</Button>
<Button variant="tonal" size="m">Tonal</Button>
<Button variant="outlined" shape="square">Outlined</Button>
<Button variant="text">Skip</Button>
```

Variants: `filled` (highest emphasis), `tonal`, `elevated`, `outlined`, `text`. Sizes `xs|s|l|m|xl` follow the M3 expressive scale (32/40/56/96/136px). `shape="square"` swaps the pill radius for a rounded-rect; `icon` / `trailingIcon` take Material Symbols names.
