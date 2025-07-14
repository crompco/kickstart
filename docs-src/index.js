// eslint-disable-next-line no-unused-vars
require('./assets/sass/docs.scss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMask from 'v-mask';

import App from './App.vue';
import routes from './routes.js';
import KickStart from '../src/index';
import CodeBlock from './components/CodeBlock.vue';
import KsTabs from '../src/components/KsTabs.vue';
import KsTab from '../src/components/KsTab.vue';

Vue.component('code-block', CodeBlock);
Vue.component('ks-tabs', KsTabs);
Vue.component('ks-tab', KsTab);

// Automatically register all components from ComponentExamples and StyleExamples
function registerGlobalComponents() {
    // Register ComponentExamples
    const componentExamplesContext = require.context('./components/ComponentExamples', true, /\.vue$/);
    componentExamplesContext.keys().forEach(fileName => {
        const componentConfig = componentExamplesContext(fileName);
        const componentName = fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '');

        Vue.component(componentName, componentConfig.default || componentConfig);
    });

    // Register StyleExamples
    const styleExamplesContext = require.context('./components/StyleExamples', true, /\.vue$/);
    styleExamplesContext.keys().forEach(fileName => {
        const componentConfig = styleExamplesContext(fileName);
        const componentName = fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '');

        Vue.component(componentName, componentConfig.default || componentConfig);
    });
}

// Register all components
registerGlobalComponents();

// Allow inspection, even in production mode
Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(VueMask);
Vue.use(KickStart);

Vue.api.interceptors.request((config) => {
    config.headers = {
        'X-KickStart': 'Kickstart'
    }

    // json data works without needing a server
    if ( process.env.NODE_ENV === 'production' && !config.url.endsWith('.json') ) {
        config.url = config.url.replace('/api', '/.netlify/functions');
    }

    return config;
});

const router = new VueRouter({
    routes,
    linkActiveClass: 'is-active',
    mode: 'history',
});

const app = new Vue({
    router,
    render(h) {
        return h(App);
    }
});

app.$mount('#app');