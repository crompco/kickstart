// @vitest-environment node
import { resolve } from 'node:path';
import * as sass from 'sass';
import { describe, expect, it } from 'vitest';

import { root, sassOptions } from '../../build/shared.mjs';

function compile(source) {
    const warnings = [];
    const css = sass.compileString(source, {
        ...sassOptions,
        loadPaths: [resolve(root, 'src/styles')],
        logger: {
            warn: message => warnings.push(message),
        },
    }).css;

    return { css, warnings };
}

const count = (css, text) => css.split(text).length - 1;

describe('Sass shim', () => {
    it('emits each token once and warns once', () => {
        const { css, warnings } = compile('@import "app";');

        expect(count(css, '--ks-white:')).toBe(1);
        expect(count(css, '--ks-button-padding:')).toBe(1);
        expect(css).toContain('.ks-badge');
        expect(warnings.filter(message => message.includes('deprecated'))).toHaveLength(1);
    });

    it('hides the warning when asked', () => {
        const { warnings } = compile('$ks-sass-deprecation-warning: false;\n@import "app";');

        expect(warnings.filter(message => message.includes('deprecated'))).toHaveLength(0);
    });

    it('emits overridden variables as tokens', () => {
        const { css } = compile(`
            $brand: (primary: #123456, light: #46719C, lighter: #80B5E9, secondary: #A52924, off: #C18C77);
            $nav-height: 50px;
            @import "_kickstart";
        `);

        expect(css).toContain('--ks-brand-primary: #123456;');
        expect(css).toContain('--ks-nav-height: 50px;');
    });

    it('adds rules for map entries the defaults do not have', () => {
        const { css } = compile(`
            @import "functions/map";
            @import "variables/global";
            @import "variables/buttons";
            $buttons: map-merge($buttons, ("purple": (background-color: #639, color: #fff, hover: #fff, border-color: #639, danger-color: red, danger-border-color: red, danger-bg: #fff, success-color: green, success-border-color: green, success-bg: #fff)));
            $brand: map-merge($brand, ("accent": #f60));
            @import "_kickstart";
        `);

        expect(css).toContain('--ks-button-purple-background-color: #639;');
        expect(css).toMatch(/\.ks-button\.purple \{\s+background-color: var\(--ks-button-purple-background-color\)/);
        expect(css).toContain('.ks-table.accent thead');
        expect(count(css, '.ks-button.outline {')).toBe(1);
    });

    it('extends into nested component rules like 2.x', () => {
        const { css } = compile(`
            @import "_kickstart";
            .form-group { @extend .ks-form-group; }
            .form-group > .error-msg { @extend .ks-error-msg; }
        `);

        expect(css).toMatch(/^\S[^{]*(^|,\s*)\.form-group > \.error-msg\s*[,{]/m);
        expect(css).not.toMatch(/^\s*&/m);
    });

    it('works for one component imported alone', () => {
        const { css } = compile('@import "components/badge";');

        expect(css).toContain('--ks-badge-bg:');
        expect(css).toContain('--ks-alert-success-color:');
        expect(css).toContain('background: var(--ks-badge-bg);');
    });

    it('keeps the form placeholders for consumer extends', () => {
        const { css } = compile(`
            @import "_kickstart";
            .my-input { @include form-input; }
            .my-lookup { @include ks-autocomplete-input; }
        `);

        expect(css).toMatch(/\.my-input \{\s+padding: 0\.5rem;/);
        expect(css).toMatch(/\.my-lookup \{\s+border: 1px solid #aaa;/);
    });
});
