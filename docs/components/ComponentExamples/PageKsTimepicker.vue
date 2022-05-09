<template>
    <div>
        <div class="basic-block">
            <div class="form-group">
                <div class="label">Timepicker</div>
                <ks-timepicker
                    name="start_time"
                    :time-format="time_format"
                    display-format="h:i A"
                    time-step="30"
                    v-model="start_time"
                ></ks-timepicker>
            </div>
            <pre>display format: h:i A</pre>
            <pre>format: {{time_format}}</pre>
            <pre>v-model: {{start_time}}</pre>

            <code-block>
                <template v-pre>
                    &lt;ks-timepicker
                        name="start_time"
                        :time-format="time_format"
                        display-format="h:i A"
                        time-step="30"
                        v-model="start_time"
                    >&lt;/ks-timepicker>
                </template>
            </code-block>
        </div>

        <div class="basic-block">
            <div class="form-group">
                <div class="label">Timepicker (24-Hour)</div>
                <ks-timepicker
                    name="start_time"
                    :time-format="time_format"
                    min-time="00:00"
                    display-format="H:i"
                    time-step="30"
                    v-model="start_time"
                ></ks-timepicker>
            </div>
            <pre>display format: H:i</pre>
            <pre>format: {{time_format}}</pre>
            <pre>v-model: {{start_time}}</pre>

            <code-block>
                <template v-pre>
                    &lt;ks-timepicker
                        name="start_time"
                        :time-format="time_format"
                        min-time="00:00"
                        display-format="H:i"
                        time-step="30"
                        v-model="start_time"
                    >&lt;/ks-timepicker>
                </template>
            </code-block>
        </div>

    </div>
</template>

<script>

    import KsTimepicker from '../../../src/components/KsTimepicker';

    export default {
        name: 'PageKsTimepicker',

        data() {
            return {
                time_format: 'H:i',
                start_time: ''
            }
        },

        components: {
            KsTimepicker
        }
    }
</script>
