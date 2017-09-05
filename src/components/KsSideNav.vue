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
	import {removeClass, parent} from '../helpers/dom';

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
                addEvent($element, 'click', function (e) {
                    removeClass(parent(this, '.side-nav'), 'show');
                });
            }
		},

		methods: {
	  		showLinks() {
				this.classObj.show = !this.classObj.show;
			}
		},

		components: {
            MenuSvg
		}
    }
</script>