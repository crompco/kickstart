<template>
    <div
        v-show="isOpen"
        class="ks-modal"
        :class="[{ 'danger': danger }, classObj]"
        @click.prevent="maskClick"
        @mousedown="mask_interaction = true"
    >
        <div
            ref="container"
            tabindex="-1"
            class="ks-modal-wrapper"
            :style="[modalStyle, modalObj]"
            @click.stop
            @keydown.esc.stop="escape()"
            @mousedown.stop="mask_interaction = false"
        >
            <div>
                <!-- Modal header-->
                <div
                    v-if="showHeader"
                    class="ks-modal-header"
                >
                    <slot name="header">
                        <h4>{{ title }}</h4>
                    </slot>
                    <div
                        v-if="showClose"
                        class="ks-modal-close"
                    >
                        <a
                            href="#"
                            @click.prevent="close"
                        >
                            <close></close>
                        </a>
                    </div>
                </div>

                <ks-loader-line :show="isLoading"></ks-loader-line>

                <!-- Modal body-->
                <div
                    ref="body"
                    class="ks-modal-body"
                >
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
    import Close from './icons/IconClose.vue';
    import { addClass, removeClass } from '../helpers/dom';
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

        emits: ['open', 'close'],

        data() {
            return {
                isOpen: false,
                isLoading: this.loading,
                classObj: {
                    'modal-scroll': false,
                },
                updatePosition: false,
                modalObj: {
                    left: null,
                },
                width: null,
                // Detects when a user is interacting with the mask vs the body
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

        beforeDestroy() {
            this.teardown();
        },

        beforeUnmount() {
            this.teardown();
        },

        beforeUpdate() {
            if ( this.updatePosition && this.$slots.default ) {
                this.updatePosition = false;
                setTimeout(() => {
                    this.positionModal();
                });
            }

            this.$nextTick(() => {
                if ( this.isOpen && this.width !== null && this.$refs.container && this.width != this.$refs.container.getBoundingClientRect().width ) {
                    this.positionModal();
                }
            });
        },

        methods: {
            open() {
                this.isOpen = true;
                this.mask_interaction = false;

                // The modal lives in <body> while it is used so no container can clip it
                if ( this.$el.parentNode !== document.body ) {
                    document.body.appendChild(this.$el);
                }

                window.removeEventListener('resize', this.windowResize);
                window.addEventListener('resize', this.windowResize);

                addClass(document.documentElement, 'modal-open');

                this.$emit('open');

                this.$nextTick(() => {
                    if ( this.$refs.container ) {
                        this.$refs.container.focus();
                    }

                    if ( !this.$slots.default ) {
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
                    this.releaseDocument();
                    this.classObj['modal-scroll'] = false;
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
                const modal = this.$refs.container;

                if ( !modal ) {
                    return;
                }

                const modal_height = modal.clientHeight;
                const window_height = $doc.clientHeight;
                const window_width = $doc.clientWidth;
                const modal_is_bigger = modal_height > window_height;

                this.classObj['modal-scroll'] = modal_is_bigger || this.forceScroll;

                this.$nextTick(() => {
                    const rect = modal.getBoundingClientRect();
                    this.width = rect.width;

                    if ( window_width ) {
                        this.modalObj.left = ((100 - ((rect.width / window_width) * 100)) / 2).toFixed(3) + '%';
                    }
                });

                if ( !this.forceScroll && !modal_is_bigger ) {
                    this.$el.scrollTop = 0;
                }
            },
            windowResize() {
                this.positionModal();
            },
            releaseDocument() {
                const other_modal_open = [...document.querySelectorAll('.ks-modal')]
                    .filter(modal => modal !== this.$el && modal.style.display !== 'none' && modal.offsetHeight !== 0);

                if ( other_modal_open.length === 0 ) {
                    removeClass(document.documentElement, 'modal-open');
                }
            },
            teardown() {
                window.removeEventListener('resize', this.windowResize);

                if ( this.isOpen ) {
                    this.isOpen = false;
                    this.$emit('close');
                }

                this.$el.remove();
                this.releaseDocument();
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
