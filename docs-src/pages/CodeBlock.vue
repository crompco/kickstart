<template>
    <ks-accordion class="col code-block-accordion">
        <ks-accordion-row title="Show Code">
            <pre><slot></slot></pre>
        </ks-accordion-row>
    </ks-accordion>
</template>

<script>
    import KsAccordion from '../../src/components/KsAccordion.vue';
    import KsAccordionRow from '../../src/components/KsAccordionRow.vue';

    export default {
        name: 'CodeBlock',

        props: [],

        data() {
            return {}
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
