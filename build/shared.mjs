import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

export const root = fileURLToPath(new URL('..', import.meta.url));

export const version = pkg.version;

export const banner = `/*!\n * Kickstart v${version}\n * (c) ${new Date().getFullYear()} Crompco LLC\n */`;

/**
 * Everything the package depends on stays external so consumers dedupe it.
 */
export const externals = [
    'vue',
    ...Object.keys(pkg.dependencies || {}),
];

export function isExternal(id) {
    return externals.some(name => id === name || id.startsWith(`${name}/`));
}

/**
 * Sass options for the generated CSS and the demo styles
 */
export const sassOptions = {
    silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div', 'if-function'],
};

/**
 * Vue plugin options for every build. 2.x was compiled by vue-loader 15, which
 * keeps the whitespace between inline elements; plugin-vue2 condenses it.
 */
export const vueOptions = {
    template: {
        compilerOptions: {
            whitespace: 'preserve',
        },
    },
};

/**
 * CSS targets: the oldest browsers with relative color syntax.
 * Nesting is flattened for them.
 */
export const cssTarget = ['chrome119', 'firefox128', 'safari18'];
