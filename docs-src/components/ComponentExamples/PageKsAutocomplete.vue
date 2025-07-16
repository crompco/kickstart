<template>
    <div>
        <div class="basic-block">
            <div class="ks-form-group">
                <div class="ks-label">Ajax with pagination</div>
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


            <div class="ks-form-group">
                <div class="ks-label">Passed items</div>
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



            <div class="ks-form-group">
                <div class="ks-label">Multiple Selections with custom template</div>
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


            <div class="ks-form-group">
                <div class="ks-label">Multiple Selections with taggable (add new, minSearch of 0)</div>
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

            <div class="ks-form-group">
                <div class="ks-label">Grouped options, Multiple Selections with taggable (add new, minSearch of 0)</div>
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

          <div class="ks-form-group">
            <div class="ks-label">With `label` slot</div>
            <ks-autocomplete
                :items="countries"
                selection-key="name"
                :multiple="true"
                v-model="value6"
            >
              <template v-slot:label="{item}">
                {{item.code}}
              </template>
            </ks-autocomplete>

            <code-block>
              <template v-pre>
                &lt;ks-autocomplete
                selection-key="name"
                :items="countries"
                v-model="value6"
                :multiple="true"
                >
                  &lt;template v-slot:label="{item}">
                    {{item.code}}
                  &lt;/template>
                &lt;/ks-autocomplete>
              </template>

            </code-block>
          </div>

        </div>
    </div>
</template>


<script>
    import api from '../../../src/helpers/api';
    import KsAutocomplete from '../../../src/components/KsAutocomplete.vue';
    import KsTabs from '../../../src/components/KsTabs.vue';
    import KsTab from '../../../src/components/KsTab.vue';
    import KsAccordion from '../../../src/components/KsAccordion.vue';
    import KsAccordionRow from '../../../src/components/KsAccordionRow.vue';

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
                value6: '',
                countries: [],
                characters: []
            };
        },

        computed: {},

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
                callback(`/api/countries?q=${term}&page=${page}`);
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
