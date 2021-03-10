---
title: Timepicker
source: PageKsTimepicker
api: 
    props:
        - name: timeStep
          type: Number, String
          default: 30
          description: "The number of minutes to step through for the list of options. ***Note: This implementation assumes nice round numbers for timeStep (e.g. 15 or 30 minutes) and minTime (e.g. 9:30 am). It is not bulletproof and may produce an invalid timeOptions computed property otherwise."
        - name: timeFormat
          type: String
          default: "H:i"
          description: "The format of the value for v-model (options: h,H,i,a,A)"
        - name: displayFormat
          type: String
          default: "h:i A"
          description: "The format of the displayed time and options in the list (options: h,H,i,a,A)"
        - name: minTime
          type: String
          default: "04:00"
          description: The minimum time for the options list
        - name: maxTime
          type: String
          default: "24:00"
          description: The maximum time fore the options list
        - name: listHeight
          type: String
          default: 200px
          description: The height of the options list
        - name: disabled
          type: Boolean
          default: false
          description: Whether or not disable the input
    methods: 
        - name: setTime(time)
          description: Sets the time of the timepicker to the given value
        - name: selectTimeAtIndex(index)
          description: Sets the time to the time at the given index in the list of options
        - name: resetList()
          description: Resets the list to it's original options (removes filtering)
        - name: resetFocus()
          description: Resets the focus of the element and closes the options
        - name: open()
          description: Opens the list of options
        - name: close()
          description: Closes the list of options
---
