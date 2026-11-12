<template>
    <label
        class="ks-radio"
        :class="classStates"
        @click.stop
    >
        <input
            type="radio"
            :name="name"
            :value="value"
            :checked="isChecked"
            :disabled="disabled"
            @change="toggle"
            @focus="is_focused = true"
            @blur="is_focused = false"
        >
        <div class="ks-radio-input-wrapper">
            <span class="radio-check"></span>
        </div>
        <div
            v-if="label || $slots.default"
            class="ks-radio-label-wrapper"
        >
            <slot>{{ label }}</slot>
        </div>
    </label>
</template>


<script>
    export default {
        name: 'KsRadio',

        model: {
            prop: 'checked',
            event: 'input'
        },

        props: {
            name: String,
            label: {
                type: String,
                default: ''
            },
            value: {},
            checked: {},
            disabled: {
                type: Boolean,
                default: false
            },
            inline: {
                type: Boolean,
                default: false
            }
        },

        emits: ['input'],

        data() {
            return {
                is_focused: false,
            };
        },

        computed: {
            classStates() {
                return {
                    "ks-state-active": this.isChecked,
                    "ks-state-focus": this.is_focused,
                    "ks-state-disabled": this.disabled,
                    "inline": this.inline
                }
            },
            isChecked() {
                return String(this.checked) == String(this.value);
            }
        },

        methods: {
            toggle(e) {
                if ( !this.disabled && !this.isChecked ) {
                    this.$emit('input', this.value);
                }

                // Keep the native state in line with the prop if the parent does not take the value
                this.$nextTick(() => {
                    if ( e && e.target ) {
                        e.target.checked = this.isChecked;
                    }
                });
            },
        },
    }
</script>
