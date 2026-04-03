<template>
	<div class="top-bar" :class="classObj">
		<button class="mobile-menu">
			<menu-icon></menu-icon>
		</button>

		<button class="mobile-menu has-sidebar" v-if="hasSidebar">
			<dots-horizontal-icon></dots-horizontal-icon>
		</button>
		<slot></slot>
	</div>
</template>

<script>
    // External Dependencies
    import MenuIcon from './icons/MenuIcon.vue';
    import DotsHorizontalIcon from './icons/DotsHorizontalIcon.vue';

    // Internal Dependencies
    import {addEvent} from '../helpers/events';
    import {toggleClass, parent, removeClass} from '../helpers/dom';

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
                },
				selector: null
            }
        },

        mounted() {
            this.selector = this.hasSidebar ? '.side-nav' : '.top-bar';
            addEvent(this.$el.querySelector('.mobile-menu'), 'click', (e) => {
                e.preventDefault();

                toggleClass(document.querySelector(this.selector), 'show');
                toggleClass(document.body, 'side-nav-open');
                window.addEventListener('resize', this.windowResize);
            });

            const dropdown = this.$el.querySelector('.dropdown-toggle');
            if ( dropdown ) {
                addEvent(dropdown, 'click', function(e) {
                    e.preventDefault();

                    toggleClass(parent(this, '.dropdown'), 'show');
                });
            }

            if ( this.hasSidebar ) {
                addEvent(this.$el.querySelector('.mobile-menu.has-sidebar'), 'click', function(e) {
			   		e.preventDefault();

			   		toggleClass(parent(this, '.top-bar'), 'show');
				});
			}
        },

		methods: {
	  		windowResize() {
	  		    let style = window.getComputedStyle(this.$el.querySelector('.mobile-menu'));

	  		    if ( style.display == 'none' ) {
					removeClass(document.body, 'side-nav-open');
					removeClass(document.querySelector(this.selector), 'show');
					window.removeEventListener('resize', this.windowResize);
				}
			}
		},

		components: {
            MenuIcon,
            DotsHorizontalIcon,
		}
    }
</script>