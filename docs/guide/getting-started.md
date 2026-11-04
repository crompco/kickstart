---
title: Getting started
---

# Getting started

## Install

```sh
yarn add kickstart-ui
```

Kickstart needs Vue 2.7.

## Register everything

```js
import Vue from 'vue';
import KickstartUI from 'kickstart-ui';
import 'kickstart-ui/dist/kickstart-ui.min.css';

Vue.use(KickstartUI);
```

`Vue.use` registers all `ks-*` components, the `v-ks-tooltip` directive and the filters, and adds `this.$api` and `this.$toast`.

## Import one component

```js
import { KsSelect } from 'kickstart-ui';
// or
import KsSelect from 'kickstart-ui/lib/KsSelect';
```

## Helpers

```js
import { formatDate, addDays } from 'kickstart-ui/lib/dates';
import api from 'kickstart-ui/lib/api';
```

The date helpers take an optional last `timezone` argument: `'UTC'` (the default), `'local'` or an IANA name such as `'America/New_York'`.

## Sass

```scss
@import "~kickstart-ui/src/styles/app";
```
