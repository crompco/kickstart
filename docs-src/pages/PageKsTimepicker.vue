<template>
    <div>
        <h2>Timepicker</h2>
        <div class="basic-block">
            <ks-timepicker
                name="start_time"
                :time-format="time_format"
                display-format="h:i A"
                time-step="30"
                v-model="start_time"
            ></ks-timepicker>
            <pre>format: {{time_format}}</pre>
            <pre>v-model: {{start_time}}</pre>
        </div>
    </div>
</template>

<script>

    import KsTimepicker from '../../src/components/KsTimepicker';

    export default {
        name: 'PageKsTimepicker',

        props: [],

        data() {
            return {
                time_format: 'H:i',
                start_time: '9:00 am'
            }
        },

        components: {
            KsTimepicker
        }
    }
</script>
