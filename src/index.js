import KsAutocomplete from './components/KsAutocomplete.vue';
import KsLoaderLine from './components/KsLoaderLine.vue';
import KsTabs from './components/KsTabs.vue';
import KsTab from './components/KsTab.vue';
import KsModal from './components/KsModal.vue';

const Kickstart = {
	KsAutocomplete,
	KsLoaderLine,
	KsTabs,
	KsTab,
	KsModal,
	install(Vue) {
		Vue.component('ks-autocomplete')
		Vue.component('ks-loader-line')
	}
};

export default Kickstart;

export {
	KsAutocomplete,
	KsLoaderLine,
	KsTabs,
	KsTab,
	KsModal
};
