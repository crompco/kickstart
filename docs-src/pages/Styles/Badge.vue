<template>
    <div>
        <div class="basic-block">
            <h3>Badges</h3>

            <div class="ks-badge">10</div>
            <div class="ks-badge success">10</div>
            <div class="ks-badge info">10</div>
            <div class="ks-badge warning">10</div>
            <div class="ks-badge error">10</div>
            <div class="ks-badge muted">10</div>
            <br>
            <br>
            <div class="ks-badge">Tag</div>
            <div class="ks-badge success">Tag</div>
            <div class="ks-badge info">Tag</div>
            <div class="ks-badge warning">Tag</div>
            <div class="ks-badge error">Tag</div>
            <div class="ks-badge muted">Tag</div>

            <code-block style="margin-top:1rem;">
                <template v-pre>
                    &lt;div class="ks-badge">10&lt;/div>
                    &lt;div class="ks-badge success">10&lt;/div>
                    &lt;div class="ks-badge info">10&lt;/div>
                    &lt;div class="ks-badge warning">10&lt;/div>
                    &lt;div class="ks-badge error">10&lt;/div>
                    &lt;div class="ks-badge muted">10&lt;/div>
                    <br>
                    &lt;div class="ks-badge">Tag&lt;/div>
                    &lt;div class="ks-badge success">Tag&lt;/div>
                    &lt;div class="ks-badge info">Tag&lt;/div>
                    &lt;div class="ks-badge warning">Tag&lt;/div>
                    &lt;div class="ks-badge error">Tag&lt;/div>
                    &lt;div class="ks-badge muted">Tag&lt;/div>
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsAccordion from '../../../src/components/KsAccordion.vue';
    import KsAccordionRow from '../../../src/components/KsAccordionRow.vue';

    export default {
        name: 'Badge',

        components: {
            KsAccordion,
            KsAccordionRow
        }
    }
</script>
