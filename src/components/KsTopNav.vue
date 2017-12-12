<template>
	<div class="top-bar" :class="classObj">
		<button class="mobile-menu">
			<menu-svg></menu-svg>
		</button>

		<button class="mobile-menu has-sidebar" v-if="hasSidebar">
			<dots-horizontal></dots-horizontal>
		</button>
		<slot></slot>
	</div>
</template>

<script>
    // External Dependencies
    import MenuSvg from '../svg/menu.svg';
    import DotsHorizontal from '../svg/dots-horizontal-triple.svg';

    // Internal Dependencies
    import {addEvent} from '../helpers/events';
    import {toggleClass, parent} from '../helpers/dom';

    export default {
        name: 'KsTopNav',

        props: {
	  		hasSidebar: {
	  		    type: Boolean,
				default: false
			},

			fixed: {
	  		    type: Boolean,
				default: false
			}
		},

        data() {
            return {
                classObj: {
					fixed: this.fixed
                }
            }
        },

        mounted() {
            let $selector = this.hasSidebar ? '.side-nav' : '.top-bar';
            addEvent(this.$el.querySelector('.mobile-menu'), 'click', (e) => {
                e.preventDefault();

                toggleClass(document.querySelector($selector), 'show');
                toggleClass(document.body, 'side-nav-open');
            });

            addEvent(this.$el.querySelector('.dropdown-toggle'), 'click', function(e) {
		 		e.preventDefault();

		 		toggleClass(parent(this, '.dropdown'), 'show');
			});

            if ( this.hasSidebar ) {
                addEvent(this.$el.querySelector('.mobile-menu.has-sidebar'), 'click', function(e) {
			   		e.preventDefault();

			   		toggleClass(parent(this, '.top-bar'), 'show');
				});
			}
        },

		components: {
            MenuSvg,
            DotsHorizontal
		}
    }
</script>