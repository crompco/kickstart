import './shim';
import Vue from 'vue';
import Kickstart from '@version/src';
import CodeBlock from '@version-docs/components/CodeBlock.vue';
import '@version-docs/assets/sass/docs.scss';
import App from './App.vue';

Vue.use(Kickstart);
Vue.component('code-block', CodeBlock);

new Vue({
    render: h => h(App),
}).$mount('#app');
