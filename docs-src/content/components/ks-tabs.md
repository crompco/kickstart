---
title: Tabs
source: PageKsTabs
api:
    grouped: true
    props: 
        - name: expand
          type: Boolean
          default: false
          description: When set to true the tabs will expand into an even width
          group: KsTabs
        - name: align
          type: String
          default: center
          description: Where to text align the tabs name. Options are ('left', 'center', 'right')
          group: KsTabs
        - name: id
          type: String
          default: "NULL"
          description: When provided the last active tab will be remembered unless the rememberTab prop is set to false
          group: KsTabs
        - name: rememberTab
          type: Boolean
          default: true
          description: Only used when an ID is provided in case you want to use an id without remembering the tab selection.
          group: KsTabs
        - name: title
          type: String
          default: "NULL"
          description: When set to true the tabs will expand into an even width
          group: KsTab
    events: 
        - name: tab-changed
          description: Fired when the tab content is changed
          group: KsTabs
        - name: active
          description: Fired when the tab is activated
          group: KsTab
        - name: inactive
          description: Fired when the tab is de-activated
          group: KsTab
    methods:
        - name: setActiveTab(tabTitle)
          description: Sets the active tab. Expects a paramter of the title
          group: KsTabs
        - name: setActive(Boolean active)
          description: Sets the tab to be the active tab. Expects a boolean
          group: KsTab
    slots:
        - name: default
          description: This is where the ks-tabs will be.
          group: KsTabs
        - name: default
          description: This is where the tab content will be. By default the non-active tabs are not in the DOM. So the mounted will not be called until it is the active tab.
          group: KsTab
---
