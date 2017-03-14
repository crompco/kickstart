<template>
	<div>
		<h2>Loaders</h2>

		<div class="callout">
			<button class="button" @click="show=!show">
				<template v-if="show">
					Stop
				</template>
				<template v-else>
					Show
				</template>
			</button>
			<p>
				<ks-loader-line :show="show"></ks-loader-line>
			</p>
		</div>

		<div class="callout">
			<button class="button" @click="show_spin=!show_spin">
				<template v-if="show_spin">
					Stop
				</template>
				<template v-else>
					Show
				</template>
			</button>
			<p>
				<ks-loader-spin :show="show_spin"></ks-loader-spin>
			</p>
		</div>
	</div>
</template>


<script>

	import KsLoaderLine from '../../src/components/KsLoaderLine.vue';
	import KsLoaderSpin from '../../src/components/KsLoaderSpin.vue';

	export default {
		name: 'PageKsLoaders',

		props: {},

		data() {
			return {
				show: true,
				show_spin: true
			};
		},

		computed: {},

		mounted() {

		},

		methods: {

		},

		watch: {},

		components: {
			KsLoaderLine,
			KsLoaderSpin
		}
	}
</script>

<style lang="scss">
	.loader-line {
		height: 4px;
		width: 100%;
		position: relative;
		overflow: hidden;
		background-color: #ddd;
	}
	.loader-line:before{
		display: block;
		position: absolute;
		content: "";
		left: -200px;
		width: 200px;
		height: 4px;
		background-color: darkblue;
		animation: line-loading 1.5s linear infinite;
	}

	@keyframes line-loading {
		from {left: -100px; width: 20%;}
		50% {width: 30%;}
		70% {width: 70%;}
		80% { left: 50%;}
		95% {left: 120%;}
		to {left: 100%;}
	}
</style>
