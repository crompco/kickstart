<template>
	<div>
		<h2>Loaders</h2>

		<h3>Line</h3>
		<div class="callout">
			<button class="button" @click="show=!show">
				<template v-if="show">
					Stop
				</template>
				<template v-else>
					Show
				</template>
			</button>
			<p>
				<ks-loader-line :show="show"></ks-loader-line>
			</p>

            <code-block>
                <code class="language-html" v-pre>
                    &lt;ks-loader-line :show="show">&lt;/ks-loader-line>
                </code>
            </code-block>
		</div>

		<h3>Spinner</h3>
		<div class="callout">
			<button class="button" @click="show_spin=!show_spin">
				<template v-if="show_spin">
					Stop
				</template>
				<template v-else>
					Show
				</template>
			</button>
			<p>
				<ks-loader-spin :show="show_spin"></ks-loader-spin>
			</p>

            <code-block>
                <code class="language-html" v-pre>
                    &lt;ks-loader-spin :show="show_spin">&lt;/ks-loader-spin>
                </code>
            </code-block>
		</div>

        <ks-tabs>
            <ks-tab title="Props">
                <h3>Line</h3>
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>height</td>
                            <td>String</td>
                            <td>5px</td>
                            <td>The height of the loader line</td>
                        </tr>
                        <tr>
                            <td>show</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>If the loader is visible</td>
                        </tr>
                        <tr>
                            <td>absolute</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Allows the component to be positioned absolute</td>
                        </tr>
                        <tr>
                            <td>zIndex</td>
                            <td>Number</td>
                            <td>1</td>
                            <td>Change the z-index property</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Spinner</h3>
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>show</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>If the loader is visible</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>
	</div>
</template>


<script>

	import KsLoaderLine from '../../src/components/KsLoaderLine.vue';
	import KsLoaderSpin from '../../src/components/KsLoaderSpin.vue';

	export default {
		name: 'PageKsLoaders',

		props: {},

		data() {
			return {
				show: true,
				show_spin: true
			};
		},

		computed: {},

		mounted() {

		},

		methods: {

		},

		watch: {},

		components: {
			KsLoaderLine,
			KsLoaderSpin
		}
	}
</script>