<template>
	<div class="ks-modal" v-show="isOpen">
		<div class="ks-modal-mask" @click.prevent="close">
			<div class="ks-modal-wrapper" @click.stop :style="modalStyle">

				<!-- Modal header-->
				<div class="ks-modal-header" v-if="showHeader">
					<slot name="header">
						<h2>{{title}}</h2>
					</slot>
					<div class="ks-modal-close" v-if="showClose">
						<a href="#" @click.prevent="close">X</a>
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
	import {stopParentScroll} from '../helpers/events';

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
                stopParentScroll(this.$refs.body);
			});
		},

		methods: {
			open() {
				this.isOpen = true;
			},
			close() {
				this.isOpen = false;
			}
		},

		watch: {},
	}
</script>

<style lang="scss">
	.ks-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.ks-modal-mask {
			width: 100%;
			height: 100%;
			background: rgba(40, 40, 40, 0.2);
		}
	    .ks-modal-wrapper {
		    position: absolute;
		    margin: 0 auto;
		    background: white;
		    left: 50%;
		    top: 50%;
		    transform: translate(-50%, -50%);
		    overflow-y: initial !important;
	    }
	    .ks-modal-header {
		    position: relative;
		    overflow: hidden;
		    h1, h2, h3, h4 {
			    margin: 0;
			    padding: 0.5em;
		    }
		    .ks-modal-close {
			    position: absolute;
			    right: 2em;
			    top: 50%;
			    transform: translateY(-50%);
		    }
	    }
		.ks-modal-body, .ks-modal-footer {
			padding: 1em;
		}
	    .ks-modal-body {
		    max-height: calc(100vh - 200px);
		    overflow-y: auto;
	    }
	    .ks-modal-footer:empty {
		    padding: 0;
	    }
	}
</style>
