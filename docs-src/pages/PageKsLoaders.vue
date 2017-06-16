<template>
	<div>
		<h2>Loaders</h2>

		<h3>Line</h3>
		<div class="basic-block">
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

            <code-block v-pre>
                    &lt;ks-loader-line :show="show">&lt;/ks-loader-line>
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
            </ks-tab>
        </ks-tabs>

		<h3>Spinner</h3>
		<div class="basic-block">
            <div class="row">
                <div class="form-group">
                    <div class="label">
                        Show/Stop
                    </div>
                    <div class="data">
                        <button class="button" @click="show_spin=!show_spin">
                            <template v-if="show_spin">
                                Stop
                            </template>
                            <template v-else>
                                Show
                            </template>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row row-collapse">

                <ks-radio-group
                    class="form-group sm-full med-half"
                    name="size"
                    :options="size_options"
                    :buttons="true"
                    v-model="size"
                >Size</ks-radio-group>

                <ks-radio-group
                    class="form-group sm-full med-half"
                    name="height"
                    :options="height_options"
                    :buttons="true"
                    v-model="height"
                >Height</ks-radio-group>
            </div>
            <div class="row">

            </div>
			<p>
				<ks-loader-spin :show="show_spin" :size="size" :height="height"></ks-loader-spin>
			</p>

            <code-block v-pre>
                    &lt;ks-loader-spin
                        :show="show_spin"
                        :size="size"
                        :height="height"
                    >&lt;/ks-loader-spin>
            </code-block>
            <div class="row">
                <div class="sm-full med-half">
                    <pre>Size: <strong>{{size}}</strong></pre>
                </div>
                <div class="sm-full med-half">
                    <pre>Height: <strong>{{height}}</strong></pre>
                </div>
            </div>

		</div>

        <ks-tabs>
            <ks-tab title="Props">
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
                        <tr>
                            <td>height</td>
                            <td>String</td>
                            <td>auto</td>
                            <td>The height of the loader </td>
                        </tr>
                        <tr>
                            <td>size</td>
                            <td>String</td>
                            <td>NULL</td>
                            <td>The size of the spinner: tiny, small, medium, large, x-large</td>
                        </tr>
                        <tr>
                            <td>color</td>
                            <td>String</td>
                            <td>NULL</td>
                            <td>The color of the spinner</td>
                        </tr>
                        <tr>
                            <td>bg</td>
                            <td>String</td>
                            <td>NULL</td>
                            <td>The background color or the color of the rail that the spinner is on</td>
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
				show_spin: true,
                size: 'default',
                height: 'auto',
                size_options: [
                    {
                        value: 'default',
                        label: 'Default'
                    },
                    {
                        value: 'tiny',
                        label: 'Tiny'
                    },
                    {
                        value: 'small',
                        label: 'Small'
                    },
                    {
                        value: 'medium',
                        label: 'Medium'
                    },
                    {
                        value: 'large',
                        label: 'Large'
                    },
                    {
                        value: 'x-large',
                        label: 'X-Large'
                    }
                ],
                height_options: [
                    {
                        value: 'auto',
                        label: 'auto'
                    },
                    {
                        value: '150px',
                        label: '150px'
                    },
                    {
                        value: '200px',
                        label: '200px'
                    },
                    {
                        value: '300px',
                        label: '300px'
                    },
                ]
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
