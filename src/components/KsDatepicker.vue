<template>
	<div class="ks-datepicker">
		<!-- value field-->
		<input type="hidden" :name="name" :value="value">

		<!-- Display field-->
		<input class="ks-datepicker-display"
		       :value="display_date"
		       @focus="open"
		       @keyup.esc="isOpen=false"
		       ref="display"
		>

		<!-- Calendar -->
		<div class="ks-datepicker-cal" v-show="show">
			<ks-calendar
				:date="value"
				week-height="30px"
			    @select="selectDay"
			></ks-calendar>
		</div>
	</div>
</template>

<script>

	import KsCalendar from './KsCalendar.vue';
	import {formatDate} from '../helpers/dates';
	import {addEvent} from '../helpers/events';

	export default {
		name: 'KsDatepicker',

		props: {
			value: {},
			dateFormat: {
				type: String,
				default: 'Y-m-d'
			},
			displayFormat: {
				type: String,
				default: 'm/d/Y'
			},
			name: {
				type: String,
				default: "ks_datepicker"
			}
		},

		data() {
			return {
				isOpen: false,
				focused: false
			}
		},

		computed: {
			display_date() {
				if ( this.value ) {
					return formatDate(this.value, this.displayFormat);
				}

				return '';
			},
			show() {
				return this.isOpen;
			},
			value_date() {
				if ( this.value ) {
					return formatDate(this.value, this.dateFormat);
				}

				return '';
			}
		},

		mounted() {
			addEvent(this.$refs.display, 'focus', () => {
				this.focused = true;
			});

			addEvent(this.$refs.display, 'blur', () => {
				setTimeout(() => {
					if ( this.$refs[this.ref_lookup] !== document.activeElement ) {
						this.$emit('blur');
						this.focused = false;
						if ( this.closeOnBlur ) {
							this.clear();
						}
					}
				}, 200);
			});
		},

		methods: {
			selectDay(day) {
				this.$emit('input', formatDate(day, this.dateFormat));
				this.isOpen = false;
			},
			open() {
				this.isOpen = true;
			}
		},

		components: {
			KsCalendar
		}
	}
</script>
