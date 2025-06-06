<template>
    <div>
        <div class="row">
            <div class="sm-12">
                <h2>{{data.title}}</h2>
            </div>
        </div>

        <div v-if="hasClasses" class="row">
            <div class="sm-12">
                <styles-table :classes="classes"></styles-table>
            </div>
        </div>

        <div v-if="hasBody" class="row">
            <div class="sm-12">
                <component :is="body" />
            </div>
        </div>

        <div v-if="hasSource" class="row" ref="source">
            <div class="col sm-full">
                <component :is="source" :data="data"></component>
            </div>
        </div>
    </div>
</template>

<script>
    // External Dependencies
    import Prism from 'prismjs';
    import 'prismjs/components/prism-sass';
    import 'prismjs/components/prism-scss';
    import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
    const MarkdownIt = require('markdown-it');
    import { componentPlugin } from '@mdit-vue/plugin-component';

    // Internal Dependencies
    import $content from '../../plugins/content';

    export default {
        head() {
            return {
                title: `${this.title} | Kickstart UI`
            }
        },

        computed: {
            title() {
                return this.data?.title;
            },

            classes() {
                return this.data?.data?.api?.classes || [];
            },

            hasClasses() {
                return this.classes.length > 0;
            },

            hasBody() {
                return !!this.data?.body;
            },

            body() {
                if ( !this.hasBody ) {
                    return '';
                }

                const md = new MarkdownIt({
                    html: true,
                    typographer: true,
                    highlight: function (str, lang) {
                        const languageMap = {
                            'sass': 'scss',
                            'scss': 'scss',
                            'css': 'css',
                            'javascript': 'javascript',
                            'js': 'javascript',
                            'vue': 'markup'
                        };

                        const actualLang = languageMap[lang] || lang;

                        if (actualLang && Prism.languages[actualLang]) {
                            try {
                                const highlighted = Prism.highlight(str, Prism.languages[actualLang], actualLang);
                                return `<pre class="language-${actualLang}"><code class="language-${actualLang}">${highlighted}</code></pre>`;
                            } catch (error) {
                                console.error('Prism highlight error:', error);
                            }
                        }

                        // Fallback to plain code block
                        return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`;
                    }
                }).use(componentPlugin);

                const html = md.render(this.data.body);

                return {
                    template: `<div>${html}</div>`
                }
            },

            hasSource() {
                return this.source || false;
            },

            source() {
                return this?.data.data?.source
            },
        },

        data() {
            return {
                data: {}
            }
        },

        beforeRouteUpdate(to, from, next) {
            this.$set(this, 'data', {});
            this.fetchData(to.path);
            next();
        },

        beforeMount() {
            this.fetchData();
        },

        methods: {
            async fetchData(path) {
                const data = await $content.get('styles').fetch(path || this.$route.path);

                this.$nextTick(() => {
                    this.$set(this, 'data', data || {});
                });
            },
        },
    }
</script>