---
title: Drag and Drop
source: PageKsDragAndDrop
api:
    props: 
        - name: tag
          type: String
          default: div
          description: What tag should be, this uses vue component :is="tag"
          group: KsDraggable
        - name: disabled
          type: Boolean
          default: false
          description: To make the draggable not drag.
          group: KsDraggable
        - name: activeClass
          type: String
          default: dragging
          description: What the html class is for the draggable element
          group: KsDraggable
        - name: tag
          type: String
          default: div
          description: What tag should be, this uses vue component :is="tag"
          group: KsDroppable
        - name: activeClass
          type: String
          default: drop-zone-active
          description: What the html class is for the droppable element
          group: KsDroppable
        - name: inactiveClass
          type: String
          default: "''"
          description: What the html class is for the droppable element when there isn't a draggable element hovering over
          group: KsDroppable
        - name: accept
          type: Boolean, Function
          default: true
          description: Opposite of disabled prop. This can be a function that allows the parent component to have more control over the droppable area should allow draggable elements
          group: KsDroppable
    events: 
        - name: dragstart
          description: When the ks-draggable element starts to drag. This event emits the mouse event.
          group: KsDraggable
        - name: dragend
          description: When the ks-draggable element stops drag. This event emits the mouse event.
          group: KsDraggable
        - name: drop
          description: When the ks-droppable element gets an elements dropped on it. This event emits the mouse event.
          group: KsDroppable
---
