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