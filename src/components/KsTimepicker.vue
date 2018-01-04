<template>
    <div
        class="ks-timepicker"
        tabindex="0"
        @keydown.down.prevent="selectDownOpen"
        @keydown.up.prevent="selectUpOpen"
        @keydown.enter.prevent="selectItemAtIndex(null)"
        @keydown.esc.prevent.stop="resetFocus"
    >
        <input
            ref="lookup"
            type="text"
            v-model="display_value"
            @input=""
            @focus="isOpen = true"
            autocomplete="off"
            @keyup.enter="selectItemAtIndex(null)"
            @keyup.tab="selectItemAtIndex(null)"
            @keyup="searchTime"
        />
        <input type="hidden" :name="name" :value="value" @input="$emit('input', $event)">
        <ul
            v-show="isOpen"
            ref="list"
            :style="'max-height:'+this.listHeight"
        >
            <li
                v-for="(time, index) in list"
                :key="time"
                @click.prevent.stop="selectItemAtIndex(index)"
                :class="{ 'selected-item': index == selected_index }"
                @mouseover="setHoverIndex(index)"
            >
                {{time}}
            </li>
        </ul>
    </div>
</template>

<script>

    import KsTooltip from './KsTooltip';
    import {smartFocusToggle} from "../helpers/events";
    import {parseTime, formatTime} from "../helpers/dates";
    import ListIndexNavigator from './mixins/ListIndexNavigator';

    export default {
        name: 'KsTimepicker',

        mixins: [ListIndexNavigator],

        props: {
            name: {},
            value: {},
            timeStep: {
                type: [Number, String],
                default: 30
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
                default: '04:00'
            },
            maxTime: {
                type: String,
                default: '24:00'
            },
            listHeight: {
                type: String,
                default: '200px'
            }
        },

        computed: {
            /**
             * Extract a list of options to choose from
             *
             * @returns {Array}
             */
            timeOptions() {
                let min_time = parseTime(this.minTime);
                let max_time = parseTime(this.maxTime);

                let options = [];

                for ( var i = min_time.full_hour; i < max_time.full_hour; i++ ) {
                    for ( var j = 0; j < 60; j += parseInt(this.timeStep) ) {
                        options.push(
                            this.formatTimeValue(`${i}:${j}`, this.displayFormat)
                        )
                    }
                }

                return options;
            },

        },

        data() {
            return {
                isOpen: false,
                focused: false,
                list: [],
                display_value: this.formatTimeValue(this.value, this.displayFormat)
            }
        },

        mounted() {
            this.$nextTick(() => {
                smartFocusToggle(this.$el, (focus, e) => {
                    this.focused = focus;
                }, 150);
            });

            this.initListNavigation({
                lookup: 'lookup',
                list: 'list',
            });

            // Initialize the time in case its in a different format
            this.setTime(this.value);
            this.resetList();
        },

        methods: {

            /**
             * Parses and Formats a time
             *
             * @param time
             * @param format
             * @returns {string}
             */
            formatTimeValue(time, format) {
                return formatTime(time, format);
            },

            /**
             * Resets the display value back to the formatted value
             */
            resetDisplayValue() {
                this.display_value = formatTime(this.value, this.displayFormat);
            },

            /**
             * Sets the time through emitting input
             *
             * @param time
             */
            setTime(time) {
                let time_formatted = formatTime(time, this.timeFormat);
                if ( time_formatted != this.value ) {
                    this.$emit('input', time_formatted);
                }
            },

            /**
             * Sets the value to the item at the given index or at the current selected index
             *
             * @param int|null index
             */
            selectItemAtIndex(index = null) {
                if ( !this.isOpen ) {
                    this.isOpen = true;
                    return;
                }

                index = index || this.selected_index;
                if ( this.list[index] ) {
                    this.setTime(this.list[index]);
                    this.resetFocus();
                }
            },

            resetList() {
                this.list = this.timeOptions.slice(0);
            },

            resetFocus() {
                this.$nextTick(() => {
                    this.$el.focus();
                    this.$nextTick(() => {
                        this.isOpen = false;
                    })
                })
            },

            searchTime(e) {
                // Ignore navigation keys
                if ( e.keyCode == 38 || e.keyCode == 40 ) {
                    return;
                }
                this.lookup_name = this.display_value;
                this.filterList();
            },

            /**
             * Runs the filter for the given lookup text
             */
            filterList() {
                if ( !this.lookup_name ) {
                    this.list = this.timeOptions.slice(0);
                } else {
                    this.list = this.timeOptions.filter((time) => {
                        return time.match(this.nameRegex) ? true : false;
                    });
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
             * Validates the format of a typed value and resets the value when it's invalid
             */
            validateDisplayValue() {
                let validationRegex = new RegExp(this.displayFormat
                    .replace(/(h|H|i)/g, '([0-9]{1,2})')
                    .replace(/\s/g, '\\s+')
                    .replace(':', '\\:+')
                    .replace(/a/i, '(am|pm)'));

                if ( !this.display_value.match(validationRegex) ) {
                    // If it doesn't match the format then reset it
                    this.resetDisplayValue();
                } else {
                    // If it does validate then we should emit a new value
                    this.setTime(this.display_value);
                }
            }
        },

        components: {
            KsTooltip
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
                this.$emit('input', this.formatTimeValue(this.value, this.timeFormat))
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
                    this.resetList();
                }
            }
        }
    }
</script>
