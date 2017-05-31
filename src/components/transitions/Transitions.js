// External Dependencies

// Internal Dependencies
import {slideDown, slideUp} from '../../helpers/animations';

const SlideTransition = {
    functional: true,

    render(createElement, context) {
        let data = {
            props: {
                name: 'slide-transition',
                mode: 'out-in'
            },

            on: {
                beforeEnter(el) {
                    slideDown(el);
                },

                leave(el, done) {
                    slideUp(el, () => done());
                }
            }
        };

        return createElement('transition', data, context.children);
    }
};

export {SlideTransition};