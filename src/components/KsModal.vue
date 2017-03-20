<template>
	<div class="ks-modal" v-show="isOpen">
		<div class="ks-modal-mask" @click.prevent="close">
			<div class="ks-modal-wrapper" @click.stop :style="modalStyle">

				<!-- Modal header-->
				<div class="ks-modal-header" v-if="showHeader">
					<slot name="header">
						<h4>{{title}}</h4>
					</slot>
					<div class="ks-modal-close" v-if="showClose">
						<a href="#" @click.prevent="close"><close></close></a>
					</div>
				</div>

				<!-- Modal body-->
				<div class="ks-modal-body" ref="body">
					<slot></slot>
				</div>

				<!-- Modal Footer-->
				<div class="ks-modal-footer"><slot name="footer"></slot></div>

			</div>
		</div>
	</div>
</template>


<script>
	// External Dependencies
	import Close from '../svg/close.svg';

	// Internal Dependencies
	import {addEvent} from '../helpers/events';

	export default {
		name: 'KsModal',

		props: {
			title: {
				type: String,
				default: 'Notification'
			},
			showHeader: {
				type: Boolean,
				default: true
			},
			showClose: {
				type: Boolean,
				default: true
			},
			maxWidth: {
				default: '50%'
			}
		},

		data() {
			return {
				isOpen: false
			};
		},

		computed: {
			modalStyle() {
				return {
					maxHeight: this.maxHeight,
					maxWidth: this.maxWidth
				}
			}
		},

		mounted() {
			this.$nextTick(() => {
				console.log('adding event');
				addEvent(this.$refs.body, 'mousewheel', (e) => {
					e = window.event || e;

					let offsetHeight = this.$refs.body.offsetHeight;
					let scrollHeight = this.$refs.body.scrollHeight;
					let scrollTop = this.$refs.body.scrollTop;

					if ( e.wheelDelta > 0 || e.deltaY < 0 ) {
						if ( scrollTop == 0 ) {
							e.preventDefault();
						}
					} else {
						if ( offsetHeight + scrollTop >= scrollHeight ) {
							e.preventDefault();
						}
					}

					e.stopPropagation();
				});
			})
		},

		methods: {
			open() {
				this.isOpen = true;
			},
			close() {
				this.isOpen = false;
			},
			scrolling() {
				console.log('scrolling');
			}
		},

		watch: {},

		components: {
		    Close
		}
	}
</script>