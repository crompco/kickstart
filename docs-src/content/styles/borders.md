---
title: Border Utilities
api:
    classes:
        - name: rounded-none
          definition: "border-radius: 0;"
        - name: rounded-sm
          definition: "border-radius: 0.125rem;"
        - name: rounded
          definition: "border-radius: 0.25rem;"
        - name: rounded-md
          definition: "border-radius: 0.375rem;"
        - name: rounded-lg
          definition: "border-radius: 0.5rem;"
        - name: rounded-full
          definition: "border-radius: 9999px;"
        - name: border-solid
          definition: "border-style: solid;"
        - name: border-dashed
          definition: "border-style: dashed;"
        - name: border-dotted
          definition: "border-style: dotted;"
        - name: border-double
          definition: "border-style: double;"
        - name: border-hidden
          definition: "border-style: hidden;"
        - name: border-none
          definition: "border-style: none;"
---

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

<border-size-map></border-size-map>

#### Border Color

<border-color-map></border-color-map>