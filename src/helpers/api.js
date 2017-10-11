import axios from 'axios';

export default {
	get(url, request, config = {}) {
		return axios.get(url, request, config)
			.then((response) => Promise.resolve(response.data))
			.catch((error) => Promise.reject(error));
	},

	post(url, request, config = {}) {
		return axios.post(url, request, config)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error));
	},

    put(url, request, config = {}) {
		return axios.put(url, request, config)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error));
	},

    patch(url, request, config = {}) {
        return axios.patch(url, request, config)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

	delete(url, request) {
		return axios.delete(url, request)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error));
	},

	baseUrl(url) {
		axios.defaults.baseURL = url;
	},

	interceptors: {
		request(options, onRejected = false) {
			return axios.interceptors.request.use(config => {
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
			return axios.interceptors.response.use(response => {
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
