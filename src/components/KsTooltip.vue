<template>
    <div
        v-show="showing"
        class="ks-tooltip"
        :class="{'show-arrow': showArrow}"
        :style="tooltip_styles"
        @mouseenter="clearTimeout"
        @mouseleave="hideTooltip"
        @click.stop
    >
        <div
            v-if="showArrow"
            class="ks-tooltip-arrow"
        ></div>
        <slot></slot>
    </div>
</template>

<script>
    import { attach } from '../helpers/position';
    import { defaultOptions } from '../directives/KsTooltip';

    export default {
        name: 'KsTooltip',

        props: {
            // Whether or not the tooltip responds to events.
            isActive: {
                type: Boolean,
                default: true,
            },

            // The event which triggers the tooltip.
            trigger: {
                type: String,
                default: 'hover',
                validator(event) {
                    return ['click', 'hover'].indexOf(event) != -1;
                },
            },

            // The width of the tooltip container, taken as is.
            width: {
                type: String,
                default: '',
            },

            height: {
                type: String,
                default: '',
            },

            // A ref name on the parent component or an element; defaults to the parent element
            target: {
                default: '',
            },

            attachment: {
                type: String,
                default: defaultOptions.attachment,
            },

            targetAttachment: {
                type: String,
                default: defaultOptions.targetAttachment,
            },

            constraints: {
                type: [Array, Object],
                default() {
                    return defaultOptions.constraints;
                },
            },

            showArrow: {
                type: Boolean,
                default: true,
            },

            hoverDelay: {
                type: Number,
                default: null,
            },

            hideDelay: {
                type: Number,
                default: 150,
            },
        },

        emits: ['tooltip-showed', 'tooltip-hidden'],

        computed: {
            tooltip_styles() {
                let styles = {
                    width: this.width,
                };

                if ( this.height != '' ) {
                    styles['height'] = this.height;
                    styles['overflow-y'] = 'auto';
                }

                return styles;
            },
        },

        data() {
            return {
                showing: false,
                target_element: null,
                timeout: null,
                show_timeout: null,
            };
        },

        mounted() {
            this.positioner = null;

            this.$nextTick(() => {
                this.setUpTooltip();
            });
        },

        beforeDestroy() {
            this.teardown();
        },

        beforeUnmount() {
            this.teardown();
        },

        methods: {
            resolveTarget() {
                if ( this.target instanceof Element ) {
                    return this.target;
                }

                if ( this.target ) {
                    const ref = this.$parent && this.$parent.$refs[this.target];
                    const target = Array.isArray(ref) ? ref[0] : ref;

                    return target && target.$el ? target.$el : (target || null);
                }

                return this.$el.parentNode;
            },

            setUpTooltip() {
                if ( this.target_element ) {
                    return;
                }

                this.target_element = this.resolveTarget();

                if ( !this.target_element ) {
                    return;
                }

                if ( this.trigger == 'hover' ) {
                    this.target_element.addEventListener('mouseenter', this.showTooltip);
                    this.target_element.addEventListener('mouseleave', this.hideTooltip);
                } else {
                    this.target_element.addEventListener('click', this.toggleTooltip);
                    document.addEventListener('click', this.triggerHide);
                }
            },

            showTooltip() {
                if ( this.isActive == false ) {
                    return;
                }

                this.clearTimeout();
                clearTimeout(this.show_timeout);

                if ( this.hoverDelay ) {
                    this.show_timeout = setTimeout(() => {
                        this.showNow();
                    }, this.hoverDelay);
                } else {
                    this.showNow();
                }
            },

            showNow() {
                if ( !this.target_element ) {
                    return;
                }

                this.showing = true;

                this.$nextTick(() => {
                    if ( !this.showing ) {
                        return;
                    }

                    if ( this.$el.parentNode !== document.body ) {
                        document.body.appendChild(this.$el);
                    }

                    if ( !this.positioner ) {
                        this.positioner = attach(this.target_element, this.$el, {
                            attachment: this.attachment,
                            targetAttachment: this.targetAttachment,
                            constraints: this.constraints,
                        });
                    }
                });

                this.$emit('tooltip-showed');
            },

            hideTooltip() {
                // Clear the show timeout for when users hover over and out before it shows
                clearTimeout(this.show_timeout);

                if ( this.trigger == 'hover' ) {
                    this.clearTimeout();
                    this.timeout = setTimeout(() => {
                        this.triggerHide();
                    }, this.hideDelay);
                }
            },

            triggerHide() {
                if ( this.showing ) {
                    this.showing = false;
                    this.stopPositioning();
                    this.$emit('tooltip-hidden');
                }
            },

            clearTimeout() {
                clearTimeout(this.timeout);
            },

            toggleTooltip(e) {
                e.preventDefault();
                e.stopPropagation();
                this.showing ? this.triggerHide() : this.showTooltip();
            },

            stopPositioning() {
                if ( this.positioner ) {
                    this.positioner.destroy();
                    this.positioner = null;
                }
            },

            destroyTooltip() {
                this.clearTimeout();
                clearTimeout(this.show_timeout);
                this.stopPositioning();

                if ( !this.target_element ) {
                    return;
                }

                if ( this.trigger == 'hover' ) {
                    this.target_element.removeEventListener('mouseenter', this.showTooltip);
                    this.target_element.removeEventListener('mouseleave', this.hideTooltip);
                } else {
                    this.target_element.removeEventListener('click', this.toggleTooltip);
                    document.removeEventListener('click', this.triggerHide);
                }

                this.target_element = null;
            },

            teardown() {
                this.destroyTooltip();

                // The tooltip lives in <body> once shown, outside the parent's DOM
                if ( this.$el.parentNode === document.body ) {
                    this.$el.remove();
                }
            },
        },

        watch: {
            isActive(active) {
                if ( !active ) {
                    this.triggerHide();
                }
            },
        },
    };
</script>
