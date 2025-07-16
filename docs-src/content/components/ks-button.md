---
title: Buttons
source: PageKsButton
api: 
    props: 
        - name: disabled
          type: Boolean
          default: false
          description: Whether the button is disabled or not
        - name: danger
          type: Boolean
          default: false
          description: Styles the button with the danger style (red)
        - name: outline
          type: Boolean
          default: false
          description: Styles the button with the outline style
        - name: spin
          type: Boolean
          default: false
          description: Shows the spinner on the button
        - name: spinColor
          type: String
          default: "null"
          description: The color of the spinner
        - name: spinSize
          type: String
          default: small
          description: The size of the button spinner (small, tiny). Tiny is helpful for smaller width buttons
        - name: tiny 
          type: Boolean
          default: false
          description: Changes the size of the button
        - name: small
          type: Boolean
          default: false
          description: Changes the size of the button
        - name: large
          type: Boolean
          default: false
          description: Changes the size of the button
    events: 
        - name: click
          description: Fired when the button is clicked
        - name: focus
          description: Fired when the button is focused
        - name: blur
          description: Fired when the button is blurred
---
