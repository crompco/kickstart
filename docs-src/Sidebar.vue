
<template>
	<ks-side-nav id="sidebar" class="vertical fixed">
		<div class="brand">Kickstart</div>
		<ul class="nav-links">
			<li v-for="route in routes">
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

		computed: {},

		mounted() {

		},

		methods: {},

		watch: {},

		components: {
            KsSideNav
		}
	}
</script>

