// External Dependencies
import Velocity from 'velocity-animate';

// Internal Dependencies

const SlideTransition = {
    methods: {
        beforeEnter(el) {
            el.style.display = '';
            el.style.maxHeight = 'none';
            el.style.overflow = 'hidden';
            el.style.opacity = '0';
        },

        enter(el, done) {
            const height = el.offsetHeight;

            Velocity(el, {opacity: 1, maxHeight: `${height}px`}, {duration: 400, complete: done})
        },

        afterEnter(el) {
            el.style.removeProperty('overflow');
            el.style.removeProperty('max-height');
        },

        beforeLeave(el) {
            el.style.overflow = 'hidden';
            el.style.maxHeight = `${el.offsetHeight}px`;
        },

        leave(el, done) {
            Velocity(el, {opacity: 0, maxHeight: 0, paddingTop: 0, paddingBottom: 0}, {duration: 400, complete: done})
        },

        afterLeave(el) {
            el.style.removeProperty('padding-top');
            el.style.removeProperty('padding-bottom');
            el.style.removeProperty('overflow');
            el.style.removeProperty('max-height');
        },
    },

    render(createElement) {
        return createElement(
            'transition',
            {
                props: {
                    name: 'slide-transition',
                    mode: 'in-out',
                    css: false,
                },
                on: {
                    beforeEnter: this.beforeEnter,
                    enter: this.enter,
                    afterEnter: this.afterEnter,
                    beforeLeave: this.beforeLeave,
                    leave: this.leave,
                    afterLeave: this.afterLeave
                },
            },
            this.$slots.default
        );
    }
};

export {SlideTransition};
