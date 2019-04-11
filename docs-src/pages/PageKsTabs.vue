
<template>
	<div>
		<h2>Tabs</h2>

		<div class="callout">
			<ks-tabs>
				<ks-tab title="Foo">
                    <p>
                        This is the first tab which auto selected
                    </p>
				</ks-tab>

				<ks-tab title="Bar">
                    <p>
                        This is a tab with some content
                    </p>
				</ks-tab>

				<ks-tab title="Baz">
                    <p>
                        This the last tab with some content
                    </p>
				</ks-tab>
			</ks-tabs>
            <code-block>
                &lt;ks-tabs>
                    &lt;ks-tab title="Foo">
                        &lt;p>
                            This is the first tab which auto selected
                        &lt;/p>
                    &lt;/ks-tab>

                    &lt;ks-tab title="Bar">
                        &lt;p>
                            This is a tab with some content
                        &lt;/p>
                    &lt;/ks-tab>

                    &lt;ks-tab title="Baz">
                        &lt;p>
                            This the last tab with some content
                        &lt;/p>
                    &lt;/ks-tab>
                &lt;/ks-tabs>
            </code-block>
		</div>
		<br>
		<div class="callout">
			<ks-tabs :expand="true" id="foo-example">
				<ks-tab title="Foo">
                    <p>
                        This is the first tab which auto selected
                    </p>
				</ks-tab>

				<ks-tab title="Bar">
                    <p>
                        This is a tab with some content
                    </p>
				</ks-tab>

				<ks-tab title="Baz">
                    <p>
                        This the last tab with some content
                    </p>
				</ks-tab>
			</ks-tabs>

            <code-block>
                &lt;ks-tabs :expand="true" id="foo-example">
                    &lt;ks-tab title="Foo">
                        &lt;p>
                            This is the first tab which auto selected
                        &lt;/p>
                    &lt;/ks-tab>

                    &lt;ks-tab title="Bar">
                        &lt;p>
                            This is a tab with some content
                        &lt;/p>
                    &lt;/ks-tab>

                    &lt;ks-tab title="Baz">
                        &lt;p>
                            This the last tab with some content
                        &lt;/p>
                    &lt;/ks-tab>
                &lt;/ks-tabs>
            </code-block>

            <ks-tabs>
                <ks-tab title="Props">
                    <h2>KsTabs</h2>
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>expand</td>
                                <td><pre>Boolean</pre></td>
                                <td><pre>false</pre></td>
                                <td>When set to true the tabs will expand into an even width</td>
                            </tr>
                            <tr>
                                <td>align</td>
                                <td><pre>String</pre></td>
                                <td><pre>center</pre></td>
                                <td>Where to text align the tabs name. Options are ('left', 'center', 'right')</td>
                            </tr>
                            <tr>
                                <td>id</td>
                                <td><pre>String</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>When provided the last active tab will be remembered unless the rememberTab prop is set to false</td>
                            </tr>
                            <tr>
                                <td>rememberTab</td>
                                <td><pre>Boolean</pre></td>
                                <td><pre>true</pre></td>
                                <td>Only used when an ID is provided in case you want to use an id without remembering the tab selection.</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>KsTab</h2>
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>title</td>
                                <td><pre>String</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>When set to true the tabs will expand into an even width</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>

                <ks-tab title="Events">
                    <h2>KsTabs</h2>
                    <table class="table striped events-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>tab-changed</td>
                                <td>Fired when the tab content is changed</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>KsTab</h2>
                    <table class="table striped events-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>active</td>
                                <td>Fired when the tab is activated</td>
                            </tr>
                            <tr>
                                <td>inactive</td>
                                <td>Fired when the tab is de-activated</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>

                <ks-tab title="Methods">
                    <h2>KsTabs</h2>
                    <table class="table striped methods-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><pre>setActiveTab(tabTitle)</pre></td>
                                <td>Sets the active tab. Expects a paramter of the title</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>KsTabs</h2>
                    <table class="table striped methods-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><pre>setActive(Boolean active)</pre></td>
                                <td>Sets the tab to be the active tab. Expects a boolean</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>
                <ks-tab title="Slots">
                    <h2>KsTabs</h2>
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>default</td>
                                <td>This is where the ks-tabs will be.</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>KsTab</h2>
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>default</td>
                                <td>This is where the tab content will be. By default the non-active tabs are not in the DOM. So the mounted will not be called until it is the active tab.</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>
            </ks-tabs>
		</div>
	</div>
</template>


<script>
	import KsTabs from '../../src/components/KsTabs.vue';
	import KsTab from '../../src/components/KsTab.vue';


	export default {
		name: '',

		props: {},

		data() {
			return {};
		},

		computed: {},

		mounted() {

		},

		methods: {},

		watch: {},

		components: {
			KsTabs,
			KsTab
		}
	}
</script>
