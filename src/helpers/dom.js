// External Dependencies

// Internal Dependencies
import {addEvent} from '../helpers/events';

export default class DOM {
    constructor(el) {
        this.$el = document.querySelector(el);
    }

    addClass(className) {
        if ( this.$el.classList ) {
            this.$el.parentNode.classList.add(className);
        } else {
            this.$el.parentNode.className += ' ' + className;
        }

        return this;
    }

    on(event, cb) {
        addEvent(this.$el, event, (e) => cb(e));

        return this;
    }
}

export function domReady(cb) {
    document.addEventListener("DOMContentLoaded", () => {
        cb();
    });
}

export function dom(el) {
    return new DOM(el);
}