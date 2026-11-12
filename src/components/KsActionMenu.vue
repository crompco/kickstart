<template>
    <div
        class="ks-action-menu"
        :class="actionMenuClass"
        @click.stop
    >
        <button
            ref="menu"
            class="menu-button"
            @click.prevent="toggle()"
        >
            <slot name="menu"><menu-svg></menu-svg></slot>
        </button>
        <div
            ref="menuList"
            class="ks-menu-list"
            :class="menuListClass"
            @click="close()"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import MenuSvg from './icons/IconMenu.vue';
    import { attach } from '../helpers/position';

    const CLOSE_EVENT = 'close:actionmenu';

    export default {
        name: 'KsActionMenu',

        props: {
            show: {
                type: Boolean,
                default: false
            },
            actionsAttachment: {
                type: String,
                default: 'top left'
            },
            targetAttachment: {
                type: String,
                default: 'bottom left'
            },
            openClass: {
                type: String,
                default: ''
            },
            listClass: {
                type: String,
                default: ''
            }
        },

        emits: ['active'],

        computed: {
            actionMenuClass() {
                if ( !this.openClass ) {
                    return {};
                }

                return { [this.openClass]: this.active };
            },
            menuListClass() {
                return [
                    { 'active': this.active },
                    this.listClass,
                ];
            }
        },

        data() {
            return {
                active: false,
            }
        },

        mounted() {
            this.positioner = null;

            document.addEventListener(CLOSE_EVENT, this.closeOtherMenu);
            document.addEventListener('click', this.close);
        },

        beforeDestroy() {
            this.destroyActionMenu();
        },

        beforeUnmount() {
            this.destroyActionMenu();
        },

        methods: {
            position() {
                const list = this.$refs.menuList;

                // The list lives in <body> so containers with overflow can't clip it
                if ( list.parentNode !== document.body ) {
                    document.body.appendChild(list);
                }

                if ( this.positioner ) {
                    this.positioner.update();
                    return;
                }

                this.positioner = attach(this.$refs.menu, list, {
                    attachment: this.actionsAttachment,
                    targetAttachment: this.targetAttachment,
                    constraints: [
                        {
                            to: 'scrollParent',
                            attachment: 'none ks-together',
                        },
                    ],
                });
            },

            update() {
                if ( this.active ) {
                    this.$nextTick(() => this.position());
                }
            },

            toggle() {
                this.active ? this.close() : this.open();
            },

            open() {
                document.dispatchEvent(new CustomEvent(CLOSE_EVENT, { detail: this }));
                this.active = true;
                this.update();
            },

            close() {
                if ( !this.active ) {
                    return;
                }

                this.active = false;
                this.stopPositioning();
            },

            closeOtherMenu(e) {
                if ( e.detail !== this ) {
                    this.close();
                }
            },

            stopPositioning() {
                if ( this.positioner ) {
                    this.positioner.destroy();
                    this.positioner = null;
                }
            },

            destroyActionMenu() {
                this.active = false;
                this.stopPositioning();

                if ( this.$refs.menuList && this.$refs.menuList.parentNode === document.body ) {
                    this.$refs.menuList.remove();
                }

                document.removeEventListener('click', this.close);
                document.removeEventListener(CLOSE_EVENT, this.closeOtherMenu);
            }
        },

        watch: {
            show() {
                if ( !this.show ) {
                    this.close();
                }
            },
            active() {
                this.$emit('active', this.active);
            }
        },

        components: {
            MenuSvg
        }
    }
</script>
