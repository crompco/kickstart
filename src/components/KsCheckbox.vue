<template>
    <label class="ks-checkbox" :class="classStates">
        <input
            type="checkbox"
            :name="name"
            :value="value"
            :checked="isChecked"
            @click="toggle"
            :disabled="disabled"
            @focus="isFocused = true"
            @blur="isFocused = false"
        >
        <div class="ks-checkbox-switch" v-if="switchStyle"></div>
        <template v-else>
            <div class="ks-checkbox-input-wrapper">
                <checkmark v-show="isChecked"></checkmark>
            </div>
        </template>
        <div class="ks-checkbox-label-wrapper">
            <slot>{{label}}</slot>
        </div>
    </label>
</template>


<script>
    // External Dependencies
    import Checkmark from '../svg/checkmark.svg';

    // Internal Dependencies
    import {looseIndexOf} from '../helpers/objects';

    export default {
        name: 'KsCheckbox',

        model: {
            prop: 'checked',
            event: 'input'
        },

        props: {
            name: String,
            label: String,
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
            }
        },

        mounted() {
            this.refreshChecked();
        },

        methods: {
            refreshChecked() {
                if ( Array.isArray(this.checked) ) {
                    this.isChecked = -1 !== looseIndexOf(this.checked, this.value) ? true : false;
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
                if ( checked instanceof Array ) {
                    let index = looseIndexOf(checked, this.value);
                    if ( index >= 0 ) {
                        checked.splice(index, 1);
                        return checked;
                    }
                } else {
                    return this.falseValue;
                }
            },
            addValue(checked) {
                if ( checked instanceof Array ) {
                    checked.push(this.value);
                    return checked;
                }

                return this.value;
            }
        },

        watch: {
            checked() {
                this.refreshChecked();
            }
        },

        components: {
            Checkmark
        }
    }
</script>
