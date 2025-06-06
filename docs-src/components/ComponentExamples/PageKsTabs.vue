
<template>
    <div>
        <div class="callout">
            <ks-tabs>
                <ks-tab title="Foo">
                    <p>
                        This is the first tab which auto selected
                    </p>
                </ks-tab>

                <ks-tab title="Bar">
                    <p>
                        This is a tab with some content
                    </p>
                </ks-tab>

                <ks-tab title="Baz">
                    <p>
                        This the last tab with some content
                    </p>
                </ks-tab>
            </ks-tabs>
            <code-block>
                <template v-pre>
                    &lt;ks-tabs>
                        &lt;ks-tab title="Foo">
                            &lt;p>
                                This is the first tab which auto selected
                            &lt;/p>
                        &lt;/ks-tab>

                        &lt;ks-tab title="Bar">
                            &lt;p>
                                This is a tab with some content
                            &lt;/p>
                        &lt;/ks-tab>

                        &lt;ks-tab title="Baz">
                            &lt;p>
                                This the last tab with some content
                            &lt;/p>
                        &lt;/ks-tab>
                    &lt;/ks-tabs>
                </template>
            </code-block>
        </div>
        <br>
        <div class="callout">
            <ks-tabs :expand="true" id="foo-example">
                <ks-tab title="Foo">
                    <p>
                        This is the first tab which auto selected
                    </p>
                </ks-tab>

                <ks-tab title="Bar">
                    <p>
                        This is a tab with some content
                    </p>
                </ks-tab>

                <ks-tab title="Baz">
                    <p>
                        This the last tab with some content
                    </p>
                </ks-tab>
            </ks-tabs>

            <code-block>
                <template v-pre>
                    &lt;ks-tabs :expand="true" id="foo-example">
                        &lt;ks-tab title="Foo">
                            &lt;p>
                                This is the first tab which auto selected
                            &lt;/p>
                        &lt;/ks-tab>

                        &lt;ks-tab title="Bar">
                            &lt;p>
                                This is a tab with some content
                            &lt;/p>
                        &lt;/ks-tab>

                        &lt;ks-tab title="Baz">
                            &lt;p>
                                This the last tab with some content
                            &lt;/p>
                        &lt;/ks-tab>
                    &lt;/ks-tabs>
                </template>
            </code-block>
        </div>
    </div>
</template>


<script>
    import KsTabs from '../../../src/components/KsTabs.vue';
    import KsTab from '../../../src/components/KsTab.vue';

    export default {
        name: 'PageKsTabs',

        components: {
            KsTabs,
            KsTab
        }
    }
</script>
