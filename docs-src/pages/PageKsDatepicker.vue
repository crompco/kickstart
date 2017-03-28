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
				<h3>Custom Date format with year picker</h3>
				<ks-datepicker
					v-model="date2"
					:year-picker="true"
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


		<ks-tabs>
			<ks-tab title="Props">
				<table class="table striped">
					<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
					</thead>
					<tbody>
						<tr>
							<td>value <span class="v-model">v-model</span></td>
							<td><pre>String, Date</pre></td>
							<td><pre>NULL</pre></td>
							<td>
								The v-model binded prop on the datepiker. Should be provided via v-model.
								If only the prop is sent then you would need to listen for the input
								event to update the prop
							</td>
						</tr>
						<tr>
							<td>dateFormat</td>
							<td><pre>String</pre></td>
							<td><pre>Y-m-d</pre></td>
							<td>Format for the date value being binded to the v-model. All formats should include a single 'Y', 'm', 'd'</td>
						</tr>
						<tr>
							<td>displayFormat</td>
							<td><pre>String</pre></td>
							<td><pre>m/d/Y</pre></td>
							<td>Format for the date being displayed in the input. All formats should include a single 'Y', 'm', 'd'</td>
						</tr>
						<tr>
							<td>name</td>
							<td><pre>String</pre></td>
							<td><pre>ks_datepicker</pre></td>
							<td>The name of the input field</td>
						</tr>
					</tbody>
				</table>
			</ks-tab>

			<ks-tab title="Events">
				<table class="table striped events-table">
					<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
					</tr>
					</thead>
					<tbody>
						<tr>
							<td><pre>input</pre></td>
							<td>This is fired when the value is changed</td>
						</tr>
						<tr>
							<td><pre>calendar_change</pre></td>
							<td>Fired when the calendar is being controlled. For instance the month/year is changed</td>
						</tr>
						<tr>
							<td><pre>open</pre></td>
							<td>Fired when the datepicker calendar is opened</td>
						</tr>
						<tr>
							<td><pre>close</pre></td>
							<td>Fired when the datepicker calendar is closed</td>
						</tr>
					</tbody>
				</table>
			</ks-tab>

			<ks-tab title="Methods">
				<table class="table striped methods-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><pre>open()</pre></td>
							<td>Used to open the datepicker calendar selector</td>
						</tr>
						<tr>
							<td><pre>close()</pre></td>
							<td>Used to close the datepicker calendar selector</td>
						</tr>
					</tbody>
				</table>
			</ks-tab>
		</ks-tabs>

	</div>
</template>


<script>
	import KsDatepicker from '../../src/components/KsDatepicker.vue';
	import KsTabs from '../../src/components/KsTabs.vue';
	import KsTab from '../../src/components/KsTab.vue';

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
			KsDatepicker,
			KsTabs,
			KsTab
		},
	}
</script>

<style></style>
