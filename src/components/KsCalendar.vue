<template>
    <div class="ks-calendar" tabindex="-1">
        <div class="ks-calendar-title">
            <a v-if="showControls" href="#" @click.prevent="previous" class="ks-ctrl-left" ref="previous">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 2 20 20">
                    <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"/>
                </svg>
            </a>
            <a href="#"
               v-if="monthPicker"
               @click.prevent="toggleMonthPicker"
               class="ks-calendar-month-picker"
               :class="{'ks-open-picker': monthPickerOpen }"
            >
                {{month}}
                <down-svg></down-svg>
            </a>
            <span v-else class="ks-calendar-month-picker">{{month}}</span>

            <a href="#"
               v-if="yearPicker"
               @click.prevent="toggleYearPicker"
               class="ks-calendar-year-picker"
               :class="{'ks-open-picker': yearPickerOpen }"
            >
                {{year}}
                <down-svg></down-svg>
            </a>
            <span v-else class="ks-calendar-year-picker">{{year}}</span>

            <a v-if="showControls" href="#" @click.prevent="next" class="ks-ctrl-right" ref="next">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 2 20 20">
                    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
                </svg>
            </a>
        </div>
        <div
            class="ks-calendar-view"
            :class="{'interactive': interactive}"
            ref="calendar"
        >
            <div v-show="!yearPickerOpen && !monthPickerOpen">

                <!-- Month -->
                <div class="ks-calendar-month">

                    <!-- Heading -->
                    <div class="ks-cal-week ks-cal-week-header">
                        <div v-for="title in week_titles" class="ks-cal-day">
                            {{title}}
                        </div>
                    </div>

                    <!-- Weeks -->
                    <div class="ks-cal-week"
                         v-for="week in weeks"
                         :style="week_style"
                    >

                        <component :is="droppableDays ? 'ks-droppable' : 'div'"
                                 v-for="day in week"
                                 v-if="isInMonth(day)"
                                 class="ks-cal-day"
                                 :tabindex="tabindex && isDayInScope(day)"
                                 :class="dayClass(day)"
                                 @click.prevent="selectDay(day)"
                                 @keydown.enter="selectDay(day)"
                                 :active-class="droppable_active_class"
                                 :inactive-class="droppable_inactive_class"
                                 @drop.stop="forwardDropEvent(day, $event)"
                                 :key="`droppable-${formatDate(day)}`"
                        >

                            <div>
                                <div v-if="interactiveDays" class="row row-collapse">
                                    <a href="#" class="ks-day-num" :class="'ks-date-' + formatDate(day)" @click.prevent.stop="dayClicked(day)">
                                        {{day | day}}
                                    </a>
                                </div>
                                <span v-else class="ks-day-num" :class="'ks-date-' + formatDate(day)">{{day | day}}</span>

                                <slot :name="formatDate(day)"></slot>

                            </div>

                        </component>

                        <component :is="droppableDays ? 'ks-droppable' : 'div'"
                            v-else
                            class="ks-cal-blank"
                            :class="dayClass(day)"
                            @click.prevent="selectDay(day)"
                            :active-class="droppable_active_class"
                            :inactive-class="droppable_inactive_class"
                            @drop.stop="forwardDropEvent(day, $event)"
                            :key="`droppable-${formatDate(day)}`"
                        >

                            <div v-if="showTrailingDays">
                                <div v-if="interactiveDays" class="row row-collapse">
                                    <a href="#" class="ks-day-num" :class="'ks-date-' + formatDate(day)" @click.prevent.stop="dayClicked(day)">
                                        {{day | day}}
                                    </a>
                                </div>
                                <span v-else class="ks-day-num" :class="'ks-date-' + formatDate(day)">{{day | day}}</span>
                            </div>

                        </component>

                    </div>
                </div>
            </div>
            <div v-show="monthPickerOpen" class="ks-month-selection" :style="selectorStyle">
                <div
                    v-for="(m, index) in lang.months.names"
                    :class="{ 'ks-selected-month': m == month}"
                    tabindex="0"
                    @click.prevent="changeMonth(index)"
                    @keydown.enter.stop.prevent="changeMonth(index)"
                >
                    <div>{{m}}</div>
                </div>
            </div>
            <div v-show="yearPickerOpen" :style="selectorStyle">
                <ul class="ks-year-selection">
                    <li
                        v-for="y in year_list"
                        tabindex="0"
                        v-text="y"
                        :class="{ 'ks-selected-year': y == year}"
                        @click.prevent="changeYear(y)"
                        @keydown.enter.stop.prevent="changeYear(y)"
                    ></li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    import {
        defaultLocale,
        getDaysInMonth,
        addDays,
        subDays,
        subMonths,
        addMonths,
        formatDate,
        parseDate,
        cloneDate,
    } from '../helpers/dates';
    import {mouseHold} from '../helpers/events';
    import DownSvg from '../svg/cheveron-down.svg';
    import KsDroppable from './KsDroppable.vue';

    export default {
        name: 'KsCalendar',

        model: {
            prop: 'date'
        },

        provide() {
            return {
                selection: this.selection,
                today: this.today,
                minDate: this.minDateObj,
                maxDate: this.maxDateObj,
                tabindex: this.tabindex,
                format: this.format
            }
        },

        props: {
            date: {
                type: [String, Date],
                default() {
                    return new Date();
                }
            },
            selection: {
                type: [String, Array],
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

        data() {
            return {
                lang: defaultLocale,
                first_day: '',
                last_day: '',
                yearPickerOpen: false,
                monthPickerOpen: false,
            };
        },

        computed: {
            tabindex() {
                return this.interactive ? '0' : false;
            },
            minDateObj() {
                if ( this.minDate instanceof Date ) {
                    return this.minDate;
                }

                if ( !this.minDate ) {
                    return null;
                }

                return parseDate(this.minDate, this.format);
            },
            maxDateObj() {
                if ( this.maxDate instanceof Date ) {
                    return this.maxDate;
                }

                if ( !this.maxDate ) {
                    return null;
                }

                return parseDate(this.maxDate, this.format);
            },
            date_obj() {
                if ( this.date instanceof Date ) {
                    return this.date;
                }

                if ( !this.date ) {
                    return new Date();
                }

                return parseDate(this.date, this.format);
            },
            month() {
                return this.lang.months.names[this.date_obj.getMonth()];
            },
            month_abbrev() {
                return this.lang.months.abbreviations[this.date_obj.getMonth()];
            },
            year() {
                return this.date_obj.getFullYear();
            },
            year_list() {
                if ( !this.yearPicker ) {
                    return [];
                }

                // For performance the best approach here is to just run through pre defined length Array
                let years = Array(200);
                for ( var i = 0; i < 200; i++ ) {
                    years[i] = this.year - 100 + (i + 1);
                }
                return years;
            },
            week_titles() {
                let titles = this.lang.days[this.abbrevDay ? 'abbreviations' : 'names']
                if ( this.weekStart == 0 ) {
                    return titles;
                }

                return titles.slice(this.weekStart).concat(titles.slice(0, this.weekStart));
            },
            days() {
                return getDaysInMonth(this.date_obj.getMonth(), this.date_obj.getFullYear());
            },
            weeks() {
                let weeks = [], week = [];

                // Pre fill the previous days in the week
                if ( this.weekStart != this.days[0].getUTCDay() ) {
                    let day = this.days[0];

                    do {
                        day = subDays(day, 1);
                        week.unshift(day);
                    } while ( day.getUTCDay() != this.weekStart );
                }

                // Push the first day
                week.push(this.days[0]);

                // Run through the other days
                for ( var i = 1; i < this.days.length; i++ ) {
                    if ( this.weekStart == this.days[i].getUTCDay() ) {
                        weeks.push(week);
                        week = [];
                    }

                    week.push(this.days[i]);
                }

                // Attach the remaining days
                if ( week.length ) {
                    let day = this.days[this.days.length - 1];
                    while ( week.length < 7 ) {
                        day = addDays(day, 1);
                        week.push(day);
                    }
                    weeks.push(week);
                }

                return weeks;
            },
            week_style() {
                if ( 'auto' == this.weekHeight ) {
                    return {};
                }

                return {
                    'min-height': this.weekHeight
                }
            },
            today() {
                return this.formatDate(new Date());
            },
            selectorStyle() {
                let style = '';
                if ( this.selectorHeight != 'auto' ) {
                    style = 'height: ' + this.selectorHeight;
                } else if ( this.weekHeight != 'auto' ) {
                    let modifier = 42;
                    let unit = this.weekHeight.replace(/(\.|\d)+/, '');
                    // Depending on the measurement we need to adjust for the heading
                    switch ( unit ) {
                        case 'rem':
                        case 'em':
                            modifier = 3;
                            break;
                        case 'px':
                            modifier = 42;
                    }
                    let height = parseFloat(this.weekHeight.replace(/(px|rem|em|pt)/, '')) * this.weeks.length + modifier;
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
            this.$nextTick(() => {
                if ( this.showControls ) {
                    this.setupMouseholdListeners();
                }
            });
        },

        filters: {
            day(day) {
                return day.getDate();
            }
        },

        methods: {
            /**
             * Sets up the mousehold events on the left and right controls in the header
             */
            setupMouseholdListeners() {
                mouseHold(this.$refs.next, this.next);
                mouseHold(this.$refs.previous, this.previous);
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
             * Sets the year of the calendar
             */
            changeYear(year) {
                let new_date = cloneDate(this.date_obj);
                new_date.setFullYear(year);
                this.$emit('input', this.formatDate(new_date));
                this.closeYear();
                this.$el.focus();
            },

            /**
             * Sets the month of the calendar
             */
            changeMonth(month) {
                let new_date = cloneDate(this.date_obj);
                new_date.setUTCMonth(parseInt(month));
                this.$emit('input', this.formatDate(new_date));
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
                return day.getMonth() == this.date_obj.getMonth();
            },

            /**
             * Formats a date
             * @param date
             * @return {string}
             */
            formatDate(date) {
                return formatDate(date, this.format);
            },

            /**
             * Returns classes for the day
             */
            dayClass(date) {
                let day = this.formatDate(date);

                return {
                    'ks-selected': day === this.selection,
                    'ks-today': day == this.today,
                    'ks-out_of_scope': this.isDayInScope(date) ? false : true
                };
            },

            /**
             * Check If a date is with in the given min/max props
             * Used to determine interactive dates
             *
             * @return Boolean
             */
            isDayInScope(date) {
                if ( this.minDateObj ) {
                    if ( date.getTime() < this.minDateObj.getTime() ) {
                        return false;
                    }
                }

                if ( this.maxDateObj ) {
                    if ( date.getTime() > this.maxDateObj.getTime() ) {
                        return false;
                    }
                }

                return true;
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
                this.$emit('input', this.formatDate(subMonths(this.date_obj)));
                this.$emit('previous');
            },

            /**
             * Moves the month forward
             */
            next() {
                this.$emit('input', this.formatDate(addMonths(this.date_obj)));
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
                    let offsetHeight = this.$refs.calendar.offsetHeight;
                    let scrollTop = this.$refs.calendar.scrollHeight / 2 - (offsetHeight / 2);
                    this.$refs.calendar.scrollTop = scrollTop;
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
             * @param drop_data
             */
            forwardDropEvent(day, drop_data) {
                if (this.droppableDays) {
                    this.$emit('drop-on-date', day);
                }
            }
        },

        watch: {
            showControls() {
                if ( this.showControls ) {
                    this.setupMouseholdListeners();
                }
            }
        },

        components: {
            DownSvg,
            KsDroppable
        }

    }
</script>
