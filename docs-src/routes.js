import PageKsAutocomplete from './pages/PageKsAutocomplete.vue';

const routes = [
	{
		path: '/',
		redirect: '/ks-autocomplete'
	},
	{
		path: '/ks-autocomplete',
		component: PageKsAutocomplete,
		meta: { title: 'Kickstart Autocomplete' }
	}
];

export default routes;
