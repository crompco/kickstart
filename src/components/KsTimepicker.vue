<template>
    <div
        class="ks-timepicker"
        tabindex="0"
        @keydown.down.prevent="selectDown"
        @keydown.up.prevent="selectUp"
        @keydown.enter.prevent="selectItemAtIndex(null)"
        @keydown.esc.prevent.stop="resetFocus"
    >
        <input ref="lookup" type="text" v-model="display_value" @input="" @focus="isOpen = true" autocomplete="off" @keydown.preve>
        <input type="hidden" :name="name" :value="value" @input="$emit('input', $event)">
        <ul
            v-show="isOpen"
            ref="list"
            :style="'max-height:'+this.listHeight"
        >
            <li
                v-for="(time, index) in timeOptions"
                :key="time"
                @click.prevent.stop="setTime(time)"
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

            selectItemAtIndex(index = null) {
                index = index || this.selected_index;
                if ( this.timeOptions[index] ) {
                    this.setTime(this.timeOptions[index]);
                    this.resetFocus();
                }
            },

            resetList() {
                this.list = this.timeOptions.slice(0);
            },

            resetFocus() {
                this.isOpen = false;
                this.$nextTick(() => {
                    this.$element.focus();
                })
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
                this.display_value = this.formatTimeValue(this.value, this.displayFormat);
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
                }
            },
            /**
             * Keep the list data as a copy of the timeOptions
             */
            timeOptions() {
                this.resetList();
            }
        }
    }
</script>
