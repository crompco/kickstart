<template>
	<div class="top-bar">
		<div class="left">
			<ul class="menu">
				<li><a href="#">One</a></li>
				<li><a href="#">Two</a></li>
				<li><a href="#">Three</a></li>
				<li><a href="#">Four</a></li>
				<li><a href="#">Five</a></li>
			</ul>
		</div>
		<div class="right">
			<ul class="dropdown">
				<li>
					<a href="#">tom.werkheiser@crompco.com</a>
					<ul class="sub-dropdown">
						<li><a href="#">Profile</a></li>
						<li><a href="#">Sign Out</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies

    export default {
        name: 'TopBar'
    }
</script>