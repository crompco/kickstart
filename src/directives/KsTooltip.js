import { attach } from '../helpers/position';

export const defaultOptions = {
    attachment: 'top center',
    targetAttachment: 'bottom center',
    constraints: [
        {
            to: 'window',
            attachment: 'together ks-together',
        },
    ],
};

/**
 * v-ks-tooltip="'Text'" or v-ks-tooltip="{ content, html, trigger, isActive, showArrow, attachment, targetAttachment, constraints }"
 * v-ks-tooltip.click="'Text'" opens on click instead of hover.
 */

const states = new WeakMap();

function options(binding) {
    const value = binding.value !== null && typeof binding.value === 'object' ? binding.value : { content: binding.value };

    return {
        content: '',
        html: false,
        trigger: binding.modifiers && binding.modifiers.click ? 'click' : 'hover',
        isActive: true,
        showArrow: true,
        ...defaultOptions,
        ...value,
    };
}

function render(state) {
    const { tooltip, options: config } = state;

    tooltip.className = config.showArrow ? 'ks-tooltip show-arrow' : 'ks-tooltip';
    tooltip.innerHTML = config.showArrow ? '<div class="ks-tooltip-arrow"></div>' : '';

    const content = document.createElement('div');
    if ( config.html ) {
        content.innerHTML = config.content == null ? '' : String(config.content);
    } else {
        content.textContent = config.content == null ? '' : String(config.content);
    }
    tooltip.appendChild(content);
}

function show(el) {
    const state = states.get(el);
    if ( !state || state.showing || state.options.isActive === false ) {
        return;
    }

    state.showing = true;
    render(state);
    state.tooltip.style.display = '';
    document.body.appendChild(state.tooltip);

    state.positioner = attach(el, state.tooltip, {
        attachment: state.options.attachment,
        targetAttachment: state.options.targetAttachment,
        constraints: state.options.constraints,
    });
}

function hide(el) {
    const state = states.get(el);
    if ( !state || !state.showing ) {
        return;
    }

    state.showing = false;
    state.tooltip.style.display = 'none';

    if ( state.positioner ) {
        state.positioner.destroy();
        state.positioner = null;
    }
}

function bind(el, binding) {
    const state = {
        options: options(binding),
        tooltip: document.createElement('div'),
        showing: false,
        positioner: null,
        listeners: {},
    };

    if ( state.options.trigger === 'click' ) {
        state.listeners = {
            click: (e) => {
                e.stopPropagation();
                state.showing ? hide(el) : show(el);
            },
        };
        state.outside = () => hide(el);
        document.addEventListener('click', state.outside);
    } else {
        state.listeners = {
            mouseenter: () => show(el),
            mouseleave: () => hide(el),
        };
    }

    for ( const [event, listener] of Object.entries(state.listeners) ) {
        el.addEventListener(event, listener);
    }

    states.set(el, state);
}

function update(el, binding) {
    const state = states.get(el);
    if ( !state ) {
        return;
    }

    state.options = { ...options(binding), trigger: state.options.trigger };

    if ( state.options.isActive === false ) {
        hide(el);
    } else if ( state.showing ) {
        render(state);
    }
}

function unbind(el) {
    const state = states.get(el);
    if ( !state ) {
        return;
    }

    hide(el);

    for ( const [event, listener] of Object.entries(state.listeners) ) {
        el.removeEventListener(event, listener);
    }

    if ( state.outside ) {
        document.removeEventListener('click', state.outside);
    }

    state.tooltip.remove();
    states.delete(el);
}

export default {
    // Vue 2
    bind,
    componentUpdated: update,
    unbind,

    // Vue 3
    beforeMount: bind,
    updated: update,
    beforeUnmount: unbind,
};
