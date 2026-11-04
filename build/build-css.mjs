import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as sass from 'sass';

import { banner, root } from './shared.mjs';

const node_modules = resolve(root, 'node_modules');

const result = sass.compile(resolve(root, 'src/styles/app.scss'), {
    style: 'compressed',
    silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div', 'if-function'],
    importers: [
        {
            // Webpack-style "~package/path" imports resolve from node_modules
            findFileUrl(url) {
                if ( !url.startsWith('~') ) {
                    return null;
                }

                return pathToFileURL(resolve(node_modules, url.slice(1)));
            },
        },
    ],
});

mkdirSync(resolve(root, 'dist'), { recursive: true });
writeFileSync(resolve(root, 'dist/kickstart-ui.min.css'), `${banner}\n${result.css}`);
