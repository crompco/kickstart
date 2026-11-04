import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

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
 * Sass options shared by the CSS build and the demo app
 */
export const sassOptions = {
    silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div', 'if-function'],
    importers: [
        {
            // Webpack-style "~package/path" imports resolve from node_modules
            findFileUrl(url) {
                if ( !url.startsWith('~') ) {
                    return null;
                }

                return pathToFileURL(resolve(root, 'node_modules', url.slice(1)));
            },
        },
    ],
};
