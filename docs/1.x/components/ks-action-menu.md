---
title: Action Menu
---

# Action Menu

<Demo name="PageKsActionMenu" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>show</code> | <code>Boolean</code> | <code>false</code> | This will open the menu |
| <code>actionsAttachment</code> | <code>String</code> | <code>top left</code> | The position on the actions list that you want attached to the button/target |
| <code>targetAttachment</code> | <code>String</code> | <code>bottom left</code> | The position on the target that you want the actions attached to |
| <code>openClass</code> | <code>String</code> |  | The class to attach when the menu is opened |

## Events

| Name | Description |
| --- | --- |
| <code>open</code> | Fired when the menu is opened |
| <code>close</code> | Fired when the menu is closed |

## Methods

| Name | Description |
| --- | --- |
| <code>toggle</code> | This will toggle the open state of the menu |
| <code>close</code> | This will close the menu |

## Slots

| Name | Description |
| --- | --- |
| <code>menu</code> | This slot will change the button from the hamburger menu |
