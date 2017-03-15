<template>
	<label class="ks-checkbox checkbox" :class="classStates">
		<div class="ks-checkbox-input-wrapper">
			<input
				type="checkbox"
			    :name="name"
			    :value="value"
			    :checked="isChecked"
			    @change="change"
				@click="toggle"
			>
		</div>
		<div class="ks-checkbox-label-wrapper">
			<slot>{{label}}</slot>
		</div>
	</label>
</template>


<script>
	import {looseIndexOf} from '../helpers/objects';

	export default {
		name: 'KsCheckbox',

		model: {
			prop: 'checked',
			event: 'input'
		},

		props: {
			name: String,
			label: String,
			value: {},
			checked: {
				type: [String, Array]
			},
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
				if ( Array.isArray(this.checked) ) {
					this.isChecked =  -1 !== looseIndexOf(this.checked, this.value) ? true : false;
					return;
				}

				this.isChecked = String(this.value) == String(this.checked);
			},
			toggle(e) {
				this.isChecked = e.target.checked;

				if ( this.isChecked ) {
					this.$emit('input', this.addValue(this.checked));
				} else {
					this.$emit('input', this.removeValue(this.checked));
				}
			},
			change(e) {
				this.$emit('change', this.isChecked, e);
			},
			removeValue(checked) {
				let index = looseIndexOf(checked, this.value);
				if ( index >= 0 ) {
					checked.splice(index, 1)
				}

				return checked;
			},
			addValue(checked) {
				if ( checked instanceof Array ) {
					checked.push(this.value);
					return checked;
				}

				return String(this.value);
			}
		},

		watch: {
			checked() {
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
