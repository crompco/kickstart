---
title: Layout Utilities
source: KsLayouts
api:
    classes:
        - name: block 
          definition: "display: block;"
        - name: inline
          definition: "display: inline;"
        - name: inline-block
          definition: "display: inline-block;"
        - name: flex
          definition: "display: flex;"
        - name: inline-flex
          definition: "display: inline-flex;"
        - name: right
          definition: "float: right;"
        - name: left
          definition: "float: left;"
        - name: relative
          definition: "position: relative;"
        - name: absolute
          definition: "position: absolute;"
        - name: hide
          definition: "display: none;"
        - name: hidden
          definition: "visibility: hidden;"
        - name: visible
          definition: "visibility: visible;"
        - name: v-center
          definition: |
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        - name: disabled
          definition: |
            pointer-events: none;
            opacity: $disabled-opacity; // 0.4 !default
direction:
    - name: column
      definition: "flex-direction: column;"
    - name: row
      definition: "flex-direction: row;"
    - name: column-reverse
      definition: "flex-direction: column-reverse;"
    - name: row-reverse
      definition: "flex-direction: row-reverse;"
wrap: 
    - name: wrap
      definition: "flex-wrap: wrap;"
    - name: nowrap
      definition: "flex-wrap: nowrap;"
    - name: wrap-reverse
      definition: "flex-wrap: wrap-reverse;"
    - name: column-reverse
      definition: "flex-wrap: column-reverse;"
align:
    - name: items-center
      definition: "align-items: center;"
    - name: items-start
      definition: "align-items: flex-start;"
    - name: items-baseline
      definition: "align-items: baseline;"
    - name: items-end
      definition: "align-items: flex-end;"
    - name: items-stretch
      definition: "align-items: stretch;"
content:
    - name: content-normal
      definition: "align-content: normal;"
    - name: content-center
      definition: "align-content: center;"
    - name: content-start
      definition: "align-content: flex-start;"
    - name: content-end
      definition: "align-content: flex-end;"
    - name: content-between
      definition: "align-content: space-between;"
    - name: content-around
      definition: "align-content: space-around;"
    - name: content-evenly
      definition: "align-content: space-evenly;"
    - name: content-baseline
      definition: "align-content: baseline;"
    - name: content-stretch
      definition: "align-content: stretch;"
justify:
    - name: justify-center
      definition: "justify-content: center;"
    - name: justify-between
      definition: "justify-content: space-between;"
    - name: justify-end
      definition: "justify-content: flex-end;"
    - name: justify-stretch
      definition: "justify-content: stretch;"
    - name: justify-start
      definition: "justify-content: flex-start;"
    - name: justify-around
      definition: "justify-content: space-around;"
    - name: justify-evenly
      definition: "justify-content: space-evenly;"
align-self:
    - name: self-center
      definition: "align-self: center;"
    - name: self-auto
      definition: "align-self: auto;"
    - name: self-start
      definition: "align-self: flex-start;"
    - name: self-end
      definition: "align-self: flex-end;"
    - name: self-stretch
      definition: "align-self: stretch;"
    - name: self-baseline
      definition: "align-self: baseline;"
flex:
    - name: flex-1
      definition: "flex: 1 1 0%;"
    - name: flex-auto
      definition: "flex: 1 1 auto;"
    - name: flex-initial
      definition: "flex: 0 1 auto;"
    - name: flex-none
      definition: "flex: none;"
---
