import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

const docs = fileURLToPath(new URL('..', import.meta.url));

/**
 * Sidebar links for every page in a docs folder, by its frontmatter title
 */
function pages(folder) {
    return readdirSync(`${docs}${folder}`)
        .filter(file => file.endsWith('.md'))
        .map((file) => {
            const source = readFileSync(`${docs}${folder}/${file}`, 'utf8');
            const title = (source.match(/^title:\s*(.+)$/m) || [])[1] || file.replace('.md', '');

            return { text: title.trim(), link: `/${folder}/${file.replace('.md', '')}` };
        })
        .sort((a, b) => a.text.localeCompare(b.text));
}

export default defineConfig({
    title: 'Kickstart UI',
    description: 'Vue 2.7 components and CSS utilities',
    base: process.env.DOCS_BASE || '/kickstart/',
    cleanUrls: true,
    lastUpdated: false,

    themeConfig: {
        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'Components', link: '/components/ks-button' },
            { text: 'Styles', link: '/styles/grid' },
            { text: 'Upgrade to 3.0', link: '/guide/upgrade' },
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Getting started', link: '/guide/getting-started' },
                    { text: 'Upgrade from 2.x', link: '/guide/upgrade' },
                ],
            },
            { text: 'Components', items: pages('components') },
            { text: 'Styles', items: pages('styles') },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/crompco/kickstart' },
        ],

        search: {
            provider: 'local',
        },
    },
});
