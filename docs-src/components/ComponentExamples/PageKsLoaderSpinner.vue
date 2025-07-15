<template>
    <div>
        <div class="basic-block">
            <div class="row">
                <div class="form-group">
                    <div class="label">
                        Show/Stop
                    </div>
                    <div class="data">
                        <button class="ks-button" @click="show_spin=!show_spin">
                            <template v-if="show_spin">
                                Stop
                            </template>
                            <template v-else>
                                Show
                            </template>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row row-collapse">

                <ks-radio-group
                    class="form-group sm-full med-half"
                    name="size"
                    :options="size_options"
                    :buttons="true"
                    v-model="size"
                >Size</ks-radio-group>

                <ks-radio-group
                    class="form-group sm-full med-half"
                    name="height"
                    :options="height_options"
                    :buttons="true"
                    v-model="height"
                >Height</ks-radio-group>
            </div>
            <div class="row">

            </div>
            <div class="mb-6">
                <ks-loader-spin :show="show_spin" :size="size" :height="height"></ks-loader-spin>
            </div>

            <code-block>
                <template v-pre>
                    &lt;ks-loader-spin
                        :show="show_spin"
                        :size="size"
                        :height="height"
                    >&lt;/ks-loader-spin>
                </template>
            </code-block>
            <div class="row">
                <div class="sm-full med-half">
                    <pre>Size: <strong>{{size}}</strong></pre>
                </div>
                <div class="sm-full med-half">
                    <pre>Height: <strong>{{height}}</strong></pre>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import KsLoaderSpin from '../../../src/components/KsLoaderSpin.vue';

    export default {
        name: 'PageKsLoaderSpinner',

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
            KsLoaderSpin
        }
    }
</script>
