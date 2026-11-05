import axios from 'axios';
import countries from './data/countries.json';
import characters from './data/characters.json';

const PAGE_SIZE = 10;

/**
 * The docs are static, so the example "API" answers from the bundled JSON
 */
axios.defaults.adapter = (config) => {
    const url = new URL(config.url, 'https://demos.local/');
    const respond = data => Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config, request: {} });

    if ( url.pathname.endsWith('/countries.json') ) {
        return respond(countries);
    }

    if ( url.pathname.endsWith('/characters.json') ) {
        return respond(characters);
    }

    const params = { ...Object.fromEntries(url.searchParams), ...config.params };
    const term = (params.q || '').toLowerCase();
    const page = parseInt(params.page) || 1;
    const matches = countries.filter(country => country.name.toLowerCase().includes(term));

    return respond({ data: matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) });
};
