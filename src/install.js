import api from './helpers/api';
import * as strings from './helpers/strings';
import * as transitions from './components/transitions/Transitions';
import { KsToast, registeredComponents } from './components';

/**
 * Global template filters. Vue 3 has no filters, so templates should move to
 * the helper functions in kickstart-ui/lib/strings.
 */
const filters = {
    escapeRegExp: value => strings.escapeRegExp(value),
    ucwords: value => strings.ucwords(value),
    posesses: value => strings.posesses(value),
    currency: (value, symbol = '$') => strings.currency(value, symbol),
    pad_left: (value, pad_with, pad_length) => strings.pad_left(value, pad_with, pad_length),
    ellipsis: (value, max_length = 20) => strings.ellipsis(value, max_length),
};

function isVue3(app) {
    return !!(app && app.config && app.config.globalProperties);
}

function toastProps(params) {
    if ( typeof params === 'string' ) {
        return { message: params };
    }

    return { ...params };
}

/**
 * Opens a KsToast on a detached element and destroys it after it closes
 *
 * @param {typeof import('vue').default} Vue
 */
function createToaster(Vue) {
    const Toast = Vue.extend(KsToast);

    return function toast(params) {
        const vm = new Toast({
            el: document.createElement('div'),
            propsData: toastProps(params),
        });

        vm.$once('closed', () => vm.$destroy());

        return vm;
    };
}

/**
 * Vue.use(Kickstart) - registers the ks-* components, the transitions, the
 * filters, Vue.api / this.$api and Vue.toast / this.$toast.
 *
 * Everything that depends on the Vue 2 global API lives here, so the Vue 3
 * plugin only needs a new install function.
 *
 * @param {typeof import('vue').default} Vue
 */
export function install(Vue) {
    if ( isVue3(Vue) ) {
        throw new Error('kickstart-ui 3 supports Vue 2.7. Vue 3 support comes with kickstart-ui 4.');
    }

    for ( const [name, component] of Object.entries(registeredComponents) ) {
        Vue.component(name, component);
    }

    for ( const [name, transition] of Object.entries(transitions) ) {
        Vue.component(name, transition);
    }

    for ( const [name, filter] of Object.entries(filters) ) {
        Vue.filter(name, filter);
    }

    Vue.api = api;
    Vue.toast = createToaster(Vue);

    Object.defineProperties(Vue.prototype, {
        $api: {
            configurable: true,
            get() {
                return Vue.api;
            },
        },
        $toast: {
            configurable: true,
            get() {
                return Vue.toast;
            },
        },
    });
}
