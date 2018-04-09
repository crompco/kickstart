<template>
	<div class="sm-full">
		<h2>Select</h2>
        <div class="basic-block">
            <p>Autocomplete and pagination (with slots: default, label)</p>
            <div class="form-group">
                <div class="label">
                    Country
                </div>
                <ks-select
                    name="code"
                    label-key="name"
                    v-model="country"
                    :paginated="true"
                    @search="runSearch"
                >
                    <template slot="label" scope="{value, label}">
                        {{value}}: {{label}}
                    </template>
                    <template scope="props">
                        {{props.item.name}}
                    </template>
                    <template slot="empty" scope="props">
                        No results for "{{props.term}}"
                    </template>
                </ks-select>

               <code-block v-pre>
                    &lt;ks-select
                        name="code"
                        label-key="name"
                        v-model="country"
                        :paginated="true"
                        @search="runSearch"
                    >
                       &lt;template slot="label" scope="{value, label}">
                           {{value}}: {{label}}
                       &lt;/template>
                       &lt;template scope="props">
                            {{props.item.name}}
                       &lt;/template>
                       &lt;template slot="empty" scope="props">
                           No results for "{{props.term}}"
                       &lt;/template>
                    &lt;/ks-select>
               </code-block>
            </div>
            <p>Plain select</p>
            <div class="form-group">
                <div class="label">Country</div>
                <ks-select
                    name="code"
                    :items="countries"
                    label-key="name"
                    v-model="country_code2"
                ></ks-select>

                <code-block v-pre>
                    &lt;ks-select
                        name="code"
                        :items="countries"
                        label-key="name"
                        v-model="country_code2"
                    >&lt;/ks-select>
                </code-block>
            </div>

            <p>Select without the search</p>
            <div class="form-group">
                <div class="label">Country</div>
                <ks-select
                    name="code"
                    :items="short_countries"
                    label-key="name"
                    :single-deselect="true"
                    v-model="country_code3"
                ></ks-select>

                <code-block v-pre>
                    &lt;ks-select
                        name="code"
                        :items="short_countries"
                        label-key="name"
                        :single-deselect="true"
                        v-model="country_code3"
                    >&lt;/ks-select>
                </code-block>
            </div>

            <p>Group Select</p>
            <div class="form-group">
                <div class="label">Characters</div>
                <ks-select
                    name="name"
                    :items="characters"
                    label-key="name"
                    group-by="show"
                    v-model="character"
                    :single-deselect="true"
                ></ks-select>
                <code-block v-pre>
                    &lt;ks-select
                        name="name"
                        :items="characters"
                        label-key="name"
                        v-model="character"
                        group-by="show"
                        :single-deselect="true"
                    >&lt;/ks-select>
                </code-block>
            </div>

            <div class="form-group">
                <div class="label">Disabled Select</div>
                <ks-select name="foo" :disabled="true" label-key="foo"></ks-select>
            </div>
            <code-block v-pre>
                &lt;ks-select name="foo" :disabled="true" label-key="foo">&lt;/ks-select>
            </code-block>

            <div class="form-group">
                <div class="label">Forced value binding</div>
                <ks-select
                    name="code"
                    :items="countries"
                    label-key="name"
                    v-model="forced_value"
                    :force-values="true"
                ></ks-select>
                <pre v-if="forced_value === null"><strong>Value:</strong> NULL</pre>
                <pre v-else><strong>Value:</strong> {{forced_value}}</pre>
                <code-block v-pre>
                    &lt;ks-select
                        name="code"
                        :items="countries"
                        label-key="name"
                        v-model="forced_value"
                        :force-values="true"
                    >&lt;/ks-select>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <div class="form-group">
                <div class="label">Select with no options</div>
                <ks-select
                    name="empty"
                    :items="[]"
                    label-key="name"
                    empty-message="No options here"
                ></ks-select>
                <code-block v-pre>
                    &lt;ks-select
                        name="empty"
                        :items="[]"
                        label-key="name"
                        empty-message="No options here"
                    >&lt;/ks-select>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <div class="form-group">
                <div class="label">Select with long option name</div>
                <ks-select
                    name="id"
                    :items="[{id: 1, name: 'This is a really long option for the select to test the breakdown, and some more stuff to make this extra long for big screens to have touble '}]"
                    label-key="name"
                    empty-message="No options here"
                    v-model="long"
                ></ks-select>
                <code-block v-pre>
                    &lt;ks-select
                    name="empty"
                    :items="[]"
                    label-key="name"
                    empty-message="No options here"
                    >&lt;/ks-select>
                </code-block>
            </div>
        </div>

        <div class="alert warning">
            <strong>Warning v-model usage:</strong>
            <p>
                When binding values the select component can handle objects or plain values. If you don't pass a value
                (meaning value is null or undefined) then the component will bind the value to an object. If you want to force
                the component to bind only the key value then you should make sure to bind an empty string or use the prop
                <strong>forceValues</strong>.
            </p>
        </div>
        <div class="alert info">
            <strong>Example:</strong>
            <pre>when value="" then v-model="value" - will bind the key value</pre>
            <pre>when value=NULL|undefined|{} then v-model="value" - will bind the entire object</pre>
        </div>
        <ks-tabs>
            <ks-tab title="Props">
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
                            <td>name</td>
                            <td>String (required)</td>
                            <td>
                                <pre>NULL</pre>
                            </td>
                            <td>
                                This is the name given to the select and also it will be assumed as the itemKey if no itemKey is provided
                            </td>
                        </tr>
                        <tr>
                            <td>labelKey</td>
                            <td>String (required)</td>
                            <td>
                                <pre>NULL</pre>
                            </td>
                            <td>
                                This is used in the filtering as users type it is also used to display the selection
                            </td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>String, Number (v-model)</td>
                            <td>
                                <pre>NULL</pre>
                            </td>
                            <td>
                                This is the prop that the v-model will bind to. So if you are using v-model you can omit this.
                            </td>
                        </tr>
                        <tr>
                            <td>items</td>
                            <td>Array</td>
                            <td>
                                <pre>NULL</pre>
                            </td>
                            <td>
                                This is the list of options.
                                <pre>[{Option data...},{Option data...}]</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>placeholder</td>
                            <td>String</td>
                            <td>
                                <pre>Select...</pre>
                            </td>
                            <td>
                                The placeholder in the select when nothing is selected.
                            </td>
                        </tr>
                        <tr>
                            <td>searchThreshold</td>
                            <td>Number</td>
                            <td>
                                <pre>7</pre>
                            </td>
                            <td>
                                The minimum number of items for the search input to be shown.
                            </td>
                        </tr>
                        <tr>
                            <td>disableSearch</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                Whether or not to disable the search field.
                            </td>
                        </tr>
                        <tr>
                            <td>itemFilter</td>
                            <td>Function, String</td>
                            <td>
                                <pre>labelKey</pre>
                            </td>
                            <td>
                                When a function is provided it will be used when filtering results from the search box.
                                The function should accept the item as a parameter and should return true for a match.
                                If a String is provided it is used as the key to filter on when filtering items.
                            </td>
                        </tr>
                        <tr>
                            <td>itemKey</td>
                            <td>String</td>
                            <td>
                                <pre>name</pre>
                            </td>
                            <td>
                                This is the key used as the value for the items.
                            </td>
                        </tr>
                        <tr>
                            <td>listHeight</td>
                            <td>String</td>
                            <td>
                                <pre>250px</pre>
                            </td>
                            <td>
                                The height of the drop down list
                            </td>
                        </tr>
                        <tr>
                            <td>minSearch</td>
                            <td>Number</td>
                            <td>
                                <pre>0</pre>
                            </td>
                            <td>
                                Minimum number of characters typed in the search box needed to trigger the search
                            </td>
                        </tr>
                        <tr>
                            <td>groupBy</td>
                            <td>String</td>
                            <td>
                                <pre>NULL</pre>
                            </td>
                            <td>
                                The key to group items by. Dot notation is supported for nested values in the items.
                            </td>
                        </tr>
                        <tr>
                            <td>singleDeselect</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                Allows users to deselect a selected option.
                            </td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                Disables the select
                            </td>
                        </tr>
                        <tr>
                            <td>forceValues</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                When set to true the v-model will bind to the value key instead of the entire object.
                            </td>
                        </tr>
                        <tr>
                            <td>multiple</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                Whether or not to support multiple selections
                            </td>
                        </tr>
                        <tr>
                            <td>cacheResults</td>
                            <td>Boolean</td>
                            <td>
                                <pre>true</pre>
                            </td>
                            <td>
                                Whether or not to cache search results.
                            </td>
                        </tr>
                        <tr>
                            <td>paginated</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                Whether or not the search data is being paginated. When true the select will emit the search event
                                when the list is navigated to the end.
                            </td>
                        </tr>
                        <tr>
                            <td>paginateThreshold</td>
                            <td>Number</td>
                            <td>
                                <pre>3</pre>
                            </td>
                            <td>
                                Determines when the paginate request will be called. So when the user scrolls down the list if this is set to 3
                                the request will be made when the user is 3 list items away from the bottom of the list.
                            </td>
                        </tr>
                        <tr>
                            <td>stopParentScroll</td>
                            <td>Boolean</td>
                            <td>
                                <pre>true</pre>
                            </td>
                            <td>
                                When set to true the list will automatically prevent the parent container from scrolling
                                when the list scroll has reached the bottom.
                            </td>
                        </tr>
                        <tr>
                            <td>emptyMessage</td>
                            <td>String</td>
                            <td></td>
                            <td>
                                A message to use when the select is empty. (ex: "No Results"). If left blank then no message will show up.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>


            <ks-tab title="Events">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><pre>input</pre></td>
                            <td>
                                Fired when the value is changed
                            </td>
                        </tr>
                        <tr>
                            <td><pre>focus</pre></td>
                            <td>
                                Fired when the input field is focused.
                            </td>
                        </tr>
                        <tr>
                            <td><pre>blur</pre></td>
                            <td>
                                Fired when the input field is blurred
                            </td>
                        </tr>
                        <tr>
                            <td><pre>clear</pre></td>
                            <td>
                                Fired when the list is cleared
                            </td>
                        </tr>
                        <tr>
                            <td><pre>search</pre></td>
                            <td>
                                Fired when the input field is expecting a search to be performed.
                                (depends on the minSearch prop) The payload is as follows...
