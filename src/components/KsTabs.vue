<template>
	<div class="ks-tabs">
		<ul class="tabs-title-bar" :class="{ expand: expand }">
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

		props: {
		    expand: {
		        default: false
			}
		},

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
