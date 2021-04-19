---
title: Layout Utilities
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
wrap: 
    - name: wrap
      definition: "flex-wrap: wrap;"
align:
    - name: align-center
      definition: "align-items: center;"
    - name: align-start
      definition: "align-items: flex-start;"
    - name: align-baseline
      definition: "align-items: baseline;"
    - name: align-end
      definition: "align-items: flex-end;"
    - name: align-stretch
      definition: "align-items: stretch;"
justify:
    - name: jc-center
      definition: "justify-content: center;"
    - name: jc-between
      definition: "justify-content: space-between;"
    - name: jc-end
      definition: "justify-content: flex-end;"
    - name: jc-stretch
      definition: "justify-content: stretch;"
align-self:
    - name: align-self-center
      definition: "align-self: center;"
---

## Flexbox

#### Flex Direction

<styles-table :classes="direction"></styles-table>

#### Flex Wrap

<styles-table :classes="wrap"></styles-table>

#### Flex Align

<styles-table :classes="align"></styles-table>

#### Flex Justify Content

<styles-table :classes="justify"></styles-table>

#### Flex Align Self

<styles-table :classes="align-self"></styles-table>