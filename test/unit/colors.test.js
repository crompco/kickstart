// @vitest-environment node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { root } from '../../build/shared.mjs';
import colors from '../../demos/data/style-maps/colors.json';

function css(file) {
    return readFileSync(resolve(root, file), 'utf8');
}

const shades = colors.colors
    .filter(color => typeof color.colors === 'object')
    .flatMap(color => Object.entries(color.colors).map(([shade, hex]) => [`${color.name}-${shade}`, hex]));

describe('color palette', () => {
    it('has red, orange, yellow, green, blue, purple and gray with shades 50 to 950', () => {
        const names = colors.colors.filter(color => typeof color.colors === 'object').map(color => color.name);

        expect(names).toEqual(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray']);
        colors.colors.filter(color => typeof color.colors === 'object').forEach((color) => {
            expect(Object.keys(color.colors)).toEqual(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']);
        });
    });

    it.each(shades)('the docs value of %s matches the utilities and the token', (name, hex) => {
        expect(css('src/css/utilities/background.css')).toContain(`.bg-${name} {\n  background-color: ${hex};`);
        expect(css('src/css/utilities/text.css')).toContain(`.text-${name} {\n  color: ${hex};`);
        expect(css('src/css/tokens.css')).toContain(`--ks-${name}: ${hex};`);
    });

    it('state colors are palette shades', () => {
        const tokens = css('src/css/tokens.css');
        const hex = Object.fromEntries(shades);

        expect(tokens).toContain(`--ks-state-success: ${hex['green-700']};`);
        expect(tokens).toContain(`--ks-state-info: ${hex['blue-700']};`);
        expect(tokens).toContain(`--ks-state-warning: ${hex['yellow-800']};`);
        expect(tokens).toContain(`--ks-state-error: ${hex['red-700']};`);
        expect(tokens).toContain(`--ks-state-error-bg: ${hex['red-100']};`);
        expect(tokens).toContain(`--ks-state-danger-hover-bg: ${hex['red-800']};`);
    });
});
