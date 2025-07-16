<template>
    <div>
        <div class="basic-block">
            <button class="ks-button" @click="show=!show">
                <template v-if="show">
                    Stop
                </template>
                <template v-else>
                    Show
                </template>
            </button>
            <div class="mb-6">
                <ks-loader-line :show="show"></ks-loader-line>
            </div>

            <code-block>
                <template v-pre>
                    &lt;ks-loader-line :show="show">&lt;/ks-loader-line>
                </template>
            </code-block>
        </div>
    </div>
</template>


<script>
    import KsLoaderLine from '../../../src/components/KsLoaderLine.vue';

    export default {
        name: 'PageKsLoaderLine',

        props: {},

        data() {
            return {
                show: true,
                show_spin: true,
                size: 'default',
                height: 'auto',
                size_options: [
                    {
                        value: 'default',
                        label: 'Default'
                    },
                    {
                        value: 'tiny',
                        label: 'Tiny'
                    },
                    {
                        value: 'small',
                        label: 'Small'
                    },
                    {
                        value: 'medium',
                        label: 'Medium'
                    },
                    {
                        value: 'large',
                        label: 'Large'
                    },
                    {
                        value: 'x-large',
                        label: 'X-Large'
                    }
                ],
                height_options: [
                    {
                        value: 'auto',
                        label: 'auto'
                    },
                    {
                        value: '150px',
                        label: '150px'
                    },
                    {
                        value: '200px',
                        label: '200px'
                    },
                    {
                        value: '300px',
                        label: '300px'
                    },
                ]
            };
        },

        components: {
            KsLoaderLine,
        }
    }
</script>
