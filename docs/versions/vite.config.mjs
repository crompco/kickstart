import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

const docs = fileURLToPath(new URL('..', import.meta.url));
const modules = `${docs}versions/node_modules/`;

/**
 * The tags load their polyfills with CommonJS require(), which a browser build cannot run
 */
const polyfillImports = {
    name: 'kickstart-polyfill-imports',
    transform(code, id) {
        if ( id.endsWith('/helpers/polyfills/index.js') ) {
            return code.replace(/require\((['"][^'"]+['"])\);?/g, 'import $1;');
        }
    },
};

/**
 * Vue 2.7 build of a 1.x or 2.x tag's examples; the tag's source and docs are extracted into docs/.versions/<version>
 */
export default ({ version, docs_folder }) => defineConfig({
    configFile: false,
    root: `${docs}versions/legacy`,
    base: './',
    logLevel: 'warn',

    plugins: [
        vue(),
        polyfillImports,
    ],

    define: {
        'process.env.BUILD': JSON.stringify('docs'),
    },

    resolve: {
        extensions: ['.mjs', '.js', '.json', '.vue'],
        alias: [
            { find: '@version-docs', replacement: `${docs}.versions/${version}/${docs_folder}` },
            { find: '@version', replacement: `${docs}.versions/${version}` },
            { find: /^~(.*)$/, replacement: `${modules}$1` },
            { find: /^(vue|axios|tether|popper\.js|velocity-animate|v-mask|prismjs|normalize\.css)(\/.*)?$/, replacement: `${modules}$1$2` },
        ],
    },

    css: {
        preprocessorOptions: {
            scss: {
                api: 'legacy',
                quietDeps: true,
                silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div', 'mixed-decls'],
            },
        },
    },

    build: {
        outDir: `${docs}public/${version}/demos`,
        emptyOutDir: true,
        chunkSizeWarningLimit: 2000,
    },
});
