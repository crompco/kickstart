<template>
    <div
        class="ks-timepicker"
        tabindex="0"
        @keydown.down.prevent="selectDownOpen"
        @keydown.up.prevent="selectUpOpen"
        @keydown.enter.prevent="selectItemAtIndex(null)"
        @keydown.tab="selectItemAtIndex(null, $event)"
        @keydown.esc.prevent="resetFocus(true)"
        @keydown="startTyping($event)"
        @keydown.backspace.prevent.stop="clearAndFocus"
    >
        <input
            ref="lookup"
            v-model="display_value"
            tabindex="-1"
            type="text"
            autocomplete="off"
            :disabled="disabled"
            @focus="isOpen = true"
            @keydown.backspace.stop
            @keyup.stop="searchTime"
        >
        <input
            type="hidden"
            :name="name"
            :value="value"
            :disabled="disabled"
        >
        <ul
            v-show="isOpen"
            ref="list"
            :class="{ 'inverted': inverted }"
            :style="list_style"
        >
            <li
                v-for="(time, index) in list"
                :key="time"
                :class="{ 'ks-selected-item': index == selected_index }"
                @click.prevent.stop="selectItemAtIndex(index)"
                @mouseover="setHoverIndex(index)"
            >
                {{ time }}
            </li>
        </ul>
    </div>
</template>

