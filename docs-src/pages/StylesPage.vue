<template>
	<div>
		<alert></alert>
		<br>
		<top-bar></top-bar>
	</div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
	import Alert from './Styles/Alert.vue';
	import TopBar from './Styles/TopBar.vue';

    export default {
        name: 'StylesPage',

		components: {
            Alert,
			TopBar
		}
    }
</script>