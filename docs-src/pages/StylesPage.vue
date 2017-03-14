<template>
	<div>
		<alert></alert>
		<br>
		<buttons></buttons>
		<br>
		<top-bar></top-bar>
	</div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
	import Alert from './Styles/Alert.vue';
	import TopBar from './Styles/TopBar.vue';
	import Buttons from './Styles/Buttons.vue';

    export default {
        name: 'StylesPage',

		components: {
            Alert,
			TopBar,
            Buttons
		}
    }
</script>