<template>
    <label
        class="ks-checkbox"
        :class="classStates"
    >
        <input
            type="checkbox"
            :name="name"
            :value="value"
            :checked="isChecked"
            :disabled="disabled"
            @click="toggle"
            @focus="isFocused = true"
            @blur="isFocused = false"
        >
        <div
            v-if="switchStyle"
            class="ks-checkbox-switch"
        ></div>
        <div
            v-else
            class="ks-checkbox-input-wrapper"
        >
            <checkmark v-show="isChecked"></checkmark>
        </div>
        <div class="ks-checkbox-label-wrapper">
            <slot>{{ label }}</slot>
        </div>
    </label>
</template>


<script>
    import Checkmark from './icons/IconCheckmark.vue';
    import { looseIndexOf } from '../helpers/objects';

    export default {
        name: 'KsCheckbox',

        model: {
            prop: 'checked',
            event: 'input'
        },

        props: {
            name: String,
            label: String,
            // The value when checked; without a value the checkbox is a boolean
            value: {},
            switchStyle: {
                type: Boolean,
                default: false,
            },

            checked: {
                type: [String, Array, Boolean, Number]
            },

            disabled: {
                type: Boolean,
                default: false
            },

            inline: {
                type: Boolean,
                default: false
            },

            falseValue: {
                default: false
            }
        },

        emits: ['input'],

        data() {
            return {
                isChecked: false,
                isFocused: false,
            };
        },

        computed: {
            classStates() {
                return {
                    "ks-state-active": this.isChecked,
                    "ks-state-focus": this.isFocused,
                    "switch": this.switchStyle,
                    "inline": this.inline
                }
            },
            trueValue() {
                return typeof this.value === 'undefined' ? true : this.value;
            },
        },

        mounted() {
            this.refreshChecked();
        },

        methods: {
            refreshChecked() {
                if ( Array.isArray(this.checked) ) {
                    this.isChecked = looseIndexOf(this.checked, this.trueValue) !== -1;
                    return;
                }

                if ( typeof this.value === 'undefined' ) {
                    this.isChecked = this.checked === true;
                    return;
                }

                this.isChecked = String(this.value) == String(this.checked);
            },
            toggle(e) {
                if ( this.disabled ) {
                    e.preventDefault();
                    return false;
                }
                this.isChecked = e.target.checked;

                if ( this.isChecked ) {
                    this.$emit('input', this.addValue(this.checked));
                } else {
                    this.$emit('input', this.removeValue(this.checked));
                }
            },
            removeValue(checked) {
                if ( Array.isArray(checked) ) {
                    return checked.filter(item => item != this.trueValue);
                }

                return this.falseValue;
            },
            addValue(checked) {
                if ( Array.isArray(checked) ) {
                    return looseIndexOf(checked, this.trueValue) === -1 ? [...checked, this.trueValue] : [...checked];
                }

                return this.trueValue;
            }
        },

        watch: {
            checked() {
                this.refreshChecked();
            },
            value() {
                this.refreshChecked();
            },
        },

        components: {
            Checkmark
        }
    }
</script>
