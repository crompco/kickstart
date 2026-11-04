<template>
    <div
        class="top-bar"
        :class="{ fixed }"
    >
        <button class="mobile-menu">
            <menu-svg></menu-svg>
        </button>

        <button
            v-if="hasSidebar"
            class="mobile-menu has-sidebar"
        >
            <dots-horizontal></dots-horizontal>
        </button>
        <slot></slot>
    </div>
</template>

<script>
    import MenuSvg from './icons/IconMenu.vue';
    import DotsHorizontal from './icons/IconDotsHorizontal.vue';
    import { addEvent, removeEvent } from '../helpers/events';
    import { toggleClass, parent, removeClass } from '../helpers/dom';

    export default {
        name: 'KsTopNav',

        props: {
            hasSidebar: {
                type: Boolean,
                default: false
            },

            fixed: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            selector() {
                return this.hasSidebar ? '.side-nav' : '.top-bar';
            },
        },

        mounted() {
            this.menu_button = this.$el.querySelector('.mobile-menu');
            this.dropdown = this.$el.querySelector('.dropdown-toggle');
            this.sidebar_button = this.$el.querySelector('.mobile-menu.has-sidebar');

            addEvent(this.menu_button, 'click', this.toggleMenu);
            addEvent(this.dropdown, 'click', this.toggleDropdown);
            addEvent(this.sidebar_button, 'click', this.toggleSidebarMenu);
        },

        beforeDestroy() {
            this.teardown();
        },

        beforeUnmount() {
            this.teardown();
        },

        methods: {
            toggleMenu(e) {
                e.preventDefault();

                toggleClass(document.querySelector(this.selector), 'show');
                toggleClass(document.body, 'side-nav-open');

                window.removeEventListener('resize', this.windowResize);
                window.addEventListener('resize', this.windowResize);
            },

            toggleDropdown(e) {
                e.preventDefault();

                toggleClass(parent(e.currentTarget, '.dropdown'), 'show');
            },

            toggleSidebarMenu(e) {
                e.preventDefault();

                toggleClass(this.$el, 'show');
            },

            windowResize() {
                const style = window.getComputedStyle(this.menu_button);

                if ( style.display == 'none' ) {
                    removeClass(document.body, 'side-nav-open');
                    removeClass(document.querySelector(this.selector), 'show');
                    window.removeEventListener('resize', this.windowResize);
                }
            },

            teardown() {
                removeEvent(this.menu_button, 'click', this.toggleMenu);
                removeEvent(this.dropdown, 'click', this.toggleDropdown);
                removeEvent(this.sidebar_button, 'click', this.toggleSidebarMenu);
                window.removeEventListener('resize', this.windowResize);
            },
        },

        components: {
            MenuSvg,
            DotsHorizontal
        }
    }
</script>
