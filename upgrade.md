# Upgrade Guide

- [Upgrade to 2.0 from 1.x](#upgrade-to-20-from-1x)

## Upgrade to 2.0 from 1.x

### Css Class Prefixes
Many of the css class names have now been prefixed with `ks-` to prevent conflict with other styles. 

Be sure to update any styles you have that are targeting the following classes:

| Old Class Name             | New Class Name                |
|----------------------------|-------------------------------|
| .content                   | .ks-content                   |
| .heading                   | .ks-heading                   |
| .alert                     | .ks-alert                     |
| .autocomplete-holder       | .ks-autocomplete-holder       |
| .autocomplete-list         | .ks-autocomplete-list         |
| .is-multiple               | .ks-multiple                  |
| .searching-results         | .ks-searching-results         |
| .is-selected               | .ks-selected                  |
| .selection                 | .ks-selection                 |
| .selection-text            | .ks-selection-text            |
| .selected                  | .ks-selected                  |
| .opt-group                 | .ks-opt-group                 |
| .selected-item             | .ks-selected-item             |
| .empty-list-message        | .ks-empty-list-message        |
| .active-empty-list-message | .ks-active-empty-list-message |
| .button                    | .ks-button                    |
| .open-picker               | .ks-open-picker               |
| .cal-week                  | .ks-cal-week                  |
| .cal-week-header           | .ks-cal-week-header           |
| .cal-day                   | .ks-cal-day                   |
| .out-of-scope              | .ks-out-of-scope              |
| .ctrl-left                 | .ks-ctrl-left                 |
| .ctrl-right                | .ks-ctrl-right                |
| .cal-blank                 | .ks-cal-blank                 |
| .day-num                   | .ks-day-num                   |
| .month-selection           | .ks-month-selection           |
| .selected-month            | .ks-selected-month            |
| .year-selection            | .ks-year-selection            |
| .selected-year             | .ks-selected-year             |
| .card-header               | .ks-card-header               |
| .card-body                 | .ks-card-body                 |
| .card-footer               | .ks-card-footer               |
| .light-card                | .ks-light-card                |
| .drop-zone-active          | .ks-drop-zone-active          |
| .dragging                  | .ks-dragging                  |
| .form-group                | .ks-form-group                |
| .label                     | .ks-label                     |
| .form-group.inline         | .ks-form-group.ks-inline      |
| .form-group.error-msg      | .ks-form-group.ks-error-msg   |
| .loader-line               | .ks-loader-line               |
| .pagination                | .ks-paginat**or**             |
| .steps                     | .ks-steps                     |
| .table                     | .ks-table                     |
| .scroll-table              | .ks-scroll-table              |
| .tabs-title-bar            | .ks-tabs-title-bar            |
| .tabs-title-bar-wrapper    | .ks-tabs-title-bar-wrapper    |
| .tabs-content              | .ks-tabs-content              |

### KsCard Light Header class removed
`.(ks-)light-card.(ks-)card-header.light` adding the `light` class to your card header inside of the `ks-light-card` is no longer necessary since that is the default style. 

### Sass Functions and Mixins
A big part of this update was to remove the dependency on the Bourbon Neat package for grid and layout utlities. 
All functions and mixins were replace with local copies and renamed with the `ks-` prefix.

> Also note that the `$neat-grid` variable was also replaced by `$ks-grid`

| Old Mixin/Function Name | New Mixin/Function Name   |
|-------------------------|---------------------------|
| column-default()        | ks-column-default()       |
| column-ratio()          | ks-column-ratio()         |
| column-width()          | ks-column-width()         |
| float-direction()       | ks-float-direction()      |
| merge-defaults()        | ks-merge-defaults()       |
| opposite-direction()    | ks-opposite-direction()   |
| parse-columns()         | ks-parse-columns()        |
| parse-media()           | ks-parse-media()          |
| col()                   | ks-col()                  |
| row()                   | ks-row()                  |
| grid()                  | ks-grid()                 |
| grid-column()           | ks-grid-column()          |
| grid-push()             | ks-grid-push()            |
| grid-shift()            | ks-grid-shift()           |
| grid-collapse()         | ks-grid-collapse()        |
| grid-container()        | ks-grid-container()       |
| grid-media()            | ks-grid-media()           |
| breakpoint()            | ks-breakpoint()           |
| sm()                    | ks-sm()                   |
| tab()                   | ks-tab()                  |
| med()                   | ks-med()                  |
| lg()                    | ks-lg()                   |
| xlg()                   | ks-xlg()                  |
| sm()                    | ks-col-sm()               |
| tab()                   | ks-col-tab()              |
| med()                   | ks-col-med()              |
| lg()                    | ks-col-lg()               |
| xlg()                   | ks-col-xlg()              |
| row()                   | ks-row()                  |
| side-nav()              | ks-side-nav()             |
| top-bar()               | ks-top-bar()              |
| v-center()              | ks-v-center()             |
| transition()            | ks-transition()           |
| overlay-bg()            | ks-overlay-bg()           |
| rem()                   | ks-rem()                  |


