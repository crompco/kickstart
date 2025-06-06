<template>
    <div>
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
                    <template v-slot:label="{value, label}">
                        {{value}}: {{label}}
                    </template>
                    <template v-slot:default="{item}">
                        {{item.name}}
                    </template>
                    <template v-slot:empty="{term}">
                        No results for "{{term}}"
                    </template>
                </ks-select>

                <code-block>
                    <template v-pre>
                        &lt;ks-select
                            name="code"
                            label-key="name"
                            v-model="country"
                            :paginated="true"
                            @search="runSearch"
                        >
                            &lt;template v-slot:label="{value, label}">
                                {{value}}: {{label}}
                            &lt;/template>
                            &lt;template v-slot:default="{item}">
                                {{item.name}}
                            &lt;/template>
                            &lt;template v-slot:empty="{term}">
                                No results for "{{term}}"
                            &lt;/template>
                        &lt;/ks-select>
                    </template>

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

                <code-block>
                    <template v-pre>
                        &lt;ks-select
                            name="code"
                            :items="countries"
                            label-key="name"
                            v-model="country_code2"
                        >&lt;/ks-select>
                    </template>
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

                <code-block>
                    <template v-pre>
                        &lt;ks-select
                            name="code"
                            :items="short_countries"
                            label-key="name"
                            :single-deselect="true"
                            v-model="country_code3"
                        >&lt;/ks-select>
                    </template>
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
                <code-block>
                    <template v-pre>
                        &lt;ks-select
                            name="name"
                            :items="characters"
                            label-key="name"
                            v-model="character"
                            group-by="show"
                            :single-deselect="true"
                        >&lt;/ks-select>
                    </template>
                </code-block>
            </div>

            <div class="form-group">
                <div class="label">Disabled Select</div>
                <ks-select name="foo" :disabled="true" label-key="foo"></ks-select>
            </div>
            <code-block>
                <template v-pre>
                    &lt;ks-select name="foo" :disabled="true" label-key="foo">&lt;/ks-select>
                </template>
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
                <code-block>
                    <template v-pre>
                        &lt;ks-select
                            name="code"
                            :items="countries"
                            label-key="name"
                            v-model="forced_value"
                            :force-values="true"
                        >&lt;/ks-select>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <div class="form-group">
                <div class="label">Select with no options</div>
                <ks-select
                    name="empty"
                    :items="emptyItems"
                    label-key="name"
                    empty-message="No options here"
                ></ks-select>
                <code-block>
                    <template v-pre>
                        &lt;ks-select
                            name="empty"
                            :items="[]"
                            label-key="name"
                            empty-message="No options here"
                        >&lt;/ks-select>
                    </template>
                </code-block>
            </div>

            <div class="form-group">
                <div class="label">Select with no options, selectable empty item</div>
                <ks-select
                    name="empty"
                    :items="emptyItems"
                    label-key="name"
                    empty-message="No options here"
                    :accept-empty-selection="true"
                    @selected-empty="emptySelected = 1"
                >
                    <template v-slot:empty="{term}">
                        Empty {{term}}
                    </template>
                </ks-select>
                <div>
                    <pre><strong>Empty Selected:</strong> {{emptySelected ? 'Yes' : 'No'}}</pre>
                </div>
                <code-block>
                    <template v-pre>
                        &lt;ks-select
                            name="empty"
                            :items="[]"
                            label-key="name"
                            empty-message="No options here"
                            :accept-empty-selection="true"
                            @selected-empty="emptySelected = 1"
                        >
                            &lt;template v-slot:empty="{term}">
                                Empty {{term}}
                            &lt;/template>
                        &lt;/ks-select>
                    </template>
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
                    v-model="long"
                ></ks-select>
                <code-block>
                    <template v-pre>
                        &lt;ks-select
                            name="id"
                            :items="[{id: 1, name: 'This is a really long option for the select to test the breakdown, and some
                            more stuff to make this extra long for big screens to have touble '}]"
                            label-key="name"
                            v-model="long"
                        >&lt;/ks-select>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="alert warning">
            <strong>Warning v-model usage:</strong>
            <p>
                When binding values the select component can handle objects or plain values. If you don't pass a value
                (meaning value is null or undefined) then the component will bind the value to an object. If you want to
                force
                the component to bind only the key value then you should make sure to bind an empty string or use the
                prop
                <strong>forceValues</strong>.
            </p>
        </div>
        <div class="alert info">
            <strong>Example:</strong>
            <pre>when value="" then v-model="value" - will bind the key value</pre>
            <pre>when value=NULL|undefined|{} then v-model="value" - will bind the entire object</pre>
        </div>
    </div>
</template>


<script>
    import KsSelect from '../../../src/components/KsSelect.vue';
    import api from '../../../src/helpers/api';

    export default {
        name: 'PageKsSelect',

        data() {
            return {
                emptyItems: [],
                emptySelected: 0,
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
                        code: 'USA',
                    },
                    {
                        name: 'Canada',
                        code: 'Canada',
                    },
                ],
                long: null,
            };
        },

        mounted() {
            api.get('../static/countries.json').then((data) => {
                this.countries = data;
            });
            api.get('../static/characters.json').then((data) => {
                this.characters = data;
            });
        },

        methods: {
            runSearch({term, callback, page}) {
                callback(`/countries?q=${term}&page=${page}`);
            },
        },

        components: {
            KsSelect,
        },
    };
</script>
