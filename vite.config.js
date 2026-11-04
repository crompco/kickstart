import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

import { banner, isExternal, root } from './build/shared.mjs';

/**
 * Bundles: dist/kickstart-ui.esm.js (ES) and dist/kickstart-ui.min.js (UMD, global KickstartUI)
 */
export default defineConfig({
    root,

    plugins: [
        vue(),
    ],

    build: {
        outDir: 'dist',
        emptyOutDir: false,
        target: 'es2019',
        minify: true,
        sourcemap: false,

        lib: {
            entry: 'src/index.js',
            name: 'KickstartUI',
            formats: ['es', 'umd'],
            fileName: format => format === 'es' ? 'kickstart-ui.esm.js' : 'kickstart-ui.min.js',
        },

        rollupOptions: {
            external: isExternal,
            output: {
                banner,
                exports: 'named',
                globals: {
                    vue: 'Vue',
                    axios: 'axios',
                    '@floating-ui/dom': 'FloatingUIDOM',
                },
            },
        },
    },
});
