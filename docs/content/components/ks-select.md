---
title: Select
source: PageKsSelect
api: 
    props: 
        - name: name
          type: String (required)
          default: "NULL"
          description: This is the name given to the select and also it will be assumed as the itemKey if no itemKey is provided
        - name: labelKey
          type: String (required)
          default: "NULL"
          description: This is used in the filtering as users type it is also used to display the selection
        - name: value
          vmodel: true
          type: String, Number
          description: This is the prop that the v-model will bind to. So if you are using v-model you can omit this.
        - name: items
          type: Array
          default: "NULL"
          description: This is the list of options. <pre>[{Option data...},{Option data...}]</pre>
        - name: placeholder
          type: String
          default: Select...
          description: The placeholder in the select when nothing is selected.
        - name: searchThreshold
          type: Number
          default: 7
          description: The minimum number of items for the search input to be shown. 
        - name: disableSearch
          type: Boolean
          default: false
          description: Whether or not to disable the search field.
        - name: itemFilter
          type: Function, String
          default: labelKey
          description: When a function is provided it will be used when filtering results from the search box. The function should accept the item as a parameter and should return true for a match. If a String is provided it is used as the key to filter on when filtering items.
        - name: itemKey
          type: String
          default: name
          description: This is the key used as the value for the items.
        - name: listHeight
          type: String
          default: 250px
          description: The height of the drop down list
        - name: minSearch
          type: Number
          default: 0
          description: Minimum number of characters typed in the search box needed to trigger the search
        - name: groupBy
          type: String
          default: "NULL"
          description: The key to group items by. Dot notation is supported for nested values in the items.
        - name: singleDeselect
          type: Boolean
          default: false
          description: Allows users to deselect a selected option.
        - name: disabled
          type: Boolean
          default: false
          description: Disables the select
        - name: forceValues
          type: Boolean
          default: false
          description: When set to true the v-model will bind to the value key instead of the entire object.
        - name: multiple
          type: Boolean
          default: false
          description: Whether or not to support multiple selections
        - name: cacheResults
          type: Boolean
          default: true
          description: Whether or not to cache search results.
        - name: paginated
          type: Boolean
          default: false
          description: Whether or not the search data is being paginated. When true the select will emit the search event when the list is navigated to the end.
        - name: paginateThreshold
          type: Number
          default: 3
          description: Determines when the paginate request will be called. So when the user scrolls down the list if this is set to 3 the request will be made when the user is 3 list items away from the bottom of the list.
        - name: stopParentScroll
          type: Boolean
          default: true
          description: When set to true the list will automatically prevent the parent container from scrolling when the list scroll has reached the bottom.
        - name: emptyMessage
          type: String
          default:
          description: 'A message to use when the select is empty. (ex: "No Results"). If left blank then no message will show up.'
        - name: acceptEmptySelection
          type: Boolean
          default: 
          description: Works with the emptyMessage property. If this is set to true the empty option will be a selectable item instead of just text.
    events: 
        - name: input
          description: Fired when the value is changed
        - name: focus
          description: Fired when the input field is focused.
        - name: blur
          description: Fired when the input field is blurred
        - name: clear
          description: Fired when the list is cleared
        - name: search
          description: |
            "Fired when the input field is expecting a search to be performed. (depends on the minSearch prop) The payload is as follows...
            <pre>
                {
                    term: term, // the term used in the search
                    page: page, // the page of the search being requested
                    callback: function
                    // The callback function should be called with the proper endpoint to use
                    // an optional data key param can be sent as second parameter
                    // example: callback(`countries?q=${term}&page=${page}`, 'results')
                }
            </pre>"
    methods:
        - name: open()
          description: Used to open the select dropdown
        - name: close()
          description: Used to close the select dropdown
        - name: toggleOpen()
          description: Used to toggle the select dropdown
        - name: selectItem(item_index)
          description: Called to select an item. Expects the index of the item in the list.
        - name: selectUp()
          description: Moves the selection up
        - name: selectDown()
          description: Moves the selection down
        - name: clear()
          description: Clears the search field
        - name: clearCache()
          description: Clears the search cache
        - name: getSelectedItem()
          description: Retrieves the selected item from list
        - name: getItemByIndex(item_index)
          description: Retrieves an item by the given index
        - name: refreshSelected()
          description: Updates the selects display. This should not be needed since the select will automatically refresh the display
        - name: reset()
          description: Clears selection, items, and cache
    slots: 
        - name: default
          description: 'This is a <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots" target="_blank">scoped slot</a>. This is used so that you have more control over the look of the data. The component loops through the data and passes the props with a props attribute. An example can be seem above in autocomplete and pagination examples.'
        - name: label
          description: 'This is a <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots" target="_blank">scoped slot</a>. This will be used to show the selection. If no selection is made it will not render this slot. It will take a scope of {value: ..., label}. An example can be seen above.'
---
