<template>
    <div class="ks-timepicker">
        <input type="text" v-model="display_value" @input="">
        <input type="hidden" :name="name">
        <!--<ks-tooltip trigger="click">-->
            <!--<ul>-->
                <!--<li>09:00</li>-->
                <!--<li>10:00</li>-->
            <!--</ul>-->
        <!--</ks-tooltip>-->
    </div>
</template>

<script>

    import KsTooltip from './KsTooltip';

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
            }
        },

        computed: {
            timeOptions() {

            },
        },

        data() {
            return {
                display_value: this.formatTimeValue(this.value, this.displayFormat)
            }
        },

        methods: {

            formatTimeValue(time, format) {
                let time_info = this.parseTime(time);
                return format.replace('H', time_info.full_hour)
                    .replace('h', time_info.hour)
                    .replace('i', time_info.minute)
                    .replace('a', time_info.meridiem.toLowerCase())
                    .replace('A', time_info.meridiem.toUpperCase());
            },

            parseTime(time) {
                let time_parts = time.match(/([0-9]{1,2})\:([0-9]{1,2})\s*(am|pm)/i);

                // Setup the time parts
                let hour = time_parts[1];
                let minute = time_parts[2] || '00';
                let meridiem = time_parts[3] || '';
                let military = meridiem ? false : true;
                let full_hour;

                if ( military ) {
                    full_hour = meridiem.toLowerCase() == 'pm' ? hour + 12 : hour;
                } else {
                    full_hour = hour;
                }
                return {
                    hour, minute, meridiem, military, full_hour
                };
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

            }
        }
    }
</script>
