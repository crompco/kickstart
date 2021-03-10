--- 
title: Calendar
source: PageKsCalendar
api: 
    props: 
        - name: date
          vmodel: true
          type: String, Date
          default: "NULL"
          description: The v-model binded prop on the calendar. Should be provided via v-model. If only the prop is sent then you would need to listen for the input event to update the prop
        - name: selection
          type: String
          default: 
          description: This is a date that should be highlighted as selected
        - name: weekStart
          type: String, Number
          default: 0
          description: The day index that the week should start on. 0 = Sunday
        - name: abbrevDay
          type: Boolean
          default: true
          description: Whether or not to use the abbreviated version of the days name
        - name: abbrevMonth
          type: Boolean
          default: false
          description: Whether or not to use the abbreviated version of the months name
        - name: format
          type: String
          default: Y-m-d
          description: Format for the date value being binded to the v-model. All formats should include a single 'Y', 'm', 'd'
        - name: weekHeight
          type: String
          default: auto
          description: This is the height of each week. If nothing is applied then the height is just an auto height. For a clean look it is recommended to use this prop
        - name: interactive
          type: Boolean
          default: false
          description: Whether or not to make the calendar interactive so you can click on the cells. Emits the select event (used with datepicker).
        - name: interactiveDays
          type: Boolean
          default: false
          description: Whether or not to make the days click-able. Different from the 'interactive' prop because this only makes the day number clickable not the whole cell.
        - name: yearPicker
          type: Boolean
          default: false
          description: Whether to allow the user to use the year picker. This makes the year in the header interactive
        - name: monthPicker
          type: Boolean
          default: false
          description: Whether to allow the user to use the month picker. This makes the month in the header interactive
        - name: showControls
          type: Boolean
          default: true
          description: Whether to show the left and right navigation in the header
        - name: droppableDays
          type: Boolean
          default: false
          description: Whether something can be dragged and dropped onto a date on the calendar
        - name: droppableActiveClass
          type: String
          default: "'drop-zone-active'"
          description: class to use when an item is dragged over the droppable area
        - name: droppableInactiveClass
          type: String
          default: "''"
          description: class used when the droppable area has no item being dragged over it
    events: 
        - name: input
          description: This is fired when the value is changed
        - name: select
          description: Fired when a day is selected. Payload includes the date formatted to a string
        - name: previous
          description: Fired when the calendar controls for previous month is clicked
        - name: next
          description: Fired when the calendar controls for next month is clicked
        - name: drop-on-date
          description: Fired when something is dragged and dropped onto a date cell
    methods: 
        - name: setLang(language)
          description: |
            Used to set the language of the calendar.
            <pre style="font-size: 0.8em; background: white;">{
                months: {
                    names: [
                        "January", "February", "March", "April",
                        "May", "June", "July", "August",
                        "September", "October", "November", "December"
                    ],
                    abbreviations: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ]
                },
                days: {
                    names: [
                        "Sunday", "Monday", "Tuesday", "Wednesday",
                        "Thursday", "Friday", "Saturday"
                    ],
                    abbreviations: [
                        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
                    ]
                }
            }</pre>   
    slots: 
        - name: Dynamic
          description: This is a dynamic slot component name. The name can be any date in the format that is specified in the props tab. The default is 'Y-m-d' or '2017-01-31'
---
