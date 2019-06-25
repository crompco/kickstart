<template>
    <div v-show="showing"
         class="ks-tooltip"
         :style="tooltip_styles"
         @mouseenter="clearTimeout"
         @mouseleave="hideTooltip"
         @click.prevent.stop
         :class="{'show-arrow': showArrow}"
    >
        <div class="ks-tooltip-arrow" v-if="showArrow"></div>
        <slot></slot>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import {initTether, defaultOptions} from '../directives/KsTooltip';
    import {parent} from '../helpers/dom';

    export default {
        name: 'KsTooltip',

        props: {
            // Whether or not the tooltip responds to events.
            isActive: {
                type: Boolean,
                default: true
            },

            // The event which triggers the tooltip.
            trigger: {
                type: String,
                default: 'hover',
                validator(event) {
                    return ['click', 'hover'].indexOf(event) != -1;
                }
            },

            // The width of the tooltip container, taken as is.
            width: {
                type: String,
                default: ''
            },

            height: {
                type: String,
                default: ''
            },

            target: {
                type: String,
                default: ''
            },

            attachment: {
                type: String,
                default: defaultOptions.attachment
            },

            targetAttachment: {
                type: String,
                default: defaultOptions.targetAttachment
            },

            constraints: {
                type: [Array, Object],
                default() {
                    return defaultOptions.constraints;
                }
            },

            showArrow: {
                type: Boolean,
                default: true,
            },
        },

        computed: {
            tooltip_styles() {
                let styles = {
                    width: this.width
                };

                if (this.height != '') {
                    styles['height'] = this.height;
                    styles['overflow-y'] = 'auto';
                }

                return styles;
            }
        },

        data() {
            return {
                tether: false,
                showing: false,
                target_element: false,
                timeout: false,
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.setUpTooltip();
            });
        },

        beforeDestroy() {
            this.destroyTooltip();
        },

        destroyed() {
            this.$el.remove();
        },

        methods: {
            setUpTooltip() {
                this.target_element = this.target === '' ? parent(this.$el) : this.$parent.$refs[this.target];

                if ( this.target_element == null ) {
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
                this.showing = true;

                if ( this.tether == false ) {
                    this.tether = initTether(this.$el, this.target_element, {
                        attachment: this.attachment,
                        targetAttachment: this.targetAttachment,
                        constraints: this.constraints,
                    });
                }

                this.$nextTick(() => {
                    this.tether.position();
                });

                this.$emit('tooltip-showed');
            },

            hideTooltip() {
                if ( this.trigger == 'hover' ) {
                    this.timeout = setTimeout(() => {
                        this.triggerHide();
                    }, 150);
                }
            },

            triggerHide() {
                if ( this.showing ) {
                    this.showing = false;
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

            destroyTooltip() {
                if ( typeof this.target_element != 'function' ) {
                    return;
                }

                if ( this.tether !== false ) {
                    this.tether.destroy();
                }

                if ( this.trigger == 'hover' ) {
                    this.target_element.removeEventListener('mouseenter', this.showTooltip);
                    this.target_element.removeEventListener('mouseleave', this.hideTooltip);
                } else {
                    this.target_element.removeEventListener('click', this.toggleTooltip);
                    document.removeEventListener('click', this.triggerHide);
                }

                this.target_element = false;
            }
        }
    }
</script>
