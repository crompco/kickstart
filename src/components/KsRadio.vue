<template>
	<label class="ks-radio radio" :class="classStates" @click="toggle">
		<div class="ks-radio-input-wrapper">
			<input
				type="radio"
			    :name="name"
			    :value="value"
			    :checked="isChecked"
			>
		</div>
		<div class="ks-radio-label-wrapper" v-if="label.length">
			<slot>{{label}}</slot>
		</div>
	</label>
</template>


<script>
	export default {
		name: 'KsRadio',

		model: {
			prop: 'checked',
			event: 'input'
		},

		props: {
			name: String,
			label: {
				type: String,
				default: ''
			},
			value: {},
			checked: {},
			disabled: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
			};
		},

		computed: {
			classStates() {
				return {
					"ks-state-active": this.isChecked
				}
			},
			isChecked() {
				return String(this.checked) == String(this.value);
			}
		},

		mounted() {
		},

		methods: {
			toggle() {
				this.$emit('input', this.value);
			},
		},

		watch: {
			selectedValue() {
				this.refreshChecked();
			}
		},
	}
</script>

<style lang="scss">
	.ks-radio {
		> div {
			display: inline-block;
		}
		&.ks-state-active {
			background: darkblue;
			color: white;
		}
	}

</style>
