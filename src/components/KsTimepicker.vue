<template>
    <div class="ks-timepicker">
        <input type="text" v-model="display_value">
        <input type="hidden" :name="name">
        <ks-tooltip>

        </ks-tooltip>
    </div>
</template>

<script>

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

            }
        },

        data() {
            return {
                display_value: this.formatTimeValue(this.value, this.displayFormat)
            }
        },

        methods: {
            formatTimeValue(time, format) {
                let time_info = this.parseTime(time);
                format.replace('H', )
            },
            parseTime(time) {
                let time_parts = time.match(/([0-9]{1,2})\:([0-9]{1,2})\s*(am|pm)/i);
                let hour = time_parts[1];
                let minute = time_parts[2] || '00';
                let meridiem = time_parts[3] || '';
                let military = meridiem ? false : true;
                return {
                    hour, minute, meridiem, military
                }
            }
        },

        components: {}
    }
</script>
