<template>
    <div>
        <div class="alert info">
            <code>ks-data-table</code> builds a table from a set of <code>ks-data-column</code>
            children. Each column reads a <code>field</code> off the row, or you can take full
            control of a cell with a scoped slot. Sorting, selection, expansion, pagination and
            sticky headers are all opt-in.
        </div>

        <!-- Basic -->
        <div class="basic-block">
            <h3>Columns, alignment, width &amp; custom cells</h3>
            <p>
                A column with only a <code>field</code> renders the raw value (note that
                <code>0</code> and <code>false</code> render correctly). Use <code>align</code> and
                <code>width</code> to shape a column, or a scoped slot to render whatever you like
                from the <code>row</code>.
            </p>

            <ks-data-table :data="people">
                <ks-data-column label="Name" :field="['first', 'last']" />
                <ks-data-column label="Email" field="email" />
                <ks-data-column label="Score" field="score" align="right" width="80" />
                <ks-data-column label="Active" align="center" v-slot="{ row }">
                    <span class="ks-badge" :class="row.active ? 'success' : 'muted'">
                        {{ row.active ? 'Active' : 'Inactive' }}
                    </span>
                </ks-data-column>
            </ks-data-table>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table :data="people">
                            &lt;ks-data-column label="Name" :field="['first', 'last']" />
                            &lt;ks-data-column label="Email" field="email" />
                            &lt;ks-data-column label="Score" field="score" align="right" width="80" />
                            &lt;ks-data-column label="Active" align="center" v-slot="{ row }">
                                &lt;span class="ks-badge" :class="row.active ? 'success' : 'muted'">
                                    {{ row.active ? 'Active' : 'Inactive' }}
                                &lt;/span>
                            &lt;/ks-data-column>
                        &lt;/ks-data-table>
                    </template>
                </code-block>
            </div>
        </div>

        <!-- Sorting -->
        <div class="basic-block">
            <h3>Sorting</h3>
            <p>
                Mark a column <code>sortable</code> and listen for the <code>sort</code> event.
                Sorting is <em>controlled</em>: the table reflects the <code>sort-field</code> and
                <code>sort-direction</code> props you pass, and you sort the data yourself (client
                side here, or via your API for server-side data). The header cycles ascending,
                descending, then unsorted.
            </p>

            <ks-data-table
                :data="sortedPeople"
                :sort-field="sort.field"
                :sort-direction="sort.direction"
                @sort="onSort"
            >
                <ks-data-column label="First" field="first" sortable />
                <ks-data-column label="Last" field="last" sortable />
                <ks-data-column label="Score" field="score" sortable align="right" />
            </ks-data-table>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table
                            :data="sortedPeople"
                            :sort-field="sort.field"
                            :sort-direction="sort.direction"
                            @sort="onSort"
                        >
                            &lt;ks-data-column label="First" field="first" sortable />
                            &lt;ks-data-column label="Last" field="last" sortable />
                            &lt;ks-data-column label="Score" field="score" sortable align="right" />
                        &lt;/ks-data-table>

                        // methods
                        onSort({ field, direction }) {
                            this.sort = { field, direction };
                        }
                    </template>
                </code-block>
            </div>
        </div>

        <!-- Custom header slot -->
        <div class="basic-block">
            <h3>Custom column headers</h3>
            <p>
                A column's <code>header</code> scoped slot replaces the plain <code>label</code>
                with your own markup &mdash; icons, badges, tooltips, etc. The slot receives
                <code>{ column, sortField, sortDirection }</code>, so a header can even react to the
                current sort state. (Sortable headers keep their click-to-sort behaviour and sort
                caret.)
            </p>

            <ks-data-table
                :data="sortedPeople"
                :sort-field="sort.field"
                :sort-direction="sort.direction"
                @sort="onSort"
            >
                <ks-data-column label="Name" :field="['first', 'last']" />
                <ks-data-column field="email">
                    <template #header>
                        Email <span class="ks-badge info">contact</span>
                    </template>
                </ks-data-column>
                <ks-data-column field="score" sortable align="right">
                    <template #header="{ sortField, sortDirection }">
                        Score
                        <small v-if="sortField === 'score' && sortDirection">
                            &middot; {{ sortDirection }}
                        </small>
                    </template>
                </ks-data-column>
            </ks-data-table>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table
                            :data="sortedPeople"
                            :sort-field="sort.field"
                            :sort-direction="sort.direction"
                            @sort="onSort"
                        >
                            &lt;ks-data-column label="Name" :field="['first', 'last']" />

                            &lt;!-- static custom header -->
                            &lt;ks-data-column field="email">
                                &lt;template #header>
                                    Email &lt;span class="ks-badge info">contact&lt;/span>
                                &lt;/template>
                            &lt;/ks-data-column>

                            &lt;!-- header that reacts to the current sort state -->
                            &lt;ks-data-column field="score" sortable align="right">
                                &lt;template #header="{ sortField, sortDirection }">
                                    Score
                                    &lt;small v-if="sortField === 'score' && sortDirection">
                                        &middot; {{ sortDirection }}
                                    &lt;/small>
                                &lt;/template>
                            &lt;/ks-data-column>
                        &lt;/ks-data-table>
                    </template>
                </code-block>
            </div>
        </div>

        <!-- Selection (controlled, v-model) -->
        <div class="basic-block">
            <h3>Selection</h3>
            <p>
                Add <code>selectable</code> for a checkbox column. Selection works across pages. You
                can let the table manage it internally (listen to <code>select</code>) or own it
                from the parent with <code>v-model</code> / <code>:selected.sync</code>. Use
                <code>select-mode="single"</code> for radios.
            </p>

            <ks-data-table v-model="selected" :data="people" selectable row-id="id">
                <ks-data-column label="Name" :field="['first', 'last']" />
                <ks-data-column label="Role" field="role" />
            </ks-data-table>

            <p class="mt-2">
                <strong>Selected ids:</strong> {{ selected.join(', ') || 'none' }}
                <ks-button tiny class="ml-2" @click="selected = []">Clear</ks-button>
            </p>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table v-model="selected" :data="people" selectable row-id="id">
                            &lt;ks-data-column label="Name" :field="['first', 'last']" />
                            &lt;ks-data-column label="Role" field="role" />
                        &lt;/ks-data-table>

                        // data(): { selected: [] }
                    </template>
                </code-block>
            </div>
        </div>

        <!-- Expandable rows -->
        <div class="basic-block">
            <h3>Expandable rows</h3>
            <p>
                Add <code>expandable</code> and provide an <code>expansion</code> scoped slot to
                render detail content beneath a row.
            </p>

            <ks-data-table :data="people" expandable @row-expand="onRowExpand">
                <ks-data-column label="Name" :field="['first', 'last']" />
                <ks-data-column label="Role" field="role" />
                <template #expansion="{ row }">
                    <div class="p-2">
                        <strong>{{ row.first }} {{ row.last }}</strong> &mdash; {{ row.email }}
                        (score {{ row.score }})
                    </div>
                </template>
            </ks-data-table>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table :data="people" expandable @row-expand="onRowExpand">
                            &lt;ks-data-column label="Name" :field="['first', 'last']" />
                            &lt;ks-data-column label="Role" field="role" />
                            &lt;template #expansion="{ row }">
                                &lt;div class="p-2">
                                    &lt;strong>{{ row.first }} {{ row.last }}&lt;/strong> &mdash; {{ row.email }}
                                &lt;/div>
                            &lt;/template>
                        &lt;/ks-data-table>
                    </template>
                </code-block>
            </div>
        </div>

        <!-- Row click + rowClass -->
        <div class="basic-block">
            <h3>Row click &amp; conditional row classes</h3>
            <p>
                Listen for <code>row-click</code> and style rows with <code>row-class</code> (a
                string, or a function of the row). Here inactive rows are dimmed.
            </p>

            <ks-data-table :data="people" :row-class="rowClass" @row-click="onRowClick">
                <ks-data-column label="Name" :field="['first', 'last']" />
                <ks-data-column label="Role" field="role" />
                <ks-data-column label="Active" align="center" v-slot="{ row }">
                    {{ row.active ? 'Yes' : 'No' }}
                </ks-data-column>
            </ks-data-table>

            <p class="mt-2"><strong>Last clicked:</strong> {{ lastClicked || 'none' }}</p>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table :data="people" :row-class="rowClass" @row-click="onRowClick">
                            &lt;ks-data-column label="Name" :field="['first', 'last']" />
                            &lt;ks-data-column label="Role" field="role" />
                        &lt;/ks-data-table>

                        // methods
                        rowClass(row) {
                            return row.active ? '' : 'ks-demo-inactive-row';
                        },
                        onRowClick({ row }) {
                            this.lastClicked = row.first + ' ' + row.last;
                        }
                    </template>
                </code-block>
            </div>
        </div>

        <!-- Sticky header + footer -->
        <div class="basic-block">
            <h3>Sticky header, scrolling &amp; footer</h3>
            <p>
                Use <code>sticky-header</code> with <code>max-height</code> to keep the header in
                view while the body scrolls, and the <code>footer</code> slot for a summary row.
            </p>

            <ks-data-table :data="people" sticky-header max-height="160px">
                <ks-data-column label="Name" :field="['first', 'last']" />
                <ks-data-column label="Role" field="role" />
                <ks-data-column label="Score" field="score" align="right" />
                <template #footer>
                    <tr>
                        <td colspan="2"><strong>Total</strong></td>
                        <td class="text-right"><strong>{{ totalScore }}</strong></td>
                    </tr>
                </template>
            </ks-data-table>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table :data="people" sticky-header max-height="160px">
                            &lt;ks-data-column label="Name" :field="['first', 'last']" />
                            &lt;ks-data-column label="Role" field="role" />
                            &lt;ks-data-column label="Score" field="score" align="right" />
                            &lt;template #footer>
                                &lt;tr>
                                    &lt;td colspan="2">&lt;strong>Total&lt;/strong>&lt;/td>
                                    &lt;td class="text-right">&lt;strong>{{ totalScore }}&lt;/strong>&lt;/td>
                                &lt;/tr>
                            &lt;/template>
                        &lt;/ks-data-table>
                    </template>
                </code-block>
            </div>
        </div>

        <!-- Loading & empty -->
        <div class="basic-block">
            <h3>Loading &amp; empty states</h3>
            <p>
                Pass <code>loading</code> to show the line loader. When there is no data and the
                table is not loading, the <code>empty</code> slot is shown.
            </p>

            <div class="mb-2">
                <ks-button small @click="loading = !loading">Toggle loading</ks-button>
                <ks-button small @click="showEmpty = !showEmpty">Toggle empty</ks-button>
            </div>

            <ks-data-table :data="showEmpty ? [] : people" :loading="loading">
                <ks-data-column label="Name" :field="['first', 'last']" />
                <ks-data-column label="Email" field="email" />
                <template #empty>
                    <div class="p-2 text-center">No records to display.</div>
                </template>
            </ks-data-table>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table :data="rows" :loading="loading">
                            &lt;ks-data-column label="Name" :field="['first', 'last']" />
                            &lt;ks-data-column label="Email" field="email" />
                            &lt;template #empty>
                                &lt;div class="p-2 text-center">No records to display.&lt;/div>
                            &lt;/template>
                        &lt;/ks-data-table>
                    </template>
                </code-block>
            </div>
        </div>

        <!-- Pagination -->
        <div class="basic-block">
            <h3>Pagination</h3>
            <p>
                Pass a <code>paginator</code> meta object and listen for the <code>page</code>
                event. The built-in paginator hides itself when there is only one page.
            </p>

            <ks-data-table :data="pagedPeople" :paginator="pager" @page="onPage">
                <ks-data-column label="Name" :field="['first', 'last']" />
                <ks-data-column label="Role" field="role" />
                <ks-data-column label="Score" field="score" align="right" />
            </ks-data-table>

            <div class="row mt-4">
                <code-block>
                    <template v-pre>
                        &lt;ks-data-table :data="pagedPeople" :paginator="pager" @page="onPage">
                            &lt;ks-data-column label="Name" :field="['first', 'last']" />
                            &lt;ks-data-column label="Role" field="role" />
                            &lt;ks-data-column label="Score" field="score" align="right" />
                        &lt;/ks-data-table>

                        // methods
                        onPage(page) {
                            this.pager.current_page = page;
                        }
                    </template>
                </code-block>
            </div>
        </div>
    </div>
