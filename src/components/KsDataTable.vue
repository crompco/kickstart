<script>
    import KsPaginator from './KsPaginator.vue';
    import KsLoaderLine from './KsLoaderLine.vue';

    /**
     * KsDataTable
     *
     * Declarative, slot-driven table. Columns are declared with <ks-data-column>
     * children which register themselves with this component via provide/inject.
     *
     * Example:
     *   <ks-data-table :data="rows" :loading="loading" :paginator="meta"
     *                  :sort-field="sort.field" :sort-direction="sort.direction"
     *                  selectable
     *                  @page="onPage" @sort="onSort" @select="onSelect">
     *       <ks-data-column label="Name" field="name" sortable />
     *       <ks-data-column label="Status" field="status" v-slot="{ row }">
     *           <span :class="row.status">{{ row.status }}</span>
     *       </ks-data-column>
     *   </ks-data-table>
     *
     * Slots:
     *  - default: the <ks-data-column> definitions
     *  - loader: replaces the default line loader
     *  - empty: shown when there is no data and not loading
     *  - footer: rendered inside a <tfoot> (provide your own <tr>/<td>)
     *  - expansion (scoped): detail content for an expanded row, receives { row }
     *  - paginator: replaces the default paginator
     *
     * Props:
     *  - data: array of row objects
     *  - loading: shows the loader
     *  - rowId: key used to identify a row (required for selection/expansion)
     *  - paginator: pagination meta ({ total_count, total_pages, current_page, ... })
     *  - selectable: renders a selection column
     *  - selectMode: 'multiple' (checkboxes) or 'single' (radios)
     *  - selected: controlled selection (use with v-model or :selected.sync). When
     *    omitted the selection is managed internally.
     *  - expandable: renders an expander column that toggles the `expansion` slot
     *  - rowClass: class (String/Object/Array) or a function (row) => class per row
     *  - sortField / sortDirection: current sort state (controlled by the parent)
     *  - scrollable: wraps the table in a horizontally scrollable container
     *  - stickyHeader: keeps the header visible while the body scrolls
     *  - maxHeight: max height of the scroll container (enables vertical scrolling)
     *  - tableClass / theadClass / tbodyClass / thClass / tdClass: pass-through classes
     *
     * Events:
     *  - page(page): the paginator changed page
     *  - sort({ field, direction }): a sortable header was clicked (direction is
     *    'asc' | 'desc' | null, cycling asc -> desc -> none)
     *  - select({ row, selected }): a selection changed (`row` is 'all' for select-all)
     *  - update:selected(selected): selection changed (for v-model / :selected.sync)
     *  - row-click({ row, event }): a body row was clicked
     *  - row-expand({ row, expanded }): a row was expanded or collapsed
     */
    export default {
        name: 'KsDataTable',

        model: {
            prop: 'selected',
            event: 'update:selected'
        },

        props: {
            loading: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: () => []
            },
            rowId: {
                type: String,
                default: 'id'
            },
            paginator: {
                type: Object,
                default: () => ({
                    total_count: 0,
                    total_pages: 0,
                    current_page: 1,
                    next_page: '',
                    prev_page: '',
                    last_page: 0,
                    per_page: 0
                })
            },
            selectable: {
                type: Boolean,
                default: false
            },
            selectMode: {
                type: String,
                default: 'multiple' // 'multiple' | 'single'
            },
            selected: {
                type: Array,
                default: null // null = uncontrolled (managed internally)
            },
            expandable: {
                type: Boolean,
                default: false
            },
            rowClass: {
                type: [String, Object, Array, Function],
                default: null
            },
            tableClass: {
                type: [String, Object, Array],
                default: 'ks-table'
            },
            theadClass: {
                type: [String, Object, Array],
                default: ''
            },
            tbodyClass: {
                type: [String, Object, Array],
                default: ''
            },
            thClass: {
                type: [String, Object, Array],
                default: ''
            },
            tdClass: {
                type: [String, Object, Array],
                default: ''
            },
            sortField: {
                type: String,
                default: null
            },
            sortDirection: {
                type: String,
                default: null // 'asc' | 'desc' | null
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            stickyHeader: {
                type: Boolean,
                default: false
            },
            maxHeight: {
                type: String,
                default: null
            }
        },

        data() {
            return {
                columns: [],
                internalSelected: [],
                expandedRows: []
            };
        },

        provide() {
            return {
                $columns: this.columns,
                $sortInfo: () => this.sortInfo
            };
        },

        computed: {
            emptyList() {
                return this.loading ? false : this.data.length === 0;
            },
            isControlledSelection() {
                return this.selected !== null;
            },
            selectedIds() {
                return this.isControlledSelection ? this.selected : this.internalSelected;
            },
            pageIds() {
                return this.data.map(row => row[this.rowId]);
            },
            allSelected() {
                return this.data.length > 0
                    && this.data.every(row => this.selectedIds.includes(row[this.rowId]));
            },
            colspan() {
                return this.columns.length
                    + (this.selectable ? 1 : 0)
                    + (this.expandable ? 1 : 0);
            },
            sortInfo() {
                return {
                    field: this.sortField,
                    direction: this.sortDirection
                };
            }
        },

        methods: {
            resolveValue(row, field) {
                if ( !field ) {
                    return null;
                }

                if ( Array.isArray(field) ) {
                    return field
                        .map(key => row[key])
                        .filter(value => value !== null && value !== undefined && value !== '')
                        .join(' ');
                }

                return row[field];
            },
            displayValue(value) {
                if ( value === null || value === undefined ) {
                    return '';
                }
                // Coerce booleans so `false` is not dropped as an ignored vnode child.
                return typeof value === 'boolean' ? String(value) : value;
            },
            alignClass(align) {
                return align ? 'text-' + align : '';
            },
            columnWidthStyle(column) {
                const width = column.$props.width;
                if ( width === null || width === undefined || width === '' ) {
                    return null;
                }
                return { width: typeof width === 'number' ? width + 'px' : width };
            },
            rowClassFor(row) {
                const rowClass = typeof this.rowClass === 'function'
                    ? this.rowClass(row)
                    : this.rowClass;

                return [rowClass, this.isExpanded(row) ? 'expanded' : ''];
            },
            fieldFor(column) {
                const field = column.$props.field;
                return Array.isArray(field) ? field[0] : field;
            },
            renderColumn(createElement, row, column) {
                const value = this.resolveValue(row, column.$props.field);
                const options = {
                    class: [this.tdClass, column.$props.tdClass, this.alignClass(column.$props.align)]
                };

                if ( column.$scopedSlots.default ) {
                    return createElement('td', options, column.$scopedSlots.default({ row, value }));
                }

                return createElement('td', options, this.displayValue(value));
            },
            handleSort(column) {
                if ( !column.$props.sortable || !column.$props.field ) {
                    return;
                }

                const field = this.fieldFor(column);

                let direction;
                if ( this.sortField !== field ) {
                    direction = 'asc';
                } else if ( this.sortDirection === 'asc' ) {
                    direction = 'desc';
                } else if ( this.sortDirection === 'desc' ) {
                    direction = null;
                } else {
                    direction = 'asc';
                }

                this.$emit('sort', { field, direction });
            },
            emitSelection(next, row) {
                if ( this.isControlledSelection ) {
                    this.$emit('update:selected', next);
                } else {
                    this.internalSelected = next;
                }

                this.$emit('select', { row, selected: next });
            },
            toggleSelectAll(event) {
                const ids = this.pageIds;
                let next;

                if ( event.target.checked ) {
                    const set = new Set(this.selectedIds);
                    ids.forEach(id => set.add(id));
                    next = Array.from(set);
                } else {
                    next = this.selectedIds.filter(id => !ids.includes(id));
                }

                this.emitSelection(next, 'all');
            },
            toggleSelected(row, event) {
                const id = row[this.rowId];
                let next;

                if ( this.selectMode === 'single' ) {
                    next = event.target.checked ? [id] : [];
                } else if ( event.target.checked ) {
                    next = this.selectedIds.includes(id)
                        ? this.selectedIds.slice()
                        : this.selectedIds.concat(id);
                } else {
                    next = this.selectedIds.filter(existing => existing !== id);
                }

                this.emitSelection(next, row);
            },
            isSelected(row) {
                return this.selectedIds.includes(row[this.rowId]);
            },
            clearSelection() {
                this.emitSelection([], 'all');
            },
            toggleExpand(row) {
                const id = row[this.rowId];
                const expanded = !this.expandedRows.includes(id);

                this.expandedRows = expanded
                    ? this.expandedRows.concat(id)
                    : this.expandedRows.filter(existing => existing !== id);

                this.$emit('row-expand', { row, expanded });
            },
            isExpanded(row) {
                return this.expandedRows.includes(row[this.rowId]);
            },
            createPaginator(createElement) {
                if ( this.emptyList ) {
                    return null;
                }

                if ( this.$slots.paginator ) {
                    return createElement('div', { class: 'ks-data-table-paginator' }, this.$slots.paginator);
                }

                // KsPaginator hides itself for a single page; skip the wrapper entirely
                // so no empty padded element is left behind.
                if ( !this.paginator || this.paginator.total_pages <= 1 ) {
                    return null;
                }

                return createElement('div', { class: 'ks-data-table-paginator' }, [
                    createElement(KsPaginator, {
                        props: {
                            pagination: this.paginator
                        },
                        on: {
                            input: (page) => this.$emit('page', page)
                        }
                    })
                ]);
            },
            selectAllHeaderCell(createElement) {
                // Single-select has no "select all"; render an empty cell to keep
                // the columns aligned.
                if ( this.selectMode === 'single' ) {
                    return createElement('th', { class: ['ks-data-table-select', this.thClass] });
                }

                return createElement('th', { class: ['ks-data-table-select', this.thClass] }, [
                    createElement('input', {
                        attrs: { type: 'checkbox', 'aria-label': 'Select all rows' },
                        domProps: { checked: this.allSelected },
                        on: { change: (event) => this.toggleSelectAll(event) }
                    })
                ]);
            },
            leadingHeaderCells(createElement) {
                const cells = [];

                if ( this.expandable ) {
                    cells.push(createElement('th', { class: ['ks-data-table-expander-cell', this.thClass] }));
                }

                if ( this.selectable ) {
                    cells.push(this.selectAllHeaderCell(createElement));
                }

                return cells;
            },
            headerCell(createElement, column) {
                const isSortable = !!(column.$props.sortable && column.$props.field);
                const isCurrentSort = isSortable && this.sortField === this.fieldFor(column);

                let ariaSort;
                if ( isSortable ) {
                    ariaSort = isCurrentSort && this.sortDirection === 'asc' ? 'ascending'
                        : isCurrentSort && this.sortDirection === 'desc' ? 'descending'
                            : 'none';
                }

                const headerContent = column.$scopedSlots.header
                    ? column.$scopedSlots.header({
                        column: column.$props,
                        sortField: this.sortField,
                        sortDirection: this.sortDirection
                    })
                    : createElement('span', column.$props.label);

                return createElement('th', {
                    class: [
                        this.thClass,
                        column.$props.thClass,
                        this.alignClass(column.$props.align),
                        isSortable ? 'ks-data-table-sortable' : '',
                        isCurrentSort ? 'sorted' : ''
                    ],
                    style: this.columnWidthStyle(column),
                    attrs: {
                        scope: 'col',
                        'aria-sort': ariaSort
                    },
                    on: {
                        click: () => {
                            if ( isSortable ) {
                                this.handleSort(column);
                            }
                        }
                    }
                }, [
                    headerContent,
                    isSortable
                        ? createElement('span', {
                            class: [
                                'ks-data-table-sort',
                                isCurrentSort && this.sortDirection === 'asc' ? 'asc' : '',
                                isCurrentSort && this.sortDirection === 'desc' ? 'desc' : ''
                            ]
                        })
                        : null
                ]);
            },
            createHeader(createElement) {
                const columnCells = this.columns.map(column => this.headerCell(createElement, column));

                return createElement('thead', { class: this.theadClass }, [
                    createElement('tr', this.leadingHeaderCells(createElement).concat(columnCells))
                ]);
            },
            expanderBodyCell(createElement, row) {
                return createElement('td', {
                    class: 'ks-data-table-expander-cell',
                    on: { click: (event) => { event.stopPropagation(); this.toggleExpand(row); } }
                }, [
                    createElement('span', {
                        class: ['ks-data-table-expander', this.isExpanded(row) ? 'expanded' : ''],
                        attrs: {
                            role: 'button',
                            'aria-expanded': this.isExpanded(row) ? 'true' : 'false',
                            'aria-label': this.isExpanded(row) ? 'Collapse row' : 'Expand row'
                        }
                    })
                ]);
            },
            selectBodyCell(createElement, row) {
                return createElement('td', {
                    class: 'ks-data-table-select',
                    // Don't let a selection click also fire row-click.
                    on: { click: (event) => event.stopPropagation() }
                }, [
                    createElement('input', {
                        attrs: {
                            type: this.selectMode === 'single' ? 'radio' : 'checkbox',
                            name: this.selectMode === 'single' ? 'ks-data-table-select-' + this._uid : null,
                            'aria-label': 'Select row'
                        },
                        domProps: { checked: this.isSelected(row) },
                        on: { change: (event) => this.toggleSelected(row, event) }
                    })
                ]);
            },
            leadingBodyCells(createElement, row) {
                const cells = [];

                if ( this.expandable ) {
                    cells.push(this.expanderBodyCell(createElement, row));
                }

                if ( this.selectable ) {
                    cells.push(this.selectBodyCell(createElement, row));
                }

                return cells;
            },
            createBody(createElement) {
                const rows = [];

                this.data.forEach(row => {
                    const cells = this.columns.map(column => this.renderColumn(createElement, row, column));

                    rows.push(createElement('tr', {
                        key: row[this.rowId],
                        class: this.rowClassFor(row),
                        on: { click: (event) => this.$emit('row-click', { row, event }) }
                    }, this.leadingBodyCells(createElement, row).concat(cells)));

                    if ( this.expandable && this.isExpanded(row) && this.$scopedSlots.expansion ) {
                        rows.push(createElement('tr', {
                            key: row[this.rowId] + '-expansion',
                            class: 'ks-data-table-expansion-row'
                        }, [
                            createElement('td', {
                                attrs: { colspan: this.colspan }
                            }, this.$scopedSlots.expansion({ row }))
                        ]));
                    }
                });

                return createElement('tbody', { class: this.tbodyClass }, rows);
            },
            createFooter(createElement) {
                if ( !this.$slots.footer ) {
                    return null;
                }

                return createElement('tfoot', this.$slots.footer);
            },
            createTable(createElement) {
                const table = createElement('table', {
                    class: [this.tableClass, this.stickyHeader ? 'sticky-header' : ''],
                    directives: [
                        { name: 'show', value: !this.emptyList }
                    ]
                }, [
                    this.createHeader(createElement),
                    this.createBody(createElement),
                    this.createFooter(createElement)
                ]);

                if ( this.scrollable || this.stickyHeader ) {
                    const style = {};
                    if ( this.maxHeight ) {
                        style.maxHeight = this.maxHeight;
                        style.overflowY = 'auto';
                    }

                    return createElement('div', { class: 'ks-scroll-table', style }, [table]);
                }

                return table;
            }
        },

        render(createElement) {
            return createElement('div', { class: 'ks-data-table' }, [
                // Loader
                this.$slots.loader
                    ? createElement('div', this.$slots.loader)
                    : createElement(KsLoaderLine, { props: { show: this.loading } }),

                // Column definitions live here so the child components mount and register.
                // They render nothing, so the container is kept out of the layout.
                createElement('div', {
                    class: 'ks-data-table-columns',
                    style: { display: 'none' }
                }, this.$slots.default),

                // Empty state
                this.emptyList && this.$slots.empty
                    ? createElement('div', { class: 'ks-data-table-empty' }, this.$slots.empty)
                    : null,

                // Table (optionally wrapped in a scroll container)
                this.createTable(createElement),

                // Paginator
                this.createPaginator(createElement)
            ]);
        }
    }
</script>
