<template>
    <ks-accordion class="col code-block-accordion">
        <ks-accordion-row :title="title">
            <pre><code :class="lang"><slot></slot></code></pre>
        </ks-accordion-row>
    </ks-accordion>
</template>

<script>
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

        data() {
            return {
            }
        },

        components: {
            KsAccordion,
            KsAccordionRow
        }
    }
</script>

<style>
    .code-block-accordion ul li {
        background: #CCC;
    }
</style>
