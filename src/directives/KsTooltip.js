// External Dependencies
import Vue from 'vue';
import Tether from 'tether';

// Internal Dependencies
import {object_get} from "../helpers/objects";
import '../helpers/tether-constraints';

let tether = false;
let showing = false;
let props = false;
let events = {};

function hasClass($el, className) {
    if ( $el.classList ) {
        return $el.classList.contains(className);
    }

    return new RegExp('(^| )' + className + '( |$)', 'gi').test($el.className);
}

function isUndefined(item) {
    return typeof item === 'undefined';
}

function createTooltipDiv(wrapper, binding) {
    let new_div = wrapper.appendChild(document.createElement('div'));
    new_div.className = 'ks-tooltip';
    new_div.innerHTML += '<div class="ks-tooltip-arrow"></div>';
    new_div.innerHTML += binding.value;

    return new_div;
}

export function initTether(el, target) {
    return new Tether({
        element: el,
        target: target,
        attachment: 'top center',
        constraints: [
            {
                to: 'window',
                attachment: 'together ks-together'
            }
        ]
    });
}

function showTooltip(el, binding) {
    showing = true;

    if ( props != false && !isUndefined(props['is-active']) && props['is-active'] == false ) {
        return;
    }

    if ( tether == false ) {
        let tooltip_div = createTooltipDiv(el, binding);

        tether = initTether(tooltip_div, el);
        tether.position();
    } else {
        for ( let child of el.childNodes ) {
            if ( hasClass(child, 'ks-tooltip') ) {
                child.style.display = '';
            }
        }
    }
}

function hideTooltip(el) {
    showing = false;
    for ( let child of el.childNodes ) {
        if ( hasClass(child, 'ks-tooltip') ) {
            child.style.display = 'none';
        }
    }
}

function toggleTooltip(el, binding) {
    showing ? hideTooltip(el) : showTooltip(el, binding);
}

function useClickEvent(props) {
    return props != false && !isUndefined(props.trigger) && props.trigger == 'click';
}

Vue.directive('ks-tooltip', {
    bind(el, binding, vnode) {
        props = object_get(vnode.data, 'attrs.props', false);

        if ( useClickEvent(props) ) {
            events = {
                'click': function () {
                    toggleTooltip(el, binding);
                }
            };

            el.addEventListener('click', events.click)
        } else {
            events = {
                'mouseenter': function() {
                    showTooltip(el, binding);
                },
                'mouseleave': function () {
                    hideTooltip(el);
                }
            };

            el.addEventListener('mouseenter', events.mouseenter);
            el.addEventListener('mouseleave', events.mouseleave);
        }
    },

    update(el, binding, vnode) {
        // const props = object_get(vnode.data, 'attrs.props', false);

        // console.log('update vnode', vnode.data.attrs.props);
    },

    unbind(el, binding, vnode) {
        props = object_get(vnode.data, 'attrs.props', false);

        if ( useClickEvent(props) ) {
            el.removeEventListener('click', event.click)
        } else {
            el.removeEventListener('mouseenter', events.mouseenter);
            el.removeEventListener('mouseleave', events.mouseleave);
        }
    }
});