<template>
	<div>
		<h2>Select</h2>
		<p>with autocomplete and pagination</p>
		<ks-select
			name="code"
			label-key="name"
			v-model="country_code"
			:paginated="true"
		    @search="runSearch"
		>
			<template scope="props">
				{{props.item.name}}
			</template>
		</ks-select>

		<h2>Select</h2>
		<ks-select
			name="code"
			:items="countries"
			label-key="name"
		    v-model="country_code2"
		>
			<template scope="props">
				{{props.item.name}}
			</template>
		</ks-select>
	</div>
</template>


<script>
	import KsSelect from '../../src/components/KsSelect.vue';
	import api from '../../src/helpers/api';

	export default {
		name: 'PageKsSelect',

		props: {},

		data() {
			return {
				countries: [],
				country_code: '',
				country_code2: '',
			};
		},

		computed: {},

		mounted() {
			api.get('/countries.json').then((data) => {
				this.countries = data;
			});
		},

		methods: {
			runSearch({term, callback, page}) {
				api.get(`/countries?q=${term}&page=${page}`).then((data) => {
					callback(data);
				}).catch((error) => {
					callback([]);
				})
			}
		},

		watch: {},

		components: {
			KsSelect
		}
	}
</script>

<style></style>
