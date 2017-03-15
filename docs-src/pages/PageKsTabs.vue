
<template>
	<div>
		<h2>Tabs</h2>

		<div class="callout">
			<ks-tabs>
				<ks-tab title="Foo">
					<div>
						<p>
							This is the first tab which auto selected
						</p>
					</div>
				</ks-tab>

				<ks-tab title="Bar">
					<div>
						<p>
							This is a tab with some content
						</p>
					</div>
				</ks-tab>

				<ks-tab title="Baz">
					<div>
						<p>
							This the last tab with some content
						</p>
					</div>
				</ks-tab>
			</ks-tabs>
		</div>
		<br>
		<div class="callout">
			<ks-tabs :expand="true">
				<ks-tab title="Foo">
					<div>
						<p>
							This is the first tab which auto selected
						</p>
					</div>
				</ks-tab>

				<ks-tab title="Bar">
					<div>
						<p>
							This is a tab with some content
						</p>
					</div>
				</ks-tab>

				<ks-tab title="Baz">
					<div>
						<p>
							This the last tab with some content
						</p>
					</div>
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
