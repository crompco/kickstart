import PageKsAutocomplete from './pages/PageKsAutocomplete.vue';
import PageKsTabs from './pages/PageKsTabs.vue';

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
	}
];

export default routes;
