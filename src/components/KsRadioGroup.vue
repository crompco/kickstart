<template>
	<div class="ks-radio-group" :class="classNames">
		<slot>{{label}}</slot>
		<template v-for="option in optionsList">
			<ks-radio
				:name="name"
				:value="option.value"
			    :selected-value="selectedValue"
			    @changed="changed(option)"
			>{{option.label}}</ks-radio>

		</template>
	</div>
</template>


<script>
	import KsRadio from './KsRadio.vue';

	export default {
		name: 'KsRadioGroup',

		props: {
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
			selectedValue: {}
		},

		data() {
			return {
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
					console.log(this.options[i]);
					if ( this.hasObjects ) {
						if ( this.valueKey.length ||  this.labelKey.length ) {
							optionsList.push({
								value: this.options[i][this.valueKey],
								label: this.options[i][this.labelKey]
							});
						} else {
							if ( !this.options[i].hasOwnProperty('value') || !this.options[i].hasOwnProperty('value') ) {
								console.error('Invalid options: must contain value and label keys');
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

		watch: {},

		components: {
			KsRadio
		}
	}
</script>

<style></style>
