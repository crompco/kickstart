---
title: Panel
source: PageKsPanel
api:
    props: 
        - name: header
          type: String
          default: ''
          description: Text to display in the panel header
        - name: light
          type: Boolean
          default: false
          description: Applies the light ks-panel style
    slots:
        - name: header
          description: Slot rendered in the ks-panel-header 
        - name: footer
          description: Slot rendered in the ks-panel-footer
---
