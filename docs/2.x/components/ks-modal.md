---
title: Modal
---

# Modal

<Demo name="PageKsModal" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>title</code> | <code>String</code> | <code>Notification</code> | The title of the Modal. Displayed in the title bar. |
| <code>showHeader</code> | <code>Boolean</code> | <code>True</code> | Weather to show the header/titlebar |
| <code>showClose</code> | <code>Boolean</code> | <code>True</code> | Whether to show the close(x) button in the header/titlebar |
| <code>maxWidth</code> | <code>String</code> | <code>75%</code> | The maximum width that should be allowed for the modal |
| <code>minWidth</code> | <code>String</code> | <code>NULL</code> | The minimum width that should be allowed for the modal |
| <code>maxHeight</code> | <code>String</code> | <code>NULL</code> | The maximum height that should be allowed for the modal |
| <code>minHeight</code> | <code>String</code> | <code>NULL</code> | The minimum height that should be allowed for the modal |
| <code>closeOnEscape</code> | <code>Boolean</code> | <code>True</code> | Whether to close the modal when the user presses the 'escape' key |
| <code>danger</code> | <code>Boolean</code> | <code>False</code> | Whether to add the danger styling to the modal |
| <code>loading</code> | <code>Boolean</code> | <code>False</code> | Whether to show a loading bar in the modal |
| <code>closeOnMaskClick</code> | <code>Boolean</code> | <code>True</code> | Whether to close the modal when a user clicks on the mask |
| <code>forceScroll</code> | <code>Boolean</code> | <code>False</code> | Whether to force the modal in a scrollable state. This is the same when a modal is higher than the window. This option helps with modals jumping when content is dynamic. |

## Events

| Name | Description |
| --- | --- |
| <code>open</code> | Fired when the modal is opened |
| <code>close</code> | Fired when the modal is closed |

## Methods

| Name | Description |
| --- | --- |
| <code>open()</code> | used to open the modal |
| <code>close()</code> | used to close the modal |
| <code>loadingOn()</code> | show loading bar |
| <code>loadingOff()</code> | hide loading bar |

## Slots

| Name | Description |
| --- | --- |
| <code>default</code> | This will be the content of the modal |
| <code>header</code> | This will be the header title. If you pass a title prop this isn't needed. |
| <code>footer</code> | This is where the buttons will be located or anything else that will be shown on the bottom of the modal. |
