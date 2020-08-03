<template>
	<div>
		<h2>
			AutoComplete
		</h2>
        <div class="basic-block">

            <div class="form-group">
                <div class="label">Ajax with pagination</div>
                <ks-autocomplete
                    selection-key="name"
                    v-model="value1"
                    @search="runSearch"
                    :paginated="true"
                    :min-search="0"
                    empty-message="Nothing found"
                ></ks-autocomplete>
                <code-block>
                    <template v-pre>
                        &lt;ks-autocomplete
                            selection-key="name"
                            v-model="value1"
                            @search="runSearch"
                            :paginated="true"
                            empty-message="Nothing found"
                        >&lt;/ks-autocomplete>
                    </template>
                </code-block>
            </div>


            <div class="form-group">
                <div class="label">Passed items</div>
                <ks-autocomplete
                    :items="countries"
                    selection-key="name"
                    v-model="value2"
                ></ks-autocomplete>

                <code-block>
                    <template v-pre>
                         &lt;ks-autocomplete
                            :items="countries"
                            selection-key="name"
                            v-model="value2"
                        >&lt;/ks-autocomplete>
                    </template>
                </code-block>
            </div>



            <div class="form-group">
                <div class="label">Multiple Selections with custom template</div>
                <ks-autocomplete
                    :items="countries"
                    selection-key="name"
                    :multiple="true"
                    v-model="value3"
                    @search="runSearch"
                >
                    <template v-slot="props">
                        <strong>{{props.item.name}}</strong> <em>{{props.item.code}}</em>
                    </template>
                </ks-autocomplete>

                <code-block>
                    <template v-pre>
                        &lt;ks-autocomplete
                            :items="countries"
                            selection-key="name"
                            :multiple="true"
                            v-model="value3"
                            @search="runSearch"
                        >
                            &lt;template v-slot="props">
                                &lt;strong>{{props.item.name}}&lt;/strong> &lt;em>{{props.item.code}}&lt;/em>
                            &lt;/template>
                        &lt;/ks-autocomplete>
                    </template>
                </code-block>
                <pre>{{value3}}</pre>
            </div>


            <div class="form-group">
                <div class="label">Multiple Selections with taggable (add new, minSearch of 0)</div>
                <ks-autocomplete
                    :min-search="0"
                    :taggable="true"
                    selection-key="name"
                    v-model="value4"
                    :paginated="true"
                    :show-tag-in-list="true"
                    @search="runSearch"
                >
                    <template v-slot="props">
                        <strong>{{props.item.name}}</strong> <em>{{props.item.code}}</em>
                    </template>
                </ks-autocomplete>


                <code-block>
                    <template v-pre>

                    &lt;ks-autocomplete
                        :min-search="0"
                        :taggable="true"
                        selection-key="name"
                        v-model="value4"\
                        :paginated="true"
                        :show-tag-in-list="true"
                        @search="runSearch"
                    >
                        &lt;template v-slot="props">
                            &lt;strong>{{props.item.name}}&lt;/strong> &lt;em>{{props.item.code}}&lt;/em>
                        &lt;/template>
                    &lt;/ks-autocomplete>
                    </template>
                </code-block>
            </div>

            <div class="form-group">
                <div class="label">Grouped options, Multiple Selections with taggable (add new, minSearch of 0)</div>
                <ks-autocomplete
                    :min-search="0"
                    :taggable="true"
                    :items="characters"
                    selection-key="name"
                    v-model="value5"
                    :show-tag-in-list="true"
                    group-by="show"
                ></ks-autocomplete>
                <code-block>
                    <template v-pre>
                    &lt;ks-autocomplete
                        :min-search="0"
                        :taggable="true"
                        selection-key="name"
                        v-model="value5"
                        :paginated="true"
                        :show-tag-in-list="true"
                        :items="characters"
                        group-by="show"
                    >&lt;/ks-autocomplete>
                    </template>
                </code-block>
            </div>
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
                            <td>taggable</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                When true the user is allowed to enter values not in the list items.
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
                            <td>showTagInList</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                Depends on taggable. When true the taggable will be shown in the list as "<em>Add</em> {term}"
                            </td>
                        </tr>
                        <tr>
                            <td>delay</td>
                            <td>Number</td>
                            <td>
                                <pre>100</pre>
                            </td>
                            <td>The amount of delay to be used when searching</td>
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
                            <td>keepTextOnDelete</td>
                            <td>Boolean</td>
                            <td>
                                <pre>false</pre>
                            </td>
                            <td>
                                When set to true if a user deletes a seleciton it will retain the text of the selection
                            </td>
                        </tr>
                        <tr>
                            <td>itemFilter</td>
                            <td>Function, String</td>
                            <td>
                                <pre>selectionKey</pre>
                            </td>
                            <td>
                                When a function is provided it will be used when filtering results from the search box.
                                The function should accept the item as a parameter and should return true for a match.
                                If a String is provided it is used as the key to filter on when filtering items.
                            </td>
                        </tr>
                        <tr>
                            <td>selectionKey</td>
                            <td>String</td>
                            <td>
                                <pre>name</pre>
                            </td>
                            <td>
                                This is the key used as the value for the items. And it is used to display selections
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
                        <tr>
                            <td>acceptEmptySelection</td>
                            <td>Boolean</td>
                            <td><pre>false</pre></td>
                            <td>Works with the emptyMessage property. If this is set to true the empty option will be a selectable item instead of just text.</td>
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
                            <td><pre>tag-created</pre></td>
                            <td>When a tag is created this will fire with the new tag in the payload</td>
                        </tr>
                        <tr>
                            <td><pre>deleted</pre></td>
                            <td>When a selection is deleted this will be fired with the deleted selection in the payload</td>
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
                            <td><pre>selected-empty</pre></td>
                            <td>
                                Fired when <code>acceptEmptySelection</code> prop is set to true and the autocomplete term is not in the list.
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
        // The callback function should be called with the proper endpoint to use
        // an optional data key param can be sent as second parameter
        // example: callback(`countries?q=${term}&page=${page}`, 'results')
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
                            <td><pre>clearSelection(selection (optional))</pre></td>
                            <td>Clears a selection from the selection(s). If not parameter is passed the it will remove all selections.</td>
                        </tr>
                        <tr>
                            <td><pre>selectionValue()</pre></td>
                            <td>Returns the value of the selection</td>
                        </tr>
                        <tr>
                            <td><pre>selectItem(item_index)</pre></td>
                            <td>Selects the item at the given index</td>
                        </tr>
                        <tr>
                            <td><pre>addSelection(selection)</pre></td>
                            <td>Adds a selection to the list of selections when multiple is being used</td>
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
                            <td><pre>refreshSelection()</pre></td>
                            <td>
                                Updates the selection display.
                                This should not be needed since the autocomplete will automatically refresh the display
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
                                This is used so that you have more control over the look of the data. The component loops through the data and passes the props with a props attribute. An example can be seem above in either the Multiple selection examples.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>

		<div style="height: 400px;">
			<!-- Force the page to get taller to test the scrolling-->
		</div>

	</div>
</template>


<script>
	import api from '../../src/helpers/api';
	import KsAutocomplete from '../../src/components/KsAutocomplete.vue';
	import KsTabs from '../../src/components/KsTabs.vue';
	import KsTab from '../../src/components/KsTab.vue';
    import KsAccordion from '../../src/components/KsAccordion.vue';
    import KsAccordionRow from '../../src/components/KsAccordionRow.vue';

	export default {
		name: 'PageKsAutocomplete',

		props: {},

		data() {
			return {
				value1:'',
				value2: '',
				value3: '',
                value4: '',
                value5: '',
                countries: [],
                characters: []
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
                callback(`/countries?q=${term}&page=${page}`);
			}
		},

		watch: {},

		components: {
            KsAutocomplete,
			KsTabs,
			KsTab,
            KsAccordion,
            KsAccordionRow
		}
	}
</script>
