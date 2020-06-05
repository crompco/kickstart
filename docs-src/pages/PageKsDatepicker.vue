<template>
	<div class="col sm-full">
		<h2>Datepicker</h2>
		<div class="basic-block row">
			<div class="med-6">
                <div class="form-group">
                    <div class="label">Simple Datepicker</div>
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
                <div class="form-group">
                    <div class="label">Custom Date format with year and month picker</div>
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
                <div class="form-group">
                    <div class="label">min/max Date requirements</div>
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
                    KsTabs,
                    KsTab
                },
            }
        </code-block>


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
							<td>value <span class="v-model">v-model</span></td>
							<td><pre>String, Date</pre></td>
							<td><pre>NULL</pre></td>
							<td>
								The v-model binded prop on the datepiker. Should be provided via v-model.
								If only the prop is sent then you would need to listen for the input
								event to update the prop
							</td>
						</tr>
						<tr>
							<td>dateFormat</td>
							<td><pre>String</pre></td>
							<td><pre>Y-m-d</pre></td>
							<td>Format for the date value being binded to the v-model. All formats should include a single 'Y', 'm', 'd'</td>
						</tr>
						<tr>
							<td>displayFormat</td>
							<td><pre>String</pre></td>
							<td><pre>m/d/Y</pre></td>
							<td>Format for the date being displayed in the input. All formats should include a single 'Y', 'm', 'd'</td>
						</tr>
						<tr>
							<td>name</td>
							<td><pre>String</pre></td>
							<td><pre>ks_datepicker</pre></td>
							<td>The name of the input field</td>
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
                            <td>minDate</td>
                            <td><pre>String</pre></td>
                            <td><pre>NULL</pre></td>
                            <td>The minimum date that can be selected. Should be in the same format as `dateFormat`</td>
                        </tr>
                        <tr>
                            <td>maxDate</td>
                            <td><pre>String</pre></td>
                            <td><pre>NULL</pre></td>
                            <td>The maximum date that can be selected. Should be in the same format as `dateFormat`</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td><pre>Boolean</pre></td>
                            <td><pre>false</pre></td>
                            <td>Whether or not to disable the input field of the date.</td>
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
							<td><pre>calendar_change</pre></td>
							<td>Fired when the calendar is being controlled. For instance the month/year is changed</td>
						</tr>
						<tr>
							<td><pre>open</pre></td>
							<td>Fired when the datepicker calendar is opened</td>
						</tr>
						<tr>
							<td><pre>close</pre></td>
							<td>Fired when the datepicker calendar is closed</td>
						</tr>
                        <tr>
                            <td><pre>input-error</pre></td>
                            <td>Fired when a value is set out of the range (min/max restrictions). Payload will have the date.</td>
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
							<td><pre>open()</pre></td>
							<td>Used to open the datepicker calendar selector</td>
						</tr>
						<tr>
							<td><pre>close()</pre></td>
							<td>Used to close the datepicker calendar selector</td>
						</tr>
					</tbody>
				</table>
			</ks-tab>
		</ks-tabs>

	</div>
</template>


<script>
	import KsDatepicker from '../../src/components/KsDatepicker.vue';
	import KsTabs from '../../src/components/KsTabs.vue';
	import KsTab from '../../src/components/KsTab.vue';
	import {dateModify} from '../../src/helpers/dates';

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
			KsTabs,
			KsTab
		},
	}
</script>

<style></style>
