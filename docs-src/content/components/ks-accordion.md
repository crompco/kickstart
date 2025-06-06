---
title: Accordion
source: PageKsAccordion
api:
    grouped: true
    props: 
        - name: collapsible
          type: Boolean
          default: true
          description: This will close other rows that are open when the row is clicked
          group: Accordion
        - name: title
          type: String
          default: "''"
          description: This is the title of the row
          group: Accordion Row
    methods: 
        - name: collapseAll()
          description: Closes all accordion rows
          group: Accordion
        - name: setActiveAccordion(accordion)
          description: Activates the passed accordion row
          group: Accordion
        - name: setActive((boolean) active)
          description: Toggles the active status of the row. Takes a boolean
          group: Accordion Row
    slots: 
        - name: default
          description: This is the default slot. This will be where the accordion-row components will be.
          group: Accordion
        - name: default
          description: This is the default slot. This will be the content that is in the accordion.
          group: Accordion Row
        - name: title
          description: This is the title of the row. If the title prop is too limited this can be used.
          group: Accordion Row
        - name: actions
          description: This will be on the right side of the row. If the row needs to have any actions or other content
          group: Accordion Row
---
        