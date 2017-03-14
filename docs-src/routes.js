import PageKsAutocomplete from './pages/PageKsAutocomplete.vue';
import PageKsTabs from './pages/PageKsTabs.vue';
import PageKsModal from './pages/PageKsModal.vue';
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
		path: '/ks-styles',
		component: StylesPage,
		name: 'KsStyles',
		meta: { title: 'Kickstart Styles'}
	}
];

export default routes;
