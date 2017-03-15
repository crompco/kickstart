<template>
	<div>
		<h2>Form Elements</h2>

		<h3>Radio</h3>
		<div class="form-group">
			<label>Which do you prefer</label>
			<ks-radio label="PHP" name="radio1" value="1" :selected-value="values['radio1']" @changed="change('radio1', $event, 1)"></ks-radio>
			<ks-radio label="JavaScript" name="radio1" value="2" :selected-value="values['radio1']" @changed="change('radio1', $event, 2)"></ks-radio>
		</div>

		<h3>Checkbox</h3>
		<div class="form-group">
			<label>Select all that your enjoy using</label>
			<ks-checkbox label="PHP" name="checkbox1" value="1" :selected-value="values['checkbox1']" @changed="change('checkbox1', $event, 1)"></ks-checkbox>
			<ks-checkbox label="JavaScript" name="checkbox1" value="2" :selected-value="values['checkbox1']" @changed="change('checkbox1', $event, 2)"></ks-checkbox>
		</div>
	</div>
</template>


<script>
	import KsRadio from '../../src/components/KsRadio.vue';
	import KsCheckbox from '../../src/components/KsCheckbox.vue';

	export default {
		name: 'PageKsFormElements',

		props: {},

		data() {

			return {
				values: {
					"radio1": 1,
					"checkbox1": [1]
				}
			};
		},

		computed: {},

		mounted() {

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
			KsCheckbox
		}
	}
</script>

<style></style>
