---
title: Tooltip
source: PageKsTooltip
api:
    props: 
        - name: isActive
          type: Boolean
          default: true
          description: Whether the tooltip is active or not. When false tooltip will not trigger
        - name: trigger
          type: String
          default: hover
          description: The trigger for showing the tooltip. hover, click
        - name: width
          type: String
          default: 
          description: The width of the tooltip window. (auto by default)
        - name: height
          type: String
          default:
          description: The height of the tooltip window. (auto by default)
        - name: target
          type: String
          default: The target ref name from the tooltips parent component. if left blank it will assume the parent is the target
          description:
        - name: hideDelay
          type: Number
          default: 150
          description: Delay in ms for hiding the tooltip
        - name: hoverDelay
          type: Number
          default: 
          description: When set, Delay in ms for showing the tooltip.
    methods:
        - name: showTooltip()
          description: Shows the tooltip.
        - name: triggerHide()
          description: Hides the tooltip.
        - name: toggleTooltip()
          description: Toggles the tooltip

---
