<template>
	<div class="ks-datepicker" @keyup.esc="is_open=false">
		<!-- value field-->
		<input type="hidden" :name="name" :value="value">

		<!-- Display field-->
		<input class="ks-datepicker-display"
			   v-model="input_date"
			   v-mask="mask"
		       @focus="open"
		       ref="display"
               type="text"
		>

		<!-- Calendar -->
		<div class="ks-datepicker-cal" v-show="show">
			<ks-calendar
				ref="calendar"
				v-model="calendar_date"
				:format="dateFormat"
				:selection="value_date"
                :year-picker="yearPicker"
                :month-picker="monthPicker"
				:interactive="true"
                :min-date="minDate"
                :max-date="maxDate"
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
			name: {
				type: String,
				default: "ks_datepicker"
			},
			dateFormat: {
				type: String,
				default: 'Y-m-d'
			},
			displayFormat: {
				type: String,
				default: 'm/d/Y'
			},
            minDate: {},
            maxDate: {},
			yearPicker: {
				type: Boolean,
				default: false
			},
			monthPicker: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				is_open: false,
				focused: false,
				input_date: this.display_date,
				calendar_date: this.value_date,
				calendar_focused: false
			}
		},

		computed: {
			display_date() {
				if ( this.value ) {
					return formatDate(this.value, this.displayFormat, this.dateFormat);
				}

				return '';
			},
			mask() {
			    return this.displayFormat.replace('m', '##').replace('Y', '####').replace('d', '##');
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
				}, 50);
				this.input_date = this.display_date;
			});
			this.calendar_date = this.value_date;
		},

		methods: {
			selectDay(day) {
			    console.log(day);
				this.$emit('input', formatDate(day, this.dateFormat));
				this.is_open = false;
			},
			open() {
				this.calendar_date = this.value_date;
				this.is_open = true;
				this.$emit('open');
			},
			close() {
				this.is_open = false;
				this.$emit('close');
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
			},
			value_date() {
			    this.calendar_date = this.value_date;
			},
			display_date() {
			    this.input_date = this.display_date;
			},
			input_date() {
			    if ( this.input_date.length == this.mask.length ) {
                    this.$emit('input', formatDate(this.input_date, this.dateFormat, this.displayFormat));
				}
			}
		},

		components: {
			KsCalendar,
		}
	}
</script>
