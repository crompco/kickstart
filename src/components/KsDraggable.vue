<template>
    <component
        :is="tag"
        :draggable="!disabled"
        :class="stateClasses"
        @dragstart="dragStart"
        @dragend="dragEnd"
    >
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
                default: 'ks-dragging',
            }
        },

        emits: ['dragstart', 'dragend'],

        computed: {
            stateClasses() {
                if ( !this.activeClass ) {
                    return {};
                }

                return { [this.activeClass]: this.dragging };
            }
        },

        data() {
            return {
                dragging: false
            }
        },

        methods: {
            dragStart(e) {
                if ( this.disabled ) {
                    e.preventDefault();
                    return;
                }

                // Firefox only starts a drag when data is set
                if ( e.dataTransfer ) {
                    e.dataTransfer.setData('text/plain', '');
                }

                this.$emit('dragstart', e, false);
                this.dragging = true;
            },
            dragEnd(e) {
                this.$emit('dragend', e, false);
                this.dragging = false;
            },
        },
    }
</script>
