import { readdirSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

import { banner, isExternal, root } from './build/shared.mjs';

const components = readdirSync(resolve(root, 'src/components'))
    .filter(file => /^Ks.+\.vue$/.test(file));

const helpers = ['api', 'strings', 'objects', 'dates', 'events'];

/**
 * Per-module ES builds consumed as kickstart-ui/lib/<Name>
 */
export default defineConfig({
    root,

    plugins: [
        vue(),
    ],

    build: {
        outDir: 'lib',
        emptyOutDir: true,
        target: 'es2019',
        minify: false,
        sourcemap: false,

        lib: {
            entry: {
                ...Object.fromEntries(components.map(file => [basename(file, '.vue'), `src/components/${file}`])),
                ...Object.fromEntries(helpers.map(name => [name, `src/helpers/${name}.js`])),
            },
            formats: ['es'],
            fileName: (format, name) => `${name}.js`,
        },

        rollupOptions: {
            external: isExternal,
            output: {
                banner,
                chunkFileNames: 'chunks/[name]-[hash].js',
            },
        },
    },
});
