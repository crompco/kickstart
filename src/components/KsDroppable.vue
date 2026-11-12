<template>
    <component
        :is="tag"
        :class="stateClasses"
        @dragenter="dragOver"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="dropEvent"
        @dragend="dragEnd"
    >
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
                default: 'ks-drop-zone-active'
            },
            inactiveClass: {
                type: String,
                default: ''
            },
            // true, false, or a function given the drag event that returns whether a drop is allowed
            accept: {
                type: [Boolean, Function],
                default: true,
            },
        },

        emits: ['drop'],

        computed: {
            stateClasses() {
                const state_classes = {};

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

        methods: {
            dragOver(e) {
                if ( !this.allowsDrop(e) ) {
                    return;
                }

                e.preventDefault();
                this.active = true;
            },
            dragLeave(e) {
                // Moving onto a child element is not leaving the drop zone
                if ( e && e.relatedTarget && this.$el.contains(e.relatedTarget) ) {
                    return;
                }

                this.active = false;
            },
            dropEvent(e) {
                if ( !this.allowsDrop(e) ) {
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
            allowsDrop(e) {
                if ( typeof this.accept === 'function' ) {
                    return this.accept(e);
                }

                return this.accept;
            },
        },
    }
</script>