<pre>
    {
        term: term, // the term used in the search
        page: page, // the page of the search being requested
        callback: function
        // The callback to use when the search is completed.
        // This should pass the new list of items
    }
</pre>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>

            <ks-tab title="Methods">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><pre>open()</pre></td>
                            <td>Used to open the select dropdown</td>
                        </tr>
                        <tr>
                            <td><pre>close()</pre></td>
                            <td>Used to close the select dropdown</td>
                        </tr>
                        <tr>
                            <td><pre>toggleOpen()</pre></td>
                            <td>Used to toggle the selecte dropdown</td>
                        </tr>
                        <tr>
                            <td><pre>selectItem(item_index)</pre></td>
                            <td>Called to select an item. Expects the index of the item in the list.</td>
                        </tr>
                        <tr>
                            <td><pre>selectUp()</pre></td>
                            <td>Moves the selection up</td>
                        </tr>
                        <tr>
                            <td><pre>selectDown()</pre></td>
                            <td>Moves the selection down</td>
                        </tr>
                        <tr>
                            <td><pre>clear()</pre></td>
                            <td>Clears the search field</td>
                        </tr>
                        <tr>
                            <td><pre>clearCache()</pre></td>
                            <td>Clears the search cache</td>
                        </tr>
                        <tr>
                            <td><pre>getSelectedItem()</pre></td>
                            <td>Retrieves the selected item from list</td>
                        </tr>
                        <tr>
                            <td><pre>getItemByIndex(item_index)</pre></td>
                            <td>Retrieves an item by the given index</td>
                        </tr>
                        <tr>
                            <td><pre>refreshSelected()</pre></td>
                            <td>
                                Updates the selects display.
                                This should not be needed since the select will automatically refresh the display
                            </td>
                        </tr>
                        <tr>
                            <td><pre>reset()</pre></td>
                            <td>Clears selection, items, and cache</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
            <ks-tab title="Slots">
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
                            <td>
                                This is a <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots" target="_blank">scoped slot</a>.
                                This is used so that you have more control over the look of the data. The component loops through the data and passes the props with a props attribute.
                                An example can be seem above in autocomplete and pagination examples.
                            </td>
                        </tr>
                        <tr>
                            <td>label</td>
                            <td>
                                This is a <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots" target="_blank">scoped slot</a>.
                                This will be used to show the selection. If no selection is made it will not render this slot. It will take a scope of {value: ..., label}.
                                An example can be seen above.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>
    </div>
</template>


<script>
	import KsSelect from '../../src/components/KsSelect.vue';
	import api from '../../src/helpers/api';

	export default {
		name: 'PageKsSelect',

		props: {},

		data() {
			return {
				countries: [],
                characters: [],
				country: '',
                country_code2: 'AW',
                country_code3: '',
                character: '',
                forced_value: null,
                short_countries: [
                    {
                        name: 'USA',
                        code: 'USA'
                    },
                    {
                        name: 'Canada',
                        code: 'Canada'
                    },
                ],
                long: null
			};
		},

		computed: {},

		mounted() {
			api.get('/countries.json').then((data) => {
				this.countries = data;
			});
            api.get('/characters.json').then((data) => {
                this.characters = data;
            });
		},

		methods: {
			runSearch({term, callback, page}) {
				api.get(`/countries?q=${term}&page=${page}`).then((data) => {
					callback(data);
				}).catch((error) => {
					callback([]);
				})
			}
		},

		watch: {},

		components: {
			KsSelect
		}
	}
</script>

<style></style>
