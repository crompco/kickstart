<template>
	<div class="ks-datepicker" @keyup.esc="is_open=false">
		<!-- value field-->
		<input type="hidden" :name="name" :value="value">

		<!-- Display field-->
		<input class="ks-datepicker-display"
		       :value="display_date"
		       @focus="open"
		       ref="display"
		>

		<!-- Calendar -->
		<div class="ks-datepicker-cal" v-show="show">
			<ks-calendar
				ref="calendar"
				v-model="calendar_date"
				week-height="30px"
			    @select="selectDay"
			></ks-calendar>
		</div>
	</div>
</template>

<script>

	import KsCalendar from './KsCalendar.vue';
	import {formatDate} from '../helpers/dates';
	import {addEvent, smartFocusToggle} from '../helpers/events';

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
				is_open: false,
				focused: false,
				calendar_date: this.value,
				calendar_focused: false
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
				return this.is_open;
			},
			value_date() {
				if ( this.value ) {
					return formatDate(this.value, this.dateFormat);
				}

				return '';
			}
		},

		mounted() {

			this.$nextTick(() => {
				smartFocusToggle(this.$el, (focus, e) => {
					this.focused = focus;
				});
			});
		},

		methods: {
			selectDay(day) {
				this.$emit('input', formatDate(day, this.dateFormat));
				this.is_open = false;
			},
			open() {
				this.is_open = true;
			}
		},

		watch: {
			calendar_date() {
				this.$emit('calendar_change', this.calendar_date);
			},
			focused() {
				if ( !this.focused ) {
					this.is_open = false;
				}
			}
		},

		components: {
			KsCalendar
		}
	}
</script>
