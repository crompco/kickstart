<template>
	<div class="col sm-full">
        <h2>Calendar</h2>
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
							<td>date <span class="v-model">v-model</span></td>
							<td><pre>String, Date</pre></td>
							<td><pre>NULL</pre></td>
							<td>
								The v-model binded prop on the calendar. Should be provided via v-model.
								If only the prop is sent then you would need to listen for the input
								event to update the prop
							</td>
						</tr>
						<tr>
							<td>selection</td>
							<td><pre>String</pre></td>
							<td><pre></pre></td>
							<td>This is a date that should be highlighted as selected</td>
						</tr>
						<tr>
							<td>weekStart</td>
							<td><pre>String, Number</pre></td>
							<td><pre>0</pre></td>
							<td>The day index that the week should start on. 0 = Sunday</td>
						</tr>
						<tr>
							<td>abbrevDay</td>
							<td><pre>Boolean</pre></td>
							<td><pre>true</pre></td>
							<td>Whether or not to use the abbreviated version of the days name</td>
						</tr>
						<tr>
							<td>abbrevMonth</td>
							<td><pre>Boolean</pre></td>
							<td><pre>false</pre></td>
							<td>Whether or not to use the abbreviated version of the months name</td>
						</tr>
						<tr>
							<td>format</td>
							<td><pre>String</pre></td>
							<td><pre>Y-m-d</pre></td>
							<td>Format for the date value being binded to the v-model. All formats should include a single 'Y', 'm', 'd'</td>
						</tr>
						<tr>
							<td>weekHeight</td>
							<td><pre>String</pre></td>
							<td><pre>auto</pre></td>
							<td>
								This is the height of each week. If nothing is applied then the height is just an auto height.
								For a clean look it is recommended to use this prop
							</td>
						</tr>
						<tr>
							<td>interactive</td>
							<td><pre>Boolean</pre></td>
							<td><pre>false</pre></td>
							<td>
                                Whether or not to make the calendar interactive so you can click on the cells.
                                Emits the select event (used with datepicker).
                            </td>
						</tr>
                        <tr>
                            <td>interactiveDays</td>
                            <td><pre>Boolean</pre></td>
                            <td><pre>false</pre></td>
                            <td>
                                Whether or not to make the days click-able. Different from the 'interactive' prop because
                                this only makes the day number clickable not the whole cell.
                            </td>
                        </tr>
						<tr>
							<td>yearPicker</td>
							<td><pre>Boolean</pre></td>
							<td><pre>false</pre></td>
							<td>Whether to allow the user to use the year picker. This makes the year in the header interactive</td>
						</tr>
						<tr>
							<td>monthPicker</td>
							<td><pre>Boolean</pre></td>
							<td><pre>false</pre></td>
							<td>Whether to allow the user to use the month picker. This makes the month in the header interactive</td>
						</tr>
                        <tr>
                            <td>showControls</td>
                            <td><pre>Boolean</pre></td>
                            <td><pre>true</pre></td>
                            <td>
                                Whether to show the left and right navigation in the header
                            </td>
                        </tr>
                        <tr>
                            <td>droppableDays</td>
                            <td><pre>Boolean</pre></td>
                            <td><pre>false</pre></td>
                            <td>
                                Whether something can be dragged and dropped onto a date on the calendar
                            </td>
                        </tr>
                        <tr>
                            <td>droppableActiveClass</td>
                            <td><pre>String</pre></td>
                            <td><pre>'drop-zone-active'</pre></td>
                            <td>
                                class to use when an item is dragged over the droppable area
                            </td>
                        </tr>
                        <tr>
                            <td>droppableInactiveClass</td>
                            <td><pre>String</pre></td>
                            <td><pre>''</pre></td>
                            <td>
								class used when the droppable area has no item being dragged over it
							</td>
                        </tr>
					</tbody>
				</table>
			</ks-tab>

			<ks-tab title="Events">
				<table class="table striped events-table">
					<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td><pre>input</pre></td>
						<td>This is fired when the value is changed</td>
					</tr>
					<tr>
						<td><pre>select</pre></td>
						<td>Fired when a day is selected. Payload includes the date formatted to a string</td>
					</tr>
					<tr>
						<td><pre>previous</pre></td>
						<td>Fired when the calendar controls for previous month is clicked</td>
					</tr>
					<tr>
						<td><pre>next</pre></td>
						<td>Fired when the calendar controls for next month is clicked</td>
					</tr>
					<tr>
						<td><pre>drop-on-date</pre></td>
						<td>Fired when something is dragged and dropped onto a date cell</td>
					</tr>
					</tbody>
				</table>
			</ks-tab>

			<ks-tab title="Methods">
				<table class="table striped methods-table">
					<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
					</tr>
					</thead>
					<tbody>
						<tr>
							<td><pre>setLang(language)</pre></td>
							<td>
								Used to set the language of the calendar. <a href="" @click.prevent="showFormat = !showFormat">See format</a>
<pre style="font-size: 0.8em; background: white;" v-show="showFormat">{
	months: {
		names: [
			"January", "February", "March", "April",
			"May", "June", "July", "August",
			"September", "October", "November", "December"
		],
		abbreviations: [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		]
	},
	days: {
		names: [
			"Sunday", "Monday", "Tuesday", "Wednesday",
			"Thursday", "Friday", "Saturday"
		],
		abbreviations: [
			"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
		]
	}
}</pre>
							</td>
						</tr>
					</tbody>
				</table>
			</ks-tab>
			<ks-tab title="Slots">
				<table class="table striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Dynamic</td>
							<td>This is a dynamic slot component name. The name can be any date in the format that is specified in the props tab. The default is 'Y-m-d' or '2017-01-31'</td>
						</tr>
					</tbody>
				</table>
			</ks-tab>
		</ks-tabs>
	</div>
</template>


<script>
	import KsCalendar from '../../src/components/KsCalendar';
	import {formatDate} from '../../src/helpers/dates';

	export default {
		name: 'PageKsCalendar',

		props: {},

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

		mounted() {

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

		watch: {},

		components: {
			KsCalendar,
		}
	}
</script>

<style></style>
