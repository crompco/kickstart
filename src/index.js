import KsAutocomplete from './components/KsAutocomplete.vue';
import KsCalendar from './components/KsCalendar.vue';
import KsCheckbox from './components/KsCheckbox.vue';
import KsDatepicker from './components/KsDatepicker.vue';
import KsLoaderSpin from './components/KsLoaderSpin.vue';
import KsLoaderLine from './components/KsLoaderLine.vue';
import KsModal from './components/KsModal.vue';
import KsRadio from './components/KsRadio.vue';
import KsRadioGroup from './components/KsRadioGroup.vue';
import KsSelect from './components/KsSelect.vue';
import KsTab from './components/KsTab.vue';
import KsTabs from './components/KsTabs.vue';
import API from './helpers/api';

require('./styles/app.scss');

const Kickstart = {
	KsAutocomplete,
	KsCalendar,
	KsCheckbox,
	KsDatepicker,
	KsLoaderSpin,
	KsLoaderLine,
	KsModal,
	KsRadio,
	KsRadioGroup,
	KsSelect,
	KsTab,
	KsTabs,
	install(Vue) {
		Vue.api = API;

		Vue.component('ks-autocomplete', KsAutocomplete)
		Vue.component('ks-calendar', KsCalendar)
		Vue.component('ks-checkbox', KsCheckbox)
		Vue.component('ks-datepicker', KsDatepicker)
		Vue.component('ks-loader-spin', KsLoaderSpin)
		Vue.component('ks-loader-line', KsLoaderLine)
		Vue.component('ks-modal', KsModal)
		Vue.component('ks-radio', KsRadio)
		Vue.component('ks-radio-group', KsRadioGroup)
		Vue.component('ks-select', KsSelect)
		Vue.component('ks-tab', KsTab)
		Vue.component('ks-tabs', KsTabs)

		Object.defineProperty(Vue.prototype, '$api', {
			get() { return Vue.api }
		})
	}
};

export default Kickstart;

export {KsAutocomplete};
export {KsCalendar};
export {KsCheckbox};
export {KsDatepicker};
export {KsLoaderSpin};
export {KsLoaderLine};
export {KsModal};
export {KsRadio};
export {KsRadioGroup};
export {KsSelect};
export {KsTab};
export {KsTabs};
