<template>
	<div>
		<h2>Form Elements</h2>

		<h3>Radio</h3>
		<h3>Which do you prefer</h3>
		<ks-radio :inline="true" label="PHP" name="radio1" value="1" v-model="values.radio1"></ks-radio>
		<ks-radio :inline="true" label="JavaScript" name="radio1" value="2" v-model="values.radio1"></ks-radio>

		<div class="form-group">
			<label class="title">Which do you prefer</label>
			<ks-radio :inline="true" label="PHP" name="radio1" value="1" v-model="values.radio1a"></ks-radio>
			<ks-radio :inline="true" label="JavaScript" name="radio1" value="2" v-model="values.radio1a"></ks-radio>
		</div>

		<h3>Select all that your enjoy using (inline)</h3>
		<ks-checkbox :inline="true" label="PHP" name="checkbox1" value="1" v-model="values.checkbox1"></ks-checkbox>
		<ks-checkbox :inline="true" label="JavaScript" name="checkbox1" value="2" v-model="values.checkbox1"></ks-checkbox>

		<div class="form-group" style="margin-top:1em;">
			<label class="label">Select all that your enjoy using</label>
			<div class="checkbox">
				<ks-checkbox label="PHP" name="checkbox1" value="1" v-model="values.checkbox1a"></ks-checkbox>
				<ks-checkbox label="JavaScript" name="checkbox1" value="2" v-model="values.checkbox1a"></ks-checkbox>
			</div>
		</div>

		<h3>Simple Radio Group</h3>
		<ks-radio-group
			class="form-group"
			name="group1"
			:options="['Foo', 'Bar', 'Baz']"
		    v-model="values.group1"
		>
			Some group of options
		</ks-radio-group>

		<h3>Radio Group with array of objects</h3>
		<ks-radio-group
			class="form-group"
			name="group2"
			:options="radioGroup"
			value-key="code"
			label-key="name"
			v-model="values.group2"
		>
			Each option is an object
		</ks-radio-group>

		<h3>Example Form</h3>
		<form>
			<div class="row">
				<div class="tab-full">
					<div class="form-group">
						<div class="label">Username</div>
						<input type="text">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="tab-full">
					<div class="form-group">
						<div class="label">Autocomplete</div>
						<ks-autocomplete></ks-autocomplete>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="tab-half">
					<div class="form-group">
						<div class="label">First Name</div>
						<input type="text">
					</div>
				</div>
				<div class="tab-half">
					<div class="form-group">
						<div class="label">Last Name</div>
						<input type="text">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="tab-half">
					<div class="form-group">
						<div class="label">Password</div>
						<input type="password">
					</div>
				</div>
				<div class="tab-half">
					<div class="form-group">
						<div class="label">Password Confirmation</div>
						<input type="password">
					</div>
				</div>
			</div>
		</form>
	</div>
</template>


<script>
	import KsRadio from '../../src/components/KsRadio.vue';
	import KsRadioGroup from '../../src/components/KsRadioGroup.vue';
	import KsCheckbox from '../../src/components/KsCheckbox.vue';
	import api from '../../src/helpers/api';
	import KsAutocomplete from '../../src/components/KsAutocomplete.vue';

	export default {
		name: 'PageKsFormElements',

		props: {},

		data() {

			return {
				values: {
					group1: '',
					group2: '',
					radio1: 1,
					radio1a: '',
					checkbox1: [1],
					checkbox1a: []
				},
				radioGroup: []
			};
		},

		computed: {},

		mounted() {
			api.get('/countries.json').then((data) => {
				this.radioGroup = data.slice(0, 10);
			});
		},

		methods: {
			change(name, checked, optionValue) {
				if ( name.match(/^checkbox.*/) ) {
					if ( !checked ) {
						this.values[name] = this.values[name].splice(this.values[name].indexOf(optionValue), 1);
					} else {
						this.values[name].push(optionValue);
					}
				} else {
					this.values[name] = checked;
				}
			}
		},

		watch: {},

		components: {
			KsRadio,
			KsRadioGroup,
			KsCheckbox,
            KsAutocomplete
		}
	}
</script>

<style></style>
