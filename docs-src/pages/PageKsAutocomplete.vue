<template>
	<div>
		<h2>
			AutoComplete
		</h2>
		<ks-autocomplete
			@search="runSearch"
		>
			<template scope="props">
				{{props.item.name}}
			</template>
		</ks-autocomplete>
	</div>
</template>


<script>
	import api from '../../src/helpers/api';
	import KsAutocomplete from '../../src/components/KsAutocomplete.vue';
	import {escapeRegExp} from '../../src/helpers/strings';

	export default {
		name: 'PageKsAutocomplete',

		props: {},

		data() {
			return {};
		},

		computed: {},

		mounted() {

		},

		methods: {
			runSearch({term, callback}) {
				let name_regex = new RegExp('^.*' + escapeRegExp(term) + '.*', 'i');
				api.get('/countries.json').then((data) => {

					let results = data.filter((o) => {
						return o.name.match(name_regex) ? true : false;
					});

					callback(results);
				}).catch((error) => {
					console.log('error', error);
					callback([]);
				})
			}
		},

		watch: {},

		components: {
            KsAutocomplete
		}
	}
</script>
