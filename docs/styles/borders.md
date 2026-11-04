---
title: Border Utilities
---

# Border Utilities

## Classes

| Name | Definition |
| --- | --- |
| <code>rounded-none</code> | <code>border-radius: 0;</code> |
| <code>rounded-sm</code> | <code>border-radius: 0.125rem;</code> |
| <code>rounded</code> | <code>border-radius: 0.25rem;</code> |
| <code>rounded-md</code> | <code>border-radius: 0.375rem;</code> |
| <code>rounded-lg</code> | <code>border-radius: 0.5rem;</code> |
| <code>rounded-full</code> | <code>border-radius: 9999px;</code> |
| <code>border-solid</code> | <code>border-style: solid;</code> |
| <code>border-dashed</code> | <code>border-style: dashed;</code> |
| <code>border-dotted</code> | <code>border-style: dotted;</code> |
| <code>border-double</code> | <code>border-style: double;</code> |
| <code>border-hidden</code> | <code>border-style: hidden;</code> |
| <code>border-none</code> | <code>border-style: none;</code> |

#### Default Border Radius Map

```sass
$rounded: (
    'rounded-none': 0,
    'rounded-sm': 0.125rem,
    'rounded': 0.25rem,
    'rounded-md': 0.375rem,
    'rounded-lg': 0.5rem,
    'rounded-full': 9999px,
);
```

#### Border Size

```sass
$border_sizing: (
    '0': 0,
    '2': 2px,
    '4': 4px,
    '8': 8px
);
```

<Demo name="BorderSizeMap" />

#### Border Color

<Demo name="BorderColorMap" />
