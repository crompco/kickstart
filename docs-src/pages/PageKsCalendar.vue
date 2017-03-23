<template>
	<div>
		<div class="callout">
			Plain Calendar
			<ks-calendar></ks-calendar>
		</div>
		<div class="callout">
			Custom Week Start
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
			return {};
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
