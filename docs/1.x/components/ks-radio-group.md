---
title: Radio Button Groups
---

# Radio Button Groups

<Demo name="PageKsRadioGroups" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>value</code> <Badge type="tip" text="v-model" /> | <code>String, Boolean</code> | <code>NULL</code> | The v-model binded prop on the radio input. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop |
| <code>label</code> | <code>String</code> | <code>''</code> | The label to be used for the radio button |
| <code>name</code> | <code>String</code> | <code>NULL</code> | The actual value of the radio button |
| <code>options</code> | <code>Array</code> | <code>[]</code> | An array of objects <pre>[{Option1}, {Options2}...]</pre> |
| <code>valueKey</code> | <code>String, Number</code> | <code>'value'</code> | The key to use in the Object options for the checkbox value |
| <code>labelKey</code> | <code>String, Number</code> | <code>'label'</code> | The key to use in the Object options for the checkbox label |
| <code>classNames</code> | <code>String</code> | <code>''</code> | Additional class names to attach to the group |

## Events

| Name | Description |
| --- | --- |
| <code>input</code> | This is fired when the checked value is changed |

## Methods

| Name | Description |
| --- | --- |
| <code>selectRadio(value)</code> | Selects the radio with the given value |
