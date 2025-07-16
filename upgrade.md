# Upgrade Guide

- [Upgrade to 2.0 from 1.x](#upgrade-to-20-from-1x)

## Upgrade to 2.0 from 1.x

### Css Class Prefixes
Many of the css class names have now been prefixed with `ks-` to prevent conflict with other styles. 

Be sure to update any styles you have that are targeting the following classes:

| Old Class Name             | New Class Name                | 
|:---------------------------|:------------------------------|
| .active-empty-list-message | .ks-active-empty-list-message |
| .alert                     | .ks-alert                     |
| .autocomplete-holder       | .ks-autocomplete-holder       |
| .autocomplete-list         | .ks-autocomplete-list         |
| .button                    | .ks-button                    |
| .cal-blank                 | .ks-cal-blank                 |
| .cal-day                   | .ks-cal-day                   |
| .cal-week                  | .ks-cal-week                  |
| .cal-week-header           | .ks-cal-week-header           |
| .card-body                 | .ks-card-body                 |
| .card-footer               | .ks-card-footer               |
| .card-header               | .ks-card-header               |
| .content                   | .ks-content                   |
| .ctrl-left                 | .ks-ctrl-left                 |
| .ctrl-right                | .ks-ctrl-right                |
| .day-num                   | .ks-day-num                   |
| .dragging                  | .ks-dragging                  |
| .drop-zone-active          | .ks-drop-zone-active          |
| .empty-list-message        | .ks-empty-list-message        |
| .form-group                | .ks-form-group                |
| .form-group.error-msg      | .ks-form-group.ks-error-msg   |
| .form-group.inline         | .ks-form-group.ks-inline      |
| .heading                   | .ks-heading                   |
| .is-multiple               | .ks-multiple                  |
| .is-selected               | .ks-selected                  |
| .label                     | .ks-label                     |
| .light-card                | .ks-light-card                |
| .loader-line               | .ks-loader-line               |
| .month-selection           | .ks-month-selection           |
| .open-picker               | .ks-open-picker               |
| .opt-group                 | .ks-opt-group                 |
| .out-of-scope              | .ks-out-of-scope              |
| .pagination                | .ks-paginator                 |
| .panel                     | .ks-panel                     |
| .panel-body                | .ks-panel-body                |
| .panel-footer              | .ks-panel-footer              |
| .panel-header              | .ks-panel-header              |
| .scroll-table              | .ks-scroll-table              |
| .searching-results         | .ks-searching-results         |
| .selected                  | .ks-selected                  |
| .selected-item             | .ks-selected-item             |
| .selected-month            | .ks-selected-month            |
| .selected-year             | .ks-selected-year             |
| .selection                 | .ks-selection                 |
| .selection-text            | .ks-selection-text            |
| .steps                     | .ks-steps                     |
| .table                     | .ks-table                     |
| .tabs-content              | .ks-tabs-content              |
| .tabs-title-bar            | .ks-tabs-title-bar            |
| .tabs-title-bar-wrapper    | .ks-tabs-title-bar-wrapper    |
| .year-selection            | .ks-year-selection            |


### KsCard Light Header class removed
`.(ks-)light-card.(ks-)card-header.light` adding the `light` class to your card header inside of the `ks-light-card` is no longer necessary since that is the default style. 

### Sass Functions and Mixins
A big part of this update was to remove the dependency on the Bourbon Neat package for grid and layout utlities. 
All functions and mixins were replace with local copies and renamed with the `ks-` prefix.

> Also note that the `$neat-grid` variable was also replaced by `$ks-grid`

| Old Mixin/Function Name | New Mixin/Function Name |
|-------------------------|-------------------------|
| breakpoint()            | ks-breakpoint()         |
| col()                   | ks-col()                |
| col-lg()                | ks-col-lg()             |
| col-med()               | ks-col-med()            |
| col-sm()                | ks-col-sm()             |
| col-tab()               | ks-col-tab()            |
| col-xlg()               | ks-col-xlg()            |
| column-default()        | ks-column-default()     |
| column-ratio()          | ks-column-ratio()       |
| column-width()          | ks-column-width()       |
| float-direction()       | ks-float-direction()    |
| grid()                  | ks-grid()               |
| grid-collapse()         | ks-grid-collapse()      |
| grid-column()           | ks-grid-column()        |
| grid-container()        | ks-grid-container()     |
| grid-media()            | ks-grid-media()         |
| grid-push()             | ks-grid-push()          |
| grid-shift()            | ks-grid-shift()         |
| lg()                    | ks-lg()                 |
| med()                   | ks-med()                |
| merge-defaults()        | ks-merge-defaults()     |
| opposite-direction()    | ks-opposite-direction() |
| overlay-bg()            | ks-overlay-bg()         |
| parse-columns()         | ks-parse-columns()      |
| parse-media()           | ks-parse-media()        |
| rem()                   | ks-rem()                |
| row()                   | ks-row()                |
| row()                   | ks-row()                |
| side-nav()              | ks-side-nav()           |
| sm()                    | ks-sm()                 |
| tab()                   | ks-tab()                |
| top-bar()               | ks-top-bar()            |
| transition()            | ks-transition()         |
| v-center()              | ks-v-center()           |
| xlg()                   | ks-xlg()                |

