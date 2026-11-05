---
title: Calendar
---

# Calendar

<Demo name="PageKsCalendar" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>date</code> <Badge type="tip" text="v-model" /> | <code>String, Date</code> | <code>NULL</code> | The v-model binded prop on the calendar. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop |
| <code>selection</code> | <code>String</code> |  | This is a date that should be highlighted as selected |
| <code>weekStart</code> | <code>String, Number</code> | <code>0</code> | The day index that the week should start on. 0 = Sunday |
| <code>abbrevDay</code> | <code>Boolean</code> | <code>True</code> | Whether or not to use the abbreviated version of the days name |
| <code>abbrevMonth</code> | <code>Boolean</code> | <code>False</code> | Whether or not to use the abbreviated version of the months name |
| <code>format</code> | <code>String</code> | <code>Y-m-d</code> | Format for the date value being binded to the v-model. All formats should include a single 'Y', 'm', 'd' |
| <code>weekHeight</code> | <code>String</code> | <code>auto</code> | This is the height of each week. If nothing is applied then the height is just an auto height. For a clean look it is recommended to use this prop |
| <code>interactive</code> | <code>Boolean</code> | <code>False</code> | Whether or not to make the calendar interactive so you can click on the cells. Emits the select event (used with datepicker). |
| <code>interactiveDays</code> | <code>Boolean</code> | <code>False</code> | Whether or not to make the days click-able. Different from the 'interactive' prop because this only makes the day number clickable not the whole cell. |
| <code>yearPicker</code> | <code>Boolean</code> | <code>False</code> | Whether to allow the user to use the year picker. This makes the year in the header interactive |
| <code>monthPicker</code> | <code>Boolean</code> | <code>False</code> | Whether to allow the user to use the month picker. This makes the month in the header interactive |
| <code>showControls</code> | <code>Boolean</code> | <code>True</code> | Whether to show the left and right navigation in the header |
| <code>droppableDays</code> | <code>Boolean</code> | <code>False</code> | Whether something can be dragged and dropped onto a date on the calendar |
| <code>droppableActiveClass</code> | <code>String</code> | <code>'drop-zone-active'</code> | class to use when an item is dragged over the droppable area |
| <code>droppableInactiveClass</code> | <code>String</code> | <code>''</code> | class used when the droppable area has no item being dragged over it |

## Events

| Name | Description |
| --- | --- |
| <code>input</code> | This is fired when the value is changed |
| <code>select</code> | Fired when a day is selected. Payload includes the date formatted to a string |
| <code>previous</code> | Fired when the calendar controls for previous month is clicked |
| <code>next</code> | Fired when the calendar controls for next month is clicked |
| <code>drop-on-date</code> | Fired when something is dragged and dropped onto a date cell |

## Methods

| Name | Description |
| --- | --- |
| <code>setLang(language)</code> | Used to set the language of the calendar. <pre style="font-size: 0.8em; background: white;">{ months: { names: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], abbreviations: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ] }, days: { names: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], abbreviations: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ] } }</pre> |

## Slots

| Name | Description |
| --- | --- |
| <code>Dynamic</code> | This is a dynamic slot component name. The name can be any date in the format that is specified in the props tab. The default is 'Y-m-d' or '2017-01-31' |
