---
title: Tooltip
---

# Tooltip

<Demo name="PageKsTooltip" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>isActive</code> | <code>Boolean</code> | <code>true</code> | Whether the tooltip is active or not. When false tooltip will not trigger |
| <code>trigger</code> | <code>String</code> | <code>hover</code> | The trigger for showing the tooltip. hover, click |
| <code>width</code> | <code>String</code> |  | The width of the tooltip window. (auto by default) |
| <code>height</code> | <code>String</code> |  | The height of the tooltip window. (auto by default) |
| <code>target</code> | <code>String</code> | <code>The target ref name from the tooltips parent component. if left blank it will assume the parent is the target</code> |  |
| <code>hideDelay</code> | <code>Number</code> | <code>150</code> | Delay in ms for hiding the tooltip |
| <code>hoverDelay</code> | <code>Number</code> |  | When set, Delay in ms for showing the tooltip. |

## Methods

| Name | Description |
| --- | --- |
| <code>showTooltip()</code> | Shows the tooltip. |
| <code>triggerHide()</code> | Hides the tooltip. |
| <code>toggleTooltip()</code> | Toggles the tooltip |
