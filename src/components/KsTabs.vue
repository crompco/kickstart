<template>
	<div class="ks-tabs">
		<ul class="tabs-title-bar">
			<li v-for="tab in tabs" :class="{'selected-tab': tab.active}">
				<a href="#"
				   @click.prevent="setActiveTab(tab)"
				>
					{{tab.title}}
				</a>
			</li>
		</ul>
		<div class="tabs-content">
			<slot></slot>
		</div>
	</div>
</template>


<script>

	import throttle from '../helpers/throttle';

	export default {
		name: 'KsTabs',

		props: {},

		data() {
			return {
				tab: '',
				activeTab: null,
				tabs: []
			};
		},

		computed: {},

		mounted() {
			this.tabs = [];
		},

		methods: {
			registerTab(tab) {
				this.tabs.push(tab);
				if ( !this.activeTab ) {
					this.setActiveTab(tab);
				}
			},
			setActiveTab(tab) {
				this.activeTab = tab.title;
				tab.setActive(true);
				this.$emit('tab-changed', tab.title);
			}
		},

		watch: {},
	}
</script>

<style lang="scss">
	.ks-tabs {
		.tabs-title-bar {
			padding: 0;
			margin: 0;
			list-style: none;
			li {
				display: inline-block;
			}
		}
	}
</style>
