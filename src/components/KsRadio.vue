<template>
	<label class="ks-radio radio" :class="classStates">
		<div class="ks-radio-input-wrapper">
			<input
				type="radio"
			    :name="name"
			    :value="value"
				@change="change"
			    :checked="isChecked"
			>
		</div>
		<div class="ks-radio-label-wrapper">
			<slot>{{label}}</slot>
		</div>
	</label>
</template>


<script>
	export default {
		name: 'KsRadio',

		props: {
			name: String,
			label: String,
			value: {},
			selectedValue: {},
			disabled: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				isChecked: false
			};
		},

		computed: {
			classStates() {
				return {
					"ks-state-active": this.isChecked
				}
			}
		},

		mounted() {
			this.refreshChecked();
		},

		methods: {
			refreshChecked() {
				this.isChecked = String(this.value) == String(this.selectedValue);
			},
			change(e) {
				this.isChecked = e.target.checked;
				this.$emit('changed', this.value);
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
