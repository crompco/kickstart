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

<style lang="scss">
	$base-spinner-size: 28px;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		50% {
			background: white;
		}
	}

	.ks-loader-spin {
		position: relative;
		text-align: center;
	}

	.ks-spin-loading {
		border-radius: 50%;
		width: $base-spinner-size;
		height: $base-spinner-size;
		border: .25rem solid #ddd;
		border-top-color: darkblue;
		animation: spin 1s infinite linear;
		margin: 0 auto;
		&--double {
			 border-style: double;
			 border-width: .5rem;
		 }
		&--2x {
			 border: .5rem solid #ddd;
			 border-top-color:darkblue;
			 width: $base-spinner-size*2;
			 height: $base-spinner-size*2;
		 }
	}
</style>
