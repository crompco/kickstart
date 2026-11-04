<template>
    <div
        v-show="active"
        :class="{'active-tab': active}"
    >
        <slot v-if="active"></slot>
    </div>
</template>


<script>
    export default {
        name: 'KsTab',

        inject: {
            ksTabs: {
                default: null,
            },
        },

        props: {
            title: {},
        },

        emits: ['active', 'inactive'],

        computed: {
            active() {
                return !!this.ksTabs && this.ksTabs.active_tab === this;
            },
        },

        mounted() {
            if ( !this.ksTabs ) {
                console.error('KsTab must be inside a KsTabs');
                return;
            }

            this.ksTabs.registerTab(this);
        },

        beforeDestroy() {
            this.unregister();
        },

        beforeUnmount() {
            this.unregister();
        },

        methods: {
            /**
             * Makes this the active tab; another tab must be activated to deactivate it
             */
            setActive(active) {
                if ( active && this.ksTabs ) {
                    this.ksTabs.setActiveTab(this);
                }
            },

            unregister() {
                if ( this.ksTabs ) {
                    this.ksTabs.unregisterTab(this);
                }
            },
        },

        watch: {
            active(active) {
                this.$emit(active ? 'active' : 'inactive');
            },
        },
    }
</script>
