---
title: Colors
---

# Colors

Kickstart uses the [Tailwind CSS v3](https://v3.tailwindcss.com/docs/customizing-colors) colors: red, orange, yellow, green, blue, purple and gray, each in shades 50 to 950. The same values feed the color utilities, the `--ks-*` tokens, the Sass `get_color()` function and the state colors of the components.

## Palette

<Demo name="ColorPalette" :min-height="600" />

## Using the palette

| Where | Example |
| --- | --- |
| Text color | <code>.text-red-700</code> |
| Background color | <code>.bg-blue-100</code>, <code>.hover:bg-blue-200</code> |
| Border color | <code>.border-gray-300</code> |
| CSS | <code>color: var(--ks-green-700);</code> |
| Sass | <code>color: get_color("purple", 500);</code> |

`transparent`, `white` and `black` have classes too: <code>.bg-white</code>, <code>.text-black</code>, <code>.border-transparent</code>.

See [Text](./text), [Background](./background-colors) and [Borders](./borders) for every class.

## State colors

The success, info, warning and error colors of alerts, badges, buttons, steps and form errors are palette shades:

| State | Text | Background | Border | Sass variables |
| --- | --- | --- | --- | --- |
| success | green-700 | green-100 | green-200 | <code>$state-success</code>, <code>$state-success-bg</code>, <code>$state-success-border</code> |
| info | blue-700 | blue-100 | blue-200 | <code>$state-info</code>, <code>$state-info-bg</code>, <code>$state-info-border</code> |
| warning | yellow-800 | yellow-100 | yellow-200 | <code>$state-warning</code>, <code>$state-warning-bg</code>, <code>$state-warning-border</code> |
| error | red-700 | red-100 | red-200 | <code>$state-error</code>, <code>$state-error-bg</code>, <code>$state-error-border</code> |

Danger buttons use red-700, and red-800 on hover. Every text and background pair has a contrast of at least 4.5:1 (WCAG AA).

<Demo name="StateColors" />

The tokens are <code>--ks-state-success</code>, <code>--ks-state-success-bg</code>, <code>--ks-state-success-border</code> and so on. The brand colors (<code>--ks-brand-primary</code> and the others) do not come from the palette.

## Changing the palette

Override `$colors` before you import the kickstart styles. A map you give replaces the default map, so merge it to keep the other colors. The state colors always use the default palette (`$ks-palette`); to change them, set the `$state-*` variables.

```scss
@import "~kickstart-ui/src/styles/variables/colors";

$colors: map-merge($colors, (
    "teal": (
        100: #ccfbf1,
        500: #14b8a6,
        900: #134e4a,
    ),
));
```

With the plain CSS build, set the tokens instead:

```css
:root {
    --ks-blue-700: #1e40af;
    --ks-state-info: var(--ks-blue-700);
}
```

The utility classes in the CSS build have fixed values, so a changed token does not change <code>.text-blue-700</code>.
