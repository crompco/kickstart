import axios from 'axios';

let instance = axios.create();

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
     */
    createFromConfig(config = {}) {
        instance = axios.create(config);
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
