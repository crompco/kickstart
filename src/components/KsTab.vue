<style></style>

<template>
	<div v-show="active" :class="{'active-tab': active}">
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

				let parent = this.getTabsParent(this);

				parent.registerTab(this);
				parent.$on('tab-changed', (title) => {
					if ( title != this.title ) {
						this.active = false;
					}
				})
			});
		},

		methods: {
			setActive(active) {
				this.active = active;
			},
			getTabsParent(vm) {
				if ( vm.$parent.$options._componentTag === 'ks-tabs' ) {
					return this.$parent;
				}

				return this.getTabsParent(this.$parent);
			}
		},

		watch: {},
	}
</script>
