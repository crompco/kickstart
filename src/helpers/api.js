import axios from 'axios';

function encodeParam(value) {
    return encodeURIComponent(value)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}

/**
 * Serializes query params the way kickstart 2.x (axios 0.15) did, so APIs keep receiving the same query strings:
 * an object value is sent as JSON, an array as key[]=… for each item, a Date as an ISO string,
 * and null or undefined values are left out. axios 1.x would send objects as key[sub]=… instead.
 *
 * @param {Object|URLSearchParams} params
 * @return {string}
 */
export function serializeParams(params) {
    if ( typeof URLSearchParams !== 'undefined' && params instanceof URLSearchParams ) {
        return params.toString();
    }

    const parts = [];

    for ( const key of Object.keys(params || {}) ) {
        const value = params[key];

        if ( value === null || typeof value === 'undefined' ) {
            continue;
        }

        const values = Array.isArray(value) ? value : [value];
        const name = Array.isArray(value) ? `${key}[]` : key;

        for ( let item of values ) {
            if ( item instanceof Date ) {
                item = item.toISOString();
            } else if ( item !== null && typeof item === 'object' ) {
                item = JSON.stringify(item);
            }

            parts.push(`${encodeParam(name)}=${encodeParam(item)}`);
        }
    }

    return parts.join('&');
}

function createInstance({ paramsSerializer = serializeParams, ...config } = {}) {
    return axios.create({ ...config, paramsSerializer });
}

let instance = createInstance();

function isThenable(value) {
    return !!value && typeof value.then === 'function';
}

/**
 * The value an onRejected handler gave back: a promise settles the request
 * (for example a retry), any other value becomes the rejection reason.
 */
function rejectWith(result, error) {
    if ( isThenable(result) ) {
        return result;
    }

    return Promise.reject(typeof result === 'undefined' ? error : result);
}

export default {
    /**
     * @return {Promise<*>} The response data
     */
    get(url, request, config = {}) {
        return instance.get(url, { ...config, ...request })
            .then(response => response.data);
    },

    /**
     * @return {Promise<import('axios').AxiosResponse>}
     */
    post(url, request, config = {}) {
        return instance.post(url, request, config);
    },

    put(url, request, config = {}) {
        return instance.put(url, request, config);
    },

    patch(url, request, config = {}) {
        return instance.patch(url, request, config);
    },

    delete(url, config = {}) {
        return instance.delete(url, config);
    },

    /**
     * Sets the base URL of the shared instance and of instances made later by createFromConfig
     */
    baseUrl(url) {
        axios.defaults.baseURL = url;
        instance.defaults.baseURL = url;
    },

    /**
     * Replaces the shared instance. Interceptors of the old instance do not carry over.
     * The 2.x query string format is kept unless the config has its own paramsSerializer.
     * An object form such as { encode } replaces the 2.x format completely, objects included.
     */
    createFromConfig(config = {}) {
        instance = createInstance(config);
    },

    getInstance() {
        return instance;
    },

    isCancel(error) {
        return axios.isCancel(error);
    },

    interceptors: {
        /**
         * @return {number} The interceptor id
         */
        request(onFulfilled, onRejected = false) {
            return instance.interceptors.request.use(
                config => typeof onFulfilled === 'function' ? onFulfilled(config) : config,
                error => onRejected !== false ? rejectWith(onRejected(error), error) : Promise.reject(error),
            );
        },

        /**
         * @return {number} The interceptor id
         */
        response(onFulfilled, onRejected = false) {
            return instance.interceptors.response.use(
                response => typeof onFulfilled === 'function' ? onFulfilled(response) : response,
                error => onRejected !== false ? rejectWith(onRejected(error), error) : Promise.reject(error),
            );
        },
    },
};
