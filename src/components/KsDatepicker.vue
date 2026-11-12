<template>
    <div
        class="ks-datepicker"
        @keyup.esc="close"
    >
        <!-- value field-->
        <input
            type="hidden"
            :name="name"
            :value="value_date"
        >

        <!-- Display field-->
        <input
            ref="display"
            type="text"
            :value="input_date"
            :disabled="disabled"
            class="ks-datepicker-display"
            @input="onDisplayInput"
            @focus="open"
        >

        <!-- Calendar -->
        <div
            v-show="show"
            ref="dropdown"
            class="ks-datepicker-cal"
        >
            <ks-calendar
                ref="calendar"
                v-model="calendar_date"
                :format="dateFormat"
                :timezone="timezone"
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
    import FloatingDropdown from './mixins/FloatingDropdown';
    import { UTC, defaultLocale, formatDate } from '../helpers/dates';
    import { smartFocusToggle, removeSmartFocusToggle } from '../helpers/events';
    import { applyMask, dateMask } from '../helpers/mask';

    export default {
        name: 'KsDatepicker',

        mixins: [FloatingDropdown],

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
            // Time zone that a Date value is read in: 'UTC', 'local' or an IANA name
            timezone: {
                type: String,
                default: UTC
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

        emits: ['input', 'input-error', 'open', 'close', 'calendar_change'],

        data() {
            return {
                focus_toggle_event: null,
                is_open: false,
                focused: false,
                input_date: '',
                calendar_date: '',
            };
        },

        computed: {
            display_date() {
                return this.value ? this.format(this.value, this.displayFormat, this.dateFormat) : '';
            },
            mask() {
                return dateMask(this.displayFormat);
            },
            show() {
                return this.is_open;
            },
            value_date() {
                return this.value ? this.format(this.value, this.dateFormat, this.dateFormat) : '';
            }
        },

        beforeMount() {
            this.input_date = this.display_date;
            this.calendar_date = this.value_date;
        },

        mounted() {
            this.focus_toggle_event = smartFocusToggle(this.$el, this.handleFocusToggle, 50);

            // An empty value is normalized to '' after mount, so a v-model binding can react to it.
            // The next tick also catches a value that the parent empties while it mounts.
            this.$nextTick(() => {
                if ( !this.value && this.value !== '' ) {
                    this.$emit('input', '');
                }
            });
        },

        beforeDestroy() {
            this.teardown();
        },

        beforeUnmount() {
            this.teardown();
        },

        methods: {
            teardown() {
                if ( this.focus_toggle_event ) {
                    removeSmartFocusToggle(this.focus_toggle_event);
                    this.focus_toggle_event = null;
                }
            },
            format(date, format, parse_format) {
                return formatDate(date, format, parse_format, defaultLocale, this.timezone);
            },
            onDisplayInput(e) {
                const masked = applyMask(e.target.value, this.mask);

                if ( e.target.value !== masked ) {
                    e.target.value = masked;
                }

                this.input_date = masked;
            },
            selectDay(day) {
                this.$emit('input', day);
                this.close();
            },
            open() {
                this.calendar_date = this.value_date;
                this.is_open = true;
                this.$emit('open');
            },
            close() {
                if ( this.is_open ) {
                    this.is_open = false;
                    this.$emit('close');
                }
            },
            isDayInScope(date) {
                // Ask the calendar to run the logic to check for a valid day
                return this.$refs.calendar.isDayInScope(date);
            },
            handleFocusToggle(focus) {
                this.focused = focus;
            },
        },

        watch: {
            calendar_date() {
                this.$emit('calendar_change', this.calendar_date);
            },
            focused() {
                if ( !this.focused ) {
                    this.close();
                }
            },
            is_open() {
                // Reset the calendar when the datepicker is closed
                if ( !this.is_open ) {
                    this.stopDropdown();
                    this.$refs.calendar.closeMonth();
                    this.$refs.calendar.closeYear();
                    return;
                }

                // The calendar keeps its own width; it is wider than most inputs
                this.$nextTick(() => this.startDropdown(this.$el, this.$refs.dropdown, { matchWidth: false }));
            },
            value_date() {
                this.calendar_date = this.value_date;
            },
            display_date() {
                this.input_date = this.display_date;
            },
            input_date() {
                if ( this.input_date.length == this.mask.length ) {
                    const new_date = this.format(this.input_date, this.dateFormat, this.displayFormat);

                    if ( !new_date ) {
                        return;
                    }

                    // Before setting the date we need to make sure it is in the scope
                    if ( !this.isDayInScope(new_date) ) {
                        // Emit an input error in case the consumer wants to provide user feedback
                        this.$emit('input-error', new_date, "Out of scope date");

                        // Emit the original value back to prevent the change
                        this.$emit('input', this.value_date);

                        // Reset the input date back to it's original value
                        this.input_date = this.display_date;

                        return;
                    }

                    // Make sure we aren't emitting a duplicate. On initial load when we set the value this can happen
                    if ( this.value_date != new_date ) {
                        this.$emit('input', new_date);
                    }
                } else if ( this.input_date.length == 0 && this.value !== '' ) {
                    this.$emit('input', '');
                }
            }
        },

        components: {
            KsCalendar,
        }
    }
</script>
