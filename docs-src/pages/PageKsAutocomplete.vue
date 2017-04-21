<template>
	<div>
		<h2>
			AutoComplete
		</h2>
		<div class="basic-block">
			<h3>Ajax with pagination</h3>
			<ks-autocomplete
				selection-key="name"
				v-model="value1"
				@search="runSearch"
			    :paginated="true"
			>
				<template scope="props">
					{{props.item.name}}
				</template>
			</ks-autocomplete>
		</div>

		<div class="basic-block">
			<h3>Passed items</h3>
			<ks-autocomplete
				:items="countries"
				selection-key="name"
				v-model="value2"
			>
				<template scope="props">
					{{props.item.name}}
				</template>
			</ks-autocomplete>
		</div>

		<div class="basic-block">
			<h3>Multiple Selections with custom template</h3>
			<ks-autocomplete
				:items="countries"
				selection-key="name"
				:multiple="true"
				v-model="value3"
				@search="runSearch"
			>
				<template scope="props">
					<strong>{{props.item.name}}</strong> <em>{{props.item.code}}</em>
				</template>
			</ks-autocomplete>
		</div>

		<div class="basic-block">
			<h3>Multiple Selections with taggable (add new, minSearch of 0)</h3>
			<ks-autocomplete
				:min-search="0"
				:taggable="true"
				selection-key="name"
				v-model="value4"
				:paginated="true"
				:show-tag-in-list="true"
				@search="runSearch"
			>
				<template scope="props">
					<strong>{{props.item.name}}</strong> <em>{{props.item.code}}</em>
				</template>
			</ks-autocomplete>
		</div>

		<!--<div class="callout">-->
			<ks-tabs>
				<ks-tab title="Props">
					<p>
						Todo...
					</p>
				</ks-tab>
				<ks-tab title="Events">
					<p>
						Todo...
					</p>
				</ks-tab>
				<ks-tab title="Methods">
					<p>
						Todo...
					</p>
				</ks-tab>
			</ks-tabs>
		<!--</div>-->

		<div style="height: 1200px;">
			<!-- Force the page to get taller to test the scrolling-->
		</div>

	</div>
</template>


<script>
	import api from '../../src/helpers/api';
	import KsAutocomplete from '../../src/components/KsAutocomplete.vue';
	import KsTabs from '../../src/components/KsTabs.vue';
	import KsTab from '../../src/components/KsTab.vue';
	import {escapeRegExp} from '../../src/helpers/strings';

	export default {
		name: 'PageKsAutocomplete',

		props: {},

		data() {
			return {
				value1:'',
				value2: '',
				value3: '',
				value4: '',
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
            KsAutocomplete,
			KsTabs,
			KsTab
		}
	}
</script>
