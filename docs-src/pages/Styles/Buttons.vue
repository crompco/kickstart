<template>
	<div>
		<div class="basic-block">
			<h3>Buttons</h3>
			<div class="row">
				<div>Default</div>
				<hr>
				<div class="sm-12">
					<button class="button">
						I'm a default button
					</button>
					<a href="#" class="button tiny">
						I'm a tiny button
					</a>
					<a href="#" class="button small">
						I'm a small button
					</a>
					<a href="#" class="button large">
						I'm a large button
					</a>
				</div>
			</div>
			<br>
			<div class="row">
				<div>Outline</div>
				<hr>
				<div class="sm-12">
					<button class="button outline disabled" disabled="disabled">
						I'm a default button
					</button>
					<a href="#" class="button outline tiny">
						I'm a tiny button
					</a>
					<a href="#" class="button outline small">
						I'm a small button
					</a>
					<a href="#" class="button outline large">
						I'm a large button
					</a>
				</div>
			</div>
			<br>
			<div class="row">
				<div>None</div>
				<hr>
				<div class="sm-12">
					<button class="button none disabled">
						I'm a default button
					</button>
					<a href="#" class="button none tiny">
						I'm a tiny button
					</a>
					<a href="#" class="button none small">
						I'm a small button
					</a>
					<a href="#" class="button none large">
						I'm a large button
					</a>
				</div>
			</div>
		</div>

		<ks-accordion>
			<ks-accordion-row title="Show Code Default">
				Can be used with an anchor tag or button tag
				<pre>
                    <code class="language-markup">
						&lt;button class="button">
							I'm a default button
						&lt;/button>
						&lt;a href="#" class="button tiny">
							I'm a tiny button
						&lt;/a>
						&lt;a href="#" class="button small">
							I'm a small button
						&lt;/a>
						&lt;a href="#" class="button large">
							I'm a large button
						&lt;/a>
                    </code>
                </pre>
			</ks-accordion-row>
			<ks-accordion-row title="Show Code Outline">
				<pre>
                    <code class="language-markup">
						&lt;button class="button outline disabled" disabled="disabled">
							I'm a default button
						&lt;/button>
						&lt;a href="#" class="button outline tiny">
							I'm a tiny button
						&lt;/a>
						&lt;a href="#" class="button outline small">
							I'm a small button
						&lt;/a>
						&lt;a href="#" class="button outline large">
							I'm a large button
						&lt;/a>
                    </code>
                </pre>
			</ks-accordion-row>
			<ks-accordion-row title="Show Code None">
				<pre>
                    <code class="language-markup">
						&lt;button class="button none disabled">
							I'm a default button
						&lt;/button>
						&lt;a href="#" class="button none tiny">
							I'm a tiny button
						&lt;/a>
						&lt;a href="#" class="button none small">
							I'm a small button
						&lt;/a>
						&lt;a href="#" class="button none large">
							I'm a large button
						&lt;/a>
                    </code>
                </pre>
			</ks-accordion-row>
		</ks-accordion>
	</div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsAccordion from '../../../src/components/KsAccordion.vue';
    import KsAccordionRow from '../../../src/components/KsAccordionRow.vue';

    export default {
        name: 'Buttons',

		components: {
            KsAccordion,
			KsAccordionRow
		}
    }
</script>