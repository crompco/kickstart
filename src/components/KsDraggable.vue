<template>
    <component :is="tag" :draggable="!disabled" :class="stateClasses">
        <slot></slot>
    </component>
</template>

<script>

    export default {
        name: 'KsDraggable',

        props: {
            tag: {
                type: String,
                default: 'div'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            activeClass: {
                type: String,
                default: 'dragging',
            }
        },

        computed: {
            stateClasses() {
                let state_classes = {};
                if ( this.activeClass ) {
                    state_classes[this.activeClass] = this.dragging;
                }

                return state_classes;
            }
        },

        data() {
            return {
                dragging: false
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.$el.addEventListener('dragstart', this.dragStart, false);
                this.$el.addEventListener('dragend', this.dragEnd, false);
                this.$el.addEventListener('mousedown', this.mouseDown, false);
                this.$el.addEventListener('mouseup', this.mouseUp, false);
            });
        },

        methods: {
            dragStart(e) {
                e.dataTransfer.setData('text/plain', null);
                this.$emit('dragstart', e, false);
                this.dragging = true;
            },
            dragEnd(e) {
                this.$emit('dragend', e, false);
                this.dragging = false;
            },
            mouseDown(e) {
                this.$emit('mousedown', e);
            },
            mouseUp(e) {
                this.$emit('mouseup', e);
            },
        },

        beforeDestroy() {
            this.$el.removeEventListener('dragstart', this.dragStart, false);
            this.$el.removeEventListener('dragend', this.dragEnd, false);
            this.$el.removeEventListener('mousedown', this.mouseDown, false);
            this.$el.removeEventListener('mouseup', this.mouseUp, false);
        },

        components: {}
    }
</script>
