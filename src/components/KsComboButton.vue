<template>
    <div class="button combo-button">
        <ks-button @click="$emit('click', $event)">
            <slot></slot>
            <span class="combo-button-open" tabindex="0" @click.prevent.stop="toggleOpen">
                <chevron-down></chevron-down>
            </span>
        </ks-button>
        <div class="combo-options" v-show="open">
            <slot name="options"></slot>
        </div>
    </div>
</template>

<script>
    import ChevronDown from './icons/ChevronDown';

    export default {
        name: 'KsComboButton',

        props: [],

        data() {
            return {
                open: false
            }
        },

        methods: {
            toggleOpen() {
                this.open = !this.open;
            }
        },

        components: {
            ChevronDown
        }
    }
</script>
