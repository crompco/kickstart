import KsAutocomplete from './components/KsAutocomplete.vue';
import KsLoaderLine from './components/KsLoaderLine.vue';

const Kickstart = {
	KsAutocomplete,
	KsLoaderLine,
	install(Vue) {
		Vue.component('ks-autocomplete')
		Vue.component('ks-loader-line')
	}
};

export default Kickstart;

export {KsAutocomplete, KsLoaderLine};
