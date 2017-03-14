
<template>
	<div id="sidebar" class="nav-bar vertical fixed">
		<ul class="nav-links">
			<li v-for="route in routes">
				<router-link :to="{name: route.name}">
					{{route.name}}
				</router-link>
			</li>
		</ul>
	</div>
</template>


<script>

	import routes from './routes';

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
	}
</script>

<style lang="scss">
	#sidebar {
		padding-top: 1em;
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		a {
			padding: 0.5em 1em;
			color: white;
		}
	}
</style>
