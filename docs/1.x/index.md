---
title: Kickstart UI 1.x
---

# Kickstart UI 1.x

These pages document Kickstart UI 1.x. The live examples are built from the `v1.1.2` release.

```sh
yarn add kickstart-ui@1.1.2
```

```js
import Vue from 'vue';
import KickstartUI from 'kickstart-ui/dist/kickstart-ui.min.js';
import 'kickstart-ui/dist/kickstart-ui.min.css';

Vue.use(KickstartUI);
```

The 1.x package has no ES module build, so the app imports the UMD bundle.

The package installs `axios`, `bourbon-neat`, `popper.js`, `velocity-animate` and `v-mask`. It does not install `tether`, which `KsActionMenu` and the tooltip import, so add `tether@^1.4.0` to the app.



Start with the [components](./components/ks-button) or the [styles](./styles/grid).
