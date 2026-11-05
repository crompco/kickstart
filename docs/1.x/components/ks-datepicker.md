---
title: Datepicker
---

# Datepicker

<Demo name="PageKsDatepicker" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>value</code> <Badge type="tip" text="v-model" /> | <code>String, Date</code> | <code>NULL</code> | The v-model binded prop on the datepicker. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop |
| <code>dateFormat</code> | <code>String</code> | <code>Y-m-d</code> | Format for the date value being binded to the v-model. All formats should include a single 'Y', 'm', 'd' |
| <code>displayFormat</code> | <code>String</code> | <code>m/d/Y</code> | Format for the date being displayed in the input. All formats should include a single 'Y', 'm', 'd' |
| <code>name</code> | <code>String</code> | <code>ks_datepicker</code> | The name of the input field |
| <code>yearPicker</code> | <code>Boolean</code> | <code>false</code> | Whether to allow the user to use the year picker. This makes the year in the header interactive |
| <code>monthPicker</code> | <code>Boolean</code> | <code>false</code> | Whether to allow the user to use the month picker. This makes the month in the header interactive |
| <code>minDate</code> | <code>String</code> | <code>NULL</code> | The minimum date that can be selected. Should be in the same format as `dateFormat` |
| <code>maxDate</code> | <code>String</code> | <code>NULL</code> | The maximum date that can be selected. Should be in the same format as `dateFormat` |
| <code>disabled</code> | <code>Boolean</code> | <code>false</code> | Whether or not to disable the input field of the date. |

## Events

| Name | Description |
| --- | --- |
| <code>input</code> | This is fired when the value is changed |
| <code>calendar_change</code> | Fired when the calendar is being controlled. For instance the month/year is changed |
| <code>open</code> | Fired when the datepicker calendar is opened |
| <code>close</code> | Fired when the datepicker calendar is closed |
| <code>input-error</code> | Fired when a value is set out of the range (min/max restrictions). Payload will have the date. |

## Methods

| Name | Description |
| --- | --- |
| <code>open()</code> | Used to open the datepicker calendar selector |
| <code>close()</code> | Used to close the datepicker calendar selector |
