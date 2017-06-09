<template>
	<div style="margin-bottom:10em;">
		<h2>Styles</h2>

		<alert></alert>
		<br>
		<buttons></buttons>
		<br>
		<top-bar></top-bar>
		<br>
		<badge></badge>
		<br>
		<helpers></helpers>
	</div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
	import Alert from './Styles/Alert.vue';
	import TopBar from './Styles/TopBar.vue';
	import Buttons from './Styles/Buttons.vue';
	import Badge from './Styles/Badge.vue';
	import Helpers from './Styles/Helpers.vue';

    export default {
        name: 'StylesPage',

		components: {
            Alert,
			TopBar,
            Buttons,
			Badge,
			Helpers
		}
    }
</script>
