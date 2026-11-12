<script>
    import KsPaginator from './KsPaginator.vue';
    import KsLoaderLine from './KsLoaderLine.vue';
    import { object_get } from '../helpers/objects';

    let table_count = 0;

    /**
     * A scoped slot of a component instance in Vue 2 ($scopedSlots) or Vue 3 ($slots)
     */
    function slotOf(vm, name) {
        return (vm.$scopedSlots || vm.$slots)[name] || null;
    }

    /**
     * KsDataTable
     *
     * Declarative, slot-driven table. Columns are declared with <ks-data-column>
     * children, which register with this component.
     *
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
     * Slots: default (columns), loader, empty, footer (inside <tfoot>),
     * expansion (scoped, { row }), paginator.
     */
    export default {
        name: 'KsDataTable',

        model: {
            prop: 'selected',
            event: 'update:selected'
        },

        provide() {
            return {
                ksDataTable: this,
            };
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
            // Key that identifies a row; needed for selection and expansion
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
            // 'multiple' (checkboxes) | 'single' (radios)
            selectMode: {
                type: String,
                default: 'multiple'
            },
            // Selected row ids; null keeps the selection inside the table
            selected: {
                type: Array,
                default: null
            },
            expandable: {
                type: Boolean,
                default: false
            },
            // A class, or a function (row) => class
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
            // 'asc' | 'desc' | null
            sortDirection: {
                type: String,
                default: null
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            stickyHeader: {
                type: Boolean,
                default: false
            },
            // Max height of the scroll container (enables vertical scrolling)
            maxHeight: {
                type: String,
                default: null
            }
        },

        emits: ['page', 'sort', 'select', 'update:selected', 'row-click', 'row-expand'],

        data() {
            return {
                columns: [],
                internal_selected: [],
                expanded_rows: [],
                table_id: ++table_count,
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
                return this.isControlledSelection ? this.selected : this.internal_selected;
            },
            pageIds() {
                return this.data.map(row => this.idOf(row));
            },
            allSelected() {
                return this.data.length > 0 && this.data.every(row => this.isSelected(row));
            },
            colspan() {
                return this.columns.length
                    + (this.selectable ? 1 : 0)
                    + (this.expandable ? 1 : 0);
            },
        },

        methods: {
            registerColumn(column) {
                if ( this.columns.includes(column) ) {
                    return;
                }

                // Keep document order when columns are added later (v-if)
                const index = this.columns.findIndex(other => {
                    return other.$el && column.$el && (other.$el.compareDocumentPosition(column.$el) & Node.DOCUMENT_POSITION_PRECEDING);
                });

                if ( index === -1 ) {
                    this.columns.push(column);
                } else {
                    this.columns.splice(index, 0, column);
                }
            },
            unregisterColumn(column) {
                const index = this.columns.indexOf(column);
                if ( index !== -1 ) {
                    this.columns.splice(index, 1);
                }
            },
            idOf(row) {
                return row ? row[this.rowId] : undefined;
            },
            resolveValue(row, field) {
                if ( !field ) {
                    return null;
                }

                if ( Array.isArray(field) ) {
                    return field
                        .map(key => object_get(row, key))
                        .filter(value => value !== null && value !== undefined && value !== '')
                        .join(' ');
                }

                return object_get(row, field);
            },
            displayValue(value) {
                if ( value === null || value === undefined ) {
                    return '';
                }

                return String(value);
            },
            alignClass(align) {
                return align ? 'text-' + align : '';
            },
            columnWidthStyle(column) {
                const width = column.width;
                if ( width === null || width === undefined || width === '' ) {
                    return null;
                }

                return { width: typeof width === 'number' ? width + 'px' : width };
            },
            rowClassFor(row) {
                const row_class = typeof this.rowClass === 'function' ? this.rowClass(row) : this.rowClass;

                return [row_class, this.isExpanded(row) ? 'expanded' : ''];
            },
            fieldFor(column) {
                return Array.isArray(column.field) ? column.field[0] : column.field;
            },
            isSortable(column) {
                return !!(column.sortable && column.field);
            },
            handleSort(column) {
                if ( !this.isSortable(column) ) {
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
                    this.internal_selected = next;
                }

                this.$emit('select', { row, selected: next });
            },
            toggleSelectAll(checked) {
                const ids = this.pageIds;
                const next = checked
                    ? Array.from(new Set([...this.selectedIds, ...ids]))
                    : this.selectedIds.filter(id => !ids.includes(id));

                this.emitSelection(next, 'all');
            },
            toggleSelected(row, checked) {
                const id = this.idOf(row);
                let next;

                if ( this.selectMode === 'single' ) {
                    next = checked ? [id] : [];
                } else if ( checked ) {
                    next = this.selectedIds.includes(id) ? this.selectedIds.slice() : this.selectedIds.concat(id);
                } else {
                    next = this.selectedIds.filter(existing => existing !== id);
                }

                this.emitSelection(next, row);
            },
            isSelected(row) {
                return this.selectedIds.includes(this.idOf(row));
            },
            clearSelection() {
                this.emitSelection([], 'all');
            },
            toggleExpand(row) {
                const id = this.idOf(row);
                const expanded = !this.expanded_rows.includes(id);

                this.expanded_rows = expanded
                    ? this.expanded_rows.concat(id)
                    : this.expanded_rows.filter(existing => existing !== id);

                this.$emit('row-expand', { row, expanded });
            },
            isExpanded(row) {
                return this.expanded_rows.includes(this.idOf(row));
            },
            renderCell(h, row, column) {
                const value = this.resolveValue(row, column.field);
                const cell_slot = slotOf(column, 'default');
                const options = {
                    class: [this.tdClass, column.tdClass, this.alignClass(column.align)]
                };

                return h('td', options, cell_slot ? cell_slot({ row, value }) : this.displayValue(value));
            },
            createPaginator(h) {
                if ( this.emptyList ) {
                    return null;
                }

                if ( this.$slots.paginator ) {
                    return h('div', { class: 'ks-data-table-paginator' }, this.$slots.paginator);
                }

                // KsPaginator hides itself for a single page, so skip the padded wrapper too
                if ( !this.paginator || this.paginator.total_pages <= 1 ) {
                    return null;
                }

                return h('div', { class: 'ks-data-table-paginator' }, [
                    h(KsPaginator, {
                        props: {
                            pagination: this.paginator
                        },
                        on: {
                            input: page => this.$emit('page', page)
                        }
                    })
                ]);
            },
            selectAllHeaderCell(h) {
                // Single select has no "select all"; the empty cell keeps the columns aligned
                if ( this.selectMode === 'single' ) {
                    return h('th', { class: ['ks-data-table-select', this.thClass] });
                }

                return h('th', { class: ['ks-data-table-select', this.thClass] }, [
                    h('input', {
                        attrs: { type: 'checkbox', 'aria-label': 'Select all rows' },
                        domProps: { checked: this.allSelected },
                        on: { change: event => this.toggleSelectAll(event.target.checked) }
                    })
                ]);
            },
            leadingHeaderCells(h) {
                const cells = [];

                if ( this.expandable ) {
                    cells.push(h('th', { class: ['ks-data-table-expander-cell', this.thClass] }));
                }

                if ( this.selectable ) {
                    cells.push(this.selectAllHeaderCell(h));
                }

                return cells;
            },
            headerCell(h, column) {
                const sortable = this.isSortable(column);
                const current = sortable && this.sortField === this.fieldFor(column);
                const direction = current ? this.sortDirection : null;

                let aria_sort;
                if ( sortable ) {
                    aria_sort = { asc: 'ascending', desc: 'descending' }[direction] || 'none';
                }

                const header_slot = slotOf(column, 'header');
                const content = header_slot
                    ? header_slot({ column: column.$props, sortField: this.sortField, sortDirection: this.sortDirection }) || []
                    : [h('span', column.label)];

                return h('th', {
                    class: [
                        this.thClass,
                        column.thClass,
                        this.alignClass(column.align),
                        sortable ? 'ks-data-table-sortable' : '',
                        current ? 'sorted' : ''
                    ],
                    style: this.columnWidthStyle(column),
                    attrs: {
                        scope: 'col',
                        'aria-sort': aria_sort
                    },
                    on: {
                        click: () => this.handleSort(column)
                    }
                }, [
                    ...content,
                    sortable ? h('span', { class: ['ks-data-table-sort', direction || ''] }) : null
                ]);
            },
            createHeader(h) {
                const column_cells = this.columns.map(column => this.headerCell(h, column));

                return h('thead', { class: this.theadClass }, [
                    h('tr', this.leadingHeaderCells(h).concat(column_cells))
                ]);
            },
            expanderBodyCell(h, row) {
                const expanded = this.isExpanded(row);

                return h('td', {
                    class: 'ks-data-table-expander-cell',
                    on: {
                        click: (event) => {
                            event.stopPropagation();
                            this.toggleExpand(row);
                        }
                    }
                }, [
                    h('span', {
                        class: ['ks-data-table-expander', expanded ? 'expanded' : ''],
                        attrs: {
                            role: 'button',
                            'aria-expanded': expanded ? 'true' : 'false',
                            'aria-label': expanded ? 'Collapse row' : 'Expand row'
                        }
                    })
                ]);
            },
            selectBodyCell(h, row) {
                const single = this.selectMode === 'single';

                return h('td', {
                    class: 'ks-data-table-select',
                    // A selection click is not a row click
                    on: { click: event => event.stopPropagation() }
                }, [
                    h('input', {
                        attrs: {
                            type: single ? 'radio' : 'checkbox',
                            name: single ? 'ks-data-table-select-' + this.table_id : null,
                            'aria-label': 'Select row'
                        },
                        domProps: { checked: this.isSelected(row) },
                        on: { change: event => this.toggleSelected(row, event.target.checked) }
                    })
                ]);
            },
            leadingBodyCells(h, row) {
                const cells = [];

                if ( this.expandable ) {
                    cells.push(this.expanderBodyCell(h, row));
                }

                if ( this.selectable ) {
                    cells.push(this.selectBodyCell(h, row));
                }

                return cells;
            },
            createBody(h) {
                const rows = [];
                const expansion_slot = this.expandable ? slotOf(this, 'expansion') : null;

                this.data.forEach((row, index) => {
                    const id = this.idOf(row);
                    const key = id === undefined || id === null ? `index-${index}` : `id-${id}`;
                    const cells = this.columns.map(column => this.renderCell(h, row, column));

                    rows.push(h('tr', {
                        key,
                        class: this.rowClassFor(row),
                        on: { click: event => this.$emit('row-click', { row, event }) }
                    }, this.leadingBodyCells(h, row).concat(cells)));

                    if ( expansion_slot && this.isExpanded(row) ) {
                        rows.push(h('tr', {
                            key: `${key}-expansion`,
                            class: 'ks-data-table-expansion-row'
                        }, [
                            h('td', { attrs: { colspan: this.colspan } }, expansion_slot({ row }))
                        ]));
                    }
                });

                return h('tbody', { class: this.tbodyClass }, rows);
            },
            createFooter(h) {
                if ( !this.$slots.footer ) {
                    return null;
                }

                return h('tfoot', this.$slots.footer);
            },
            createTable(h) {
                const table = h('table', {
                    class: [this.tableClass, this.stickyHeader ? 'sticky-header' : ''],
                    directives: [
                        { name: 'show', value: !this.emptyList }
                    ]
                }, [
                    this.createHeader(h),
                    this.createBody(h),
                    this.createFooter(h)
                ]);

                if ( this.scrollable || this.stickyHeader ) {
                    const style = {};
                    if ( this.maxHeight ) {
                        style.maxHeight = this.maxHeight;
                        style.overflowY = 'auto';
                    }

                    return h('div', { class: 'ks-scroll-table', style }, [table]);
                }

                return table;
            }
        },

        render(h) {
            return h('div', { class: 'ks-data-table' }, [
                this.$slots.loader
                    ? h('div', this.$slots.loader)
                    : h(KsLoaderLine, { props: { show: this.loading } }),

                // The column definitions mount here so they can register; they render nothing
                h('div', {
                    class: 'ks-data-table-columns',
                    style: { display: 'none' }
                }, this.$slots.default),

                this.emptyList && this.$slots.empty
                    ? h('div', { class: 'ks-data-table-empty' }, this.$slots.empty)
                    : null,

                this.createTable(h),

                this.createPaginator(h)
            ]);
        }
    }
</script>
