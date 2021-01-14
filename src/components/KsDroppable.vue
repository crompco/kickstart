<template>
    <component :is="tag" :class="stateClasses">
        <slot></slot>
    </component>
</template>

<script>

    export default {
        name: 'KsDroppable',

        props: {
            tag: {
                type: String,
                default: 'div'
            },
            activeClass: {
                type: String,
                default: 'drop-zone-active'
            },
            inactiveClass: {
                type: String,
                default: ''
            },
            accept: {
                type: [Boolean, Function],
                default: true,
            },
        },

        computed: {
            stateClasses() {
                let state_classes = {};

                if ( this.activeClass ) {
                    state_classes[this.activeClass] = this.active;
                }
                if ( this.inactiveClass ) {
                    state_classes[this.inactiveClass] = !this.active;
                }

                return state_classes;
            },
        },

        data() {
            return {
                active: false,
            };
        },

        mounted() {
            this.$nextTick(() => {
                this.$el.addEventListener('dragover', this.dragOver, false)
                this.$el.addEventListener('dragleave', this.dragLeave, false)
                this.$el.addEventListener('drop', this.dropEvent, false)
                this.$el.addEventListener('dragend', this.dragEnd, false)
            });
        },

        methods: {
            dragOver(e) {
                if ( !this.allowsDrop() ) {
                    return;
                }

                e.preventDefault();
                this.active = true;
            },
            dragLeave() {
                this.active = false;
            },
            dropEvent(e) {
                if ( !this.allowsDrop() ) {
                    return;
                }

                e.stopPropagation();
                e.preventDefault();
                this.$emit('drop', e);
                this.active = false;
            },
            dragEnd() {
                this.active = false;
            },
            allowsDrop() {
                if ( typeof this.accept === 'function' ) {
                    return this.accept();
                }

                return this.accept;
            },
        },

        beforeDestroy() {
            this.$el.removeEventListener('dragover', this.dragOver, false);
            this.$el.removeEventListener('dragleave', this.dragLeave, false)
            this.$el.removeEventListener('drop', this.dropEvent, false);
            this.$el.removeEventListener('dragend', this.dragEnd, false)
        },
    }
</script>
