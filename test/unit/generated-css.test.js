// @vitest-environment node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { generateCss } from '../../build/generate-css.mjs';
import { root } from '../../build/shared.mjs';

describe('generated CSS', () => {
    it.each(Object.entries(generateCss()))('%s is up to date', (file, css) => {
        expect(readFileSync(resolve(root, file), 'utf8').replace(/\r\n/g, '\n')).toBe(css);
    });
});
