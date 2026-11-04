---
title: Checkbox Buttons
---

# Checkbox Buttons

<Demo name="PageKsCheckbox" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>checked</code> <Badge type="tip" text="v-model" /> | <code>Array, String, Boolean</code> | <code>NULL</code> | The v-model binded prop on the checkbox input. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop |
| <code>name</code> | <code>String</code> | <code>''</code> | The name given to the input field |
| <code>label</code> | <code>String</code> | <code>''</code> | The label to be used for the checkbox button |
| <code>value</code> | <code>String, Number</code> | <code>NULL</code> | The actual value of the checkbox button |
| <code>disabled</code> | <code>Boolean</code> | <code>False</code> | Whether the checkbox is disabled or not |
| <code>inline</code> | <code>Boolean</code> | <code>False</code> | If set true the checkbox will be displayed inline |
| <code>switchStyle</code> | <code>Boolean</code> | <code>False</code> | If set to true the checkbox will use a switch style instead of a check |

## Events

| Name | Description |
| --- | --- |
| <code>input</code> | This is fired when the checked value is changed |

## Methods

| Name | Description |
| --- | --- |
| <code>toggle()</code> | Toggles the value of the checkbox |
