<template>
	<div>
		<div class="basic-block row">
			<div class="med-6">
				<h3>Simple Datepicker</h3>
				<ks-datepicker
					v-model="date1"
				></ks-datepicker>
			</div>

			<div class="med-6">
				<pre>
					<strong>v-model</strong>
					{{date1}}
				</pre>
			</div>
		</div>

		<div class="basic-block row">
			<div class="med-6">
				<h3>Custom Dateformat</h3>
				<ks-datepicker
					v-model="date2"
					date-format="m/d/Y"
				></ks-datepicker>
			</div>

			<div class="med-6">
				<pre>
					<strong>v-model</strong>
					{{date2}}
				</pre>
			</div>
		</div>

	</div>
</template>


<script>
	import KsDatepicker from '../../src/components/KsDatepicker.vue';

	export default {
		name: 'PageKsDatepicker',

		props: {},

		data() {
			return {
				date1: '2017-01-01',
				date2: '02/21/2017'
			};
		},

		computed: {},

		mounted() {

		},

		methods: {},

		components: {
			KsDatepicker
		},
	}
</script>

<style></style>
