<template>
	<div id="app" class="kickstart-docs">
		<sidebar></sidebar>
		<router-view ref="pageContent" class="content"></router-view>
	</div>
</template>

<script>
	import Sidebar from './Sidebar.vue';

	export default {
	    name: 'App',

		data() {
			return {
				showSidebar: false,
				description: 'Foo'
			};
		},

		watch: {
			'$route'() {
				this.updatePageTitle();

				this.$nextTick(() => {
					this.$refs.pageContent.scrollTop = 0;
				});
			}
		},

		mounted() {
			this.updatePageTitle();
		},

		methods: {
			updatePageTitle() {
				document.title = this.$route.meta.title + ' | ' + this.description;
			}
		},

		components: {
			Sidebar,
		}
	};
</script>

<style>
	.content {
		padding: 0 2em;
	}
</style>
