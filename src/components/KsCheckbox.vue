<template>
	<label class="ks-checkbox checkbox" :class="classStates">
		<div class="ks-checkbox-input-wrapper">
			<input
				type="checkbox"
			    :name="name"
			    :value="value"
				@change="change"
			    :checked="isChecked"
			>
		</div>
		<div class="ks-checkbox-label-wrapper">
			<slot>{{label}}</slot>
		</div>
	</label>
</template>


<script>
	export default {
		name: 'KsCheckbox',

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
				if ( Array.isArray(this.selectedValue) ) {
					this.isChecked =  -1 !== this.selectedValue.indexOf(this.value) ? true : false;
				}

				this.isChecked = String(this.value) == String(this.selectedValue);
			},
			change(e) {
				this.isChecked = e.target.checked;
				this.$emit('changed', this.isChecked, this.value);
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
	.ks-checkbox {
		> div {
			display: inline-block;
		}
		&.ks-state-active {
			background: darkblue;
			color: white;
		}
	}

</style>
