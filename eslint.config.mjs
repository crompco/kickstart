import js from '@eslint/js';
import globals from 'globals';
import vue from 'eslint-plugin-vue';

export default [
    {
        ignores: [
            'dist/**',
            'lib/**',
            'docs/**',
            'docs-src/**',
            'node_modules/**',
            'nuxt-dist/**',
        ],
    },
    js.configs.recommended,
    ...vue.configs['flat/vue2-essential'],
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ['build/**', 'test/**', '*.config.js', '*.config.mjs'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
