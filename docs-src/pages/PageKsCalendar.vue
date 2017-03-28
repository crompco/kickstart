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
		</div>
		<div class="basic-block">
			<h3>Custom Week Start</h3>
			<ks-calendar
				v-model="date2"
				week-start="1"
			    week-height="80px"
			></ks-calendar>
		</div>
	</div>
</template>


<script>
	import KsCalendar from '../../src/components/KsCalendar';
	import KsDatepicker from '../../src/components/KsDatepicker';

	export default {
		name: 'PageKsCalendar',

		props: {},

		data() {
			return {
				date1: '',
				date2: '',
				bday: "2017-03-22"
			};
		},

		computed: {},

		mounted() {

		},

		methods: {},

		watch: {},

		components: {
			KsCalendar,
			KsDatepicker,
		}
	}
</script>

<style></style>
