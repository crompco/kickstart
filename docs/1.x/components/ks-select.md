---
title: Select
---

# Select

<Demo name="PageKsSelect" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>name</code> | <code>String (required)</code> | <code>NULL</code> | This is the name given to the select and also it will be assumed as the itemKey if no itemKey is provided |
| <code>labelKey</code> | <code>String (required)</code> | <code>NULL</code> | This is used in the filtering as users type it is also used to display the selection |
| <code>value</code> <Badge type="tip" text="v-model" /> | <code>String, Number</code> |  | This is the prop that the v-model will bind to. So if you are using v-model you can omit this. |
| <code>items</code> | <code>Array</code> | <code>NULL</code> | This is the list of options. <pre>[{Option data...},{Option data...}]</pre> |
| <code>placeholder</code> | <code>String</code> | <code>Select...</code> | The placeholder in the select when nothing is selected. |
| <code>searchThreshold</code> | <code>Number</code> | <code>7</code> | The minimum number of items for the search input to be shown. |
| <code>disableSearch</code> | <code>Boolean</code> | <code>False</code> | Whether or not to disable the search field. |
| <code>itemFilter</code> | <code>Function, String</code> | <code>labelKey</code> | When a function is provided it will be used when filtering results from the search box. The function should accept the item as a parameter and should return true for a match. If a String is provided it is used as the key to filter on when filtering items. |
| <code>itemKey</code> | <code>String</code> | <code>name</code> | This is the key used as the value for the items. |
| <code>listHeight</code> | <code>String</code> | <code>250px</code> | The height of the drop down list |
| <code>minSearch</code> | <code>Number</code> | <code>0</code> | Minimum number of characters typed in the search box needed to trigger the search |
| <code>groupBy</code> | <code>String</code> | <code>NULL</code> | The key to group items by. Dot notation is supported for nested values in the items. |
| <code>singleDeselect</code> | <code>Boolean</code> | <code>False</code> | Allows users to deselect a selected option. |
| <code>disabled</code> | <code>Boolean</code> | <code>False</code> | Disables the select |
| <code>forceValues</code> | <code>Boolean</code> | <code>False</code> | When set to true the v-model will bind to the value key instead of the entire object. |
| <code>multiple</code> | <code>Boolean</code> | <code>False</code> | Whether or not to support multiple selections |
| <code>cacheResults</code> | <code>Boolean</code> | <code>True</code> | Whether or not to cache search results. |
| <code>paginated</code> | <code>Boolean</code> | <code>False</code> | Whether or not the search data is being paginated. When true the select will emit the search event when the list is navigated to the end. |
| <code>paginateThreshold</code> | <code>Number</code> | <code>3</code> | Determines when the paginate request will be called. So when the user scrolls down the list if this is set to 3 the request will be made when the user is 3 list items away from the bottom of the list. |
| <code>stopParentScroll</code> | <code>Boolean</code> | <code>True</code> | When set to true the list will automatically prevent the parent container from scrolling when the list scroll has reached the bottom. |
| <code>emptyMessage</code> | <code>String</code> |  | A message to use when the select is empty. (ex: "No Results"). If left blank then no message will show up. |
| <code>acceptEmptySelection</code> | <code>Boolean</code> |  | Works with the emptyMessage property. If this is set to true the empty option will be a selectable item instead of just text. |

## Events

| Name | Description |
| --- | --- |
| <code>input</code> | Fired when the value is changed |
| <code>focus</code> | Fired when the input field is focused. |
| <code>blur</code> | Fired when the input field is blurred |
| <code>clear</code> | Fired when the list is cleared |
| <code>search</code> | "Fired when the input field is expecting a search to be performed. (depends on the minSearch prop) The payload is as follows... <pre> { term: term, // the term used in the search page: page, // the page of the search being requested callback: function // The callback function should be called with the proper endpoint to use // an optional data key param can be sent as second parameter // example: callback(`countries?q=${term}&page=${page}`, 'results') } </pre>" |

## Methods

| Name | Description |
| --- | --- |
| <code>open()</code> | Used to open the select dropdown |
| <code>close()</code> | Used to close the select dropdown |
| <code>toggleOpen()</code> | Used to toggle the select dropdown |
| <code>selectItem(item_index)</code> | Called to select an item. Expects the index of the item in the list. |
| <code>selectUp()</code> | Moves the selection up |
| <code>selectDown()</code> | Moves the selection down |
| <code>clear()</code> | Clears the search field |
| <code>clearCache()</code> | Clears the search cache |
| <code>getSelectedItem()</code> | Retrieves the selected item from list |
| <code>getItemByIndex(item_index)</code> | Retrieves an item by the given index |
| <code>refreshSelected()</code> | Updates the selects display. This should not be needed since the select will automatically refresh the display |
| <code>reset()</code> | Clears selection, items, and cache |

## Slots

| Name | Description |
| --- | --- |
| <code>default</code> | This is a <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots" target="_blank">scoped slot</a>. This is used so that you have more control over the look of the data. The component loops through the data and passes the props with a props attribute. An example can be seem above in autocomplete and pagination examples. |
| <code>label</code> | This is a <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots" target="_blank">scoped slot</a>. This will be used to show the selection. If no selection is made it will not render this slot. It will take a scope of {value: ..., label}. An example can be seen above. |
