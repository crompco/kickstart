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
