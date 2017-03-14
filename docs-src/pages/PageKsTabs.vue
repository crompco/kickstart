
<template>
	<div>
		<h2>Tabs</h2>

		<div class="callout">
			<ks-tabs>
				<ks-tab title="Foo">
					foo
				</ks-tab>
				<ks-tab title="Bar">
					Another tab
				</ks-tab>
			</ks-tabs>
		</div>
	</div>
</template>


<script>
	import KsTabs from '../../src/components/KsTabs.vue';
	import KsTab from '../../src/components/KsTab.vue';


	export default {
		name: '',

		props: {},

		data() {
			return {};
		},

		computed: {},

		mounted() {

		},

		methods: {},

		watch: {},

		components: {
			KsTabs,
			KsTab
		}
	}
</script>
