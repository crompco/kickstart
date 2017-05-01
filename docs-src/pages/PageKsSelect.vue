<template>
	<div class="sm-full">
		<h2>Select</h2>
        <div class="basic-block">

            <p>Autocomplete and pagination</p>
            <div class="form-group">
                <div class="label">
                    Country
                </div>
                <ks-select
                    name="code"
                    label-key="name"
                    v-model="country"
                    :paginated="true"
                    @search="runSearch"
                >
                    <template scope="props">
                        {{props.item.name}}
                    </template>
                </ks-select>
            </div>
            <p>Plan select</p>
            <div class="form-group">
                <div class="label">Country</div>
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
        </div>

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
				country: '',
				country_code2: 'AW',
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
