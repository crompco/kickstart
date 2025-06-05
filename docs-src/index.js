import Vue from 'vue';
import VueMask from 'v-mask';
import Kickstart from '../src';

Vue.use(VueMask);
Vue.use(Kickstart)
import './app.scss';
new Vue({
    data() {
        return {
            models: []
        };
    }
}).$mount('#app');



