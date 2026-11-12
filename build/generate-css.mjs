import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { transformSync } from 'esbuild';
import * as sass from 'sass';

import { cssTarget, root, sassOptions } from './shared.mjs';

/**
 * CSS sources compiled from Sass with the default variables: the --ks-* tokens,
 * and the grid and utility classes, which the Sass maps generate.
 */
const sources = {
    'src/css/tokens.css': 'src/styles/tokens/_all.scss',
    'src/css/layout/grid.css': 'src/styles/layout/_grid.scss',
    'src/css/utilities/layout.css': 'src/styles/components/utilities/_layout.scss',
    'src/css/utilities/spacing.css': 'src/styles/components/utilities/_spacing.scss',
    'src/css/utilities/text.css': 'src/styles/components/utilities/_text.scss',
    'src/css/utilities/borders.css': 'src/styles/components/utilities/_borders.scss',
    'src/css/utilities/shadows.css': 'src/styles/components/utilities/_shadows.scss',
    'src/css/utilities/background.css': 'src/styles/components/utilities/_background.scss',
};

/**
 * The component CSS the Sass shim imports. Sass cannot @extend into native nesting
 * the way it extends flat rules, and Sass before 1.80 loses the parent of an @media
 * nested two rules deep, so the shim gets copies with the nesting written out.
 */
const flatSource = 'src/css/components';
const flatTarget = 'src/styles/css/components';

/**
 * @param {string} dir
 * @return {string[]} absolute paths of the CSS files in dir and its subdirectories
 */
function cssFiles(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = resolve(dir, entry.name);

        return entry.isDirectory() ? cssFiles(path) : entry.name.endsWith('.css') ? [path] : [];
    });
}

/**
 * @return {Object<string, string>} file contents by path
 */
export function generateCss() {
    const compiled = Object.entries(sources).map(([file, source]) => {
        const css = sass.compileString(`$ks-sass-deprecation-warning: false;\n@import "${source}";`, {
            style: 'expanded',
            loadPaths: [root],
            ...sassOptions,
        }).css;

        return [file, `/* Generated from ${source} by build/generate-css.mjs */\n${css}\n`];
    });

    const source_dir = resolve(root, flatSource);
    const flat = cssFiles(source_dir).map(path => relative(source_dir, path)).sort().map((file) => {
        const source = `${flatSource}/${file}`;
        const css = transformSync(readFileSync(resolve(root, source), 'utf8'), {
            loader: 'css',
            target: cssTarget,
            supported: { 'nesting': false, 'is-pseudo-class': false },
        }).code;

        return [`${flatTarget}/${file}`, `/* Generated from ${source} by build/generate-css.mjs */\n${css}`];
    });

    return Object.fromEntries([...compiled, ...flat]);
}

if ( import.meta.url === `file://${process.argv[1]}` ) {
    for ( const [file, css] of Object.entries(generateCss()) ) {
        mkdirSync(dirname(resolve(root, file)), { recursive: true });
        writeFileSync(resolve(root, file), css);
    }
}
