<template>
	<div>
		<h2>
			AutoComplete
		</h2>
		<div class="callout">
			<h3>Ajax with pagination</h3>
			<ks-autocomplete
				selection-key="name"
				@search="runSearch"
			    :paginated="true"
			>
				<template scope="props">
					{{props.item.name}}
				</template>
			</ks-autocomplete>
		</div>

		<div class="callout">
			<h3>Passed items</h3>
			<ks-autocomplete
				:items="countries"
				selection-key="name"
			>
				<template scope="props">
					{{props.item.name}}
				</template>
			</ks-autocomplete>
		</div>

		<div class="callout">
			<h3>Multiple Selections with custom template</h3>
			<ks-autocomplete
				:items="countries"
				selection-key="name"
				:multiple="true"
				@search="runSearch"
			>
				<template scope="props">
					<strong>{{props.item.name}}</strong> <em>{{props.item.code}}</em>
				</template>
			</ks-autocomplete>
		</div>

		<div class="callout">
			<h3>Multiple Selections with taggable (add new, minSearch of 0)</h3>
			<ks-autocomplete
				:min-search="0"
				:taggable="true"
				selection-key="name"
				:paginated="true"
				@search="runSearch"
			>
				<template scope="props">
					<strong>{{props.item.name}}</strong> <em>{{props.item.code}}</em>
				</template>
			</ks-autocomplete>
		</div>

		<div style="height: 1200px;">
			<!-- Force the page to get taller to test the scrolling-->
		</div>

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
			return {
				countries: []
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
            KsAutocomplete
		}
	}
</script>
