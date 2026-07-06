---
title: Data Table
source: PageKsDataTable
api:
    grouped: true
    props:
        - name: data
          type: Array
          default: "[]"
          description: The array of row objects to render.
          group: KsDataTable
        - name: loading
          type: Boolean
          default: false
          description: Shows the line loader above the table.
          group: KsDataTable
        - name: rowId
          type: String
          default: id
          description: The key used to uniquely identify a row. Required for selection and row expansion, and used as the key for each rendered row.
          group: KsDataTable
        - name: paginator
          type: Object
          default: "{ total_count, total_pages, current_page, ... }"
          description: Pagination meta object. Used by the built-in paginator, which hides itself when there is only a single page.
          group: KsDataTable
        - name: selectable
          type: Boolean
          default: false
          description: Renders a selection column. Selection is reported through the select event.
          group: KsDataTable
        - name: selectMode
          type: String
          default: multiple
          description: "'multiple' renders checkboxes (with a select-all header); 'single' renders radios."
          group: KsDataTable
        - name: selected
          type: Array
          default: "NULL"
          description: Controlled selection. Bind with v-model or :selected.sync to own the selected ids from the parent (useful for preselection and persisting selection across server-side pages). When omitted the selection is managed internally.
          group: KsDataTable
        - name: expandable
          type: Boolean
          default: false
          description: Renders an expander column. Clicking it toggles the expansion slot for that row.
          group: KsDataTable
        - name: rowClass
          type: "String, Object, Array, Function"
          default: "NULL"
          description: A class applied to every body row. When a function is given it is called with the row and should return a class (great for conditional row highlighting).
          group: KsDataTable
        - name: sortField
          type: String
          default: "NULL"
          description: The field the data is currently sorted by. This is a controlled prop, so the parent is responsible for actually sorting the data in response to the sort event.
          group: KsDataTable
        - name: sortDirection
          type: String
          default: "NULL"
          description: "The current sort direction. One of 'asc', 'desc', or null. Controlled by the parent alongside sortField."
          group: KsDataTable
        - name: scrollable
          type: Boolean
          default: false
          description: Wraps the table in a horizontally scrollable container.
          group: KsDataTable
        - name: stickyHeader
          type: Boolean
          default: false
          description: Keeps the header row visible while the body scrolls. Pair with maxHeight to enable vertical scrolling.
          group: KsDataTable
        - name: maxHeight
          type: String
          default: "NULL"
          description: Max height of the scroll container (e.g. '400px'). Enables vertical scrolling, which is what makes stickyHeader useful.
          group: KsDataTable
        - name: tableClass
          type: "String, Object, Array"
          default: ks-table
          description: Classes applied to the underlying table element. Defaults to ks-table so it inherits the standard table styling.
          group: KsDataTable
        - name: theadClass
          type: "String, Object, Array"
          default: "''"
          description: Classes applied to the thead element.
          group: KsDataTable
        - name: tbodyClass
          type: "String, Object, Array"
          default: "''"
          description: Classes applied to the tbody element.
          group: KsDataTable
        - name: thClass
          type: "String, Object, Array"
          default: "''"
          description: Classes applied to every th cell.
          group: KsDataTable
        - name: tdClass
          type: "String, Object, Array"
          default: "''"
          description: Classes applied to every td cell.
          group: KsDataTable
        - name: label
          type: String
          default: "''"
          description: The text shown in the column header.
          group: KsDataColumn
        - name: field
          type: "String, Array"
          default: "''"
          description: The key on the row to read the cell value from. When an array of keys is given the non-empty values are joined with a space (handy for things like first and last name).
          group: KsDataColumn
        - name: sortable
          type: Boolean
          default: false
          description: When true the column header becomes clickable and emits the sort event, cycling asc, desc, then unsorted.
          group: KsDataColumn
        - name: align
          type: String
          default: "NULL"
          description: "Text alignment for the column header and cells. One of 'left', 'center', or 'right'."
          group: KsDataColumn
        - name: width
          type: "String, Number"
          default: "NULL"
          description: Fixed column width. A number is treated as pixels, a string is used as-is (e.g. '20%').
          group: KsDataColumn
        - name: tdClass
          type: "String, Object, Array"
          default: "NULL"
          description: Extra classes applied to this column's td cells (in addition to the table's tdClass).
          group: KsDataColumn
        - name: thClass
          type: "String, Object, Array"
          default: "NULL"
          description: Extra classes applied to this column's th header (in addition to the table's thClass).
          group: KsDataColumn
    events:
        - name: page
          description: Fired when the built-in paginator changes page. The payload is the requested page number.
          group: KsDataTable
        - name: sort
          description: "Fired when a sortable header is clicked. The payload is { field, direction } where direction is 'asc', 'desc', or null."
          group: KsDataTable
        - name: select
          description: "Fired when a selection changes. The payload is { row, selected } where selected is the array of selected row ids. row is the string 'all' when the select-all checkbox is toggled, otherwise the affected row object."
          group: KsDataTable
        - name: update:selected
          description: Fired with the new array of selected ids. Enables v-model and :selected.sync for controlled selection.
          group: KsDataTable
        - name: row-click
          description: "Fired when a body row is clicked. The payload is { row, event }. Clicks on the selection and expander cells are excluded."
          group: KsDataTable
        - name: row-expand
          description: "Fired when a row is expanded or collapsed. The payload is { row, expanded }."
          group: KsDataTable
    methods:
        - name: clearSelection()
          description: Clears all selected rows and emits the select event.
          group: KsDataTable
    slots:
        - name: default
          description: Where the ks-data-column definitions go.
          group: KsDataTable
        - name: loader
          description: Replaces the default line loader.
          group: KsDataTable
        - name: empty
          description: Shown when there is no data and the table is not loading.
          group: KsDataTable
        - name: expansion
          description: "A scoped slot rendered as a full-width detail row beneath an expanded row (requires the expandable prop). Receives { row }."
          group: KsDataTable
        - name: footer
          description: Rendered inside a tfoot element. Provide your own tr/td markup, e.g. for a totals row.
          group: KsDataTable
        - name: paginator
          description: Replaces the built-in paginator.
          group: KsDataTable
        - name: default
          description: "A scoped slot for custom cell rendering. Receives { row, value } where row is the full row object and value is the resolved value for the column's field."
          group: KsDataColumn
        - name: header
          description: "A scoped slot for custom header content. Receives { column, sortField, sortDirection }."
          group: KsDataColumn
---
