---
title: Text Utilities
---

# Text Utilities

## Classes

| Name | Definition |
| --- | --- |
| <code>normal</code> | <code>font-weight: normal;</code> |
| <code>bold</code> | <code>font-weight: bold;</code> |
| <code>italic</code> | <code>font-style: italic;</code> |
| <code>lowercase</code> | <code>text-transform: lowercase;</code> |
| <code>uppercase</code> | <code>text-transform: uppercase;</code> |
| <code>underline</code> | <code>text-decoration: underline;</code> |
| <code>strike-through</code> | <code>text-decoration: line-through;</code> |
| <code>text-right</code> | <code>text-align: right;</code> |
| <code>text-left</code> | <code>text-align: left;</code> |
| <code>text-center</code> | <code>text-align: center;</code> |
| <code>muted</code> | <code>color: $text-muted; // #999 !default</code> |
| <code>heading</code> | <code>font-weight: bold;<br>display: block;<br>margin-bottom: rem($heading-mb); // 0.625rem !default</code> |

### Font Size

<Demo name="TextFontSizeMap" />

#### Default Font Size Map

```sass
$fontSize: (
    'xs': 0.75rem,
    'sm': 0.875rem,
    'base': 1rem,
    'lg': 1.25rem,
    'xl': 1.5rem,
    '2xl': 1.875rem,
    '3xl': 2rem,
);
```

### Text Colors

<Demo name="TextColorMap" />

The classes use the [color palette](./colors).
