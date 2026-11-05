---
title: Drag and Drop
---

# Drag and Drop

<Demo name="PageKsDragAndDrop" />

## Props

### KsDraggable

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>tag</code> | <code>String</code> | <code>div</code> | What tag should be, this uses vue component :is="tag" |
| <code>disabled</code> | <code>Boolean</code> | <code>false</code> | To make the draggable not drag. |
| <code>activeClass</code> | <code>String</code> | <code>dragging</code> | What the html class is for the draggable element |

### KsDroppable

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>tag</code> | <code>String</code> | <code>div</code> | What tag should be, this uses vue component :is="tag" |
| <code>activeClass</code> | <code>String</code> | <code>drop-zone-active</code> | What the html class is for the droppable element |
| <code>inactiveClass</code> | <code>String</code> | <code>''</code> | What the html class is for the droppable element when there isn't a draggable element hovering over |
| <code>accept</code> | <code>Boolean, Function</code> | <code>true</code> | Opposite of disabled prop. This can be a function that allows the parent component to have more control over the droppable area should allow draggable elements |

## Events

### KsDraggable

| Name | Description |
| --- | --- |
| <code>dragstart</code> | When the ks-draggable element starts to drag. This event emits the mouse event. |
| <code>dragend</code> | When the ks-draggable element stops drag. This event emits the mouse event. |

### KsDroppable

| Name | Description |
| --- | --- |
| <code>drop</code> | When the ks-droppable element gets an elements dropped on it. This event emits the mouse event. |
