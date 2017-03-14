<template>
	<div>
		<h2>Modal</h2>

		<div class="callout">
			<button class="button" @click.prevent="openModal('modal1')">
				Simple Modal
			</button>

			<ks-modal title="Simple Modal" ref="modal1">
				<p>
					This is a simple modal with just a title and content
				</p>
			</ks-modal>

			<button class="button" @click.prevent="openModal('modal2')">
				Modal with buttons
			</button>

			<ks-modal title="Modal with buttons" ref="modal2">
				<p>
					This is a simple modal with just a title and content
				</p>
				<div slot="footer">
					<button>Yes</button>
					<button @click.prevent="closeModal('modal2')">Cancel</button>
				</div>
			</ks-modal>

		</div>
	</div>
</template>


<script>

	import KsModal from '../../src/components/KsModal.vue';

	export default {
		name: 'PageKsModal',

		props: {},

		data() {
			return {};
		},

		computed: {},

		mounted() {

		},

		methods: {
			openModal(modal) {
				this.$refs[modal].open();
			},
			closeModal(modal) {
				this.$refs[modal].close();
			}
		},

		watch: {},

		components: {
			KsModal
		}
	}
</script>

<style></style>
