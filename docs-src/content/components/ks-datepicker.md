---
title: Datepicker
source: PageKsDatepicker
api: 
    props: 
        - name: value
          vmodel: true
          type: String, Date
          default: "NULL"
          description: The v-model binded prop on the datepicker. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop
        - name: dateFormat
          type: String
          default: Y-m-d
          description: Format for the date value being binded to the v-model. All formats should include a single 'Y', 'm', 'd'
        - name: displayFormat
          type: String
          default: m/d/Y
          description: Format for the date being displayed in the input. All formats should include a single 'Y', 'm', 'd'
        - name: name
          type: String
          default: ks_datepicker
          description: The name of the input field
        - name: yearPicker
          type: Boolean
          default: false
          description: Whether to allow the user to use the year picker. This makes the year in the header interactive
        - name: monthPicker
          type: Boolean
          default: false
          description: Whether to allow the user to use the month picker. This makes the month in the header interactive
        - name: minDate
          type: String
          default: "NULL"
          description: The minimum date that can be selected. Should be in the same format as `dateFormat`
        - name: maxDate
          type: String
          default: "NULL"
          description: The maximum date that can be selected. Should be in the same format as `dateFormat`
        - name: disabled
          type: Boolean
          default: false
          description: Whether or not to disable the input field of the date.
    events: 
        - name: input
          description: This is fired when the value is changed
        - name: calendar_change
          description: Fired when the calendar is being controlled. For instance the month/year is changed
        - name: open
          description: Fired when the datepicker calendar is opened
        - name: close
          description: Fired when the datepicker calendar is closed
        - name: input-error
          description: Fired when a value is set out of the range (min/max restrictions). Payload will have the date.
    methods: 
        - name: open()
          description: Used to open the datepicker calendar selector
        - name: close()
          description: Used to close the datepicker calendar selector
---
