---
title: Action Menu
source: PageKsActionMenu
api:
    props: 
        - name: show
          type: Boolean
          default: false
          description: This will open the menu
        - name: actionsAttachment
          type: String
          default: top left
          description: The position on the actions list that you want attached to the button/target
        - name: targetAttachment
          type: String
          default: bottom left
          description: The position on the target that you want the actions attached to
        - name: openClass
          type: String
          default: 
          description: The class to attach when the menu is opened
    events:
        - name: active
          description: Fired when the menu is opened or closed. The active event provides a boolean value, true for opened, false for closed.
    methods: 
        - name: toggle
          description: This will toggle the open state of the menu
        - name: close
          description: This will close the menu
    slots: 
        - name: menu
          description: This slot will change the button from the hamburger menu
---
