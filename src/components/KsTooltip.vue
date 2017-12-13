<template>
    <div v-show="showing"
         class="ks-tooltip"
         :style="tooltip_styles"
         @mouseenter="clearTimeout"
         @mouseleave="hideTooltip"
    >
        <div class="ks-tooltip-arrow"></div>
        <slot></slot>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import {initTether} from '../directives/KsTooltip';
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
                default: false
            }
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

        methods: {
            setUpTooltip() {
                this.target_element = this.target === false ? parent(this.$el) : this.$parent.$refs[this.target];

                if ( this.trigger == 'hover' ) {
                    this.target_element.addEventListener('mouseenter', this.showTooltip);
                    this.target_element.addEventListener('mouseleave', this.hideTooltip);
                } else {
                    this.target_element.addEventListener('click', this.toggleTooltip);
                }
            },

            showTooltip() {
                if ( this.isActive == false ) {
                    return;
                }

                this.clearTimeout();
                this.showing = true;

                if ( this.tether == false ) {
                    this.tether = initTether(this.$el, this.target_element);
                }

                this.$nextTick(() => {
                    this.tether.position();
                });

                this.$emit('tooltip-showed');
            },

            hideTooltip() {
                this.timeout = setTimeout(() => {
                    this.showing = false;

                    this.$emit('tooltip-hidden');
                }, 150);
            },

            clearTimeout() {
                clearTimeout(this.timeout);
            },

            toggleTooltip() {
                this.showing ? this.hideTooltip() : this.showTooltip();
            },

            destroyTooltip() {
                this.$el.remove();

                if ( this.tether !== false ) {
                    this.tether.destroy();
                }

                if ( this.trigger == 'hover' ) {
                    this.target_element.removeEventListener('mouseenter', this.showTooltip);
                    this.target_element.removeEventListener('mouseleave', this.hideTooltip);
                } else {
                    this.target_element.removeEventListener('click', this.toggleTooltip);
                }

                this.target_element = false;
            }
        }
    }
</script>