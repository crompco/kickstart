import axios from 'axios';

let instance = axios.create();

export default {
	get(url, request, config = {}) {
		return instance.get(url, {...config, ...request})
			.then((response) => Promise.resolve(response.data))
			.catch((error) => Promise.reject(error));
	},

	post(url, request, config = {}) {
		return instance.post(url, request, config)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error));
	},

    put(url, request, config = {}) {
		return instance.put(url, request, config)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error));
	},

    patch(url, request, config = {}) {
        return instance.patch(url, request, config)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

	delete(url, request) {
		return instance.delete(url, request)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error));
	},

	baseUrl(url) {
		axios.defaults.baseURL = url;
	},

	createFromConfig(config = {}) {
		instance = axios.create(config);
	},

	getInstance() {
		return instance;
	},

	interceptors: {
		request(options, onRejected = false) {
			return instance.interceptors.request.use(config => {
					if ( typeof options === 'function' ) {
                        return options(config);
                    }

                    return config;
				}, error => {
					if ( onRejected !== false ) {
						return Promise.reject(onRejected(error));
					}

					return Promise.reject(error);
				})
        },

		response(onFulfilled, onRejected = false) {
			return instance.interceptors.response.use(response => {
				return onFulfilled(response);
			}, error => {
				if ( onRejected !== false ) {
                    return Promise.reject(onRejected(error));
				}

				return Promise.reject(error);
			})
		}
	}
}