<script>
    import { parseTime, formatTime } from '../helpers/dates';
    import { escapeRegExp } from '../helpers/strings';
    import ListIndexNavigator from './mixins/ListIndexNavigator';
    import FloatingDropdown from './mixins/FloatingDropdown';

    const defaultMinTime = '04:00';
    const defaultMaxTime = '23:59';
    const END_OF_DAY = 23 * 60 + 59;

    /**
     * Minutes since midnight of a parsed time
     */
    function minutesOf(time_info) {
        return time_info.full_hour * 60 + time_info.minute;
    }

    export default {
        name: 'KsTimepicker',

        mixins: [ListIndexNavigator, FloatingDropdown],

        props: {
            name: {},
            value: {},
            disabled: {
                type: Boolean,
                default: false
            },
            timeStep: {
                type: [Number, String],
                default: 30,
                validator: value => 60 % value === 0
            },
            timeFormat: {
                type: String,
                default: 'H:i'
            },
            displayFormat: {
                type: String,
                default: 'h:i a'
            },
            minTime: {
                type: String,
                default: defaultMinTime
            },
            maxTime: {
                type: String,
                default: defaultMaxTime
            },
            endOfDay: {
                type: Boolean,
                default: false,
            },
            listHeight: {
                type: String,
                default: '200px'
            }
        },

        emits: ['input', 'clear', 'blur', 'focus', 'search'],

        computed: {
            /**
             * Extract a list of options to choose from
             *
             * @returns {Array}
             */
            timeOptions() {
                const min_time = parseTime(this.minTime ?? defaultMinTime) || parseTime(defaultMinTime);
                const max_time = parseTime(this.maxTime ?? defaultMaxTime) || parseTime(defaultMaxTime);
                const step = parseInt(this.timeStep) || 30;

                const options = [];

                // Options sit on the step boundaries of the hour (8:10 with a 30 minute step starts at 8:30)
                const first = Math.ceil(minutesOf(min_time) / step) * step;

                for ( let minutes = first; minutes <= minutesOf(max_time); minutes += step ) {
                    options.push(this.formatTimeValue(`${Math.floor(minutes / 60)}:${minutes % 60}`, this.displayFormat));
                }

                if ( this.endOfDay && minutesOf(max_time) >= END_OF_DAY ) {
                    options.push(this.formatTimeValue('23:59', this.displayFormat));
                }

                // A display format without the hour or meridiem can format two times the same
                return [...new Set(options)];
            },
            customFilterLookupName() {
                return escapeRegExp(this.lookup_name.replace(':', ''));
            },
            list_style() {
                return {
                    'max-height': this.listHeight,
                };
            },
        },

        data() {
            return {
                isOpen: false,
                focused: false,
                tmp_type: '',
                list: [],
                minIndex: 0,
                startIndex: 0,
                display_value: this.formatTimeValue(this.value, this.displayFormat),
            };
        },

        mounted() {
            this.initListNavigation({
                lookup: 'lookup',
                list: 'list',
            });

            // Initialize the time in case its in a different format
            this.setTime(this.value);
            this.resetList();
        },

        beforeDestroy() {
            clearTimeout(this.typing_timer);
        },

        beforeUnmount() {
            clearTimeout(this.typing_timer);
        },

        methods: {
            /**
             * Catch key presses on the focused parent and autofill the search
             */
            startTyping(e) {
                if ( !/^[0-9]$/.test(e.key) || document.activeElement == this.$refs.lookup ) {
                    return;
                }

                this.tmp_type += e.key;
                clearTimeout(this.typing_timer);
                this.typing_timer = setTimeout(() => {
                    this.display_value = this.tmp_type;
                    this.tmp_type = '';
                    this.$nextTick(() => {
                        this.$refs.lookup.focus();
                        this.searchTime(e);
                    });
                }, 75);
            },

            clearAndFocus() {
                this.setTime('');
                this.$nextTick(() => {
                    this.$refs.lookup.focus();
                });
            },

            /**
             * Parses and Formats a time
             *
             * @param time
             * @param format
             * @returns {string}
             */
            formatTimeValue(time, format) {
                if ( !time ) {
                    return '';
                }
                return formatTime(time, format);
            },

            /**
             * Resets the display value back to the formatted value
             */
            resetDisplayValue() {
                this.display_value = this.formatTimeValue(this.value, this.displayFormat);
            },

            /**
             * Sets the time through emitting input
             *
             * @param time
             */
            setTime(time) {
                const time_formatted = this.formatTimeValue(time, this.timeFormat);
                if ( time_formatted != (this.value || '') ) {
                    this.$emit('input', time_formatted);
                }
            },

            /**
             * Sets the value to the item at the given index or at the current selected index.
             * Without a list item a typed time ("1430", "2:15 pm") is used.
             *
             * @param {Number|null} index
             * @param {Event|null} event
             */
            selectItemAtIndex(index = null, event = null) {
                if ( event && event.key == 'Tab' ) {
                    if ( !this.isOpen ) {
                        return;
                    }

                    event.preventDefault();
                }

                if ( !this.isOpen ) {
                    this.isOpen = true;
                    return;
                }

                index = index === null ? this.selected_index : index;

                if ( this.list[index] ) {
                    this.setTime(this.list[index]);
                    this.resetFocus();
                } else if ( this.display_value && parseTime(this.display_value) ) {
                    this.resetFocus(true);
                }
            },

            resetList() {
                this.list = this.timeOptions.slice(0);
            },

            resetFocus(validate = false) {
                this.$nextTick(() => {
                    this.$el.focus();
                    this.$nextTick(() => {
                        this.isOpen = false;
                        if ( validate ) {
                            this.validateDisplayValue();
                        }
                    });
                });
            },

            searchTime(e) {
                // Ignore navigation keys
                if ( ['ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Escape'].includes(e.key) ) {
                    return;
                }

                this.selected_index = this.startIndex;
                this.lookup_name = this.display_value;
                this.filterList();

                // Force the clearing of the tmp type on parent
                this.tmp_type = '';
            },

            /**
             * Runs the filter for the given lookup text
             */
            filterList() {
                if ( !this.lookup_name ) {
                    this.list = this.timeOptions.slice(0);
                } else {
                    this.list = this.timeOptions.filter(time => this.filterDisplayValue(time));
                    // Select the first item when there is only one result
                    if ( this.list.length == 1 ) {
                        this.selected_index = 0;
                    }
                }

                this.loading = false;
            },

            selectUpOpen() {
                this.isOpen = true;
                this.selectUp();
            },

            selectDownOpen() {
                this.isOpen = true;
                this.selectDown();
            },

            /**
             * Emits a valid typed time, clears an empty one and resets an invalid one
             */
            validateDisplayValue() {
                if ( !this.display_value ) {
                    this.setTime('');
                } else if ( parseTime(this.display_value) ) {
                    this.setTime(this.display_value);
                    this.display_value = this.formatTimeValue(this.display_value, this.displayFormat);
                } else {
                    this.resetDisplayValue();
                }
            },

            close() {
                this.isOpen = false;
            },

            open() {
                this.isOpen = true;
            },

            /**
             * Matches the lookup against the start of the displayed time, or for
             * 3-4 digits ("930", "1430") against its 24 hour time
             */
            filterDisplayValue(time) {
                const pattern = new RegExp('^0?' + this.customFilterLookupName, 'i');

                if ( pattern.test(time.replace(':', '')) ) {
                    return true;
                }

                const time_info = /^\d{3,4}$/.test(this.lookup_name) && parseTime(time);

                return !!time_info && pattern.test(formatTime(time, 'Hi'));
            },
        },

        watch: {

            /**
             * Update the display value when the displayFormat is changed
             */
            displayFormat() {
                this.resetDisplayValue();
            },

            /**
             * Update the value when the timeFormat is changed
             */
            timeFormat() {
                this.$emit('input', this.formatTimeValue(this.value, this.timeFormat));
            },

            /**
             * Update the display value when the value changes
             */
            value() {
                this.display_value = this.formatTimeValue(this.value, this.displayFormat);
            },

            /**
             * Track when the item is going out of focus
             */
            focused() {
                if ( !this.focused ) {
                    this.isOpen = false;
                    this.validateDisplayValue();
                }
            },

            /**
             * Keep the list data as a copy of the timeOptions
             */
            timeOptions() {
                this.resetList();
            },

            /**
             * Reset the list when it's closed
             */
            isOpen() {
                if ( !this.isOpen ) {
                    this.stopDropdown();
                    return;
                }

                this.resetList();
                this.$nextTick(() => this.startDropdown(this.$el, this.$refs.list));

                // If it's opening then let's pre-select the current time
                const index = this.list.indexOf(this.display_value);
                if ( -1 != index ) {
                    this.selected_index = index;
                    this.$nextTick(() => {
                        this.initListScrollTo(index);
                    });
                }
            }
        }
    }
</script>
