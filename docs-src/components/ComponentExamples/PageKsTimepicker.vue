<template>
    <div>
        <div class="basic-block">
            <div class="ks-form-group">
                <div class="ks-label">Timepicker</div>
                <ks-timepicker
                    name="start_time"
                    :time-format="time_format"
                    display-format="h:i A"
                    time-step="30"
                    v-model="start_time_1"
                ></ks-timepicker>
            </div>
            <pre>display format: h:i A</pre>
            <pre>format: {{time_format}}</pre>
            <pre>v-model: {{start_time_1}}</pre>

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
            <div class="ks-form-group">
                <div class="ks-label">Timepicker (24-Hour)</div>
                <ks-timepicker
                    name="start_time"
                    :time-format="time_format"
                    min-time="00:00"
                    display-format="H:i"
                    time-step="30"
                    v-model="start_time_2"
                ></ks-timepicker>
            </div>
            <pre>display format: H:i</pre>
            <pre>format: {{time_format}}</pre>
            <pre>v-model: {{start_time_2}}</pre>

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

        <div class="basic-block">
            <div class="ks-form-group">
                <div class="ks-label">Timepicker (end-of-day option)</div>
                <ks-timepicker
                    name="start_time"
                    :time-format="time_format"
                    display-format="h:i A"
                    time-step="30"
                    v-model="start_time_3"
                    :end-of-day="true"
                ></ks-timepicker>
            </div>
            <pre>display format: h:i A</pre>
            <pre>format: {{ time_format }}</pre>
            <pre>v-model: {{ start_time_3 }}</pre>

            <code-block>
                <template v-pre>
                    &lt;ks-timepicker
                        name="start_time"
                        :time-format="time_format"
                        display-format="h:i A"
                        time-step="30"
                        v-model="start_time"
                        :end-of-day="true"
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
                start_time_1: '',
                start_time_2: '',
                start_time_3: '',
            }
        },

        components: {
            KsTimepicker
        }
    }
</script>
