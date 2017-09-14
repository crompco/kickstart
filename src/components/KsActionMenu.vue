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
                    attachment: 'top left',
                    targetAttachment: 'bottom left',
                    constraints: [
                        {
                            to: 'scrollParent',
                            attachment: 'none ks-together'
                        }
                    ]
                });

                Tether.modules.push({
                    position({top, left, targetAttachment, targetPos}) {
                        if (!this.options.constraints) {
                            return true;
                        }

                        const tAttachment = Tether.Utils.extend({}, targetAttachment);
                        const eAttachment = Tether.Utils.extend({}, this.attachment);

                        let {height, width} = this.cache('element-bounds', () => {
                          return getBounds(this.element);
                        });

                        if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
                          // Handle the item getting hidden as a result of our positioning without glitching
                          // the classes in and out
                          ({width, height} = this.lastSize);
                        }

                        const targetSize = this.cache('target-bounds', () => {
                          return this.getTargetBounds();
                        });

                        const {height: targetHeight, width: targetWidth} = targetSize;

                        this.options.constraints.forEach(constraint => {
                            let {to, attachment} = constraint;

                            if ( typeof attachment === 'undefined' ) {
                                attachment = '';
                            }

                            let changeAttachX, changeAttachY;
                            if ( attachment.indexOf(' ') >= 0 ) {
                                [changeAttachY, changeAttachX] = attachment.split(' ');
                            } else {
                                changeAttachX = changeAttachY = attachment;
                            }

                            let bounds;
                            if ( to == 'window' ) {
                                bounds = {
                                    left: pageXOffset,
                                    top: pageYOffset,
                                    width: innerWidth + pageXOffset,
                                    height: innerHeight + pageYOffset
                                };
                            } else if ( to == 'scrollParent' ) {
                                bounds = Tether.Utils.getBounds(this.scrollParents[0]);
                            } else {
                                bounds = Tether.Utils.getBounds(to);
                            }

                            if ( changeAttachX === 'ks-together' ) {
                                if ( (left + width) > bounds.width && targetPos.left == left && tAttachment.left === 'left' ) {
                                    if ( eAttachment.left === 'left' ) {
                                        left += targetWidth;
                                        eAttachment.left = 'right';

                                        left -= width;
                                        tAttachment.left = 'right';
                                    }
                                }
                            }

                            if ( tAttachment.left !== targetAttachment.left || eAttachment.left !== this.attachment.left) {
                                this.updateAttachClasses(eAttachment, tAttachment);
                                this.trigger('update', {
                                    attachment: eAttachment,
                                    targetAttachment: tAttachment
                                });
                            }
                        });

                       return {top, left};
                    }
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
                let menus = document.body.querySelectorAll('.ks-menu-list');

                menus.forEach(menu => menu.remove());

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