</template>

<script>
    import KsDataTable from '../../../src/components/KsDataTable.vue';
    import KsDataColumn from '../../../src/components/KsDataColumn.vue';
    import KsButton from '../../../src/components/KsButton.vue';

    const PEOPLE = [
        { id: 1, first: 'Ada', last: 'Lovelace', email: 'ada@example.com', role: 'admin', active: true, score: 42 },
        { id: 2, first: 'Alan', last: 'Turing', email: 'alan@example.com', role: 'user', active: false, score: 0 },
        { id: 3, first: 'Grace', last: 'Hopper', email: 'grace@example.com', role: 'admin', active: true, score: 17 },
        { id: 4, first: 'Katherine', last: 'Johnson', email: 'kat@example.com', role: 'user', active: true, score: 9 },
        { id: 5, first: 'Linus', last: 'Torvalds', email: 'linus@example.com', role: 'user', active: false, score: 5 },
    ];

    const PER_PAGE = 2;

    export default {
        name: 'PageKsDataTable',

        components: {
            KsDataTable,
            KsDataColumn,
            KsButton,
        },

        data() {
            return {
                people: PEOPLE,
                sort: { field: null, direction: null },
                selected: [],
                lastClicked: null,
                loading: false,
                showEmpty: false,
                pager: {
                    total_count: PEOPLE.length,
                    total_pages: Math.ceil(PEOPLE.length / PER_PAGE),
                    current_page: 1,
                    per_page: PER_PAGE,
                },
            };
        },

        computed: {
            sortedPeople() {
                const { field, direction } = this.sort;

                if ( !field || !direction ) {
                    return this.people;
                }

                const sorted = this.people.slice().sort((a, b) => {
                    if ( a[field] === b[field] ) {
                        return 0;
                    }
                    return a[field] > b[field] ? 1 : -1;
                });

                return direction === 'desc' ? sorted.reverse() : sorted;
            },
            pagedPeople() {
                const start = (this.pager.current_page - 1) * PER_PAGE;
                return this.people.slice(start, start + PER_PAGE);
            },
            totalScore() {
                return this.people.reduce((sum, row) => sum + row.score, 0);
            },
        },

        methods: {
            onSort({ field, direction }) {
                this.sort = { field, direction };
            },
            onRowClick({ row }) {
                this.lastClicked = row.first + ' ' + row.last;
            },
            onRowExpand({ row, expanded }) {
                // eslint-disable-next-line no-console
                console.log(row.first, expanded ? 'expanded' : 'collapsed');
            },
            rowClass(row) {
                return row.active ? '' : 'ks-demo-inactive-row';
            },
            onPage(page) {
                this.pager.current_page = page;
            },
        },
    }
</script>

<style>
    .ks-demo-inactive-row td {
        opacity: 0.5;
    }
</style>
