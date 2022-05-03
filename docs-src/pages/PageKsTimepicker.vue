<template>
    <div>
        <h2>Timepicker</h2>
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
                <div class="label">Timepicker</div>
                <ks-timepicker
                    name="start_time"
                    :time-format="time_format"
                    display-format="H:i"
                    time-step="15"
                    v-model="start_time"
                ></ks-timepicker>
            </div>
            <pre>format: {{time_format}}</pre>
            <pre>v-model: {{start_time}}</pre>

            <code-block>
                <template v-pre>
                    &lt;ks-timepicker
                    name="start_time"
                    :time-format="time_format"
                    display-format="H:i"
                    time-step="15"
                    v-model="start_time"
                    >&lt;/ks-timepicker>
                </template>
            </code-block>
        </div>

        <ks-tabs>
            <ks-tab title="Props">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>timeStep</td>
                            <td>Number,String</td>
                            <td>30</td>
                            <td>
                                The number of minutes to step through for the list of options.
                                ***Note: This implementation assumes nice round numbers for timeStep (e.g. 15 or 30
                                minutes) and minTime (e.g. 9:30 am).  It is not bulletproof and may produce an invalid
                                timeOptions computed property otherwise.
                            </td>
                        </tr>
                        <tr>
                            <td>timeFormat</td>
                            <td>String</td>
                            <td>H:i</td>
                            <td>The format of the value for v-model (options: h,H,i,a,A)</td>
                        </tr>
                        <tr>
                            <td>displayFormat</td>
                            <td>String</td>
                            <td>h:i A</td>
                            <td>The format of the displayed time and options in the list (options: h,H,i,a,A)</td>
                        </tr>
                        <tr>
                            <td>minTime</td>
                            <td>String</td>
                            <td>04:00</td>
                            <td>The minimum time for the options list</td>
                        </tr>
                        <tr>
                            <td>maxTime</td>
                            <td>String</td>
                            <td>24:00</td>
                            <td>The maximum time fore the options list</td>
                        </tr>
                        <tr>
                            <td>listHeight</td>
                            <td>String</td>
                            <td>200px</td>
                            <td>The height of the options list</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Whether or not disable the input</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
            <ks-tab title="Methods">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>setTime(time)</td>
                            <td>Sets the time of the timepicker to the given value</td>
                        </tr>
                        <tr>
                            <td>selectTimeAtIndex(index)</td>
                            <td>Sets the time to the time at the given index in the list of options</td>
                        </tr>
                        <tr>
                            <td>resetList()</td>
                            <td>Resets the list to it's original options (removes filtering)</td>
                        </tr>
                        <tr>
                            <td>resetFocus()</td>
                            <td>Resets the focus of the element and closes the options</td>
                        </tr>
                        <tr>
                            <td>open()</td>
                            <td>Opens the list of options</td>
                        </tr>
                        <tr>
                            <td>close()</td>
                            <td>Closes the list of options</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>
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
                start_time: '00:00'
            }
        },

        components: {
            KsTimepicker
        }
    }
</script>
