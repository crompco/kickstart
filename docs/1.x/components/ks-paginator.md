---
title: Paginator
---

# Paginator

<Demo name="PageKsPaginator" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>pagination</code> | <code>Object</code> | <code>{<br>    total_count: 0,<br>    total_pages: 0,<br>    current_page: 0<br>}</code> | This is the main data that the paginator uses to operate |
| <code>limit</code> | <code>Number</code> | <code>5</code> | This is the limit to how pages should be shown at once. An ellipsis will be placed when it exceeds this limit |
| <code>routed</code> | <code>Boolean</code> | <code>False</code> | When set to true instead of emitting an event the paginator will write directly to the router query |
| <code>pageVar</code> | <code>String</code> | <code>page</code> | The variable name to be used when writing the route query |

## Events

| Name | Description |
| --- | --- |
| <code>input</code> | Fired when the page is changed. <em>Only fired when routed is not true</em> |
