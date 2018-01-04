<template>
    <div class="ks-timepicker">
        <input type="text" v-model="display_value" @input="" @focus="isOpen = true">
        <input type="hidden" :name="name" :value="value" @input="$emit('input', $event)">
        <ul v-show="isOpen">
            <li v-for="time in timeOptions" :key="time" @click.prevent.stop="setTime(time)">
                {{time}}
            </li>
        </ul>
    </div>
</template>

<script>

    import KsTooltip from './KsTooltip';
    import {smartFocusToggle} from "../helpers/events";
    import {parseTime, formatTime} from "../helpers/dates";

    export default {
        name: 'KsTimepicker',

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
            }
        },

        computed: {
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
                display_value: this.formatTimeValue(this.value, this.displayFormat)
            }
        },

        mounted() {
            this.$nextTick(() => {
                smartFocusToggle(this.$el, (focus, e) => {
                    this.focused = focus;
                }, 150);
            });
        },

        methods: {

            formatTimeValue(time, format) {
                return formatTime(time, format);
            },

            setTime(time) {
                this.$emit('input', formatTime(time, this.timeFormat));
            }
        },

        components: {
            KsTooltip
        },

        watch: {
            displayFormat() {
                this.display_value = this.formatTimeValue(this.value, this.displayFormat);
            },
            timeFormat() {
                this.$emit('input', this.formatTimeValue(this.value, this.timeFormat))
            },
            value() {
                this.display_value = this.formatTimeValue(this.value, this.displayFormat);
            },
            focused() {
                if ( !this.focused ) {
                    this.isOpen = false;
                }
            },
        }
    }
</script>
