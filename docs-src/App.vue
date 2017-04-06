<template>
	<div id="app" class="kickstart-docs">
		<sidebar></sidebar>
		<div class="content">
			<ks-top-nav :has-sidebar="true" :fixed="true">
				<div class="collapse">
					<div class="form-group">
						<input type="text">

						<button class="button none">Search</button>
					</div>
					<ul class="dropdown right">
						<li>
							<a href="#" class="dropdown-toggle">jimbo.jones@email.com</a>
							<ul class="sub-dropdown">
								<li><a href="#">Profile</a></li>
								<li><a href="#">Sign Out</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</ks-top-nav>
			<router-view ref="pageContent" class="sm-12 med-12"></router-view>
		</div>
	</div>
</template>

<script>
	import Sidebar from './Sidebar.vue';
	import KsTopNav from '../src/components/KsTopNav.vue';

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
            KsTopNav
		}
	};
</script>
