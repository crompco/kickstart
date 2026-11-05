---
title: Radio Buttons
---

# Radio Buttons

<Demo name="PageKsRadio" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>checked</code> <Badge type="tip" text="v-model" /> | <code>String, Boolean</code> | <code>NULL</code> | The v-model binded prop on the radio input. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop |
| <code>name</code> | <code>String</code> | <code>''</code> | The name given to the input field |
| <code>label</code> | <code>String</code> | <code>''</code> | The label to be used for the radio button |
| <code>value</code> | <code>String, Number</code> | <code>NULL</code> | The actual value of the radio button |
| <code>disabled</code> | <code>Boolean</code> | <code>false</code> | Whether the radio is disabled or not |
| <code>inline</code> | <code>Boolean</code> | <code>false</code> | If set true the radio will be displayed inline |

## Events

| Name | Description |
| --- | --- |
| <code>input</code> | This is fired when the checked value is changed |

## Methods

| Name | Description |
| --- | --- |
| <code>toggle()</code> | Toggles the value of the radio |
