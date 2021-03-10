---
title: Radio Buttons
source: PageKsRadio
api: 
    props: 
        - name: checked
          vmodel: true
          type: String, Boolean
          default: "NULL"
          description: The v-model binded prop on the radio input. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop
        - name: name
          type: String
          default: "''"
          description: The name given to the input field
        - name: label
          type: String
          default: "''"
          description: The label to be used for the radio button
        - name: value
          type: String, Number
          default: "NULL"
          description: The actual value of the radio button
        - name: disabled
          type: Boolean
          default: false
          description: Whether the radio is disabled or not
        - name: inline
          type: Boolean
          default: false
          description: If set true the radio will be displayed inline
    events: 
        - name: input
          description: This is fired when the checked value is changed
    methods: 
        - name: toggle()
          description: Toggles the value of the radio
---
