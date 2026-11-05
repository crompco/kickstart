---
title: Toast
---

# Toast

<Demo name="PageKsToast" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>message</code> | <code>String</code> | <code>''</code> | The message that the toast will display |
| <code>type</code> | <code>String</code> | <code>info</code> | The type of message. Options are the same as alerts. (info, warning, error, success) |
| <code>position</code> | <code>String</code> | <code>top-right</code> | Where the toast should appear. Options are top-right, top, top-left, bottom-right, bottom, bottom-left |
| <code>duration</code> | <code>Number</code> | <code>2500</code> | How long the toast should appear. If 0 is passed the toast will require the user to click to close |
| <code>limit</code> | <code>Number</code> | <code>3</code> | The number of toast that are on screen at once |

## Methods

| Name | Description |
| --- | --- |
| <code>show()</code> | Show the toast. Or if the limit has been reached the toast will be added to the queue. |
| <code>close()</code> | Closes the toast message. |
