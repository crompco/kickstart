import { attach } from '../../helpers/position';

/**
 * Positions an open dropdown against its control with fixed positioning, so
 * containers with overflow (modals, scroll panels) can't clip it. It opens
 * below the control and flips above it when there is no room; `inverted`
 * is true while it is above.
 */
export default {
    data() {
        return {
            inverted: false,
        };
    },

    mounted() {
        this.dropdown_positioner = null;
    },

    beforeDestroy() {
        this.stopDropdown();
    },

    beforeUnmount() {
        this.stopDropdown();
    },

    methods: {
        startDropdown(control, dropdown) {
            if ( !control || !dropdown ) {
                return;
            }

            if ( this.dropdown_positioner ) {
                this.dropdown_positioner.update();
                return;
            }

            dropdown.style.zIndex = '100';
            // Hidden until it is positioned: a frame at the old place flashes and
            // hovers the item under the pointer
            dropdown.style.visibility = 'hidden';

            this.dropdown_positioner = attach(control, dropdown, {
                strategy: 'fixed',
                attachment: 'top left',
                targetAttachment: 'bottom left',
                constraints: [{ to: 'window', attachment: 'together none' }],
                matchWidth: true,
                onUpdate: (data) => {
                    dropdown.style.visibility = '';
                    this.inverted = !!data && data.attachment.vertical === 'bottom';
                },
            });
        },

        stopDropdown() {
            if ( this.dropdown_positioner ) {
                this.dropdown_positioner.destroy();
                this.dropdown_positioner = null;
            }
        },
    },
};
