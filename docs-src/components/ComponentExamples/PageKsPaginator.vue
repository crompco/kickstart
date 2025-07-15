<template>
    <div>
        <div class="basic-block">
            <h3>
                Events
            </h3>
            <ks-paginator
                :pagination="pagination"
                @input="pagination.current_page=$event"
            ></ks-paginator>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-paginator
                            :pagination="pagination"
                            @input="pagination.current_page=$event"
                        >&lt;/ks-paginator>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <h3>
                Routed parameters
            </h3>
            <ks-paginator
                :pagination="pagination2"
                :routed="true"
                @input="pagination.current_page=$event"
            ></ks-paginator>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-paginator
                            :pagination="pagination2"
                            :routed="true"
                            @input="pagination.current_page=$event"
                        >&lt;/ks-paginator>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <h3>Simple Paginator</h3>

            <ks-simple-paginator
                :pagination="simple_paginator"
                :routed="true"
            ></ks-simple-paginator>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-simple-paginator
                            :pagination="simple_paginator"
                            :routed="true"
                        >&lt;/ks-simple-paginator>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="alert info">
            This component works in 2 ways. By default it will emit an event when the page is changed.
            You can also set the "routed" prop to true it will re-write the url with the proper "page" as a query param
        </div>
    </div>
</template>

<script>
    import KsPaginator from '../../../src/components/KsPaginator.vue';
    import KsTabs from '../../../src/components/KsTabs.vue'
    import KsTab from '../../../src/components/KsTab.vue'
    import KsSimplePaginator from '../../../src/components/KsSimplePaginator.vue';

    export default {
        name: 'PageKsPaginator',

        props: [],

        data() {
            return {
                pagination: {
                    total_count: 902,
                    total_pages: 15,
                    current_page: 1,
                },
                pagination2: {
                    total_count: 902,
                    total_pages: 15,
                    current_page: 1,
                },
                simple_paginator: {
                    current_page: 1,
                    next_page: '?page=2',
                    previous_page: null,
                }
            }
        },

        components: {
            KsPaginator,
            KsTabs,
            KsTab,
            KsSimplePaginator,
        }
    }
</script>
