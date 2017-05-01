<template>
    <div class="ks-action-menu">
        <button class="menu-button" @click.prevent="toggle()" ref="menu">
            <slot name="menu"><menu-svg></menu-svg></slot>
        </button>
        <div class="menu-list" ref="menuList" :class="{'active': active}" @click="close()">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    // External Dependencies
    import MenuSvg from '../svg/menu.svg';
    import Tether from 'tether';

    // Internal Dependencies
    import {addEvent} from '../helpers/events';

    export default {
        name: 'KsActionMenu',

        props: {
            show: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                active: false,
                tether: null,
                listening: false
            }
        },

        mounted() {
            this.tether = new Tether({
                element: this.$refs.menuList,
                target: this.$refs.menu,
                attachment: 'top left',
                targetAttachment: 'bottom left',
                enabled: false,
                offset: '0 0',
                targetOffset: '0 0',
                constraints: [
                    {
                        to: 'window',
                        attachment: 'none together'
                    }
                ]
            });

            if ( !window.actionEvent ) {
                window.actionEvent = new Event('close:actionmenu');
            }

            document.addEventListener('close:actionmenu', () => {
                if ( this.listening ) {
                    this.close();
                }
            });
        },

        methods: {
            toggle() {
                this.active = !this.active;

                this.$nextTick(() => {
                    if ( this.active ) {
                        document.dispatchEvent(window.actionEvent);

                        this.listening = true;
                        this.tether.enable();
                        this.$nextTick(() => this.tether.position());
                    } else {
                        this.listening = false;
                        this.tether.disable();
                    }
                });
            },

            close() {
                this.active = false;
                this.listening = false;

                this.tether.disable();
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
