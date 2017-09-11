
<template>
	<ks-side-nav id="sidebar" class="vertical">
		<div class="brand">Kickstart</div>
		<ul class="nav-links">
			<li v-for="route in sorted_routes">
				<router-link :to="{name: route.name}">
					{{route.name}}
			</router-link>
			</li>
		</ul>
	</ks-side-nav>
</template>


<script>

	import routes from './routes';
	import KsSideNav from '../src/components/KsSideNav.vue';

	export default {
		name: 'Sidebar',

		props: {},

		data() {
			return {
				routes: routes
			};
		},

		computed: {
		    sorted_routes() {
		        return this.routes.sort((a, b) => {
					if ( a['name'] < b['name'] ) return -1;
					if ( a['name'] > b['name'] ) return 1;
					return 0;
				});
			}
		},

		mounted() {

		},

		methods: {},

		watch: {},

		components: {
            KsSideNav
		}
	}
</script>

