---
title: Paginator
source: PageKsPaginator
api: 
    props: 
        - name: pagination
          type: Object
          default: |
            {
                total_count: 0,
                total_pages: 0,
                current_page: 0
            }
          description: This is the main data that the paginator uses to operate
        - name: limit
          type: Number
          default: 5
          description: This is the limit to how pages should be shown at once. An ellipsis will be placed when it exceeds this limit
        - name: routed
          type: Boolean
          default: false
          description: When set to true instead of emitting an event the paginator will write directly to the router query
        - name: pageVar
          type: String
          default: page
          description: The variable name to be used when writing the route query
    events: 
        - name: input
          description: Fired when the page is changed. <em>Only fired when routed is not true</em>
---
