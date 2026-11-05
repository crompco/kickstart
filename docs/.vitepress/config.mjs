import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

const docs = fileURLToPath(new URL('..', import.meta.url));

/**
 * Sidebar links for every page in a docs folder, by its frontmatter title
 */
function pages(folder) {
    if ( !existsSync(`${docs}${folder}`) ) {
        throw new Error(`docs/${folder} is missing; run yarn build:versions first`);
    }

    return readdirSync(`${docs}${folder}`)
        .filter(file => file.endsWith('.md'))
        .map((file) => {
            const source = readFileSync(`${docs}${folder}/${file}`, 'utf8');
            const title = (source.match(/^title:\s*(.+)$/m) || [])[1] || file.replace('.md', '');

            return { text: title.trim(), link: `/${folder}/${file.replace('.md', '')}` };
        })
        .sort((a, b) => a.text.localeCompare(b.text));
}

/**
 * Sidebar of an archived version under docs/<version>
 */
function archivedSidebar(version, guide) {
    return [
        { text: `Kickstart UI ${version}`, items: [{ text: 'Overview', link: `/${version}/` }, ...guide] },
        { text: 'Components', items: pages(`${version}/components`) },
        { text: 'Styles', items: pages(`${version}/styles`) },
    ];
}

export default defineConfig({
    title: 'Kickstart UI',
    description: 'Vue 2.7 components and CSS utilities',
    base: process.env.DOCS_BASE || '/kickstart/',
    cleanUrls: true,
    lastUpdated: false,
    srcExclude: ['versions/**'],

    themeConfig: {
        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'Components', link: '/components/ks-button' },
            { text: 'Styles', link: '/styles/grid' },
            { text: 'Upgrade to 3.0', link: '/guide/upgrade' },
            {
                text: 'Versions',
                items: [
                    { text: '3.x (not released yet)', link: '/' },
                    { text: '2.x', link: '/2.x/' },
                    { text: '1.x', link: '/1.x/' },
                ],
            },
        ],

        sidebar: {
            '/2.x/': archivedSidebar('2.x', [{ text: 'Upgrade from 1.x', link: '/2.x/upgrade' }]),
            '/1.x/': archivedSidebar('1.x', []),
            '/': [
                { text: 'Guide', items: pages('guide') },
                { text: 'Components', items: pages('components') },
                { text: 'Styles', items: pages('styles') },
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/crompco/kickstart' },
        ],

        search: {
            provider: 'local',
        },
    },
});
