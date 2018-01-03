<template>
    <div>
        <h2>Timepicker</h2>
        <div class="basic-block">
            <ks-timepicker
                name="start_time"
                time-format="h:i"
                time-step="30"
                v-model="start_time"
            ></ks-timepicker>
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
                start_time: '9:00 am'
            }
        },

        components: {
            KsTimepicker
        }
    }
</script>
