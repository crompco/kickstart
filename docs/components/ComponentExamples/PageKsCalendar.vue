<template>
    <div>
        <div class="basic-block">
            <h3>Plain Calendar with Event Slot</h3>
            <ks-calendar
                v-model="date1"
            >
                <div :slot="'2017-03-22'">
                    <strong>Patty's Birthday</strong>
                </div>
            </ks-calendar>
            <code-block>
                <template v-pre>
                    &lt;ks-calendar v-model="date1">
                        &lt;div :slot="'2017-03-22'">
                            &lt;strong>Patty's Birthday&lt;/strong>
                        &lt;/div>
                    &lt;/ks-calendar>
                </template>
            </code-block>
        </div>
        <div class="basic-block">
            <h3>Custom Week Start without controls</h3>
            <ks-calendar
                v-model="date2"
                week-start="1"
                week-height="80px"
                :show-controls="false"
            ></ks-calendar>
            <code-block>
                <template v-pre>
                    &lt;ks-calendar
                        v-model="date2"
                        week-start="1"
                        week-height="80px"
                        :show-controls="false"
                    >&lt;/ks-calendar>
                </template>
            </code-block>
        </div>

        <div class="basic-block">
            <h3>Interactive Days and month+year picker</h3>
            <ks-calendar
                v-model="date3"
                week-height="80px"
                :interactive-days="true"
                :year-picker="true"
                :month-picker="true"
            >
                <div :slot="bday">
                    <strong>Today is special</strong>
                </div>
            </ks-calendar>

            <code-block>
                <template v-pre>
                    &lt;ks-calendar
                        v-model="date3"
                        week-height="80px"
                        :show-trailing-days="true"
                        :year-picker="true"
                        :month-picker="true"
                        :interactive-days="true"
                    >
                        &lt;div :slot="bday">
                            &lt;strong>Today is special&lt;/strong>
                        &lt;/div>
                    &lt;/ks-calendar>
                </template>
            </code-block>
        </div>

        <div class="basic-block">
            <h3>drag+drop</h3>
            <div class="row">
                <div class="lg-8">
                    <ks-calendar
                        v-model="date4"
                        week-height="80px"
                        :interactive-days="true"
                        :year-picker="true"
                        :month-picker="true"
                        :droppable-days="true"
                        @drop-on-date="changeDraggedObjectDate($event)"
                    >
                        <ks-draggable :slot="bday">
                            <strong>Today is special</strong>
                        </ks-draggable>
                        <div v-for="date in used_dates" :slot="date" :key="`todo-${date}`">
                            <template v-if="objs_by_day[date] && objs_by_day[date].length">
                                <h3 class="muted">To Do:</h3>
                                <ul>
                                    <li v-for="obj in objs_by_day[date]" :key="`obj-li-${obj.name}`">
                                        <ks-draggable @dragstart="trackObject(obj)">
                                            <strong>{{obj.name}}</strong>
                                        </ks-draggable>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </ks-calendar>
                </div>
                <div class="lg-4">
                    <div class="basic-block">
                        <ks-draggable @dragstart="trackObject({name: 'object3', date:'2019-06-14'})">
                            <strong>object3</strong>
                        </ks-draggable>
                    </div>
                    <div class="basic-block">
                        object3 dropped on {{dropped_on_date}}
                    </div>
                </div>
            </div>

            <code-block>
                <template v-pre>
                    &lt;ks-calendar
                        v-model="date3"
                        week-height="80px"
                        :droppable-days="true"
                    >
                        &lt;div :slot="bday">
                            &lt;ks-draggable>
                                &lt;strong>Today is special&lt;/strong>
                            &lt;/ks-draggable>
                        &lt;/div>
                    &lt;/ks-calendar>
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>
    import KsCalendar from '../../../src/components/KsCalendar';
    import {formatDate} from '../../../src/helpers/dates';

    export default {
        name: 'PageKsCalendar',

        data() {
            return {
                date1: '',
                date2: '',
                date3: '',
                date4: '2019-06-14',
                bday: '2019-06-14',
                showFormat: false,
                dragging_data: null,
                objs: [
                    { date: '2019-06-17', name: 'this' },
                    { date: '2019-07-01', name: 'that' }
                ],
                dropped_on_date: null
            };
        },

        computed: {
            used_dates() {
                let dates = Object.assign({}, this.objs_by_day);
                dates[this.bday] = 1;
                return Object.keys(dates);
            },

            objs_by_day() {
                let dates = this.objs.reduce((accumulator, obj) => {
                    if ( accumulator[obj.date] === undefined ) {
                        accumulator[obj.date] = [];
                    }
                    accumulator[obj.date].push(obj);
                    return accumulator;
                }, {});
                return dates;
            }
        },

        methods: {
            trackObject(obj) {
                this.dragging_data = obj;
            },

            formatDate(date, format) {
                return formatDate(date, format);
            },

            changeDraggedObjectDate(date_obj) {
                let new_date = formatDate(date_obj)
                if (this.dragging_data) {
                    this.dragging_data.date = new_date;
                    this.dragging_data = null;
                } else {
                    this.bday = new_date;
                }
                this.dropped_on_date = new_date;
            }
        },

        components: {
            KsCalendar,
        }
    }
</script>
