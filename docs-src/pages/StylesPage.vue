<template>
	<div style="margin-bottom:10em;">
		<alert></alert>
		<br>
		<buttons></buttons>
		<br>
		<top-bar></top-bar>
		<br>
		<tables></tables>
		<br>
		<badge></badge>
	</div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
	import Alert from './Styles/Alert.vue';
	import TopBar from './Styles/TopBar.vue';
	import Buttons from './Styles/Buttons.vue';
	import Tables from './Styles/Tables.vue';
	import Badge from './Styles/Badge.vue';

    export default {
        name: 'StylesPage',

		components: {
            Alert,
			TopBar,
            Buttons,
			Tables,
			Badge
		}
    }
</script>
