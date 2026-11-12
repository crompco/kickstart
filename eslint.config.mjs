import js from '@eslint/js';
import globals from 'globals';
import vue from 'eslint-plugin-vue';

export default [
    {
        ignores: [
            'dist/**',
            'lib/**',
            'docs/**',
            // Example pages carried over from the 2.x docs
            'demos/examples/**',
            'node_modules/**',
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
