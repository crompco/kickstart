<template>
	<div class="ks-tabs">
		<ul class="tabs-title-bar">
			<ul>
				<li v-for="tab in tabs">
					<a href="#" @click.prevent="setActiveTab(tab)">{{tab.title}}</a>
				</li>
			</ul>
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
			},
			setActiveTab(tab) {
				tab.setActive(true);
			}
		},

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
