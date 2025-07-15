<template>
    <div class="ks-panel" :class="{'light': light}">
        <div class="ks-panel-header"><slot name="header">{{header}}</slot></div>
        <div class="ks-panel-body"><slot></slot></div>
        <div v-if="$slots.footer" class="ks-panel-footer"><slot name="footer"></slot></div>
    </div>
</template>

<script>
    export default {
        name: 'KsPanel',

        props: {
            header: {
                type: String,
                default: ''
            },
            light: {
                type: Boolean,
                default: false
            }
        }
    }
</script>