---
title: Timepicker
---

# Timepicker

<Demo name="PageKsTimepicker" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>timeStep</code> | <code>Number, String</code> | <code>30</code> | The number of minutes to step through for the list of options. ***Note: This implementation assumes nice round numbers for timeStep (e.g. 15 or 30 minutes) and minTime (e.g. 9:30 am). It is not bulletproof and may produce an invalid timeOptions computed property otherwise. |
| <code>timeFormat</code> | <code>String</code> | <code>H:i</code> | The format of the value for v-model (options: h,H,i,a,A) |
| <code>displayFormat</code> | <code>String</code> | <code>h:i A</code> | The format of the displayed time and options in the list (options: h,H,i,a,A) |
| <code>minTime</code> | <code>String</code> | <code>04:00</code> | The minimum time for the options list |
| <code>maxTime</code> | <code>String</code> | <code>24:00</code> | The maximum time fore the options list |
| <code>listHeight</code> | <code>String</code> | <code>200px</code> | The height of the options list |
| <code>disabled</code> | <code>Boolean</code> | <code>false</code> | Whether or not disable the input |
| <code>endOfDay</code> | <code>Boolean</code> | <code>false</code> | Enables the selection of "End of day" times like 11:59 PM or 23:59 |

## Methods

| Name | Description |
| --- | --- |
| <code>setTime(time)</code> | Sets the time of the timepicker to the given value |
| <code>selectTimeAtIndex(index)</code> | Sets the time to the time at the given index in the list of options |
| <code>resetList()</code> | Resets the list to it's original options (removes filtering) |
| <code>resetFocus()</code> | Resets the focus of the element and closes the options |
| <code>open()</code> | Opens the list of options |
| <code>close()</code> | Closes the list of options |
