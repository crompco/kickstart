<template>
    <component
        :is="el"
        class="ks-button"
        :class="modifierClasses"
        :disabled="is_button ? (disabled || spin) : null"
        :aria-disabled="!is_button && (disabled || spin) ? 'true' : null"
        @click="handleClick"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
    >
        <span
            v-show="spin"
            class="ks-button-spinner"
        >
            <ks-loader-spin
                :show="spin"
                :size="spinSize"
                :color="spinColor"
                :bg="spinBackground"
                height=""
                width="100%"
            ></ks-loader-spin>
        </span>
        <span
            ref="label"
            class="button-label"
            :class="{ hidden: spin }"
        >
            <slot></slot>
        </span>
    </component>
</template>

<script>
    import KsLoaderSpin from './KsLoaderSpin.vue';

    export default {
        name: 'KsButton',

        props: {
            // The element to render, for example "a"
            el: {
                type: [String, Object],
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

        emits: ['click', 'focus', 'blur'],

        computed: {
            is_button() {
                return this.el === 'button';
            },
            modifierClasses() {
                return {
                    'outline': this.outline,
                    'danger': this.danger,
                    'tiny': this.tiny,
                    'small': this.small,
                    'large': this.large,
                    'spinning': this.spin,
                    'disabled': !this.is_button && (this.disabled || this.spin),
                }
            }
        },

        methods: {
            handleClick(e) {
                if ( !this.is_button && (this.disabled || this.spin) ) {
                    e.preventDefault();
                    return;
                }

                this.$emit('click', e);
            },
        },

        components: {
            KsLoaderSpin
        }
    }
</script>
