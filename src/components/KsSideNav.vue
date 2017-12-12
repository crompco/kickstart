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
	import {removeClass, parent, addClass} from '../helpers/dom';

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
                    removeClass(document.body, 'side-nav-open');
                });
            }

            window.addEventListener('resize', this.windowResize);
        },

		methods: {
	  		showLinks() {
				this.classObj.show = !this.classObj.show;

				if ( this.classObj.show ) {
					addClass(document.body, 'side-nav-open');
				} else {
                    removeClass(document.body, 'side-nav-open');
				}
			},

			windowResize(e) {
	  		    if ( this.classObj.show ) {
                    console.log('window resize: ', e);
				}
			}
		},

		components: {
            MenuSvg
		}
    }
</script>