---
title: Tabs
---

# Tabs

<Demo name="PageKsTabs" />

## Props

### KsTabs

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>expand</code> | <code>Boolean</code> | <code>false</code> | When set to true the tabs will expand into an even width |
| <code>align</code> | <code>String</code> | <code>center</code> | Where to text align the tabs name. Options are ('left', 'center', 'right') |
| <code>id</code> | <code>String</code> | <code>NULL</code> | When provided the last active tab will be remembered unless the rememberTab prop is set to false |
| <code>rememberTab</code> | <code>Boolean</code> | <code>true</code> | Only used when an ID is provided in case you want to use an id without remembering the tab selection. |

### KsTab

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>title</code> | <code>String</code> | <code>NULL</code> | When set to true the tabs will expand into an even width |

## Events

### KsTabs

| Name | Description |
| --- | --- |
| <code>tab-changed</code> | Fired when the tab content is changed |

### KsTab

| Name | Description |
| --- | --- |
| <code>active</code> | Fired when the tab is activated |
| <code>inactive</code> | Fired when the tab is de-activated |

## Methods

### KsTabs

| Name | Description |
| --- | --- |
| <code>setActiveTab(tabTitle)</code> | Sets the active tab. Expects a paramter of the title |

### KsTab

| Name | Description |
| --- | --- |
| <code>setActive(Boolean active)</code> | Sets the tab to be the active tab. Expects a boolean |

## Slots

### KsTabs

| Name | Description |
| --- | --- |
| <code>default</code> | This is where the ks-tabs will be. |

### KsTab

| Name | Description |
| --- | --- |
| <code>default</code> | This is where the tab content will be. By default the non-active tabs are not in the DOM. So the mounted will not be called until it is the active tab. |
