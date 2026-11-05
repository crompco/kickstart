---
title: Kickstart UI 2.x
---

# Kickstart UI 2.x

These pages document Kickstart UI 2.x. The live examples are built from the `v2.1.1` release.

```sh
yarn add kickstart-ui@2.1.1
```

```js
import Vue from 'vue';
import KickstartUI from 'kickstart-ui';
import 'kickstart-ui/dist/kickstart-ui.min.css';

Vue.use(KickstartUI);
```

The package installs `axios`, `popper.js`, `velocity-animate` and `v-mask`. It does not install `tether`, which `KsActionMenu` and the tooltip import, so add `tether@^1.4.0` to the app.

Upgrading from 1.x: read [Upgrade from 1.x](./upgrade).

Start with the [components](./components/ks-button) or the [styles](./styles/grid).
