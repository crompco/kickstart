<style></style>

<template>
	<div v-show="active" :class="{'active-tab': active}">
		<slot v-if="active"></slot>
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
						this.setActive(false);
					}
				})
			});
		},

		methods: {
			setActive(active) {
				this.active = active;
				if ( this.active ) {
                    this.$emit('active');
                } else {
                    this.$emit('inactive');
                }
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
