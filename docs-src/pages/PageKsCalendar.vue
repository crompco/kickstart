<template>
	<div>
		<div class="basic-block">
			<h3>Plain Calendar with Event Slot</h3>
			<ks-calendar>
				<div :slot="bday">
					Patty's Birthday
				</div>
			</ks-calendar>
		</div>
		<div class="basic-block">
			<h3>Custom Week Start</h3>
			<ks-calendar
				week-start="1"
			></ks-calendar>
		</div>
	</div>
</template>


<script>
	import KsCalendar from '../../src/components/KsCalendar';

	export default {
		name: 'PageKsCalendar',

		props: {},

		data() {
			return {
				bday: "2017-3-22"
			};
		},

		computed: {},

		mounted() {

		},

		methods: {},

		watch: {},

		components: {
			KsCalendar
		}
	}
</script>

<style></style>
