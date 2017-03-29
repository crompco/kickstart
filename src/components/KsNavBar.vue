<template>
	<div class="nav-bar" :class="classObj">
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

    export default {
        name: 'KsNavBar',

		data() {
	  		return {
	  		    classObj: {
					show: false
				}
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