import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as sass from 'sass';

import { banner, root, sassOptions } from './shared.mjs';

const result = sass.compile(resolve(root, 'src/styles/app.scss'), {
    style: 'compressed',
    ...sassOptions,
});

mkdirSync(resolve(root, 'dist'), { recursive: true });
writeFileSync(resolve(root, 'dist/kickstart-ui.min.css'), `${banner}\n${result.css}`);
