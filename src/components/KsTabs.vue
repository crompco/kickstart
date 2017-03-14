<template>
	<div class="ks-tabs">

		<div
			class="ks-tabs active-tab-indicator"
		></div>
	</div>
</template>


<script>
	export default {
		name: 'KsTabs',

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
			RenderVnodes: {
				name: 'render-vnodes',
				functional: true,
				props: ['nodes'],
				render(createElement, context) {
					return createElement('div', context.props.nodes);
				}
			}
		}
	}
</script>

<style></style>
