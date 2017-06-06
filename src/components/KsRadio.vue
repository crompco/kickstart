<template>
	<label class="ks-radio" :class="classStates" @click.stop="toggle">
		<input
			type="radio"
			:name="name"
			:value="value"
			:checked="isChecked"
		>
		<div class="ks-radio-input-wrapper">
			<span class="radio-check"></span>
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
			},
			inline: {
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
					"ks-state-active": this.isChecked,
					"inline": this.inline
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
			    if ( this.checked != this.value ) {
                    this.$emit('input', this.value);
                }
			},
		},
	}
</script>
