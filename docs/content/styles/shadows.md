---
title: Shadows Utilities
api:
    classes: 
        - name: shadow-sm
          definition: "box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);"
        - name: shadow
          definition: "box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);"
        - name: shadow-lg
          definition: "box-shadow: 0 5px 15px -2px #aaa;"
        - name: shadow-none
          definition: "box-shadow: none;"
---

#### Default Box Shadow Map

```sass
$shadows: (
    'shadow-sm': 0 1px 1px rgba(0, 0, 0, 0.2),
    'shadow': 0 1px 3px 0 rgba(0, 0, 0, 0.2),
    'shadow-lg': 0 5px 15px -2px #aaa,
    'shadow-none': none,
);
```