<template>
	<div v-show="show" class="loader-line" :style="loader_style"></div>
</template>


<script>
	export default {
		props: {
			height: {
				default: '5px'
			},
			show: {
				default: false
			},
			absolute: {
				default: false
			},
			zIndex: {
				default: 1
			}
		},

		computed: {
			loader_style() {
				return {
					height: this.height,
					position: this.absolute ? 'absolute' : null,
					zIndex: this.zIndex
				}
			}
		}
	}
</script>
