<template>
    <div class="sm-full">
        <h2>Paginator</h2>
        <div class="basic-block">
            Event
            <ks-paginator
                :pagination="pagination"
                @input="pagination.current_page=$event"
            ></ks-paginator>

            <div class="row">
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
            Routed
            <ks-paginator
                :pagination="pagination2"
                :routed="true"
                @input="pagination.current_page=$event"
            ></ks-paginator>

            <div class="row">
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
            Simple Paginator

            <ks-simple-paginator
                :pagination="simple_paginator"
                :routed="true"
            ></ks-simple-paginator>

            <div class="row">
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
                            <td>pagination</td>
                            <td>Object</td>
                            <td>
<pre>{
    total_count: 0,
    total_pages: 0,
    current_page: 0
}</pre>
                            </td>
                            <td>
                                This is the main data that the paginator uses to operate
                            </td>
                        </tr>
                        <tr>
                            <td>limit</td>
                            <td>Number</td>
                            <td><pre>5</pre></td>
                            <td>This is the limit to how pages should be shown at once. An ellipsis will be placed when it exceeds this limit</td>
                        </tr>
                        <tr>
                            <td>routed</td>
                            <td>Boolean</td>
                            <td><pre>false</pre></td>
                            <td>When set to true instead of emitting an event the paginator will write directly to the router query</td>
                        </tr>
                        <tr>
                            <td>pageVar</td>
                            <td>String</td>
                            <td><pre>page</pre></td>
                            <td>The variable name to be used when writing the route query</td>
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
                        <td>input</td>
                        <td>Fired when the page is changed. <em>Only fired when routed is not true</em></td>
                    </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>
    </div>
</template>

<script>

    import KsPaginator from '../../src/components/KsPaginator.vue';
    import KsTabs from '../../src/components/KsTabs.vue'
    import KsTab from '../../src/components/KsTab.vue'
    import KsSimplePaginator from '../../src/components/KsSimplePaginator.vue';

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
