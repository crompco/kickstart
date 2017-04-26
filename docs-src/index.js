// import 'helpers/modality';
// eslint-disable-next-line no-unused-vars
// import prism from 'prismjs';
// require('./app.scss');

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import routes from './routes.js';
import KickStart from '../src/index';

// Allow inspection, even in production mode
Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(KickStart);

Vue.api.interceptors.request({
	headers: {
		'X-KickStart': 'Kickstart'
	}
});

const router = new VueRouter({
	routes,
	linkActiveClass: 'is-active'
});

const app = new Vue({
	router,
	render(h) {
		return h(App);
	}
});

app.$mount('#app');
