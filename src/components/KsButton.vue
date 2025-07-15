<template>
    <button
        class="ks-button"
        :class="modifierClasses"
        @click="$emit('click', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        :disabled="disabled || spin"
    >
        <span
            ref="spinWrapper"
            v-show="spin"
            style="width: calc(100% - 1.2rem);text-align: center;position:absolute;"
        >
            <ks-loader-spin
                :show="spin"
                :size="spinSize"
                :color="spinColor"
                :bg="spinBackground"
                :height="''"
                :width="'100%'"
            ></ks-loader-spin>
        </span>
        <span class="button-label" ref="label" :class="{ hidden: spin }">
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
            spinSize: {
                type: String,
                default: 'small'
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

        watch: {
            spin() {
                if ( this.$refs.label.offsetWidth ) {
                    this.$refs.spinWrapper.style.width = (this.$refs.label.offsetWidth || 60) + 'px';
                }
            }
        },

        components: {
            KsLoaderSpin
        }
    }
</script>
