---
title: Card
source: PageKsCard
api:
    props: 
        - name: header
          type: String
          default: ''
          description: Text to display in the card header
        - name: light
          type: Boolean
          default: false
          description: Applies the light ks-card style
    slots:
        - name: header
          description: Slot rendered in the ks-card-header 
        - name: footer
          description: Slot rendered in the ks-card-footer
---
