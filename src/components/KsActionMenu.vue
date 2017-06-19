<template>
    <div class="ks-action-menu" @click.stop>
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
    import Popper from 'popper.js';

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
            this.$nextTick(() => {
                this.tether = new Popper(this.$el, this.$refs.menuList, {
                    placement: 'bottom-start',
                    removeOnDestroy: true,
                    modifiers: {
                        flip: {
                            behavior: ['bottom-end']
                        },
                        preventOverflow: {
                            boundariesElement: this.$el.parentNode,
                            priority: ['right', 'top']
                        }
                    }
                });

                if ( !window.actionEvent ) {
                    window.actionEvent = new Event('close:actionmenu');
                }

                document.addEventListener('close:actionmenu', () => {
                    if ( this.listening ) {
                        this.close();
                    }
                });
                document.addEventListener('click', () => {
                    if ( this.listening ) {
                        this.close();
                    }
                });
            })

        },

        methods: {
            toggle() {
                this.active = !this.active;

                this.$nextTick(() => {
                    if ( this.active ) {
                        document.dispatchEvent(window.actionEvent);

                        this.tether.update();
                        this.listening = true;
                    } else {
                        this.listening = false;
                    }
                });
            },

            close() {
                this.active = false;
                this.listening = false;
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
