/* eslint-disable no-console */
const {promises: fs} = require('fs');
const path = require('path');
const fg = require('fast-glob');
const matter = require('gray-matter');

const CONTENT_DIR = path.resolve(__dirname, '../docs-src/content');
const GENERATED_DIR = path.resolve(__dirname, '../docs-src/generated');
const GENERATE_CONTENT_FILE = path.resolve(GENERATED_DIR, 'generated-content.js');

async function buildRouteSource() {
    const files = await fg(['**/*.md'], {cwd: CONTENT_DIR});
    const routes = files.map(rel => {
        const src = matter.read(path.join(CONTENT_DIR, rel));
        return {
            importPath: `../content/${rel}`,
            path: src.data.path || '/' + rel.replace(/\.md$/, ''),
            title: src.data.title || path.basename(rel, '.md'),
            order: src.data.order || 0,
            section: rel.split(path.sep)[0],
            content: src.content,
            data: src.data
        };
    });

    routes.sort((a, b) =>
        a.section === b.section
            ? (a.order - b.order) || a.title.localeCompare(b.title)
            : a.section.localeCompare(b.section)
    );

    const generated = [
        '// AUTO-GENERATED - do not edit\n',
        'export default [',
        ...routes.map(r => `{data: ${JSON.stringify(r.data)}, content: ${JSON.stringify(r.content)}, meta: {title: ${JSON.stringify(r.title)}, section: '${r.section}'}, path: '${r.path}'},`),
        '];',
        '',
    ];

    return generated.join('\n');
}

class ContentRoutePlugin {
    apply(compiler) {
        // Add content directory to webpack's file dependencies
        compiler.hooks.afterCompile.tap('ContentRoutePlugin', (compilation) => {
            // Add the entire content directory to watch
            compilation.contextDependencies.add(CONTENT_DIR);
        });

        // Trigger on initial build
        compiler.hooks.beforeRun.tapPromise('ContentRoutePlugin', async () => {
            await this.writeRoutes();
        });

        // Trigger on watch rebuilds
        compiler.hooks.watchRun.tapPromise('ContentRoutePlugin', async () => {
            await this.writeRoutes();
        });
    }


    async writeRoutes() {
        const newSrc = await buildRouteSource();
        let currContent = '';

        try {
            currContent = await fs.readFile(GENERATE_CONTENT_FILE, 'utf8');
        } catch (_) {
            // File doesn't exist yet
        }

        if (currContent !== newSrc) {
            await fs.mkdir(GENERATED_DIR, {recursive: true});
            await fs.writeFile(GENERATE_CONTENT_FILE, newSrc);
            console.log('content-routes regenerated');
        }
    }
}

module.exports = ContentRoutePlugin;