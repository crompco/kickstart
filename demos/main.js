import Vue from 'vue';
import axios from 'axios';
import KickstartUI from '@src/index';
import api from '@src/helpers/api';
import '@src/css/app.css';
import './demos.scss';

import App from './App.vue';
import CodeBlock from './CodeBlock.vue';
import countries from './data/countries.json';
import characters from './data/characters.json';

Vue.use(KickstartUI);
Vue.component('code-block', CodeBlock);

const PAGE_SIZE = 10;

/**
 * The docs are static, so the example "API" answers from the bundled JSON
 */
const instance = api.getInstance();
const network = axios.getAdapter(instance.defaults.adapter);

instance.defaults.adapter = (config) => {
    const url = new URL(config.url, 'https://demos.local/');
    const respond = data => Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config });

    if ( url.pathname.endsWith('/countries.json') ) {
        return respond(countries);
    }

    if ( url.pathname.endsWith('/characters.json') ) {
        return respond(characters);
    }

    if ( url.pathname.endsWith('/countries') ) {
        const term = (url.searchParams.get('q') || '').toLowerCase();
        const page = parseInt(url.searchParams.get('page')) || 1;
        const matches = countries.filter(country => country.name.toLowerCase().includes(term));

        return respond({ data: matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) });
    }

    return network(config);
};

new Vue({
    render: h => h(App),
}).$mount('#app');
