<template>
    <div
        class="ks-calendar"
        tabindex="-1"
    >
        <div class="ks-calendar-title">
            <a
                v-if="showControls"
                ref="previous"
                href="#"
                class="ks-ctrl-left"
                @click.prevent="previous"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 2 20 20"
                >
                    <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
                </svg>
            </a>
            <a
                v-if="monthPicker"
                href="#"
                class="ks-calendar-month-picker"
                :class="{ 'ks-open-picker': monthPickerOpen }"
                @click.prevent="toggleMonthPicker"
            >
                {{ month }}
                <down-svg></down-svg>
            </a>
            <span
                v-else
                class="ks-calendar-month-picker"
            >{{ month }}</span>

            <a
                v-if="yearPicker"
                href="#"
                class="ks-calendar-year-picker"
                :class="{ 'ks-open-picker': yearPickerOpen }"
                @click.prevent="toggleYearPicker"
            >
                {{ year }}
                <down-svg></down-svg>
            </a>
            <span
                v-else
                class="ks-calendar-year-picker"
            >{{ year }}</span>

            <a
                v-if="showControls"
                ref="next"
                href="#"
                class="ks-ctrl-right"
                @click.prevent="next"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 2 20 20"
                >
                    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                </svg>
            </a>
        </div>
        <div
            ref="calendar"
            class="ks-calendar-view"
            :class="{ 'interactive': interactive }"
        >
            <div v-show="!yearPickerOpen && !monthPickerOpen">

                <!-- Month -->
                <div class="ks-calendar-month">

                    <!-- Heading -->
                    <div class="ks-cal-week ks-cal-week-header">
                        <div
                            v-for="title in week_titles"
                            :key="title"
                            class="ks-cal-day"
                        >
                            {{ title }}
                        </div>
                    </div>

                    <!-- Weeks -->
                    <div
                        v-for="week in weeks"
                        :key="week[0].key"
                        class="ks-cal-week"
                        :style="week_style"
                    >
                        <template v-for="day in week">
                            <component
                                :is="droppableDays ? 'ks-droppable' : 'div'"
                                v-if="day.in_month"
                                :key="`droppable-${day.key}`"
                                :tabindex="interactive && day.in_scope ? 0 : null"
                                :active-class="droppable_active_class"
                                :inactive-class="droppable_inactive_class"
                                class="ks-cal-day"
                                :class="dayClass(day)"
                                @click.prevent="selectDay(day.date)"
                                @keydown.enter="selectDay(day.date)"
                                @drop.stop="forwardDropEvent(day.date)"
                            >
                                <div>
                                    <div
                                        v-if="interactiveDays"
                                        class="row row-collapse"
                                    >
                                        <a
                                            href="#"
                                            class="ks-day-num"
                                            :class="'ks-date-' + day.key"
                                            @click.prevent.stop="dayClicked(day.date)"
                                        >
                                            {{ day.number }}
                                        </a>
                                    </div>
                                    <span
                                        v-else
                                        class="ks-day-num"
                                        :class="'ks-date-' + day.key"
                                    >{{ day.number }}</span>

                                    <slot :name="day.key"></slot>
                                </div>
                            </component>

                            <component
                                :is="droppableDays ? 'ks-droppable' : 'div'"
                                v-else
                                :key="`droppable-${day.key}`"
                                :active-class="droppable_active_class"
                                :inactive-class="droppable_inactive_class"
                                class="ks-cal-blank"
                                :class="dayClass(day)"
                                @click.prevent="selectDay(day.date)"
                                @drop.stop="forwardDropEvent(day.date)"
                            >
                                <div v-if="showTrailingDays">
                                    <div
                                        v-if="interactiveDays"
                                        class="row row-collapse"
                                    >
                                        <a
                                            href="#"
                                            class="ks-day-num"
                                            :class="'ks-date-' + day.key"
                                            @click.prevent.stop="dayClicked(day.date)"
                                        >
                                            {{ day.number }}
                                        </a>
                                    </div>
                                    <span
                                        v-else
                                        class="ks-day-num"
                                        :class="'ks-date-' + day.key"
                                    >{{ day.number }}</span>
                                </div>
                            </component>
                        </template>
                    </div>
                </div>
            </div>
            <div
                v-show="monthPickerOpen"
                class="ks-month-selection"
                :style="selectorStyle"
            >
                <div
                    v-for="(m, index) in lang.months.names"
                    :key="m"
                    tabindex="0"
                    :class="{ 'ks-selected-month': m == month }"
                    @click.prevent="changeMonth(index)"
                    @keydown.enter.stop.prevent="changeMonth(index)"
                >
                    <div>{{ m }}</div>
                </div>
            </div>
            <div
                v-show="yearPickerOpen"
                :style="selectorStyle"
            >
                <ul class="ks-year-selection">
                    <li
                        v-for="y in year_list"
                        :key="y"
                        tabindex="0"
                        :class="{ 'ks-selected-year': y == year }"
                        @click.prevent="changeYear(y)"
                        @keydown.enter.stop.prevent="changeYear(y)"
                        v-text="y"
                    ></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        LOCAL,
        UTC,
        addDays,
        addMonths,
        dateParts,
        defaultLocale,
        formatDate,
        getDaysInMonth,
        makeDate,
        parseDate,
        subDays,
        subMonths,
    } from '../helpers/dates';
    import { mouseHold } from '../helpers/events';
    import DownSvg from './icons/IconChevronDown.vue';
    import KsDroppable from './KsDroppable.vue';

    const SCOPE_FORMAT = 'Y-m-d';

    export default {
        name: 'KsCalendar',

        model: {
            prop: 'date'
        },

        props: {
            date: {
                type: [String, Date],
                default() {
                    return new Date();
                }
            },
            selection: {
                type: [String, Array, Date],
                default: ''
            },
            weekStart: {
                type: [String, Number],
                default: 0
            },
            abbrevDay: {
                type: Boolean,
                default: true
            },
            abbrevMonth: {
                type: Boolean,
                default: false
            },
            format: {
                type: String,
                default: "Y-m-d"
            },
            // Time zone that Date props are read in: 'UTC', 'local' or an IANA name
            timezone: {
                type: String,
                default: UTC
            },
            weekHeight: {
                type: String,
                default: 'auto'
            },
            selectorHeight: {
                type: String,
                default: 'auto'
            },
            interactive: {
                type: Boolean,
                default: false
            },
            interactiveDays: {
                type: Boolean,
                default: false
            },
            yearPicker: {
                type: Boolean,
                default: false
            },
            monthPicker: {
                type: Boolean,
                default: false
            },
            minDate: {},
            maxDate: {},
            showTrailingDays: {
                type: Boolean,
                default: true
            },
            showControls: {
                type: Boolean,
                default: true
            },
            droppableDays: {
                type: Boolean,
                default: false
            },
            droppableActiveClass: {
                type: String,
                default: 'ks-drop-zone-active'
            },
            droppableInactiveClass: {
                type: String,
                default: ''
            }
        },

        emits: ['input', 'select', 'select-day', 'previous', 'next', 'drop-on-date'],

        data() {
            return {
                lang: defaultLocale,
                yearPickerOpen: false,
                monthPickerOpen: false,
            };
        },

        computed: {
            week_start() {
                return parseInt(this.weekStart) || 0;
            },
            min_key() {
                return this.scopeKey(this.minDate);
            },
            max_key() {
                return this.scopeKey(this.maxDate);
            },
            date_obj() {
                if ( this.date instanceof Date && !isNaN(this.date) ) {
                    return this.date;
                }

                const parsed = this.date ? parseDate(this.date, this.format, this.timezone) : null;

                return parsed && !isNaN(parsed) ? parsed : new Date();
            },
            date_parts() {
                return dateParts(this.date_obj, this.timezone);
            },
            month() {
                return this.lang.months.names[this.date_parts.month];
            },
            month_abbrev() {
                return this.lang.months.abbreviations[this.date_parts.month];
            },
            year() {
                return this.date_parts.year;
            },
            year_list() {
                if ( !this.yearPicker ) {
                    return [];
                }

                return Array.from({ length: 200 }, (_, i) => this.year - 99 + i);
            },
            week_titles() {
                const titles = this.lang.days[this.abbrevDay ? 'abbreviations' : 'names'];

                return titles.slice(this.week_start).concat(titles.slice(0, this.week_start));
            },
            days() {
                return getDaysInMonth(this.date_parts.month, this.date_parts.year, this.timezone);
            },
            weeks() {
                const first = this.days[0];
                const last = this.days[this.days.length - 1];
                const leading = (dateParts(first, this.timezone).weekday - this.week_start + 7) % 7;
                const trailing = (this.week_start + 6 - dateParts(last, this.timezone).weekday + 7) % 7;

                const dates = [];
                for ( let i = leading; i > 0; i-- ) {
                    dates.push(subDays(first, i, this.timezone));
                }
                dates.push(...this.days);
                for ( let i = 1; i <= trailing; i++ ) {
                    dates.push(addDays(last, i, this.timezone));
                }

                const weeks = [];
                for ( let i = 0; i < dates.length; i += 7 ) {
                    weeks.push(dates.slice(i, i + 7).map(date => this.calendarDay(date)));
                }

                return weeks;
            },
            selected_keys() {
                const selection = Array.isArray(this.selection) ? this.selection : [this.selection];

                return selection
                    .filter(selected => selected)
                    .map(selected => selected instanceof Date ? this.formatDate(selected) : selected);
            },
            week_style() {
                if ( 'auto' == this.weekHeight ) {
                    return {};
                }

                return {
                    'min-height': this.weekHeight
                };
            },
            today() {
                // A UTC calendar holds plain dates, so today is the viewer's local date
                return formatDate(new Date(), this.format, this.format, this.lang, this.timezone === UTC ? LOCAL : this.timezone);
            },
            selectorStyle() {
                let style = '';
                if ( this.selectorHeight != 'auto' ) {
                    style = 'height: ' + this.selectorHeight;
                } else if ( this.weekHeight != 'auto' ) {
                    let modifier = 42;
                    const unit = this.weekHeight.replace(/(\.|\d)+/, '');
                    // Depending on the measurement we need to adjust for the heading
                    switch ( unit ) {
                        case 'rem':
                        case 'em':
                            modifier = 3;
                            break;
                        case 'px':
                            modifier = 42;
                    }
                    const height = parseFloat(this.weekHeight.replace(/(px|rem|em|pt)/, '')) * this.weeks.length + modifier;
                    style = 'height: ' + height + unit + ';';
                }
                return style;
            },

            droppable_active_class() {
                return this.droppableDays ? this.droppableActiveClass : '';
            },

            droppable_inactive_class() {
                return this.droppableDays ? this.droppableInactiveClass : '';
            }
        },

        mounted() {
            this.mousehold_removers = [];
            this.$nextTick(() => {
                if ( this.showControls ) {
                    this.setupMouseholdListeners();
                }
            });
        },

        beforeDestroy() {
            this.removeMouseholdListeners();
        },

        beforeUnmount() {
            this.removeMouseholdListeners();
        },

        methods: {
            /**
             * Sets up the mousehold events on the left and right controls in the header
             */
            setupMouseholdListeners() {
                this.removeMouseholdListeners();

                if ( this.$refs.next && this.$refs.previous ) {
                    this.mousehold_removers = [
                        mouseHold(this.$refs.next, this.next),
                        mouseHold(this.$refs.previous, this.previous),
                    ];
                }
            },

            removeMouseholdListeners() {
                (this.mousehold_removers || []).forEach(remove => remove());
                this.mousehold_removers = [];
            },

            /**
             * Set the language info
             *
             * @param lang
             */
            setLang(lang) {
                this.lang = lang;
            },

            /**
             * Builds the display data of one day cell
             *
             * @param {Date} date
             */
            calendarDay(date) {
                const parts = dateParts(date, this.timezone);

                return {
                    date,
                    key: this.formatDate(date),
                    number: parts.day,
                    in_month: parts.month === this.date_parts.month,
                    in_scope: this.isDayInScope(date),
                };
            },

            /**
             * Moves the calendar to a year and month, keeping the day inside the month
             */
            moveTo(year, month) {
                const last_day = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
                const day = Math.min(this.date_parts.day, last_day);

                return makeDate({ year, month, day }, this.timezone);
            },

            /**
             * Sets the year of the calendar
             */
            changeYear(year) {
                this.$emit('input', this.formatDate(this.moveTo(parseInt(year), this.date_parts.month)));
                this.closeYear();
                this.$el.focus();
            },

            /**
             * Sets the month of the calendar
             */
            changeMonth(month) {
                this.$emit('input', this.formatDate(this.moveTo(this.date_parts.year, parseInt(month))));
                this.closeMonth();
                this.$el.focus();
            },

            /**
             * Checks if the day is in the current month
             *
             * @param day
             * @return {boolean}
             */
            isInMonth(day) {
                return dateParts(day, this.timezone).month === this.date_parts.month;
            },

            /**
             * Formats a date
             * @param date
             * @return {string}
             */
            formatDate(date) {
                return formatDate(date, this.format, this.format, this.lang, this.timezone);
            },

            /**
             * Returns classes for the day
             */
            dayClass(day) {
                return {
                    'ks-selected': this.selected_keys.includes(day.key),
                    'ks-today': day.key == this.today,
                    'ks-out_of_scope': !day.in_scope,
                };
            },

            /**
             * Sortable Y-m-d key of a date or a date string in the calendar format
             */
            scopeKey(date) {
                if ( !date ) {
                    return null;
                }

                return formatDate(date, SCOPE_FORMAT, this.format, this.lang, this.timezone) || null;
            },

            /**
             * Check If a date is with in the given min/max props
             * Used to determine interactive dates
             *
             * @param {Date|String} date
             * @return Boolean
             */
            isDayInScope(date) {
                const key = this.scopeKey(date);

                if ( !key ) {
                    return false;
                }

                if ( this.min_key && key < this.min_key ) {
                    return false;
                }

                return !(this.max_key && key > this.max_key);
            },

            /**
             * Select the given date
             */
            selectDay(date) {
                if ( this.isDayInScope(date) ) {
                    this.$emit('select', this.formatDate(date));
                }
            },

            /**
             * Select from a click on the day number
             */
            dayClicked(date) {
                if ( this.isDayInScope(date) ) {
                    this.$emit('select-day', this.formatDate(date));
                }
            },

            /**
             * Moves the month back
             */
            previous() {
                this.$emit('input', this.formatDate(subMonths(this.date_obj, 1, this.timezone)));
                this.$emit('previous');
            },

            /**
             * Moves the month forward
             */
            next() {
                this.$emit('input', this.formatDate(addMonths(this.date_obj, 1, this.timezone)));
                this.$emit('next');
            },

            toggleMonthPicker() {
                if ( this.monthPickerOpen ) {
                    return this.closeMonth();
                }

                return this.openMonth();
            },

            openMonth() {
                this.monthPickerOpen = true;
                this.closeYear();
            },

            closeMonth() {
                this.monthPickerOpen = false;
            },

            toggleYearPicker() {
                if ( this.yearPickerOpen ) {
                    return this.closeYear();
                }

                return this.openYear();
            },

            /**
             * Open the year picker
             */
            openYear() {
                this.yearPickerOpen = true;
                this.closeMonth();

                this.$nextTick(() => {
                    const calendar = this.$refs.calendar;
                    calendar.scrollTop = calendar.scrollHeight / 2 - (calendar.offsetHeight / 2);
                });
            },

            /**
             * Close the year picker
             */
            closeYear() {
                this.yearPickerOpen = false;
            },

            /**
             * emits a drop event if drag+drop is enabled
             *
             * @param day
             */
            forwardDropEvent(day) {
                if ( this.droppableDays ) {
                    this.$emit('drop-on-date', day);
                }
            }
        },

        watch: {
            showControls() {
                this.$nextTick(() => {
                    if ( this.showControls ) {
                        this.setupMouseholdListeners();
                    } else {
                        this.removeMouseholdListeners();
                    }
                });
            }
        },

        components: {
            DownSvg,
            KsDroppable
        }

    }
</script>
