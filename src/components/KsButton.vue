<template>
    <button
        class="button"
        :class="modifierClasses"
        @click="$emit('click', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        :disabled="disabled || spin"
    >
        <ks-loader-spin
            :show="spin"
            size="small"
            :color="spinColor"
            :bg="spinBackground"
            :height=loaderHeight
            :width="loaderWidth"
        ></ks-loader-spin>
        <span ref="label" v-show="!spin">
            <slot></slot>
        </span>
    </button>
</template>

<script>

    import KsLoaderSpin from './KsLoaderSpin.vue';

    export default {
        name: 'KsButton',

        props: {
            // It would be nice to use this with a render method for custom elements
            el: {
                type: String,
                default: 'button'
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            danger: {
                type: Boolean,
                default: false
            },
            outline: {
                type: Boolean,
                default: false,
            },
            tiny: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            large: {
                type: Boolean,
                default: false
            },
            spin: {
                type: Boolean,
                default: false
            },
            spinColor: {
                type: String,
                default: null
            },
            spinBackground: {
                type: String,
                default: null
            }
        },

        computed: {
            modifierClasses() {
                return {
                    'outline': this.outline,
                    'danger': this.danger,
                    'tiny': this.tiny,
                    'small': this.small,
                    'large': this.large,
                    'spinning': this.spin
                }
            }
        },

        data() {
            return {
                loaderWidth: '60px',
                loaderHeight: '1.125rem',
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.calculateLabelWidth();
                window.addEventListener('resize', () => {
                    this.calculateLabelWidth();
                });
            })
        },

        methods: {
            calculateLabelWidth() {
                this.loaderWidth = (this.$refs.label.offsetWidth || 60) + 'px';
                this.loaderHeight = (this.$refs.label.offsetHeight || 60) + 'px';
            }
        },

        components: {
            KsLoaderSpin
        }
    }
</script>
