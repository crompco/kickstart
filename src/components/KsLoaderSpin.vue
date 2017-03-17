<template>
	<div class="ks-loader-spin" v-if="show">
		<div class="ks-spin-loading"></div>
	</div>
</template>


<script>
	export default {
		name: 'KsLoaderSpin',

		props: {
			show: {
				default: false
			}
		},

		data() {
			return {};
		},

		computed: {},

		mounted() {

		},

		methods: {},

		watch: {},
	}
</script>
