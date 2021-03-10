--- 
title: Modal
source: PageKsModal
api: 
    props: 
        - name: title
          type: String
          default: Notification
          description: The title of the Modal. Displayed in the title bar.
        - name: showHeader
          type: Boolean
          default: true
          description: Weather to show the header/titlebar
        - name: showClose
          type: Boolean
          default: true
          description: Whether to show the close(x) button in the header/titlebar
        - name: maxWidth
          type: String
          default: 75%
          description: The maximum width that should be allowed for the modal
        - name: minWidth
          type: String
          default: "NULL"
          description: The minimum width that should be allowed for the modal
        - name: maxHeight
          type: String
          default: "NULL"
          description: The maximum height that should be allowed for the modal
        - name: minHeight
          type: String
          default: "NULL"
          description: The minimum height that should be allowed for the modal
        - name: closeOnEscape
          type: Boolean
          default: true
          description: Whether to close the modal when the user presses the 'escape' key
        - name: danger
          type: Boolean
          default: false
          description: Whether to add the danger styling to the modal
        - name: loading
          type: Boolean
          default: false
          description: Whether to show a loading bar in the modal
        - name: closeOnMaskClick
          type: Boolean
          default: true
          description: Whether to close the modal when a user clicks on the mask
        - name: forceScroll
          type: Boolean
          default: false
          description: Whether to force the modal in a scrollable state. This is the same when a modal is higher than the window. This option helps with modals jumping when content is dynamic.
    events: 
        - name: open
          description: Fired when the modal is opened
        - name: close
          description: Fired when the modal is closed
    methods: 
        - name: open()
          description: used to open the modal
        - name: close()
          description: used to close the modal
        - name: loadingOn()
          description: show loading bar
        - name: loadingOff()
          description: hide loading bar
    slots:
        - name: default
          description: This will be the content of the modal
        - name: header
          description: This will be the header title. If you pass a title prop this isn't needed.
        - name: footer
          description: This is where the buttons will be located or anything else that will be shown on the bottom of the modal.
---
