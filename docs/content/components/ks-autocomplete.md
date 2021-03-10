---
title: AutoComplete
source: PageKsAutocomplete
api: 
    props: 
        - name: value
          vmodel: true
          type: String, Number
          default: "NULL"
          description: This is the prop that the v-model will bind to. So if you are using v-model you can omit this.
        - name: items
          type: Array
          default: "NULL"
          description: This is the list of options. <pre>[{Option data...},{Option data...}]</pre>
        - name: placeholder
          type: String
          default: Select...
          description: The placeholder in the select when nothing is selected.
        - name: minSearch
          type: Number
          default: 0
          description: Minimum number of characters typed in the search box needed to trigger the search
        - name: multiple
          type: Boolean
          default: false
          description: Whether or not to support multiple selections
        - name: taggable
          type: Boolean
          default: false
          description: When true the user is allowed to enter values not in the list items.
        - name: groupBy
          type: String
          default: "NULL"
          description: The key to group items by. Dot notation is supported for nested values in the items.
        - name: showTagInList
          type: Boolean
          default: false
          description: Depends on taggable. When true the taggable will be shown in the list as "<em>Add</em> {term}"
        - name: delay
          type: Number
          default: 100
          description: The amount of delay to be used when searching
        - name: searchThreshold
          type: Number
          default: 7
          description: The minimum number of items for the search input to be shown.
        - name: keepTextOnDelete
          type: Boolean
          default: false
          description: When set to true if a user deletes a selection it will retain the text of the selection
        - name: itemFilter
          type: Function, String
          default: selectionKey
          description: When a function is provided it will be used when filtering results from the search box. The function should accept the item as a parameter and should return true for a match. If a String is provided it is used as the key to filter on when filtering items.
        - name: selectionKey
          type: String
          default: name
          description: This is the key used as the value for the items. And it is used to display selections
        - name: listHeight
          type: String
          default: 250px
          description: The height of the drop down list
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
          default: false
          description: Works with the emptyMessage property. If this is set to true the empty option will be a selectable item instead of just text.
    events: 
        - name: input
          description: Fired when the value is changed
        - name: tag-created
          description: When a tag is created this will fire with the new tag in the payload
        - name: deleted
          description: When a selection is deleted this will be fired with the deleted selection in the payload
        - name: focus
          description: Fired when the input field is focused.
        - name: blur
          description: Fired when the input field is blurred
        - name: clear
          description: Fired when the list is cleared
        - name: selected-empty
          description: Fired when <code>acceptEmptySelection</code> prop is set to true and the autocomplete term is not in the list.
        - name: search
          description: | 
            Fired when the input field is expecting a search to be performed. (depends on the minSearch prop) The payload is as follows...
            <pre>
                {
                    term: term, // the term used in the search
                    page: page, // the page of the search being requested
                    callback: function
                    // The callback function should be called with the proper endpoint to use
                    // an optional data key param can be sent as second parameter
                    // example: callback(`countries?q=${term}&page=${page}`, 'results')
                }
            </pre>
    methods: 
        - name: clearSelection(selection (optional))
          description: Clears a selection from the selection(s). If not parameter is passed the it will remove all selections.
        - name: selectionValue()
          description: Returns the value of the selection
        - name: selectItem(item_index)
          description: Selects the item at the given index
        - name: addSelection(selection)
          description: Adds a selection to the list of selections when multiple is being used
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
        - name: refreshSelection()
          description: Updates the selection display. This should not be needed since the autocomplete will automatically refresh the display
        - name: reset()
          description: Clears selection, items, and cache
    slots:
        - name: default
          description: This is a <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots" target="_blank">scoped slot</a>. This is used so that you have more control over the look of the data. The component loops through the data and passes the props with a props attribute. An example can be seem above in either the Multiple selection examples.
---
