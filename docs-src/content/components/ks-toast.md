---
title: Toast
source: PageKsToast
api: 
    props: 
        - name: message
          type: String
          default: "''"
          description: The message that the toast will display
        - name: 'type'  
          type: String
          default: info
          description: The type of message. Options are the same as alerts. (info, warning, error, success)
        - name: position
          type: String
          default: top-right
          description: Where the toast should appear. Options are top-right, top, top-left, bottom-right, bottom, bottom-left
        - name: duration
          type: Number
          default: 2500
          description: How long the toast should appear. If 0 is passed the toast will require the user to click to close
        - name: limit
          type: Number
          default: 3
          description: The number of toast that are on screen at once
    methods: 
        - name: show()
          description: Show the toast. Or if the limit has been reached the toast will be added to the queue.
        - name: close()
          description: Closes the toast message.
---
