---
title: Buttons
---

# Buttons

<Demo name="PageKsButton" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>disabled</code> | <code>Boolean</code> | <code>False</code> | Whether the button is disabled or not |
| <code>danger</code> | <code>Boolean</code> | <code>False</code> | Styles the button with the danger style (red) |
| <code>outline</code> | <code>Boolean</code> | <code>False</code> | Styles the button with the outline style |
| <code>spin</code> | <code>Boolean</code> | <code>False</code> | Shows the spinner on the button |
| <code>spinColor</code> | <code>String</code> | <code>null</code> | The color of the spinner |
| <code>spinSize</code> | <code>String</code> | <code>small</code> | The size of the button spinner (small, tiny). Tiny is helpful for smaller width buttons |
| <code>tiny</code> | <code>Boolean</code> | <code>False</code> | Changes the size of the button |
| <code>small</code> | <code>Boolean</code> | <code>False</code> | Changes the size of the button |
| <code>large</code> | <code>Boolean</code> | <code>False</code> | Changes the size of the button |
| <code>el</code> | <code>String</code> | <code>button</code> | The element to render, such as <code>a</code>. A non-button element gets <code>aria-disabled</code> and the <code>disabled</code> class when disabled <Badge type="tip" text="3.0" /> |

## Events

| Name | Description |
| --- | --- |
| <code>click</code> | Fired when the button is clicked |
| <code>focus</code> | Fired when the button is focused |
| <code>blur</code> | Fired when the button is blurred |
