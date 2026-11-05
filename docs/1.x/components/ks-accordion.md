---
title: Accordion
---

# Accordion

<Demo name="PageKsAccordion" />

## Props

### Accordion

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>collapsible</code> | <code>Boolean</code> | <code>true</code> | This will close other rows that are open when the row is clicked |

### Accordion Row

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>title</code> | <code>String</code> | <code>''</code> | This is the title of the row |

## Methods

### Accordion

| Name | Description |
| --- | --- |
| <code>collapseAll()</code> | Closes all accordion rows |
| <code>setActiveAccordion(accordion)</code> | Activates the passed accordion row |

### Accordion Row

| Name | Description |
| --- | --- |
| <code>setActive((boolean) active)</code> | Toggles the active status of the row. Takes a boolean |

## Slots

### Accordion

| Name | Description |
| --- | --- |
| <code>default</code> | This is the default slot. This will be where the accordion-row components will be. |

### Accordion Row

| Name | Description |
| --- | --- |
| <code>default</code> | This is the default slot. This will be the content that is in the accordion. |
| <code>title</code> | This is the title of the row. If the title prop is too limited this can be used. |
| <code>actions</code> | This will be on the right side of the row. If the row needs to have any actions or other content |
