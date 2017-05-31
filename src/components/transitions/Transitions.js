// External Dependencies
import Vue from 'vue';

// Internal Dependencies
import {slideDown, slideUp} from '../../helpers/animations';

Vue.component('slide-transition', {
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
});