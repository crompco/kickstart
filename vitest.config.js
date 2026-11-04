import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue2';

import { vueOptions } from './build/shared.mjs';

export default defineConfig({
    plugins: [
        vue(vueOptions),
    ],

    test: {
        environment: 'jsdom',
        include: ['test/**/*.test.js'],
        restoreMocks: true,
    },
});
