---
title: Text Utilities
api: 
    classes:
        - name: normal
          definition: "font-weight: normal;"
        - name: bold
          definition: "font-weight: bold;"
        - name: italic
          definition: "font-style: italic;"
        - name: lowercase
          definition: "text-transform: lowercase;"
        - name: uppercase
          definition: "text-transform: uppercase;"
        - name: underline
          definition: "text-decoration: underline;"
        - name: strike-through
          definition: "text-decoration: line-through;"
        - name: text-right
          definition: "text-align: right;"
        - name: text-left
          definition: "text-align: left;"
        - name: text-center
          definition: "text-align: center;"
        - name: muted
          definition: "color: $text-muted; // #999 !default"
        - name: heading
          definition: |
            font-weight: bold;
            display: block;
            margin-bottom: rem($heading-mb); // 0.625rem !default
---

### Font Size

<text-font-size-map></text-font-size-map>

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

<text-color-map></text-color-map>

#### Default Color Map

```sass
$colors: (
    "transparent": transparent,
    "white": #ffffff,
    "black": #000000,
    "gray": (
        100: #E4E7EB,
        200: #CBD2D9,
        300: #9AA5B1,
        400: #7B8794,
        500: #616E7C,
        600: #52606D,
        700: #3E4C59,
        800: #323F4B,
        900: #1F2933
    ),
    "orange": (
        100: #FAB38B,
        200: #EF8E58,
        300: #E67635,
        400: #D25028,
        500: #C65D21,
        600: #AB4E19,
        700: #8C3D10,
        800: #77340D,
        900: #572508
    ),
    "blue": (
        100: #D1EEFC,
        200: #A7D8F0,
        300: #7CC1E4,
        400: #55AAD4,
        500: #3994C1,
        600: #2D83AE,
        700: #1D6F98,
        800: #166086,
        900: #0B4F71
    ),
    "purple": (
        100: #CFBCF2,
        200: #A081D9,
        300: #8662C7,
        400: #724BB7,
        500: #653CAD,
        600: #51279B,
        700: #421987,
        800: #34126F,
        900: #240754
    ),
    "green": (
        100: #C1EAC5,
        200: #A3D9A5,
        300: #7BC47F,
        400: #57AE5B,
        500: #3F9142,
        600: #2F8132,
        700: #207227,
        800: #0E5814,
        900: #05400A
    ),
    "red": (
        100: #FACDCD,
        200: #F29B9B,
        300: #E66A6A,
        400: #D64545,
        500: #BA2525,
        600: #A61B1B,
        700: #911111,
        800: #780A0A,
        900: #610404
    )
);
```