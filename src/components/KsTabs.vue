<template>
	<div class="ks-tabs">
		<ul class="tabs-title-bar" :class="classObj">
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
			},

			align: {
		        type: String,
		        default: 'center'
			}
		},

		data() {
			return {
				tab: '',
				activeTab: null,
				tabs: [],
				classObj: {
				    "expand": this.expand,
					"title-right": this.align === 'right',
					"title-center": this.align === 'center',
					"title-left": this.align === 'left'
				}
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
