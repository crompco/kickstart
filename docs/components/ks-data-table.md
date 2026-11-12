---
title: Data Table
---

# Data Table

<Demo name="PageKsDataTable" />

## Props

### KsDataTable

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>data</code> | <code>Array</code> | <code>[]</code> | The array of row objects to render. |
| <code>loading</code> | <code>Boolean</code> | <code>False</code> | Shows the line loader above the table. |
| <code>rowId</code> | <code>String</code> | <code>id</code> | The key used to uniquely identify a row. Required for selection and row expansion, and used as the key for each rendered row. |
| <code>paginator</code> | <code>Object</code> | <code>{ total_count, total_pages, current_page, ... }</code> | Pagination meta object. Used by the built-in paginator, which hides itself when there is only a single page. |
| <code>selectable</code> | <code>Boolean</code> | <code>False</code> | Renders a selection column. Selection is reported through the select event. |
| <code>selectMode</code> | <code>String</code> | <code>multiple</code> | 'multiple' renders checkboxes (with a select-all header); 'single' renders radios. |
| <code>selected</code> | <code>Array</code> | <code>NULL</code> | Controlled selection. Bind with v-model or :selected.sync to own the selected ids from the parent (useful for preselection and persisting selection across server-side pages). When omitted the selection is managed internally. |
| <code>expandable</code> | <code>Boolean</code> | <code>False</code> | Renders an expander column. Clicking it toggles the expansion slot for that row. |
| <code>rowClass</code> | <code>String, Object, Array, Function</code> | <code>NULL</code> | A class applied to every body row. When a function is given it is called with the row and should return a class (great for conditional row highlighting). |
| <code>sortField</code> | <code>String</code> | <code>NULL</code> | The field the data is currently sorted by. This is a controlled prop, so the parent is responsible for actually sorting the data in response to the sort event. |
| <code>sortDirection</code> | <code>String</code> | <code>NULL</code> | The current sort direction. One of 'asc', 'desc', or null. Controlled by the parent alongside sortField. |
| <code>scrollable</code> | <code>Boolean</code> | <code>False</code> | Wraps the table in a horizontally scrollable container. |
| <code>stickyHeader</code> | <code>Boolean</code> | <code>False</code> | Keeps the header row visible while the body scrolls. Pair with maxHeight to enable vertical scrolling. |
| <code>maxHeight</code> | <code>String</code> | <code>NULL</code> | Max height of the scroll container (e.g. '400px'). Enables vertical scrolling, which is what makes stickyHeader useful. |
| <code>tableClass</code> | <code>String, Object, Array</code> | <code>ks-table</code> | Classes applied to the underlying table element. Defaults to ks-table so it inherits the standard table styling. |
| <code>theadClass</code> | <code>String, Object, Array</code> | <code>''</code> | Classes applied to the thead element. |
| <code>tbodyClass</code> | <code>String, Object, Array</code> | <code>''</code> | Classes applied to the tbody element. |
| <code>thClass</code> | <code>String, Object, Array</code> | <code>''</code> | Classes applied to every th cell. |
| <code>tdClass</code> | <code>String, Object, Array</code> | <code>''</code> | Classes applied to every td cell. |

### KsDataColumn

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>label</code> | <code>String</code> | <code>''</code> | The text shown in the column header. |
| <code>field</code> | <code>String, Array</code> | <code>''</code> | The key on the row to read the cell value from. When an array of keys is given the non-empty values are joined with a space (handy for things like first and last name). |
| <code>sortable</code> | <code>Boolean</code> | <code>False</code> | When true the column header becomes clickable and emits the sort event, cycling asc, desc, then unsorted. |
| <code>align</code> | <code>String</code> | <code>NULL</code> | Text alignment for the column header and cells. One of 'left', 'center', or 'right'. |
| <code>width</code> | <code>String, Number</code> | <code>NULL</code> | Fixed column width. A number is treated as pixels, a string is used as-is (e.g. '20%'). |
| <code>tdClass</code> | <code>String, Object, Array</code> | <code>NULL</code> | Extra classes applied to this column's td cells (in addition to the table's tdClass). |
| <code>thClass</code> | <code>String, Object, Array</code> | <code>NULL</code> | Extra classes applied to this column's th header (in addition to the table's thClass). |

## Events

### KsDataTable

| Name | Description |
| --- | --- |
| <code>page</code> | Fired when the built-in paginator changes page. The payload is the requested page number. |
| <code>sort</code> | Fired when a sortable header is clicked. The payload is { field, direction } where direction is 'asc', 'desc', or null. |
| <code>select</code> | Fired when a selection changes. The payload is { row, selected } where selected is the array of selected row ids. row is the string 'all' when the select-all checkbox is toggled, otherwise the affected row object. |
| <code>update:selected</code> | Fired with the new array of selected ids. Enables v-model and :selected.sync for controlled selection. |
| <code>row-click</code> | Fired when a body row is clicked. The payload is { row, event }. Clicks on the selection and expander cells are excluded. |
| <code>row-expand</code> | Fired when a row is expanded or collapsed. The payload is { row, expanded }. |

## Methods

### KsDataTable

| Name | Description |
| --- | --- |
| <code>clearSelection()</code> | Clears all selected rows and emits the select event. |

## Slots

### KsDataTable

| Name | Description |
| --- | --- |
| <code>default</code> | Where the ks-data-column definitions go. |
| <code>loader</code> | Replaces the default line loader. |
| <code>empty</code> | Shown when there is no data and the table is not loading. |
| <code>expansion</code> | A scoped slot rendered as a full-width detail row beneath an expanded row (requires the expandable prop). Receives { row }. |
| <code>footer</code> | Rendered inside a tfoot element. Provide your own tr/td markup, e.g. for a totals row. |
| <code>paginator</code> | Replaces the built-in paginator. |

### KsDataColumn

| Name | Description |
| --- | --- |
| <code>default</code> | A scoped slot for custom cell rendering. Receives { row, value } where row is the full row object and value is the resolved value for the column's field. |
| <code>header</code> | A scoped slot for custom header content. Receives { column, sortField, sortDirection }. |
