import PageKsAutocomplete from './pages/PageKsAutocomplete.vue';
import PageKsTabs from './pages/PageKsTabs.vue';
import PageKsModal from './pages/PageKsModal.vue';
import PageKsLoaders from './pages/PageKsLoaders.vue';
import PageKsFormElements from './pages/PageKsFormElements.vue';
import PageKsSelect from './pages/PageKsSelect.vue';
import StylesPage from './pages/StylesPage.vue';

const routes = [
	{
		path: '/',
		name: 'Index',
		redirect: '/ks-autocomplete'
	},
	{
		path: '/ks-autocomplete',
		component: PageKsAutocomplete,
		name: 'KsAutocomplete',
		meta: { title: 'Kickstart Autocomplete' }
	},
	{
		path: '/ks-tabs',
		component: PageKsTabs,
		name: 'KsTabs',
		meta: { title: 'Kickstart Tabs' }
	},
	{
		path: '/ks-modal',
		component: PageKsModal,
		name: 'KsModal',
		meta: { title: 'Kickstart Modal' }
	},
	{
		path: '/ks-forms',
		component: PageKsFormElements,
		name: 'KsForms',
		meta: { title: 'Kickstart Forms' }
	},
	{
		path: '/ks-select',
		component: PageKsSelect,
		name: 'KsSelect',
		meta: { title: 'Kickstart Selects' }
	},
	{
		path: '/ks-loaders',
		component: PageKsLoaders,
		name: 'KsLoaders',
		meta: { title: 'Kickstart Loaders' }
	},
	{
		path: '/ks-styles',
		component: StylesPage,
		name: 'KsStyles',
		meta: { title: 'Kickstart Styles'}
	}
];

export default routes;
