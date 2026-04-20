<template>
    <div class="ks-modal"
         v-show="isOpen"
         :class="[{ 'danger': danger }, classObj]"
         @click.prevent="maskClick"
         @mousedown="mask_interaction = true"
    >
        <div class="ks-modal-wrapper"
             :style="[modalStyle, modalObj]"
             tabindex="-1"
             ref="container"
             @click.stop
             @keydown.esc.stop="escape()"
             @mousedown.stop="mask_interaction = false"
        >
            <div>
                <!-- Modal header-->
                <div class="ks-modal-header" v-if="showHeader">
                    <slot name="header">
                        <h4>{{title}}</h4>
                    </slot>
                    <div class="ks-modal-close" v-if="showClose">
                        <a href="#" @click.prevent="close">
                            <close></close>
                        </a>
                    </div>
                </div>

                <ks-loader-line :show="isLoading"></ks-loader-line>

                <!-- Modal body-->
                <div class="ks-modal-body" ref="body">
                    <slot></slot>
                </div>

                <!-- Modal Footer-->
                <div class="ks-modal-footer">
                    <slot name="footer"></slot>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
    // External Dependencies
    import Close from '../svg/close.svg';

    // Internal Dependencies
    import {addClass, removeClass} from '../helpers/dom';
    import KsLoaderLine from './KsLoaderLine.vue';

    export default {
        name: 'KsModal',

        props: {
            title: {
                type: String,
                default: 'Notification'
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            maxWidth: {
                default: '75%'
            },
            minWidth: {
                type: String,
                default: null
            },
            maxHeight: {
                type: String,
                default: null
            },
            minHeight: {
                type: String,
                default: null
            },
            closeOnEscape: {
                type: Boolean,
                default: true
            },
            danger: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            closeOnMaskClick: {
                type: Boolean,
                default: true
            },
            forceScroll: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                isOpen: false,
                isLoading: false,
                classObj: {},
                updatePosition: false,
                modalObj: {},
                width: null,
                // This variable is used to detect when a user is interacting with the mask vs the body
                mask_interaction: false,
            };
        },

        computed: {
            modalStyle() {
                return {
                    maxHeight: this.maxHeight,
                    minHeight: this.minHeight,
                    maxWidth: this.maxWidth,
                    minWidth: this.minWidth
                }
            }
        },

        mounted() {
            this.$on('open', () => {
                document.body.appendChild(this.$el);

                window.addEventListener('resize', this.windowResize);

                this.$nextTick(() => {
                    this.$refs.container.focus();
                });
            });
        },

        beforeDestroy() {
            this.$el.remove();

            this.close();
        },

        beforeUpdate() {
            if ( this.updatePosition && typeof this.$slots.default !== 'undefined' ) {
                this.updatePosition = false;
                setImmediate(() => {
                    this.positionModal();
                });
            }

            this.$nextTick(() => {
                if ( this.isOpen && this.width !== null && this.width != this.$refs.container.getBoundingClientRect().width ) {
                    this.positionModal();
                }
            });
        },

        methods: {
            open() {
                this.isOpen = true;
                this.mask_interaction = false;
                this.$emit('open');

                addClass(document.documentElement, 'modal-open');

                this.$nextTick(() => {
                    if ( typeof this.$slots.default === 'undefined' ) {
                        this.updatePosition = true;
                    } else {
                        this.positionModal();
                    }
                });
            },
            close() {
                this.isOpen = false;
                this.$emit('close');

                window.removeEventListener('resize', this.windowResize);

                this.$nextTick(() => {
                    const other_modal_open = [...document.querySelectorAll('.ks-modal')]
                        .filter(modal => modal.offsetHeight !== 0)

                    if ( other_modal_open.length === 0 ) {
                        removeClass(document.documentElement, 'modal-open');
                    }
                    this.$set(this.classObj, 'modal-scroll', false);
                })
            },
            escape() {
                if ( this.closeOnEscape ) {
                    this.close();
                }
            },
            maskClick() {
                if ( this.closeOnMaskClick && this.mask_interaction ) {
                    this.close();
                }
            },
            loadingOn() {
                this.isLoading = true;
                return this;
            },
            loadingOff() {
                this.isLoading = false;
                return this;
            },
            positionModal() {
                const $doc = document.documentElement;
                let modal = this.$refs.container;
                let modal_height = modal.clientHeight;
                let window_height = $doc.clientHeight;
                let window_width = $doc.clientWidth;
                let style = window.getComputedStyle(modal);
                const modal_is_bigger = modal_height > window_height;
                let scroll_to_top = false;

                if ( modal_is_bigger || this.forceScroll ) {
                    this.$set(this.classObj, 'modal-scroll', true);
                    this.$nextTick(() => {
                        modal_height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
                        modal_height = modal_is_bigger ? `${modal_height}px` : '';
                    });
                } else {
                    scroll_to_top = true;
                    this.$set(this.classObj, 'modal-scroll', false);
                    modal_height = '';
                }

                this.$nextTick(() => {
                    const rect = modal.getBoundingClientRect();
                    this.width = rect.width;

                    this.$set(this.modalObj, 'left', ((100 - ((rect.width / window_width) * 100)) / 2).toFixed(3) + '%');
                });

                if ( !this.forceScroll && scroll_to_top ) {
                    this.$el.scrollTop = 0;
                }
            },
            windowResize() {
                this.positionModal();
            },
        },

        watch: {
            loading() {
                if ( this.loading ) {
                    this.loadingOn();
                } else {
                    this.loadingOff();
                }
            }
        },

        components: {
            Close,
            KsLoaderLine
        }
    }
</script>
