<template>
    <div class="ks-action-menu" @click.stop>
        <button class="menu-button" @click.prevent="toggle()" ref="menu">
            <slot name="menu"><menu-svg></menu-svg></slot>
        </button>
        <div class="ks-menu-list" ref="menuList" :class="{'active': active}" @click="close()">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    // External Dependencies
    import MenuSvg from '../svg/menu.svg';
    import Tether from 'tether';

    // Internal Dependencies
    import '../helpers/tether-constraints';

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
            }
        },

        data() {
            return {
                active: false,
                tether: false,
                listening: false
            }
        },

        mounted() {
            this.$nextTick(() => {
                if ( !window.actionEvent ) {
                    window.actionEvent = new Event('close:actionmenu');
                }

                document.addEventListener('close:actionmenu', this.closeActionMenu);
                document.addEventListener('click', this.closeActionMenu);
            })
        },

        beforeDestroy() {
            this.destroyActionMenu();
        },

        beforeRouteUpdate(to, from, next) {
            this.destroyActionMenu();

            next();
        },

        beforeRouteLeave(to, from, next) {
            this.destroyActionMenu();

            next();
        },

        methods: {
            createTether() {
                this.tether = new Tether({
                    element: this.$refs.menuList,
                    target: this.$refs.menu,
                    attachment: this.actionsAttachment,
                    targetAttachment: this.targetAttachment,
                    constraints: [
                        {
                            to: 'scrollParent',
                            attachment: 'none ks-together'
                        }
                    ]
                });

                this.tether.position();
            },

            update() {
                this.tether ? this.tether.position() : this.$nextTick(this.createTether());
            },

            toggle() {
                this.active = !this.active;

                this.$nextTick(() => {
                    if ( this.active ) {
                        document.dispatchEvent(window.actionEvent);

                        this.update();
                        this.listening = true;
                    } else {
                        this.listening = false;
                    }
                });
            },

            close() {
                this.active = false;
                this.listening = false;
            },

            closeActionMenu() {
                if ( this.listening ) {
                    this.close();
                }
            },

            destroyActionMenu() {
                this.$refs.menuList.remove();

                this.active = false;
                if ( this.tether !== false ) {
                    this.tether.destroy();
                }

                document.removeEventListener('click', this.closeActionMenu);
                document.removeEventListener('close:actionmenu', this.closeActionMenu);
            }
        },

        watch: {
            show() {
                if (!this.show) {
                    this.active = false;
                }
            }
        },

        components: {
            MenuSvg
        }
    }
</script>
