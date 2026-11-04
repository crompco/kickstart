<template>
    <div
        class="ks-radio-group"
        :class="groupClass"
    >
        <label
            v-if="$slots['default'] || label"
            class="ks-radio-group-title ks-label"
        >
            <slot>{{ label }}</slot>
        </label>
        <div class="radio">
            <ks-radio
                v-for="(option, index) in optionsList"
                :key="index"
                :name="name"
                :value="option.value"
                :label="option.label"
                :checked="value"
                :disabled="disabled"
                @input="selectRadio($event)"
            >
                <slot
                    v-if="$slots[option.value]"
                    :name="option.value"
                ></slot>
            </ks-radio>
        </div>
    </div>
</template>


<script>
    import KsRadio from './KsRadio.vue';
    import OptionGroups from './mixins/OptionGroups';

    export default {
        name: 'KsRadioGroup',

        mixins: [OptionGroups],

        model: {
            prop: 'value'
        },

        props: {
            value: {},
            label: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                required: true
            },
        },

        emits: ['input'],

        methods: {
            selectRadio(value) {
                if ( this.value != value ) {
                    this.$emit('input', value);
                }
            }
        },

        components: {
            KsRadio
        }
    }
</script>
