
<template>
	<ks-nav-bar id="sidebar" class="vertical fixed">
		<ul class="nav-links">
			<li v-for="route in routes">
				<router-link :to="{name: route.name}">
					{{route.name}}
			</router-link>
			</li>
		</ul>
	</ks-nav-bar>
</template>


<script>

	import routes from './routes';
	import KsNavBar from '../src/components/KsNavBar.vue';

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
		    KsNavBar
		}
	}
</script>

