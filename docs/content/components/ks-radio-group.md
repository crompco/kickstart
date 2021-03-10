---
title: Radio Button Groups
source: PageKsRadioGroups
api: 
    props: 
        - name: value
          vmodel: true
          type: String, Boolean
          default: "NULL"
          description: The v-model binded prop on the radio input. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop
        - name: label
          type: String
          default: "''"
          description: The label to be used for the radio button
        - name: name
          type: String
          default: "NULL"
          description: The actual value of the radio button
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
    methods: 
        - name: selectRadio(value)
          description: Selects the radio with the given value
---
