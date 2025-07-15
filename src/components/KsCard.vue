<template>
    <div class="ks-card" :class="{'ks-light-card': light}">
        <div class="ks-card-header"><slot name="header">{{header}}</slot></div>
        <div class="ks-card-body"><slot></slot></div>
        <div v-if="$slots.footer" class="ks-card-footer"><slot name="footer"></slot></div>
    </div>
</template>

<script>
    export default {
        name: 'KsCard',

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