<style></style>

<template>
	<div v-show="active">
		<slot></slot>
	</div>
</template>


<script>
	export default {
		name: 'KsTab',

		props: {
			title: {}
		},

		data() {
			return {
				active: false
			};
		},

		computed: {},

		mounted() {
			this.$nextTick(() => {
				this.$parent.registerTab(this);
			});
		},

		methods: {
			setActive(active) {
				this.active = active;
			}
		},

		watch: {},
	}
</script>
