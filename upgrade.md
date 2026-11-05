# Upgrading from 2.x to 3.0

> Draft: raw change notes. They are rewritten as a guide before the 3.0 release.


## Requirements
- vue ^2.7 peer (was ^2.2)
- axios now ^1.x dependency (was 0.15). Consumers' own axios separate. axios 1 config.headers is AxiosHeaders (set()/get(); bracket access still works).
- A cancel token made with a consumer's own older axios fails on the kickstart instance: axios 1's adapter calls `cancelToken.subscribe()`, which axios before 0.22 does not have. Use the same axios major version, or an `AbortController` signal. vault-service: `InvoiceItemMixin.js` (axios 0.15.3).
- normalize.css v5.0.0 is vendored as src/css/normalize.css. `_kickstart.scss` imports that copy, so consumers no longer need the `normalize.css` package for kickstart.
- Removed deps: tether, velocity-animate, popper.js, v-mask (kickstart no longer registers or needs v-mask; consumers that use v-mask themselves keep their own)
- A consumer that imports popper.js, velocity-animate or v-mask must now declare it in its own package.json. With 2.x these came in through kickstart. vault-service imports popper.js in SearchFilters.vue, SavedSearchFilters.vue and UI/TextExcerpt.vue.

## Package / build
- package.json entry fields: `"main"` is now dist/kickstart-ui.min.js (2.x pointed at a missing index.js); `"module"` is dist/kickstart-ui.esm.js; `"style"` is dist/kickstart-ui.min.css
- dist/ and lib/ not in git anymore; built on `npm pack/publish` (prepack). Same filenames.
- lib/* are ES modules now (were UMD). webpack 5 / Vite fine. lib shared code in lib/chunks/.
- UMD global KickstartUI; externals vue (Vue), axios (axios), @floating-ui/dom (FloatingUIDOM) must be loaded first when using script tags.
- src/helpers/polyfills, src/helpers/throttle.js, src/helpers/animations.js, src/helpers/tether-constraints.js, src/js/navigation.js removed. src/svg/*.svg stay but components use src/components/icons/*.vue.
- Webpack-only `process.env.BUILD` css require removed.

## Dates (lib/dates)
- New trailing `timezone` param: 'UTC' (default), 'local', or IANA name. parseDate/getDaysInMonth default 'local'.
  - formatDate(date, format, parse_format, locale, timezone)
  - addDays/subDays/addMonths/subMonths/subYears/addYears(date, n, timezone); dateModify(d, inc, val, timezone)
  - parseDate(str, format, timezone='local'); getDaysInMonth(month, year, timezone='local')
  - diffInDays(d1, d2, format, timezone)
- New exports: UTC, LOCAL, dateParts, makeDate, addYears; dateModify now in default export.
- Behavior fixes:
  - formatDate(string) parses the string in the same tz as formatting → string round trips in every zone (was off by one in UTC+ zones).
  - formatDate returns '' for invalid/empty dates (was "NaN-aN-aN" or threw).
  - Tokens replaced in one pass, all occurrences (was first occurrence only; inserted text could be re-replaced). Tokens unchanged: Y y m M d D l.
    - Code that runs formatTime() over a full format and then passes the result to formatDate() as the format breaks: 'm/d/Y h:ia' → 'm/d/Y 10:43am' → "10/20/2026 10:43a10" ('m' in "am", 'M' in "AM"). Format the date and time parts separately (vault-service `date` filter in helpers/filters.js).
  - day/week/month/year arithmetic is calendar arithmetic in the tz (DST safe with 'local'/IANA). Default UTC = same results as v2 (+24h).
  - subYears now uses the tz (default UTC; v2 used local setFullYear).
  - diffInDays counts calendar days (was ceil of elapsed ms → DST off by one; time-of-day partial days counted).
  - parseDate: returns Invalid Date for empty/non-string (was throw); clones Date input.
  - parseTime: accepts "1430", "930", "2pm"; 24:00 is 12:00 am (#43); 24-hour value with meridiem ("13:30 pm") keeps 24h value (v2 gave full_hour 25); invalid minute/hour → default; no console.error; non-string → default (was throw).
  - formatTime tokens H h i a A one pass.

## strings (lib/strings)
- ucwords/posesses/ellipsis: null/undefined → '' (was "Null"/throw).
- currency: non-number → '' (was "$NaN"); fixes "-,123.00" for -123.
- possesses alias added.

## objects (lib/objects)
- object_get returns falsy values (0, false, ''); default only for null/undefined/missing; no throw on null in the path. (v2 returned default for 0/false/'')
- looseIndexOf returns a number for arrays (was string key).

## events (lib/events)
- removeSmartFocusToggle actually removes listeners (v2 passed wrong args) and cancels pending blur callback.
- stopParentScroll, scrolledToBottom, mouseHold return a remover function.
- removeEvent in default export. IE attachEvent paths removed.
- mouseHold stops on mouseleave too.

## dom
- parent(el, selector) uses closest(); null-safe class helpers.

## api (lib/api)
- baseUrl() sets the shared instance AND axios.defaults (axios 1 copies defaults at create; needed so VITE_API_URL keeps working).
- interceptors: onRejected returning a promise now settles the request (retry works); returning undefined keeps the original error (v2 rejected with undefined); missing onFulfilled no longer throws.
- api.isCancel(error) added.
- GET params keep the 2.x (axios 0.15) query string format: object values are sent as JSON (`nearby={"bounds":…}`), arrays as `key[]=…`, Dates as ISO strings, null/undefined left out. axios 1.x on its own would send `nearby[bounds][north]=…`, which breaks backends that `json_decode()` the value (vault-service schedule map nearby filter). The shared instance and `createFromConfig()` use the exported `serializeParams`; a config with its own `paramsSerializer` keeps it. An object form such as `{ encode }` replaces the 2.x format completely, objects included. Direct calls to the global `axios` do not use the kickstart instance; set `axios.defaults.paramsSerializer = serializeParams` if the app sends object params that way.
- createFromConfig still replaces the instance (interceptors don't carry over) - unchanged, documented.

## install
- One install() in src/install.js; throws on Vue 3 app.
- Registers v-ks-tooltip directive (v2 registered it as an import side effect on the global Vue, with shared state across all elements).
- Named export `install`, `KsTooltipDirective`, `registeredComponents`.
- Filters still registered (Vue 2 only) — deprecated for Vue 3; use lib/strings functions.

## Toast
- KsToast emits 'closed'; $toast destroys it (component no longer calls $destroy on itself). One shared .ks-toast container.

## Positioning (tether → floating-ui)
- attachment/targetAttachment/constraints props keep the tether format; same tether-* classes on the element (CSS unchanged).
- Tooltip: positions only while shown; listeners removed on destroy (v2 leaked: guard always returned); target may be an Element; isActive=false hides an open tooltip.
- Tooltip directive: text by default; `{ content, html: true }` for HTML; options via value object; .click modifier; per element.
- Action menu: list still moved to `<body>` (selectors `.ks-menu-list.active` unchanged); beforeRouteUpdate/Leave hooks removed (never worked on non-route components); window.actionEvent global removed (CustomEvent 'close:actionmenu' with detail).
- SlideTransition: Web Animations API instead of Velocity; same 400ms; no-op where el.animate is missing.

## Datepicker
- Internal mask replaces v-mask (same ##/##/#### behavior; literal added when the next digit is typed).

## Tabs / Accordion / Steps (phase 4a)
- KsTab registers through inject; works with PascalCase/local registration (v2 needed `ks-tabs` tag name, else infinite recursion).
- active/inactive fire only on change (v2 fired inactive on every tab change for every tab).
- Remembered tab that no longer exists → first tab (v2: no tab active).
- Tabs added later (v-if) keep document order; removing the active tab activates a neighbour.
- KsTabs `activeTab` is now a computed title (same value as v2 data); internal `active_tab` is the component. `tab`/`sessionTab` data removed.
- align/expand classes now reactive.
- New prop `scrollable` (#91) with arrow buttons; new CSS .ks-tabs.scrollable, .ks-tabs-scroll-arrow(-left|-right).
- KsTab.setActive(false) no longer deactivates (activate another tab instead).
- Accordion rows register via inject (v2 walked $parent and crashed without KsAccordion); a row alone toggles itself. `activeAccordion` data removed.
- KsStepThrough completed marks now render (v2 not reactive).

## Modal (phase 4b)
- loading prop applies at mount (v2 ignored the first value until it changed). A constant `:loading="true"` now shows a loader line that never stops: vault-service AdminBillingTermsList.vue "Payment Term Customers" modal. Modals that start with `loading: true` and load on open now show the loader during the first load.
- destroy emits close only if open (v2 emitted close for every destroyed modal).
- resize listener removed on destroy.
- internal $on('open') removed (no consumer impact).

## Checkbox / Radio (phase 4c)
- KsCheckbox emits a NEW array (v2 pushed/spliced the bound array in place). Code that relied on the same array reference must use the emitted value.
- KsCheckbox without `value` is a boolean (v2: value undefined → never checked, emitted undefined).
- KsCheckbox follows `value` prop changes.
- KsRadio: `disabled` prop now works (v2 ignored it); emits once on the input change event (v2 label click could emit twice); null label OK; slot-only label shown; new class ks-state-disabled.
- KsRadioGroup passes `disabled` to each radio (v2 only added a class). selectedValue data removed.
- OptionGroups: empty options OK.

## Paginators / Button / misc (phase 4d)
- Routed paginators push { path, query } (v2 pushed { to, params, query }; `to` is not a vue-router key).
- KsPaginator prev/next get `disabled` class at the ends.
- KsButton `el` prop renders that element (#26); non-button elements get aria-disabled + .disabled and block clicks.
- KsButton spinner is centered in the button (v2 placed it by the label width and line box, so it sat off-center, most visibly in small buttons). The wrapper is the new class `.ks-button-spinner`; its inline width is gone.
- KsDroppable `accept` function receives the drag event; dragenter handled; leaving onto a child keeps it active.
- KsDraggable sets 'text/plain' '' (v2 set "null"); disabled prevents dragstart.
- KsSideNav: `classObj` is computed; link click resets state (v2 left `show` true so the class came back); removes listener and body class on destroy; console.log removed.
- KsTopNav: listeners removed on destroy; resize listener added once; `fixed` reactive.
- KsLoaderLine got name.

## Select / Autocomplete (phase 4e)
- Dropdowns use fixed positioning against the control (floating-ui): not clipped by overflow containers (modals); flip above when no room below (#68-style). `inverted` now from real overflow, not invertOffsetRatio (prop kept, unused, deprecated).
- New CSS: .ks-select-dropdown is flex column (.ks-select-dropdown-inverted reverses); .autocomplete-list-wrapper is flex column (.inverted reverses); .ks-autocomplete-list inside them is position: relative, margin 0. Custom CSS that offsets the absolute list (top/margin-top/left) inside these no longer applies.
- Window scroll listener removed from KsSelect (handleScroll gone).
- KsSelect: value 0 is a value (v2 showed placeholder) when the select binds keys. When it binds objects (`force-objects`, or an object value), a value that is not an object is no selection, and the placeholder shows, as in 2.x. clear() closes; selectItem ignores a missing item.
- KsAutocomplete multiple: emits NEW arrays and no longer mutates the bound array (v2 pushed/spliced value in place).
- KsAutocomplete: backspace via @keyup.backspace; keys on lists; listHeight is a computed style.
- ListIndexNavigator: in-flight searches abort on new search/destroy (AbortController; api.isCancel ignored); all document/list listeners removed on destroy (v2 leaked mousemove and focus toggles); filter matches non-string fields via String(); no filter cache for items mode.
- emits declared on all.

## Calendar / Datepicker (phase 4f)
- New `timezone` prop on KsCalendar and KsDatepicker ('UTC' default, 'local', IANA). Date props (date, selection, minDate, maxDate, datepicker value) are read in it; strings are plain dates. v2 mixed local and UTC → wrong days/weekday alignment in UTC+ zones (e.g. Asia/Tokyo); now correct in every zone.
- Without a date the calendar shows the viewer's local month (`date` default is now ''; v2 default new Date()). `today` (ks-today) is the viewer's local date for a UTC calendar, or the date in the IANA zone (v2: UTC date → wrong in US evenings).
- changeMonth/changeYear keep the day inside the month (v2: Jan 31 → March 3; Feb 29 → March 1).
- min/max compare calendar dates (v2 compared instants: minDate = new Date() excluded today).
- `selection` accepts an array of dates or a Date (v2: string only).
- Day cells have tabindex 0 only when interactive and in scope (v2 rendered tabindex="true"/"false").
- `| day` filter and the unused provide() removed; mouse hold listeners removed on destroy / when showControls turns off.
- Datepicker: hidden input holds the formatted value_date (v2: raw value, a Date rendered as toString()); display shows the value on first render (v2 data read a computed before it existed); emits '' when the display empties, unless the value is already ''; an undefined or null value emits '' after mount, also when the parent empties it during mount, as in v2 (vault-service's Schedule > Map relies on it to fall back to today); close emitted once; listeners removed on unmount.
- emits declared.

## Timepicker (phase 4g)
- List positioned with fixed positioning against the field (#68): not hidden behind/clipped by other elements; flips above (ul gets .inverted; new CSS border rule).
- 24-hour input (#69): typing "1300"/"1437" filters to and accepts that time; Enter/blur keeps a typed time that is not in the list.
- Typed times validated with parseTime (v2 used new Date("09:00 am") → always invalid in most browsers, so typed values were reset).
- Clearing the text and leaving the field clears the value (v2 restored the old value).
- Selecting the first option by index 0 works (v2 `index || selected_index`).
- endOfDay compares the parsed max time (v2 string compare "11:59 pm" >= "23:59" failed) and no duplicate 23:59; option keys unique (#41/#43).
- Options stay on step boundaries of the hour (unchanged from v2); bad min/max fall back to defaults.
- Own focus listener removed (mixin's is used, removed on destroy); keyCode modifiers replaced (.backspace); hidden input no longer re-emits DOM input events.
- emits declared.

## Lint
- ESLint 10 flat config, plugin-vue flat/vue2-essential; runs in CI.

## New: KsDataTable / KsDataColumn (phase 5, from PR #92)
- Declarative table: `<ks-data-column>` children (label, field as key / dotted path / array of keys, sortable, align, width, tdClass, thClass; default scoped slot { row, value }, header scoped slot).
- Controlled sort (sortField/sortDirection + `sort` { field, direction } cycling asc → desc → null), selection (multiple/single; internal or v-model / :selected.sync with event update:selected; emits new arrays), expandable rows (expansion slot), rowClass (value or function), scrollable / stickyHeader / maxHeight, loader/empty/footer/paginator slots, built-in KsPaginator (`page` event).
- Changes from the PR: columns register through inject `ksDataTable` and keep document order when added later (v-if); dotted field paths; rows without an id get unique keys; slot access works with Vue 3 $slots; no `_uid`; emits declared; unused $sortInfo provide removed.
- Render function uses the Vue 2 createElement data shape; a Vue 3 move rewrites it with `h` from 'vue'.

## Form control spacing (CSS phase)
- Text inputs, textareas, `.ks-datepicker` inputs, `.ks-select`, `.ks-autocomplete-holder` and option buttons no longer have a `0.3rem` bottom margin. The parent spaces controls: `.ks-form-group` has `margin-bottom: 1rem`. A control outside a `.ks-form-group` now sits flush against what follows it. Add spacing on its container where you need it.
- `$form-block-margin-bottom` still exists for the deprecated `form-input()` mixin, which still emits the margin. No `--ks-*` token replaces it.
- The "Control heights" styles page measures each control next to a text input.
- Controls are one height. Option buttons use `0.5rem` padding and the text-input line height (2.x used `0.532rem`). `$button-padding` defaults to `0.5em 0.75em` (2.x: `0.4em 0.6em`), so a default `.ks-button` is as tall as a text input. The padding stays in `em` on purpose: `.tiny`, `.small` and `.large` change only the font size, so their padding scales with it. `.tiny`, `.small` and `.large` still scale from it. The `.ks-select` selection uses padding plus `1lh` for its minimum height, not `2.125rem`, so it matches an input at the 14px and the 16px root size.
- Padding sits on a 0.25rem scale. A 0.125rem step is used only for small items: badges, autocomplete chips and option group titles. Changed defaults (2.x → 3.0):
  - `$am-button-padding` 3px 5px → 0.25rem; `$am-list-link-padding` 0.35rem 0.75rem 0.35rem 0.5rem → 0.5rem 0.75rem 0.5rem 0.5rem
  - `$ac-input-multi-padding` 0.3rem → 0.25rem; `$ac-list-item-padding` and `$timepicker-list-item-padding` left 0.2rem → 0.25rem; `$ac-multi-padding` 3px 5px → 0.125rem 0.25rem
  - `$badge-padding` 3px 8px → 0.125rem 0.5rem; `$button-padding` 0.4em 0.6em → 0.5em 0.75em; `$form-error-padding` 0.2rem → 0.25rem
  - `$nav-padding` 10px → 0.5rem (no rule uses it, and it has no token); `$panel-header-padding` 10px → 0.75rem; `$panel-body-padding` 15px → 1rem; `$select-input-padding` 0.4rem → 0.5rem
  - Fixed values: toast close gap 30px → 2rem; modal header title 0.9rem → 1rem; accordion content 0.6rem → 0.5rem; side nav links 1em → 1rem; top bar dropdown links 10px → 0.5rem; top bar links 15px 10px → 1rem 0.75rem; option group titles 0.15rem → 0.125rem
  - Values kept on purpose: the 1px offsets that make up for borders, the `p-*` table spacing utilities, and the mobile top bar dropdown padding, which is half of `$top-bar-dd-link-padding`.
- `.ks-button` has no drop shadow: `$button-box-shadow` defaults to `false`. Set it, or `--ks-button-box-shadow`, to bring the shadow back.
- `.button-label` is `display: inline`, not `inline-block`, so the button text sits on the same baseline as other control text.
- Checked checkbox and radio labels, and active option buttons, no longer have the fake-bold `text-shadow`. A text shadow switches Chrome on Windows to grayscale antialiasing, so that text rendered differently from other control text.
- Active option buttons have no inset shadow, so they are a flat fill like `.ks-button`. The 2px focus ring (`.ks-state-focus`) is unchanged.
- The X on autocomplete selections uses `currentColor`, so it matches the selection text (white on multiple-selection chips). `$ac-clear-color`, `$ac-clear-color-hover`, `$ac-multi-close-color` and `$ac-multi-close-color-hover` no longer have an effect, and they have no `--ks-*` tokens. vault-service and vault-api set the two multi-close variables; those overrides can go.
- `$flex-wrap` no longer has a `column-reverse` entry. It wrote an invalid `.column-reverse { flex-wrap: column-reverse }` rule. `.column-reverse` still sets `flex-direction: column-reverse`.

## Styles: CSS and tokens (CSS phase)
- The styles are plain CSS in `src/css`. Entry points:
  - `src/css/app.css`: everything. It is the source of `dist/kickstart-ui.min.css`.
  - `src/css/kickstart.css`: tokens, normalize, the grid and all components. It has no utility classes.
  - `src/css/utilities.css`: the utility classes only.
  - One file per component in `src/css/components/`, and `src/css/layout/grid.css`. `dist/css/` has the same files, minified.
- The source files use native CSS nesting. The `dist/` files have the nesting flattened. All files use relative colors (`hsl(from var(--ks-…) h s calc(l - 10))`), so the minimum browsers are Chrome 119, Firefox 128 and Safari 18.
- Theme with the `--ks-*` custom properties on `:root`. `src/css/tokens.css` defines them all. A token name is the Sass variable name with a `--ks-` prefix: `$button-padding` → `--ks-button-padding`. Map entries become one token for each key, for example `--ks-button-outline-background-color`.
- A component file needs `tokens.css` first. Some files also need another file first:
  - `components/forms.css` needs `components/forms/options.css` and `components/forms/select.css`.
  - `components/datepicker.css` needs `components/calendar.css`.
- The grid and the map-driven utilities (layout, spacing, text, borders, shadows, background) are generated from the Sass maps with their default values. Run `yarn generate:css` to update them. A test fails when a generated file is out of date.
- The grid stays float-based. `.row` stays a clearfix, because many pages and kickstart components use it on elements that are not grid rows (paginators, accordion rows, calendar cells).
- `.sm-collapse`, `.tab-collapse`, `.med-collapse`, `.lg-collapse`, `.xlg-collapse` and `.row-collapse` set `margin-right: -1rem`. 2.x wrote an invalid `margin-: -1rem`, because `ks-opposite-direction()` had no `ltr` default. In normal block layout these elements have a fixed width, so nothing moves. In a flex container, 2.x shrank the row by 1rem (it overflowed on the right). v3 does not shrink it, so the row bleeds 1rem on both sides as intended, and it is 1rem wider than in 2.x. In vault-service this moves list columns such as Actions 1rem to the right, in line with the buttons above them.

### Sass shim (deprecated)
- `src/styles` still compiles: `_kickstart.scss`, `_utilities.scss`, and each component partial alone. It will be removed in v4.
- The shim imports `src/styles/css/components/*.css`, generated copies of `src/css/components` with the nesting written out as full selectors (`yarn generate:css`). Two reasons:
  - Sass cannot `@extend` into native nesting the way it extends flat rules. For example, vault-service's `.form-group > .error-msg { @extend .ks-error-msg; }` became `.ks-form-group .form-group > .error-msg`, so form errors lost their style.
  - Sass before about 1.80 (vault-service uses 1.77) loses the parent selector of an `@media` nested two rules deep. It wrote `@media … { &.vertical { … } }`, so side nav, top bar, tabs and responsive table rules matched nothing or the whole page.
- Each compile shows one deprecation `@warn`. Set `$ks-sass-deprecation-warning: false` before the import to hide it.
- The shim writes your Sass variable overrides as `--ks-*` tokens on `:root`, then imports the CSS. Each token group is written once per compile.
- Map keys that are not defaults get their own rules: `$buttons`, `$button-sizes`, `$alerts`, `$brand` and `$spacing`. Custom `$colors` maps also work through the shim, because the shim compiles the utilities from Sass.
- The 2.x mixins, functions and placeholders stay available, including `form-input()`, `%form-input`, `%ks-autocomplete-input`, `v-center()` and the grid mixins.
- A variable set to `false` (an optional property) writes the token as `initial`. The property then falls back to its unset value.
- `_kickstart.scss` no longer needs a `~` importer for normalize.css.
- `.ks-select .ks-select-dropdown .autocomplete-list` rules are gone. KsSelect has rendered `.ks-autocomplete-list` since 2.x, so they matched nothing.
- These variables no longer have an effect: `$ac-clear-color`, `$ac-clear-color-hover`, `$ac-multi-close-color`, `$ac-multi-close-color-hover` (see above) and `$nav-padding`.

## Icons
- The kickstart icons (close, menu, dots, checkmark, chevron) no longer contain an SVG `<title>`. 2.x showed it as a hover tooltip ("close", "menu", "checkmark") and included the word in the element's text content, for example "checkmark Apple" for a checkbox. Tests that match the full text content of a checkbox, modal close button or menu button change.
