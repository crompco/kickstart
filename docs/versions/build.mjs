import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import config from './vite.config.mjs';

const docs = fileURLToPath(new URL('..', import.meta.url));
const repo = `${docs}..`;

/**
 * The current major version: its pages and examples come from its branch, built with that branch's own dependencies
 */
const CURRENT = { version: '3.x', ref: process.env.DOCS_CURRENT_REF || 'origin/v3.x' };

/**
 * Archived versions: the pages are ported into docs/<version>; the examples build from a release tag
 */
const ARCHIVED = [
    { version: '2.x', ref: 'v2.1.1', docs_folder: 'docs-src' },
    { version: '1.x', ref: 'v1.1.2', docs_folder: 'docs' },
];

/**
 * Pages of the current version, copied to the site root
 */
const CURRENT_PAGES = ['index.md', 'components', 'guide', 'styles'];

const only = process.argv.slice(2);

function extract(version, ref, paths = []) {
    const target = `${docs}.versions/${version}`;
    rmSync(target, { recursive: true, force: true });
    mkdirSync(target, { recursive: true });

    const archive = execFileSync('git', ['archive', ref, ...paths], { cwd: repo, maxBuffer: 512 * 1024 * 1024 });
    execFileSync('tar', ['-x', '-C', target], { input: archive });

    return target;
}

if ( !only.length || only.includes(CURRENT.version) ) {
    console.log(`Building the ${CURRENT.version} pages and examples from ${CURRENT.ref}`);
    const source = extract(CURRENT.version, CURRENT.ref);

    execFileSync('yarn', ['install', '--frozen-lockfile', '--ignore-scripts', '--silent'], { cwd: source, stdio: 'inherit' });
    execFileSync('yarn', ['--silent', 'demos:build'], { cwd: source, stdio: 'inherit' });

    rmSync(`${docs}public/demos`, { recursive: true, force: true });
    cpSync(`${source}/docs/public/demos`, `${docs}public/demos`, { recursive: true });

    for ( const page of CURRENT_PAGES ) {
        rmSync(`${docs}${page}`, { recursive: true, force: true });
        cpSync(`${source}/docs/${page}`, `${docs}${page}`, { recursive: true });
    }

    // The upgrade guide includes the branch's upgrade.md, which stays in the extracted copy
    const upgrade = `${docs}guide/upgrade.md`;
    const guide = readFileSync(upgrade, 'utf8');

    if ( !guide.includes('../../upgrade.md') ) {
        throw new Error(`${upgrade} no longer includes ../../upgrade.md; update the include path in versions/build.mjs`);
    }

    writeFileSync(upgrade, guide.replace('../../upgrade.md', `../.versions/${CURRENT.version}/upgrade.md`));
}

for ( const { version, ref, docs_folder } of ARCHIVED ) {
    if ( only.length && !only.includes(version) ) {
        continue;
    }

    console.log(`Building the ${version} examples from ${ref}`);
    extract(version, ref, ['src', docs_folder]);
    await build(config({ version, docs_folder }));
}

const expected = [
    ...CURRENT_PAGES.map(page => `${docs}${page}`),
    `${docs}public/demos/index.html`,
    ...ARCHIVED.map(({ version }) => `${docs}public/${version}/demos/index.html`),
];
const missing = expected.filter(path => !existsSync(path));

if ( missing.length ) {
    throw new Error(`The versions build is incomplete; missing:\n${missing.join('\n')}`);
}
