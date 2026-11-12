# Kickstart UI

Vue 2.7 components, helpers and CSS utilities. Version 3 keeps the 2.x component API, replaces the Sass build with plain CSS and `--ks-*` design tokens, and prepares the library for Vue 3.

- **Documentation:** the VitePress site in [`docs/`](docs/). Run it locally with `yarn docs:dev`.
- **Upgrading from 2.x:** read [upgrade.md](upgrade.md). It lists every change that can affect app code.

## Install

```sh
yarn add kickstart-ui
```

Kickstart needs Vue 2.7.

```js
import Vue from 'vue';
import KickstartUI from 'kickstart-ui';
import 'kickstart-ui/dist/kickstart-ui.min.css';

Vue.use(KickstartUI);
```

The [getting started guide](docs/guide/getting-started.md) shows how to import single components, the helpers and the Sass entry point. Each component also has its own minified CSS file in `dist/css/`.

## Browser support

Chrome 119, Firefox 128 and Safari 18 or newer. The CSS uses relative color syntax.

## Development

```sh
yarn install
yarn test          # unit tests (Vitest)
yarn lint          # ESLint
yarn build         # dist/ and lib/ bundles and the CSS
yarn demos:dev     # live component examples
yarn docs:dev      # documentation site with the examples
```

The CSS source is in `src/css`. The Sass files in `src/styles` are a deprecated compatibility layer. Run `yarn generate:css` after a change to the Sass maps or the component CSS.
