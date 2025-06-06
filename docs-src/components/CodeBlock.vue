<template>
    <ks-accordion class="col code-block-accordion">
        <ks-accordion-row :title="title">
            <pre><code :class="lang"><slot></slot></code></pre>
        </ks-accordion-row>
    </ks-accordion>
</template>

<script>
    import prism from 'prismjs';
    import 'prismjs/components/prism-sass';
    import 'prismjs/components/prism-scss';
    import 'prismjs/components/prism-javascript';
    import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

    import KsAccordion from '../../src/components/KsAccordion.vue';
    import KsAccordionRow from '../../src/components/KsAccordionRow.vue';

    export default {
        name: 'CodeBlock',

        props: {
            title: {
                default: 'Show Code'
            },
            lang: {
                type: String,
                default: 'language-html'
            }
        },

        mounted() {
            this.highlight();
        },

        updated() {
            this.highlight();
        },

        methods: {
            highlight() {
                this.$nextTick(() => {
                    prism.highlightAll();
                });
            }
        },

        components: {
            KsAccordion,
            KsAccordionRow
        }
    }
</script>

