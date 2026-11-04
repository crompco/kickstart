<template>
    <div
        class="ks-checkbox-group"
        :class="groupClass"
    >
        <label class="ks-checkbox-group-title ks-label">
            <slot>{{ label }}</slot>
        </label>
        <div class="checkbox">
            <ks-checkbox
                v-for="(option, index) in optionsList"
                :key="index"
                :name="name"
                :value="option.value"
                :label="option.label"
                :checked="value"
                :disabled="disabled"
                @input="$emit('input', $event)"
            ></ks-checkbox>
        </div>
    </div>
</template>


<script>
    import KsCheckbox from './KsCheckbox.vue';
    import OptionGroups from './mixins/OptionGroups';

    export default {
        name: 'KsCheckboxGroup',

        mixins: [OptionGroups],

        model: {
            prop: 'value'
        },

        props: {
            value: {
                default() {
                    return [];
                }
            },
            label: String,
            name: {
                type: String,
                required: true
            },
        },

        emits: ['input'],

        components: {
            KsCheckbox
        }
    }
</script>
