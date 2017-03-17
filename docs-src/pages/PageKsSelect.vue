<template>
	<div>
		<h2>Select</h2>
		<ks-select
			name="code"
			:items="countries"
			label-key="name"
		    v-model="country_code"
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
				country_code: ''
			};
		},

		computed: {},

		mounted() {
			api.get('/countries.json').then((data) => {
				this.countries = data;
			});
		},

		methods: {
			runSearch({term, callback}) {

			}
		},

		watch: {},

		components: {
			KsSelect
		}
	}
</script>

<style></style>
