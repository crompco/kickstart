import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

import { cssTarget, root, sassOptions, vueOptions } from '../build/shared.mjs';

/**
 * Vue 2.7 app with the live examples; the docs show each example in an iframe.
 */
export default defineConfig({
    root: 'demos',
    base: './',

    plugins: [
        vue(vueOptions),
    ],

    resolve: {
        // The examples import some components without the .vue extension
        extensions: ['.mjs', '.js', '.json', '.vue'],
        alias: {
            '@src': `${root}src`,
        },
    },

    css: {
        preprocessorOptions: {
            scss: sassOptions,
        },
    },

    build: {
        outDir: `${root}docs/public/demos`,
        emptyOutDir: true,
        cssTarget,
    },
});
