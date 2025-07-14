import './helpers/polyfills';
import KsAccordion from './components/KsAccordion.vue';
import KsAccordionRow from './components/KsAccordionRow.vue';
import KsActionMenu from './components/KsActionMenu.vue';
import KsAutocomplete from './components/KsAutocomplete.vue';
import KsButton from './components/KsButton.vue';
import KsCalendar from './components/KsCalendar.vue';
import KsCheckbox from './components/KsCheckbox.vue';
import KsCheckboxGroup from './components/KsCheckboxGroup.vue';
import KsDatepicker from './components/KsDatepicker.vue';
import KsDraggable from './components/KsDraggable.vue';
import KsDroppable from './components/KsDroppable.vue';
import KsLoaderLine from './components/KsLoaderLine.vue';
import KsLoaderSpin from './components/KsLoaderSpin.vue';
import KsModal from './components/KsModal.vue';
import KsPaginator from './components/KsPaginator.vue';
import KsRadio from './components/KsRadio.vue';
import KsRadioGroup from './components/KsRadioGroup.vue';
import KsSelect from './components/KsSelect.vue';
import KsSideNav from './components/KsSideNav.vue';
import KsSimplePaginator from './components/KsSimplePaginator.vue';
import KsStepThrough from './components/KsStepThrough.vue';
import KsTab from './components/KsTab.vue';
import KsTabs from './components/KsTabs.vue';
import KsTimepicker from './components/KsTimepicker.vue';
import KsToast from './components/KsToast.vue';
import KsTooltip from './components/KsTooltip.vue';
import KsTopNav from './components/KsTopNav.vue';
import API from './helpers/api';
import * as animations from './components/transitions/Transitions';
import * as strings from './helpers/strings';

if (process.env.BUILD === 'production') {
    require('./styles/app.scss');
}

const Kickstart = {
    KsAccordion,
    KsAccordionRow,
	KsActionMenu,
	KsAutocomplete,
	KsButton,
	KsCalendar,
	KsCheckbox,
    KsCheckboxGroup,
	KsDatepicker,
    KsDraggable,
    KsDroppable,
	KsLoaderLine,
	KsLoaderSpin,
	KsModal,
    KsPaginator,
	KsRadio,
	KsRadioGroup,
	KsSelect,
    KsSideNav,
    KsSimplePaginator,
    KsStepThrough,
	KsTab,
    KsTabs,
    KsTimepicker,
    KsToast,
    KsTooltip,
    KsTopNav,
	install(Vue) {
        function open(propsData) {
            const Toast = Vue.extend(KsToast);

            return new Toast({
                el: document.createElement('div'),
                propsData
            })
        }

		Vue.api = API;
		Vue.toast = function(params) {
			let message;

			if ( typeof params === 'string' ) {
				message = params;
			}

			return open(Object.assign({
				message
			}, params))
		};

        Vue.component('ks-accordion', KsAccordion);
        Vue.component('ks-accordion-row', KsAccordionRow);
        Vue.component('ks-action-menu', KsActionMenu);
        Vue.component('ks-autocomplete', KsAutocomplete);
        Vue.component('ks-button', KsButton);
        Vue.component('ks-calendar', KsCalendar);
        Vue.component('ks-checkbox', KsCheckbox);
        Vue.component('ks-checkbox-group', KsCheckboxGroup);
        Vue.component('ks-datepicker', KsDatepicker);
        Vue.component('ks-draggable', KsDraggable);
        Vue.component('ks-droppable', KsDroppable);
        Vue.component('ks-loader-line', KsLoaderLine);
        Vue.component('ks-loader-spin', KsLoaderSpin);
        Vue.component('ks-modal', KsModal);
        Vue.component('ks-paginator', KsPaginator);
        Vue.component('ks-radio', KsRadio);
        Vue.component('ks-radio-group', KsRadioGroup);
        Vue.component('ks-select', KsSelect);
        Vue.component('ks-side-nav', KsSideNav);
        Vue.component('ks-simple-paginator', KsSimplePaginator);
        Vue.component('ks-step-through', KsStepThrough);
        Vue.component('ks-tab', KsTab);
        Vue.component('ks-tabs', KsTabs);
        Vue.component('ks-timepicker', KsTimepicker);
        Vue.component('ks-tooltip', KsTooltip);
        Vue.component('ks-top-nav', KsTopNav);

		for ( let i in animations ) {
			Vue.component(i, animations[i]);
		}

		// Filters
        Vue.filter('escapeRegExp', function (value) {
            return strings.escapeRegExp(value);
        });
        Vue.filter('ucwords', function (value) {
            return strings.ucwords(value);
        });
        Vue.filter('posesses', function (value) {
            return strings.posesses(value);
        });
        Vue.filter('currency', function (value, symbol = '$') {
            return strings.currency(value, symbol);
        });
        Vue.filter('pad_left', function (value, pad_width, pad_length) {
            return strings.pad_left(value, pad_width, pad_length);
        });
        Vue.filter('ellipsis', function (value, max_length = 20) {
            return strings.ellipsis(value, max_length);
        });

		Object.defineProperties(Vue.prototype, {
			'$api': {
				get() { return Vue.api }
			},
			'$toast': {
				get() { return Vue.toast }
			}
		})
	}
};

export default Kickstart;

export {
    KsAccordion,
    KsAccordionRow,
    KsActionMenu,
    KsAutocomplete,
    KsButton,
    KsCalendar,
    KsCheckbox,
    KsCheckboxGroup,
    KsDatepicker,
    KsDraggable,
    KsDroppable,
    KsLoaderLine,
    KsLoaderSpin,
    KsModal,
    KsPaginator,
    KsRadio,
    KsRadioGroup,
    KsSelect,
    KsSideNav,
    KsSimplePaginator,
    KsStepThrough,
    KsTab,
    KsTabs,
    KsTimepicker,
    KsToast,
    KsTooltip,
    KsTopNav,
};