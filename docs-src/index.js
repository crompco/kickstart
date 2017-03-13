// import 'helpers/modality';
// eslint-disable-next-line no-unused-vars
// import prism from 'prismjs';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import routes from './routes.js';

// Allow inspection, even in production mode
Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(VueResource);

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
