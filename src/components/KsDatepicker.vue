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
               :disabled="disabled"
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
                selector-height="auto"
                :week-height="'2rem'"
                @select="selectDay"
            ></ks-calendar>
        </div>
    </div>
</template>

<script>

    import KsCalendar from './KsCalendar.vue';
    import {formatDate, parseDate} from '../helpers/dates';
    import {smartFocusToggle, removeSmartFocusToggle} from '../helpers/events';

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
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                focus_toggle_event: null,
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

        beforeDestroy() {
            if ( this.focus_toggle_event ) {
                removeSmartFocusToggle(this.focus_toggle_event);
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.focus_toggle_event = smartFocusToggle(this.$el, this.handleFocusToggle, 50);
                this.input_date = this.display_date;
            });
            this.calendar_date = this.value_date;
        },

        methods: {
            selectDay(day) {
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
            },
            isDayInScope(date) {
                if ( !(date instanceof Date) ) {
                    date = parseDate(date);
                }

                // Ask the calendar to run the logic to check for a valid day
                return this.$refs.calendar.isDayInScope(date);
            },
            handleFocusToggle(focus, e) {
                this.focused = focus;
            },
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
            is_open() {
                // Reset the calendar when the datepicker is closed
                if ( !this.is_open ) {
                    this.$refs.calendar.closeMonth();
                    this.$refs.calendar.closeYear();
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
                    let input = formatDate(this.input_date, this.dateFormat, this.displayFormat);

                    // Before setting the date we need to make sure it is in the scope
                    if ( !this.isDayInScope(input) ) {
                        // Emit an input error in case the consumer wants to provide user feedback
                        this.$emit('input-error', input, "Out of scope date");

                        // Emit the original value back to prevent the change
                        this.$emit('input', this.value_date);

                        // Reset the input date back to it's original value
                        this.input_date = formatDate(this.value_date, this.displayFormat, this.dateFormat);

                        return;
                    }

                    // Make sure we aren't emitting a duplicate. On initial load when we set the value this can happen
                    let new_date = formatDate(this.input_date, this.dateFormat, this.displayFormat);
                    if ( this.value_date != new_date ) {
                        this.$emit('input', new_date);
                    }
                } else if ( this.input_date.length == '0' ) {
                    // clear
                    this.$emit('input', '');
                }
            }
        },

        components: {
            KsCalendar,
        }
    }
</script>
