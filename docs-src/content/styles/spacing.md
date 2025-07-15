---
title: Spacing Utilities
api: 
    classes:
        - name: collapse
          definition: |
            padding-left: 0 !important;
            padding-right: 0 !important;
---

### Spacing Default Map

There are three types of spacing utilities, padding, margin, and negative margin. Each of these has the similar class name with a different prefix. 

<div class="basic-block">

Prefixes:
- padding - "p" 
- margin - "m" 
- negative margin - "-m"

Modifiers: 
- All - "{prefix}-{size}"
- Top - "{prefix}**t**-{size}"
- Bottom - "{prefix}**b**-{size}"
- Right - "{prefix}**r**-{size}"
- Left - "{prefix}**l**-{size}"
- Top & Bottom - "{prefix}**y**-{size}"
- Right & Left - "{prefix}**x**-{size}"
 
</div>

#### Default Sizing Map

```sass
$spacing: (
    '0': 0,
    '0\\.5': 0.125rem,
    '1': 0.25rem,
    '1\\.5': 0.375rem,
    '2': 0.5rem,
    '2\\.5': 0.625rem,
    '3': 0.75rem,
    '4': 1rem,
    '5': 1.25rem,
    '6': 1.5rem,
    '8': 2rem,
    '10': 2.5rem,
    '12': 3rem,
    '16': 4rem,
    '20': 5rem,
    '24': 6rem,
    '32': 8rem,
    '40': 10rem,
    '48': 12rem,
    '56': 14rem,
    '64': 16rem,
    '72': 18rem,
    '80': 20rem,
    '96': 24rem
);
```

<spacing-map></spacing-map>