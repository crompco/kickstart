<template>
    <div
        class="side-nav"
        :class="classObj"
    >
        <button
            class="mobile-menu"
            @click="showLinks()"
        >
            <menu-svg></menu-svg>
        </button>
        <slot></slot>
    </div>
</template>

<script>
    import MenuSvg from './icons/IconMenu.vue';
    import { addEvent, removeEvent } from '../helpers/events';
    import { addClass, removeClass } from '../helpers/dom';

    export default {
        name: 'KsSideNav',

        props: {
            fixed: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                show: false,
            }
        },

        computed: {
            classObj() {
                return {
                    show: this.show,
                    fixed: this.fixed,
                };
            },
        },

        mounted() {
            this.links = this.$el.querySelector('.nav-links');
            addEvent(this.links, 'click', this.hideLinks);
        },

        beforeDestroy() {
            this.teardown();
        },

        beforeUnmount() {
            this.teardown();
        },

        methods: {
            showLinks() {
                this.show = !this.show;

                if ( this.show ) {
                    addClass(document.body, 'side-nav-open');
                } else {
                    removeClass(document.body, 'side-nav-open');
                }
            },

            hideLinks() {
                this.show = false;
                removeClass(this.$el, 'show');
                removeClass(document.body, 'side-nav-open');
            },

            teardown() {
                removeEvent(this.links, 'click', this.hideLinks);
                removeClass(document.body, 'side-nav-open');
            },
        },

        components: {
            MenuSvg
        }
    }
</script>
