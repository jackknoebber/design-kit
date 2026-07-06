Material 3 form controls — selection and input primitives bound to the M3 color roles.

```jsx
<Checkbox checked label="Subscribe" onChange={setOn} />
<Radio name="plan" checked label="Monthly" />
<Switch checked onChange={setOn} />
<TextField variant="outlined" label="Email" leadingIcon="mail" />
<Slider defaultValue={40} showValue />
```

`Checkbox` supports `indeterminate` and `error`. `Switch` handle grows when on and shows a check. `TextField` has filled/outlined variants with a floating label, `leadingIcon`/`trailingIcon`, `supportingText` and `error`. `Slider` is continuous with optional `showValue`.
