<template>
	<div class="panel">
		<div class="panel-header">Buttons</div>
		<div class="panel-body">
			<div class="row">
				<div>Default</div>
				<hr>
				<div class="sm-2">
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
				<div class="sm-2">
					<button class="button outline">
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
				<div class="sm-2">
					<button class="button none">
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
	</div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies

    export default {
        name: 'Buttons'
    }
</script>