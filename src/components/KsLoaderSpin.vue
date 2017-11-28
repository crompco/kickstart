<template>
	<div class="ks-loader-spin" v-if="show" :style="wrapperStyle">
        <div class="spinner-block" :style="spinnerBlockStyle">
            <div class="ks-spin-loading" :class="spinnerClass" :style="spinnerStyle"></div>
        </div>
	</div>
</template>


<script>
	export default {
		name: 'KsLoaderSpin',

		props: {
			show: {
				default: false
			},
            height: {
                type: String,
                default: 'auto'
            },
            width: {
                type: String,
                default: 'auto'
            },
            size: {
                type: String,
                default: null
            },
            color: {
                type: String,
                default: null
            },
            bg: {
                type: String,
                default: null
            }
		},

		computed: {
            wrapperStyle() {
                return {
                    height: this.height,
                    width: this.width
                }
            },
            spinnerStyle() {
                let style = "";
                if ( this.bg ) {
                    style += `border-color: ${this.bg};`;
                }
                if ( this.color ) {
                    style += `border-top-color: ${this.color}`;
                }

                return style;
            },
            spinnerBlockStyle() {
                let style = '';

                if ( this.height && this.height != 'auto' ) {
                    style += `position: absolute; top: 50%;` +
                        `left: 50%;transform: perspective(1px) translate(-50%, -50%);`
                }

                return style;
            },
            spinnerClass() {
                return {
                    'loader-tiny': this.size == 'tiny',
                    'loader-small': this.size == 'small',
                    'loader-medium': this.size == 'medium',
                    'loader-large': this.size == 'large',
                    'loader-x-large': this.size == 'x-large',
                };
            }
        },

		data() {
			return {};
		},

		mounted() {

		},

		methods: {},

		watch: {},
	}
</script>
