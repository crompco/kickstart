<template>
	<div class="top-bar fixed">
		<button class="mobile-menu" @click="showLinks()">
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
			}
		},

        data() {
            return {
                classObj: {
                    show: false
                }
            }
        },

        mounted() {
            let $selector = this.hasSidebar ? '.side-nav' : '.top-bar';
            addEvent(this.$el.querySelector('.mobile-menu'), 'click', (e) => {
                e.preventDefault();

                toggleClass(document.querySelector($selector), 'show');
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

        methods: {
            showLinks() {
                this.classObj.show = !this.classObj.show;
            }
        },

		components: {
            MenuSvg,
            DotsHorizontal
		}
    }
</script>