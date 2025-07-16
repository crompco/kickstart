<template>
    <div>
        <div class="basic-block row">
            <div class="med-6">
                <div class="ks-form-group">
                    <div class="ks-label">Simple Datepicker</div>
                    <div class="data">
                        <ks-datepicker
                            ref="dpicker"
                            v-model="date1"
                        ></ks-datepicker>
                    </div>
                </div>
                <h3></h3>
            </div>

            <div class="med-6">
                <pre><strong>v-model</strong>: {{date1}}</pre>
            </div>

            <div class="med-12">
                <code-block>
                    <template v-pre>
                        &lt;ks-datepicker v-model="date1">&lt;/ks-datepicker>
                    </template>
                </code-block>
            </div>
        </div>


        <div class="basic-block row">
            <div class="med-6">
                <div class="ks-form-group">
                    <div class="ks-label">Custom Date format with year and month picker</div>
                    <div class="data">
                        <ks-datepicker
                            v-model="date2"
                            :year-picker="true"
                            :month-picker="true"
                            date-format="m/d/Y"
                        ></ks-datepicker>
                    </div>
                </div>
            </div>

            <div class="med-6">
                <pre><strong>v-model</strong>: {{date2}}</pre>
            </div>

            <div class="med-12">
                <code-block>
                    <template v-pre>
                        &lt;ks-datepicker
                            v-model="date2"
                            :year-picker="true"
                            :month-picker="true"
                            date-format="m/d/Y"
                        >&lt;/ks-datepicker>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="basic-block row">
            <div class="med-6">
                <div class="ks-form-group">
                    <div class="ks-label">min/max Date requirements</div>
                    <div class="data">
                        <ks-datepicker
                            v-model="date3"
                            :year-picker="true"
                            :month-picker="true"
                            :min-date="minDate"
                            :max-date="maxDate"
                            @input-error="$toast({type: 'error', message: 'Invalid date provided'})"
                        ></ks-datepicker>
                    </div>
                </div>
            </div>
            <div class="med-6">
                <pre><strong>v-model</strong>: {{date3}}</pre>
            </div>

            <div class="med-12">
                <code-block>
                    <template v-pre>
                        &lt;ks-datepicker
                            v-model="date3"
                            :year-picker="true"
                            :month-picker="true"
                            :min-date="minDate"
                            :max-date="maxDate"
                            @input-error="$toast({type: 'error', message: 'Invalid date provided'})"
                        >&lt;/ks-datepicker>
                    </template>
                </code-block>
            </div>
        </div>

        <code-block title="Page Code" lang="language-js">
            import KsDatepicker from '../../src/components/KsDatepicker.vue';
            import KsTabs from '../../src/components/KsTabs.vue';
            import KsTab from '../../src/components/KsTab.vue';
            import {dateModify} from '../../src/helpers/dates';

            export default {
                name: 'PageKsDatepicker',

                data() {
                    return {
                        date1: '2017-08-01',
                        date2: '02/21/2017',
                        date3: new Date(),
                        minDate: dateModify(new Date(), 'day', -2),
                        maxDate: dateModify(new Date(), 'day', +5),
                    };
                },

                components: {
                    KsDatepicker,
                    KsTabs,
                    KsTab
                },
            }
        </code-block>
    </div>
</template>


<script>
    import KsDatepicker from '../../../src/components/KsDatepicker.vue';
    import {dateModify} from '../../../src/helpers/dates';

    export default {
        name: 'PageKsDatepicker',

        props: {},

        data() {
            return {
                date1: '2017-08-01',
                date2: '02/21/2017',
                date3: new Date(),
                minDate: dateModify(new Date(), 'day', -2),
                maxDate: dateModify(new Date(), 'day', +5),
            };
        },

        components: {
            KsDatepicker,
        },
    }
</script>