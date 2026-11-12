<template>
    <transition
        mode="out-in"
        name="fade"
        appear
        appear-active-class="fadeIn"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut">
        <div class="ks-alert animated" :class="[type, duration === 0 ? 'has-close' : '']" v-show="active">
            <a @click.prevent="close()" class="close" v-if="duration === 0"><close></close></a>
            <slot>
                <span v-html="message"></span>
            </slot>
        </div>
    </transition>
</template>

<script>
    // External Dependencies
    import Close from './icons/IconClose.vue';

    // Internal Dependencies

    export default {
        name: 'KsToast',

        props: {
            message: {
                type: String,
                default: ''
            },

            type: {
                type: String,
                default: 'info'
            },

            position: {
                type: String,
                default: 'top-right'
            },

            duration: {
                type: Number,
                default: 2500
            },

            limit: {
                type: Number,
                default: 3
            }
        },

        emits: ['closed'],

        data() {
            return {
                parent: null,
                timer: null,
                active: false
            }
        },

        beforeMount() {
            let parent = [...document.querySelectorAll('.ks-toast')]
                .find(container => container.classList.contains(this.position));

            if ( !parent ) {
                parent = document.createElement('div');
                parent.classList.add('ks-toast', this.position);
                document.body.appendChild(parent);
            }

            this.parent = parent;
        },

        mounted() {
            this.show();
        },

        beforeDestroy() {
            this.clearTimer();
        },

        beforeUnmount() {
            this.clearTimer();
        },

        methods: {
            show() {
                if ( this.hasChildren() ) {
                    this.timer = setTimeout(() => {
                        this.show();
                    }, 350);
                    return;
                }

                this.parent.appendChild(this.$el);
                this.active = true;

                if ( this.duration > 0 ) {
                    this.timer = setTimeout(() => {
                        this.close();
                    }, this.duration);
                }
            },

            close() {
                this.clearTimer();
                this.active = false;

                this.timer = setTimeout(() => {
                    this.$el.remove();
                    this.$emit('closed');
                }, 250);
            },

            clearTimer() {
                clearTimeout(this.timer);
                this.timer = null;
            },

            hasChildren() {
                return this.parent !== null && this.parent.childElementCount >= this.limit;
            }
        },

        components: {
            Close
        }
    }
</script>