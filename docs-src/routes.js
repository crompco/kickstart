import PageKsAutocomplete from './pages/PageKsAutocomplete.vue';
import PageKsTabs from './pages/PageKsTabs.vue';
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
		meta: { title: 'Kickstart Autocomplete' }
	},
	{
		path: '/ks-styles',
		component: StylesPage,
		name: 'KsStyles',
		meta: { title: 'Kickstart Styles'}
	}
];

export default routes;
