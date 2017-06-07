// import 'helpers/modality';
// eslint-disable-next-line no-unused-vars
// import prism from 'prismjs';
import prism from 'prismjs';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
require('./app.scss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMask from 'v-mask';

import App from './App.vue';
import routes from './routes.js';
import KickStart from '../src/index';
import CodeBlock from './pages/CodeBlock.vue';

Vue.component('code-block', CodeBlock);

// Allow inspection, even in production mode
Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(VueMask);
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

router.afterEach(() => {
	Vue.nextTick(() => {
        prism.highlightAll();
	});
});

const app = new Vue({
	router,
	render(h) {
		return h(App);
	}
});

app.$mount('#app');
