<template>
	<div id="app" class="keen-docs">
		<router-view></router-view>
	</div>
</template>

<script>
//	import Sidebar from './Sidebar.vue';
//	import UiIconButton from 'src/UiIconButton.vue';

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
					window.Prism.highlightAll();
					this.$refs.pageContent.scrollTop = 0;
					this.showSidebar = false;
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
//			Sidebar,
//			UiIconButton
		}
	};
</script>
