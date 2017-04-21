<template>
    <transition
        mode="out-in"
        name="fade"
        appear
        appear-active-class="fadeIn"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut">
        <div class="alert animated" :class="[type, duration === 0 ? 'has-close' : '']" v-show="active">
            <a @click.prevent="close()" class="close" v-if="duration === 0"><close></close></a>
            {{message}}
        </div>
    </transition>
</template>

<script>
    // External Dependencies
    import Close from '../svg/close.svg';

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

        data() {
            return {
                parent: null,
                timer: null,
                active: false
            }
        },

        beforeMount() {
            let container = document.body;
            let parent = document.querySelector('.ks-toast');

            if ( !parent ) {
                parent = document.createElement('div');
            }

            this.parent = parent;

            container.appendChild(parent);
        },

        mounted() {
            this.show();
        },

        methods: {
            show() {
                if ( this.hasChildren() ) {
                    setTimeout(() => {
                        this.show();
                    }, 350);
                    return;
                }

                this.parent.className = '';
                this.parent.classList.add('ks-toast', this.position);
                this.parent.appendChild(this.$el);
                this.active = true;


                if ( this.duration > 0 ) {
                    this.timer = setTimeout(() => {
                        this.close();
                    }, this.duration);
                }
            },

            close() {
                clearTimeout(this.timer);
                this.active = false;

                setTimeout(() => {
                    this.$destroy();

                    this.$el.remove();
                }, 250);
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