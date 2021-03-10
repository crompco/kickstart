---
title: Checkbox Button Groups
source: PageKsCheckboxGroups
api: 
    props:
        - name: value
          vmodel: true
          type: Array
          default: []
          description: The v-model binded prop on the checkbox input. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop
        - name: label
          type: String
          default: "''"
          description: The label to be used for the checkbox button
        - name: name
          type: String
          default: "NULL"
          description: The actual value of the checkbox button
        - name: options
          type: Array
          default: []
          description: An array of objects <pre>[{Option1}, {Options2}...]</pre>
        - name: valueKey
          type: String, Number
          default: "'value'"
          description: The key to use in the Object options for the checkbox value
        - name: labelKey
          type: String, Number
          default: "'label'"
          description: The key to use in the Object options for the checkbox label
        - name: classNames
          type: String
          default: "''"
          description: Additional class names to attach to the group
    events: 
        - name: input
          description: This is fired when the checked value is changed
---
