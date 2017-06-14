<template>
	<div class="side-nav" :class="classObj">
		<button class="mobile-menu" @click="showLinks()">
			<menu-svg></menu-svg>
		</button>
		<slot></slot>
	</div>
</template>

<script>
    // External Dependencies
	import MenuSvg from '../svg/menu.svg';

    // Internal Dependencies
	import {addEvent} from '../helpers/events';

    export default {
        name: 'KsSideNav',

		props: {
	  		fixed: {
	  		    type: Boolean,
				default: true
			}
		},

		data() {
	  		return {
	  		    classObj: {
					show: false,
					fixed: this.fixed
				}
			}
		},

		mounted() {
            let $element = this.$el.querySelector('.nav-links');

            if ( $element != null ) {
                addEvent($element, 'click', (e) => {
                    this.classObj.show = !this.classObj.show;
                });
            }
		},

		methods: {
	  		showLinks() {
				this.classObj.show = !this.classObj.show;
			}
		},

		watch: {
			'classObj.show'(val) {

			}
		},

		components: {
            MenuSvg
		}
    }
</script>