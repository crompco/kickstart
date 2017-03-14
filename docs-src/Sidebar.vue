
<template>
	<div id="sidebar" class="nav-bar vertical fixed">
		<ul class="nav">
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
