<template>
	<div class="ks-modal" v-show="isOpen" :class="[{ 'danger': danger }, classObj]">
		<div class="ks-modal-mask" @click.prevent="close"></div>

		<div class="ks-modal-wrapper"
			 :style="modalStyle"
			 tabindex="-1"
			 ref="container"
			 @click.stop
			 @keydown.esc.stop="escape()"
		>

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
</template>


<script>
	// External Dependencies
	import Close from '../svg/close.svg';

	// Internal Dependencies
	import {addEvent, stopParentScroll} from '../helpers/events';
	import {addClass, removeClass} from '../helpers/dom';

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
			},
            minWidth: {
			    type: String,
                default: null
            },
            maxHeight: {
			    type: String,
                default: null
            },
            minHeight: {
                type: String,
                default: null
            },
			closeOnEscape: {
				type: Boolean,
				default: true
			},
            danger: {
                type: Boolean,
                default: false
            },
		},

		data() {
			return {
				isOpen: false,
                classObj: {}
			};
		},

		computed: {
			modalStyle() {
				return {
                    maxHeight: this.maxHeight,
                    minHeight: this.minHeight,
					maxWidth: this.maxWidth,
                    minWidth: this.minWidth
				}
			}
		},

		mounted() {
			this.$on('open', () => {
				this.$nextTick(() => {
					this.$refs.container.focus();
				});
			});
		},

		methods: {
			open() {
				this.isOpen = true;
				this.$emit('open');

				addClass(document.documentElement, 'modal-open');

                this.$nextTick(() => {
					let modal = this.$el.querySelectorAll('.ks-modal-wrapper');
					let modal_height = modal[0].clientHeight;
					let window_height = document.documentElement.clientHeight;
					if ( modal_height > window_height ) {
					    this.$set(this.classObj, 'modal-scroll', true);

                        this.$nextTick(() => {
                            let style = window.getComputedStyle(modal[0]);
                            modal_height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
                            this.$el.querySelectorAll('.ks-modal-mask')[0].style.height = `${modal_height}px`;
						})
					}

                    this.$el.scrollTop = 0;
				});
            },
			close() {
				this.isOpen = false;
				this.$emit('close');

                removeClass(document.documentElement, 'modal-open');

                this.$nextTick(() => {
                    this.$set(this.classObj, 'modal-scroll', false);
                })
            },
			escape() {
				if ( this.closeOnEscape ) {
					this.close();
				}
			}
		},

		components: {
		    Close
		}
	}
</script>
