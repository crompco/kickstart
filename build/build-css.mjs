import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { build } from 'esbuild';

import { banner, cssTarget, root } from './shared.mjs';

const source = resolve(root, 'src/css');

/**
 * Bundles a CSS file and its imports, flattens nesting and minifies
 * @param {string} file - path under src/css
 * @return {Promise<string>}
 */
async function bundle(file) {
    const result = await build({
        entryPoints: [resolve(source, file)],
        bundle: true,
        minify: true,
        target: cssTarget,
        write: false,
        logLevel: 'warning',
    });

    return `${banner}\n${result.outputFiles[0].text}`;
}

function cssFiles(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = resolve(dir, entry.name);

        return entry.isDirectory() ? cssFiles(path) : entry.name.endsWith('.css') ? [relative(source, path)] : [];
    });
}

function write(file, css) {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, css);
}

write(resolve(root, 'dist/kickstart-ui.min.css'), await bundle('app.css'));

for ( const file of cssFiles(source) ) {
    write(resolve(root, 'dist/css', file), await bundle(file));
}
