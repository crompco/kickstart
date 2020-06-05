<template>
	<div>
		<div class="basic-block">
			<h3>Alerts</h3>
			<div class="alert success">
				<strong>Success</strong> This is a success message
			</div>

			<div class="alert error">
				<strong>Error</strong> This is an error message
			</div>

			<div class="alert info">
				<strong>Info</strong> This is an info message
			</div>

			<div class="alert warning">
				<strong>Warning</strong> This is a warning message
			</div>

			<div>
				<code-block>
                    <template v-pre>
                        &lt;div class="alert success">
                            &lt;strong>Success&lt;/strong>
                            this is a success message
                        &lt;/div>

                        &lt;div class="alert error">
                            &lt;strong>Error&lt;/strong>
                            this is a error message
                        &lt;/div>

                        &lt;div class="alert info">
                            &lt;strong>Info&lt;/strong>
                            this is a info message
                        &lt;/div>

                        &lt;div class="alert warning">
                            &lt;strong>Warning&lt;/strong>
                            this is a warning message
                        &lt;/div>
                    </template>
                </code-block>
			</div>
		</div>
	</div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsAccordion from '../../../src/components/KsAccordion.vue';
    import KsAccordionRow from '../../../src/components/KsAccordionRow.vue';
    import CodeBlock from "../CodeBlock";


    export default {
        name: 'Alert',

        components: {
            CodeBlock,
            KsAccordion,
			KsAccordionRow
		}
    }
</script>
