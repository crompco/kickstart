<template>
	<div class="ks-radio-group" :class="classNames">
		<label class="ks-radio-group-title label">
			<slot>{{label}}</slot>
		</label>
		<div class="radio">
			<template v-for="option in optionsList">
				<ks-radio
					:name="name"
					:value="option.value"
					v-model="selectedValue"
					:label="option.label"
				></ks-radio>
			</template>
		</div>
	</div>
</template>


<script>
	import KsRadio from './KsRadio.vue';

	export default {
		name: 'KsRadioGroup',

		model: {
			prop: 'value'
		},

		props: {
			value: {},
			label: String,
			name: {
				type: String,
				required: true
			},
			classNames: String,
			options: {},
			valueKey: {
				type: String,
				default: ''
			},
			labelKey: {
				type: String,
				default: 'label'
			},
		},

		data() {
			return {

				selectedValue: this.value
			};
		},

		computed: {
			hasObjects() {
				for ( var i in this.options ) {
					if ( this.options[i] instanceof Object ) {
						return true;
					}
					return false;
				}
			},
			optionsList() {
				let optionsList = [];
				for ( var i in this.options ) {
					if ( this.hasObjects ) {
						if ( this.valueKey.length ||  this.labelKey.length ) {
							optionsList.push({
								value: this.options[i][this.valueKey],
								label: this.options[i][this.labelKey]
							});
						} else {
							if ( !this.options[i].hasOwnProperty('value') || !this.options[i].hasOwnProperty('value') ) {
								return [];
							}
							optionsList.push(this.options[i]);
						}
					} else {

						optionsList.push({
							value: this.options[i],
							label: this.options[i]
						});
					}
				}

				return optionsList;
			}
		},

		mounted() {

		},

		methods: {},

		watch: {
			selectedValue() {
				this.$emit('input', this.selectedValue);
				this.$emit('change', this.selectedValue);
			},
			value() {
				this.selectedValue = this.value;
			}
		},

		components: {
			KsRadio
		}
	}
</script>

<style></style>
